export interface PortfolioItem {
  name: string;
  cat: string;
  url: string;
  img: string;
}

const images = import.meta.glob('../assets/portfolio/*.{webp,png,jpg,jpeg}', { query: '?url', import: 'default', eager: true }) as Record<string, any>;
const getImage = (name: string) => {
  const key = Object.keys(images).find(k => k.includes(name));
  if (!key) return '';
  const match = images[key];
  return typeof match === 'string' ? match : (match.default || match);
};

export const portfolioData: PortfolioItem[] = [
  // E-Commerce
  { name: 'CLH Egypt', cat: 'E-Commerce', url: 'https://clh-eg.com/', img: getImage('clh.webp') },
  { name: 'Safa Lighting', cat: 'E-Commerce', url: 'https://safalighting.com', img: getImage('safalighting.webp') },
  { name: 'Seraj Bright', cat: 'E-Commerce', url: 'https://serajbright.com/', img: getImage('serajbright.webp') },
  { name: 'El Safa Inc', cat: 'E-Commerce', url: 'https://elsafainc.com/', img: getImage('elsafainc.webp') },
  { name: 'Jolie Gold', cat: 'E-Commerce', url: 'https://joliegoldeg.com/', img: getImage('joliegold.webp') },
  { name: 'Chongwei Electric', cat: 'E-Commerce', url: 'https://chongwei-electric.com/', img: getImage('chongwei.webp') },
  
  // Corporate & Others
  { name: 'Catchy Adv', cat: 'Corporate / Agency', url: 'https://catchy-adv.com/', img: getImage('catchyadv.webp') },
  { name: 'Happy Motorhomes', cat: 'Travel & Vehicles', url: 'https://happymotorhomes.net/', img: getImage('happymotorhomes.webp') },
  { name: 'Verdanza', cat: 'Corporate', url: 'https://verdanza.net', img: getImage('verdanza.webp') },
  { name: 'True for Training', cat: 'Education', url: 'https://truefortraining.com', img: getImage('truefortraining.webp') },
  { name: 'HP Clinics', cat: 'Healthcare', url: 'https://hp-clinics.com/', img: getImage('hpclinics.webp') },
  { name: 'SoftPrimes', cat: 'Tech & Software', url: 'https://softprimes.com/', img: getImage('softprimes.webp') },
  { name: 'Galala Challenge', cat: 'Sports & Events', url: 'https://galalachallenge.com/', img: getImage('galalachallenge.webp') },
  { name: 'Ironstar Egypt', cat: 'Sports & Events', url: 'https://ironstaregypt.powerridesports.com/', img: getImage('ironstaregypt.webp') },
  { name: 'Nexara', cat: 'Corporate', url: 'https://nexara-sa.com/', img: getImage('nexara.webp') },
  { name: 'Saraya Marketing', cat: 'Marketing', url: 'https://sarayamarketing.com/', img: getImage('sarayamarketing.webp') },
  { name: 'Xpert', cat: 'Corporate', url: 'https://xperteg.com/', img: getImage('xpert.webp') },
  { name: 'Different MEP', cat: 'Engineering', url: 'https://different-mep.com/', img: getImage('differentmep.webp') },
  { name: 'Control Tech SA', cat: 'Engineering & Tech', url: 'https://controltech-sa.com/', img: getImage('controltechsa.webp') },
  { name: 'Power Ride Sports', cat: 'Sports & Fitness', url: 'http://powerridesports.com/', img: getImage('powerridesports.webp') },
  { name: 'Control Tech ENT', cat: 'Engineering', url: 'https://controltech-ent.com/', img: getImage('controltechent.webp') },
  { name: 'Discover Egypt Tour', cat: 'Tourism', url: 'http://discoveregypttour.com/', img: getImage('discoveregypttour.webp') },
  { name: 'Cepurity', cat: 'Corporate', url: 'https://cepurity.com/', img: getImage('cepurity.webp') },
  { name: 'Etqan', cat: 'NGO / Corporate', url: 'https://etqan.org/', img: getImage('etqan.webp') },
  { name: 'QaPool', cat: 'Tech & Service', url: 'https://qapool.com/', img: getImage('qapool.webp') },
  { name: 'Wow Me Clinics', cat: 'Healthcare', url: 'https://www.wowmeclinics.com/', img: getImage('wowmeclinics.webp') },
  { name: 'Taqa Noor', cat: 'Energy', url: 'https://taqanoor.com/', img: getImage('taqanoor.webp') },
  { name: 'Egyptian Spanish SEO', cat: 'SEO & Marketing', url: 'https://egyptianspanish.com/', img: getImage('egyptianspanish.webp') },
  { name: 'Bremco', cat: 'Engineering / Construction', url: 'https://bremcoeg.com/', img: getImage('bremco.webp') },
  { name: 'Sun Laser CNC', cat: 'Industrial', url: 'https://sunlasercnc.com/', img: getImage('sunlasercnc.webp') },
  { name: 'TTI EG', cat: 'Tech / Corporate', url: 'http://ttieg.com/', img: getImage('ttieg.webp') },
];
