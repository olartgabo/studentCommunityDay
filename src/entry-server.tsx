import { renderToString } from 'react-dom/server';
import React from 'react';
import App from './App';
import SponsorDeck from './SponsorDeck';

export function render(pathname = '/'): string {
  const isSponsorDeck = pathname.replace(/\/+$/, '') === '/sponsor-deck';
  const Page = isSponsorDeck ? SponsorDeck : App;
  return renderToString(React.createElement(Page));
}
