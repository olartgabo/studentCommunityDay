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
  // Luma registration. Public link for share/SEO; embed URL for the in-page widget.
  lumaUrl: 'https://luma.com/r65j1ukn',
  lumaEmbedUrl: 'https://luma.com/embed/event/evt-FbVkx9njqUDpSD2/simple',
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
    name: 'Speaker1',
    role: 'AWS',
    city: '.',
    talk: '.',
    track: '.',
    initials: 'A',
  },
  {
    id: 'S02',
    name: 'Speaker2',
    role: 'AWS',
    city: '.',
    talk: '.',
    track: '.',
    initials: 'W',
  },
  {
    id: 'S03',
    name: 'Speaker3',
    role: 'AWS',
    city: '.',
    talk: '.',
    track: '.',
    initials: 'S',
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
    price: 'USD 1000',
    benefits: [
      'Co-branding en el nombre y comunicados del evento',
      'Keynote slot — 45 min on stage (tema libre)',
      'Logo principal: web, stage backdrop, materiales impresos',
      'Stand preferente — 3 m · 2 mesas · hasta 10 encargados',
      'Video promocional de 2 min producido por el equipo SCD',
      'Material de marca en las bolsas de regalo de todos los asistentes',
      'Techmixer — 10 invitaciones al networking VIP post-evento',
      'Publicación de vacantes en web + redes (3 meses)',
      'Mención especial y detallada en escenario principal',
      '20 pases de acceso completo · negociaciones preferenciales',
    ],
  },
  {
    id: 'platinum',
    name: 'Platinum',
    tagline: 'Máxima visibilidad',
    featured: false,
    accent: 'white',
    price: 'USD 800',
    benefits: [
      'Logo destacado en web, stage y materiales impresos',
      'Lightning talk — 15 min on stage',
      'Stand — 2 m · 2 mesas · hasta 5 encargados',
      'Video promocional de 45 seg en redes sociales',
      'Material de marca en bolsas de regalo',
      'Techmixer — 5 invitaciones al networking VIP',
      'Publicación de vacantes en web + redes (1 mes)',
      'Mención especial en escenario principal',
      '10 pases de acceso completo',
    ],
  },
  {
    id: 'gold',
    name: 'Gold',
    tagline: 'Presencia activa',
    featured: false,
    accent: 'amber',
    price: 'USD 500',
    benefits: [
      'Logo en website y materiales del evento',
      'Mesa en zona de networking yooo',
      'Material de marca en bolsas de regalo',
      'Techmixer — 3 invitaciones al networking VIP',
      'Publicación de vacantes en redes sociales',
      'Post dedicado en redes del evento',
      'Mención en escenario principal',
      '5 pases de acceso completo',
    ],
  },
  {
    id: 'silver',
    name: 'Silver',
    tagline: 'Apoya la comunidad',
    featured: false,
    accent: 'neutral',
    price: 'USD 300',
    benefits: [
      'Logo en website del evento',
      'Mención en escenario principal',
      'Mención en redes sociales',
      '2 pases de acceso completo',
    ],
  },
] as const;

// Shown under the pricing grid on /sponsor-deck.
export const sponsorPricingNote =
  '¿Tu empresa maneja otro presupuesto? Nos adaptamos con aportes específicos — escríbenos y armamos un paquete a medida.';

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
