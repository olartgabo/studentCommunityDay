export const event = {
  shortName: 'SCD·26',
  name: 'AWS Student Community Day',
  edition: 'Cochabamba',
  city: 'Cochabamba',
  country: 'Bolivia',
  venue: 'UPB Cochabamba',
  year: '2026',
  dateISO: '2026-10-03',
  dateDisplay: '03.10.2026',
  dateShort: '03 · OCT',
  dateLong: '03 · OCTUBRE · 2026',
  weekday: 'Sábado',
  capacity: 500,
  confirmed: 312,
  waitlist: 47,
  contactEmail: 'hi@scd-bolivia.dev',
  socialHandle: '@scdbolivia',
  address: 'UPB · Av. Capitán Víctor Ustariz',
};

export const navLinks = [
  { id: 'hero',      num: '00', label: 'Index' },
  { id: 'manifesto', num: '01', label: 'Manifesto' },
  { id: 'tracks',    num: '02', label: 'Tracks' },
  { id: 'schedule',  num: '03', label: 'Schedule' },
  { id: 'speakers',  num: '04', label: 'Speakers' },
  { id: 'sponsors',  num: '05', label: 'Sponsors' },
  { id: 'register',  num: '06', label: 'Register' },
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

export const sponsors: { name: string; tier: string }[] = [];

export const sponsorTiers = [
  {
    id: 'host',
    name: 'Host',
    tagline: 'Eres el evento',
    featured: true,
    accent: 'cyan',
    benefits: [
      'Nombre co-branding en el título del evento',
      'Keynote slot — 20 min on stage',
      'Logo principal en todos los materiales impresos y digitales',
      'Stand premium en patio de networking',
      'Mención en todos los posts y comunicados oficiales',
      '20 pases de acceso completo',
      'Acceso al directorio de asistentes (opt-in)',
    ],
  },
  {
    id: 'platinum',
    name: 'Platinum',
    tagline: 'Máxima visibilidad',
    featured: false,
    accent: 'white',
    benefits: [
      'Logo en stage y materiales impresos',
      'Lightning talk — 10 min on stage',
      'Demo table en zona de networking',
      'Mención destacada en redes sociales',
      '10 pases de acceso completo',
    ],
  },
  {
    id: 'gold',
    name: 'Gold',
    tagline: 'Presencia activa',
    featured: false,
    accent: 'amber',
    benefits: [
      'Logo en website y materiales del evento',
      'Mesa en zona de networking',
      'Post dedicado en redes sociales',
      '5 pases de acceso completo',
      'Swag inclusion — stickers / inserts',
    ],
  },
  {
    id: 'silver',
    name: 'Silver',
    tagline: 'Apoya la comunidad',
    featured: false,
    accent: 'neutral',
    benefits: [
      'Logo en website del evento',
      'Mención en redes sociales',
      '2 pases de acceso completo',
    ],
  },
] as const;

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

export const venueDetails = {
  fullName: 'Universidad Privada Boliviana — Campus Cochabamba',
  address: 'Av. Capitán Víctor Ustariz, Cochabamba, Bolivia',
  mapsUrl: 'https://maps.google.com/?q=UPB+Cochabamba+Av+Capitan+Victor+Ustariz',
  lat: '-17.393',
  lng: '-66.157',
};

export const faqs = [
  {
    q: '¿Es gratis?',
    a: 'Sí. Entrada completamente gratuita para estudiantes. Trae tu ID universitaria el día del evento.',
  },
  {
    q: '¿Quién puede asistir?',
    a: 'Cualquier estudiante universitario, de cualquier carrera y universidad. No hace falta ser de sistemas o ingeniería.',
  },
  {
    q: '¿Qué debo traer?',
    a: 'Laptop con batería cargada, ID universitaria y curiosidad. Todo el software necesario se instala durante el workshop.',
  },
  {
    q: '¿Necesito saber AWS?',
    a: 'No. El track /cloud empieza desde cero. Cada track tiene su propio nivel de entrada — elige el que más se adapte a ti.',
  },
  {
    q: '¿Habrá materiales después del evento?',
    a: 'Sí. Todos los labs, repos y slides quedan disponibles en nuestro GitHub público tras el evento.',
  },
  {
    q: '¿Hay certificados?',
    a: 'Badge digital de asistencia + acceso a créditos AWS educativos para todos los participantes activos.',
  },
];
