export const event = {
  shortName: 'SCD·26',
  name: 'AWS Student Community Day',
  edition: 'Cochabamba',
  city: 'Cochabamba',
  country: 'Bolivia',
  venue: 'UPB Cochabamba',
  year: '2026',
  dateISO: '2026-10-17',
  dateDisplay: '17.10.2026',
  dateShort: '17 · OCT',
  dateLong: '17 · OCTUBRE · 2026',
  weekday: 'Sábado',
  capacity: 500,
  confirmed: 312,
  waitlist: 47,
  contactEmail: 'hi@scd-bolivia.dev',
  socialHandle: '@scdbolivia',
  address: 'UPB · Av. Capitán Víctor Ustariz',
};

export const navLinks = [
  { id: 'hero', num: '00', label: 'Index' },
  { id: 'manifesto', num: '01', label: 'Manifesto' },
  { id: 'tracks', num: '02', label: 'Tracks' },
  { id: 'schedule', num: '03', label: 'Schedule' },
  { id: 'speakers', num: '04', label: 'Speakers' },
  { id: 'register', num: '05', label: 'Register' },
];

export const tracks = [
  {
    id: 'T01',
    code: '/cloud',
    title: 'Cloud Fundamentals',
    color: 'from-cyan-400/30 to-cyan-400/5',
    accent: 'cyan',
    blurb: 'Si nunca tocaste la consola, este es tu track. EC2, S3, IAM, VPC y Lambda — desde cero hasta tu primer deploy.',
    topics: ['EC2', 'S3', 'IAM', 'VPC', 'Lambda'],
  },
  {
    id: 'T02',
    code: '/devops',
    title: 'DevOps & Automation',
    color: 'from-fuchsia-500/20 to-cyan-400/5',
    accent: 'fuchsia',
    blurb: 'De git push a producción en un workshop. CI/CD, infra como código y observabilidad de verdad.',
    topics: ['CI/CD', 'CDK', 'Terraform', 'CloudWatch'],
  },
  {
    id: 'T03',
    code: '/ai',
    title: 'AI + AWS',
    color: 'from-emerald-400/20 to-cyan-400/5',
    accent: 'emerald',
    blurb: 'Construye apps con IA sin gastar $200/mes en GPUs. Bedrock, agents y RAG aplicado, con código que sale del workshop.',
    topics: ['Bedrock', 'SageMaker', 'RAG', 'Agents'],
  },
  {
    id: 'T04',
    code: '/security',
    title: 'Security',
    color: 'from-amber-400/20 to-cyan-400/5',
    accent: 'amber',
    blurb: 'No pierdas tus credenciales el primer día. Threat modeling, IAM avanzado, KMS y GuardDuty con casos reales.',
    topics: ['Threat Modeling', 'IAM', 'KMS', 'GuardDuty'],
  },
];

export const speakers = [
  {
    id: 'S01',
    name: 'Diego Aramayo',
    role: 'AWS Community Builder',
    city: 'La Paz',
    talk: 'DevOps Keynote — del aula a producción',
    track: 'devops',
    initials: 'DA',
  },
  {
    id: 'S02',
    name: 'Valeria Choquehuanca',
    role: 'CTO · Llama Labs',
    city: 'Cochabamba',
    talk: 'CDK Hands-on Workshop',
    track: 'cloud',
    initials: 'VC',
  },
  {
    id: 'S03',
    name: 'Ignacio Terán',
    role: 'Senior Eng · Founder',
    city: 'Santa Cruz',
    talk: 'Bedrock + RAG en producción',
    track: 'ai',
    initials: 'IT',
  },
  {
    id: 'S04',
    name: 'Mariana Rocabado',
    role: 'Security Engineer · LatAm',
    city: 'Lima · Bolivia',
    talk: 'Threat modeling & IAM panel',
    track: 'security',
    initials: 'MR',
  },
];

export const schedule = [
  { time: '08:30', length: '30 MIN', title: 'Check-in & coffee', venue: 'LOBBY', track: 'open' },
  { time: '09:00', length: '90 MIN', title: 'Opening keynote', venue: 'AUDITORIO', track: 'keynote' },
  { time: '11:00', length: '120 MIN', title: 'CDK hands-on workshop', venue: 'LAB D-3', track: 'cloud' },
  { time: '13:00', length: '90 MIN', title: 'Lunch & networking', venue: 'PATIO', track: 'open' },
  { time: '14:30', length: '60 MIN', title: 'Bedrock + RAG en producción', venue: 'AUDITORIO', track: 'ai' },
  { time: '16:30', length: '75 MIN', title: 'Security panel · Threat modeling', venue: 'AULA M-2', track: 'security' },
  { time: '18:00', length: '60 MIN', title: 'Closing + swag drop', venue: 'AUDITORIO', track: 'open' },
];

export const sponsors = [
  { name: 'UPB Cochabamba', tier: 'host' },
  { name: 'AWS Community', tier: 'platinum' },
  { name: 'Llama Labs', tier: 'gold' },
  { name: 'Tech Partner', tier: 'gold' },
  { name: 'Local Builder Co.', tier: 'silver' },
  { name: 'OSS Friends', tier: 'silver' },
];

export const marqueeWords = [
  'BUILD · BREAK · DEPLOY',
  'UPB · COCHABAMBA',
  '4 TRACKS',
  '500 BUILDERS',
  'STUDENT · COMMUNITY · DAY',
  'AWS · 2026',
  'TRAE LAPTOP Y CURIOSIDAD',
  'FROM CLASSROOM TO CLOUD',
];

export const manifestoLines = [
  'No es otra conferencia.',
  'Es un día para construir,',
  'romper, y desplegar —',
  'del aula a la nube.',
];
