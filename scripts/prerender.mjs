/**
 * Prerender script — runs after `vite build`.
 *
 * 1. Builds the SSR bundle (src/entry-server.tsx → dist/server/).
 * 2. Sets up minimal browser globals so GSAP/Lenis module-level code doesn't throw.
 * 3. Calls renderToString and injects the result into dist/index.html.
 *
 * All GSAP animations and Lenis scroll setup live inside useEffect hooks,
 * so they are skipped by renderToString — only the static HTML structure is captured.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { build } from 'vite';
import react from '@vitejs/plugin-react';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

// ── Step 1: Build SSR bundle ─────────────────────────────────────────────────
console.log('  Building SSR bundle…');
await build({
  root,
  plugins: [react()],
  resolve: { alias: { '@': path.resolve(root, 'src') } },
  build: {
    ssr: 'src/entry-server.tsx',
    outDir: 'dist/server',
    emptyOutDir: true,
    rollupOptions: { output: { format: 'esm' } },
  },
  ssr: {
    // Bundle these so they use the global mocks below rather than bare Node imports
    noExternal: ['gsap', '@gsap/react', 'lenis'],
  },
  logLevel: 'warn',
});

// ── Step 2: Mock browser globals ─────────────────────────────────────────────
// Must happen BEFORE the dynamic import so module-level gsap.registerPlugin() calls
// see a usable window/document.
const noop = () => {};
const mockEl = () => ({
  style: {},
  classList: { add: noop, remove: noop, contains: () => false, toggle: noop },
  setAttribute: noop,
  getAttribute: () => null,
  appendChild: noop,
  removeChild: noop,
  addEventListener: noop,
  removeEventListener: noop,
  getBoundingClientRect: () => ({ top: 0, left: 0, bottom: 0, right: 0, width: 0, height: 0 }),
});

global.window = {
  matchMedia: () => ({ matches: false, addListener: noop, removeListener: noop, addEventListener: noop, removeEventListener: noop }),
  addEventListener: noop,
  removeEventListener: noop,
  dispatchEvent: noop,
  location: { href: 'https://studentcommunity.day/', origin: 'https://studentcommunity.day', pathname: '/' },
  history: { replaceState: noop, pushState: noop },
  requestAnimationFrame: () => 0,
  cancelAnimationFrame: noop,
  innerWidth: 1280,
  innerHeight: 720,
  devicePixelRatio: 1,
  scrollY: 0,
  scrollX: 0,
  pageXOffset: 0,
  pageYOffset: 0,
  getComputedStyle: () => ({ getPropertyValue: () => '', getPropertyPriority: () => '' }),
  ResizeObserver: class { observe() {} unobserve() {} disconnect() {} },
  IntersectionObserver: class { observe() {} unobserve() {} disconnect() {} },
  MutationObserver: class { observe() {} disconnect() {} },
  performance: { now: () => Date.now(), mark: noop, measure: noop },
  CSS: { supports: () => false },
};
global.document = {
  createElement: () => mockEl(),
  createElementNS: () => mockEl(),
  createTextNode: () => ({}),
  createDocumentFragment: () => mockEl(),
  addEventListener: noop,
  removeEventListener: noop,
  dispatchEvent: noop,
  getElementById: () => null,
  querySelector: () => null,
  querySelectorAll: () => [],
  body: { ...mockEl(), tagName: 'BODY', parentNode: null, parentElement: null },
  documentElement: { ...mockEl(), tagName: 'HTML', clientWidth: 1280, clientHeight: 720, scrollTop: 0, scrollLeft: 0 },
  head: { ...mockEl() },
  readyState: 'complete',
  visibilityState: 'visible',
};
// navigator is read-only in Node.js 21+ (it's a built-in Web API there)
try {
  global.navigator = { userAgent: 'node', platform: 'node', language: 'es', languages: ['es'] };
} catch {
  Object.defineProperty(global, 'navigator', {
    value: { userAgent: 'node', platform: 'node', language: 'es', languages: ['es'] },
    configurable: true, writable: true,
  });
}
global.self = global;
global.HTMLElement = class HTMLElement {};
global.Element = class Element {};
global.Node = class Node {};
global.requestAnimationFrame = () => 0;
global.cancelAnimationFrame = global.window.cancelAnimationFrame;
global.getComputedStyle = global.window.getComputedStyle;
global.ResizeObserver = global.window.ResizeObserver;
global.IntersectionObserver = global.window.IntersectionObserver;
global.MutationObserver = global.window.MutationObserver;
global.performance = global.window.performance;

// ── Step 3: Render and inject into dist/index.html ───────────────────────────
try {
  const entryPath = path.join(root, 'dist', 'server', 'entry-server.js');
  const { render } = await import(pathToFileURL(entryPath).href);
  const appHtml = render();

  const indexPath = path.join(root, 'dist', 'index.html');
  const template = fs.readFileSync(indexPath, 'utf-8');
  const output = template.replace(
    '<div id="root"></div>',
    `<div id="root">${appHtml}</div>`,
  );
  fs.writeFileSync(indexPath, output);
  console.log('  ✓ Prerendered dist/index.html — crawlers now see full static HTML');
} catch (err) {
  console.warn('  ⚠ Prerender render step failed — noscript fallback remains active');
  console.warn('   ', err.message);
  process.exitCode = 0; // don't fail the CI build
}
