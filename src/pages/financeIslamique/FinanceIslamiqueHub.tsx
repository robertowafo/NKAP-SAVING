import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, ShieldCheck, TrendingUp, Users, Landmark,
  ChevronRight, Star, Zap, Globe, Lock,
} from 'lucide-react';

/* ─── Image helpers ─────────────────────────────────────────── */
const img = (name: string) => encodeURI(`/${name}`);

/* ─── Data ──────────────────────────────────────────────────── */
const TICKER_TAGS = [
  'AAOIFI Standards', 'Blockchain Polygon', 'Comité Charia', 'COSUMAF Conforme',
  'Zéro Riba', 'Règlement DEEP 2025', 'Islamic Finance', 'Sukuk Tokenisés',
  'Moudharaba', 'Finance Éthique', 'Halal Certified', 'CEMAC 2026',
];

const PRODUCTS = [
  {
    num: '01',
    path: '/finance-islamique/sukuk',
    title: 'Sukuk Tokenisés',
    tag: 'Blockchain · AAOIFI',
    desc: "L'obligataire islamique sur Polygon. Chaque token représente une quote-part de propriété dans un actif réel certifié Charia.",
    stat: '8–11%',
    statLabel: 'rendement annuel',
    image: img('Sukuk Ijara concept.jpeg'),
    accent: '#bef264',
  },
  {
    num: '02',
    path: '/finance-islamique/mourabaha',
    title: 'Mourabaha & Ijara',
    tag: 'PME · Zéro intérêt',
    desc: 'Financement islamique pour les PME CEMAC. Vente à prix majoré transparent ou leasing islamique — sans intérêt caché.',
    stat: '500M FCFA',
    statLabel: 'volume finançable',
    image: img('Business handshake Islamic finance.jpeg'),
    accent: '#bef264',
  },
  {
    num: '03',
    path: '/finance-islamique/crowdfunding-halal',
    title: 'Crowdfunding Halal',
    tag: 'Moucharaka · Communautaire',
    desc: 'Participez à des projets communautaires en zone CEMAC. Profits partagés équitablement ou prêt solidaire à 0%.',
    stat: '478',
    statLabel: 'investisseurs actifs',
    image: img('Hero visual — Community Impact.jpeg'),
    accent: '#bef264',
  },
  {
    num: '04',
    path: '/finance-islamique/fcp-islamique',
    title: 'FCP Islamique',
    tag: 'Moudharaba · Gestion pro',
    desc: 'Fonds Communs de Placement structurés Moudharaba. Screening Charia automatique et gestion professionnelle BVMAC.',
    stat: '+18.7%',
    statLabel: 'performance 1 an',
    image: img('Hero visual — Investment Dashboard.jpeg'),
    accent: '#bef264',
  },
];

const STATS = [
  { value: '$4 000', unit: 'Mds', label: 'Finance islamique mondiale', icon: Globe },
  { value: '<1%', unit: '', label: "Part Afrique sub-saharienne", icon: Star },
  { value: '55%', unit: '', label: 'Population CEMAC musulmane', icon: Users },
  { value: '0', unit: '', label: 'Concurrent digital CEMAC', icon: Zap },
];

const FEATURES = [
  { icon: ShieldCheck, label: 'Certifié Charia', desc: 'Comité indépendant AAOIFI / IFSB' },
  { icon: Lock, label: 'Blockchain Polygon', desc: 'Smart contracts audités on-chain' },
  { icon: TrendingUp, label: 'Rendement Halal', desc: 'Sans intérêt, sans spéculation' },
  { icon: Landmark, label: 'COSUMAF Conforme', desc: 'Visa régulateur CEMAC en cours' },
];

const PHASES = [
  { num: '01', title: 'Phase MVP+', period: '0 – 3 mois', desc: 'Crowdfunding Halal labellisé, FCP islamique partenaire', status: 'Actif', color: '#bef264' },
  { num: '02', title: 'Phase Métier', period: '3 – 6 mois', desc: 'Mourabaha/Ijara PME, Islamic Window bancaire', status: 'En cours', color: '#1A7A4A' },
  { num: '03', title: 'Phase Invest.', period: '6 – 12 mois', desc: 'Sukuk pilote 500M FCFA, smart contract AAOIFI', status: 'Planifié', color: '#6b7280' },
  { num: '04', title: 'Écosystème', period: '12 – 24 mois', desc: 'Takaful / Waqf digital, marché secondaire Sukuk', status: 'Futur', color: '#d1d5db' },
];

const CAROUSEL_CARDS = [
  { title: 'Sukuk Tokenisés', tag: 'Blockchain · AAOIFI', stat: '8–11%', statLabel: 'rendement / an', path: '/finance-islamique/sukuk', gradient: 'from-[#1A7A4A] to-[#060d09]', accent: '#bef264' },
  { title: 'Mourabaha & Ijara', tag: 'PME · Zéro intérêt', stat: '500M', statLabel: 'FCFA finançable', path: '/finance-islamique/mourabaha', gradient: 'from-[#1a1a2e] to-[#0a0a0a]', accent: '#bef264' },
  { title: 'Crowdfunding Halal', tag: 'Moucharaka · Qard Hassan', stat: '478', statLabel: 'investisseurs actifs', path: '/finance-islamique/crowdfunding-halal', gradient: 'from-[#0a2a4a] to-[#060918]', accent: '#bef264' },
  { title: 'FCP Islamique', tag: 'Moudharaba · Gestion pro', stat: '+18.7%', statLabel: 'performance 1 an', path: '/finance-islamique/fcp-islamique', gradient: 'from-[#2a0a4a] to-[#0d060a]', accent: '#bef264' },
  { title: 'Comité Charia', tag: 'AAOIFI · Gouvernance', stat: '5', statLabel: 'érudits certifiés', path: '/finance-islamique/comite-charia', gradient: 'from-[#3a2800] to-[#0a0800]', accent: '#bef264' },
];

/* ─── Animation variants ─────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  }),
};

/* ─── Carousel card ─────────────────────────────────────────── */
function CarouselCard({ card, isActive, onClick }: { card: typeof CAROUSEL_CARDS[0]; isActive: boolean; onClick: () => void }) {
  return (
    <Link
      to={card.path}
      onClick={onClick}
      className={`block w-[240px] lg:w-[280px] rounded-[2rem] overflow-hidden flex-shrink-0 transition-all duration-500 ${isActive ? 'shadow-2xl shadow-black/20' : 'shadow-md shadow-black/10'}`}
    >
      <div className={`relative h-52 bg-gradient-to-br ${card.gradient} flex flex-col justify-between p-7 overflow-hidden`}>
        <div className="flex justify-between items-start">
          <span className="px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-[9px] font-black uppercase tracking-widest text-white/80">
            {card.tag}
          </span>
          <ShieldCheck className="w-5 h-5 text-[#bef264]" />
        </div>
        <div>
          <p className="text-[#bef264] text-xs font-black uppercase tracking-widest mb-1">{card.statLabel}</p>
          <p className="text-white font-black tracking-tighter" style={{ fontSize: 'clamp(24px, 4vw, 36px)' }}>{card.stat}</p>
        </div>
        {/* Decorative ring */}
        <div className="absolute -right-10 -top-10 w-40 h-40 border-[20px] border-white/5 rounded-full" />
        <div className="absolute -left-6 -bottom-6 w-28 h-28 border-[12px] border-[#bef264]/10 rounded-full" />
      </div>
      <div className="bg-white p-6">
        <h3 className="font-black text-[#0a0a0a] tracking-tight text-lg mb-1 leading-tight">{card.title}</h3>
        <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
          Explorer <ArrowRight className="w-3 h-3" />
        </div>
      </div>
    </Link>
  );
}

/* ─── Component ─────────────────────────────────────────────── */
export default function FinanceIslamiqueHub() {
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setActiveCard(p => (p + 1) % CAROUSEL_CARDS.length), 3500);
    return () => clearInterval(timer);
  }, []);

  const getCardStyle = (index: number) => {
    const n = CAROUSEL_CARDS.length;
    let diff = index - activeCard;
    if (diff > n / 2) diff -= n;
    if (diff < -n / 2) diff += n;
    const abs = Math.abs(diff);
    return {
      x: diff * 300,
      rotateY: -diff * 20,
      scale: Math.max(0.72, 1 - abs * 0.11),
      zIndex: 10 - abs,
      opacity: Math.max(0.45, 1 - abs * 0.28),
    };
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-[#0a0a0a] overflow-x-hidden selection:bg-[#bef264] selection:text-black">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative flex flex-col items-center text-center px-6 pt-28 pb-0 overflow-hidden bg-[#0a1a0f]">
        {/* Islamic pattern + glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 opacity-[0.12]" style={{ backgroundImage: `url(${img('Islamic Pattern Background.jpeg')})`, backgroundSize: '280px', backgroundRepeat: 'repeat' }} />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[700px] bg-[radial-gradient(ellipse_at_50%_0%,#bef26428_0%,transparent_65%)]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,#1A7A4A22_0%,transparent_60%)]" />
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#0a1a0f] to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto w-full">
          {/* Back + cert */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-4 mb-10"
          >
            <Link to="/investir" className="text-white/40 text-[10px] font-black tracking-[0.3em] uppercase hover:text-white/80 transition-colors">
              ← Investissements
            </Link>
            <div className="w-1 h-1 rounded-full bg-white/20" />
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 backdrop-blur-sm rounded-full text-[10px] font-black uppercase tracking-widest text-white">
              <ShieldCheck className="w-3.5 h-3.5 text-[#bef264]" />
              Certifié Charia AAOIFI · CEMAC 2026
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="font-black tracking-tighter leading-[0.88] mb-8 text-white"
            style={{ fontSize: 'clamp(52px, 9vw, 112px)' }}
          >
            Investissez avec une<br />
            <span className="text-white/18">éthique pure.</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.28, duration: 0.7 }}
            className="text-white/60 text-lg lg:text-xl leading-relaxed mb-10 max-w-xl mx-auto"
          >
            NKAP est la première plateforme digitale de finance islamique en Afrique centrale.
            Zéro ribā, transparence totale, impact réel.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-wrap gap-4 justify-center mb-8"
          >
            <Link
              to="/finance-islamique/sukuk"
              className="px-9 py-4 bg-[#bef264] text-black font-black rounded-full text-base hover:scale-105 hover:shadow-2xl hover:shadow-[#bef264]/40 transition-all duration-300"
            >
              Découvrir les Sukuk
            </Link>
            <Link
              to="/finance-islamique/comite-charia"
              className="px-9 py-4 bg-white/10 border border-white/25 text-white font-bold rounded-full text-base hover:bg-white/20 backdrop-blur-sm transition-all"
            >
              Comité Charia
            </Link>
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
            className="flex items-center justify-center gap-3 text-sm text-white/50 font-bold mb-16"
          >
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#bef264] text-[#bef264]" />
              ))}
            </div>
            Noté 4.9/5 par 478 investisseurs CEMAC
          </motion.div>
        </div>

        {/* ── CAROUSEL 3D ── */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="relative z-10 w-full"
        >
          {/* Cards track */}
          <div
            className="relative flex items-end justify-center overflow-hidden"
            style={{ height: '380px', perspective: '1400px' }}
          >
            {CAROUSEL_CARDS.map((card, i) => {
              const style = getCardStyle(i);
              return (
                <motion.div
                  key={i}
                  animate={{ x: style.x, rotateY: style.rotateY, scale: style.scale, opacity: style.opacity, zIndex: style.zIndex }}
                  transition={{ type: 'spring', stiffness: 240, damping: 28 }}
                  style={{ position: 'absolute', transformStyle: 'preserve-3d', transformOrigin: 'center bottom', bottom: 0 }}
                >
                  <CarouselCard card={card} isActive={i === activeCard} onClick={() => setActiveCard(i)} />
                </motion.div>
              );
            })}
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6 pb-8">
            {CAROUSEL_CARDS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveCard(i)}
                className={`rounded-full transition-all duration-300 ${i === activeCard ? 'w-8 h-2 bg-[#bef264]' : 'w-2 h-2 bg-white/30 hover:bg-white/50'}`}
              />
            ))}
          </div>

          {/* fade to white */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />
        </motion.div>
      </section>

      {/* ── TICKER ───────────────────────────────────────────────────────── */}
      <div className="py-5 bg-[#060d09] border-y border-white/5 overflow-hidden">
        <div className="flex gap-0 animate-marquee whitespace-nowrap">
          {[...TICKER_TAGS, ...TICKER_TAGS].map((tag, i) => (
            <span key={i} className="inline-flex items-center gap-4 px-12 text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
              <span className="w-2 h-2 rounded-full bg-[#bef264]" />
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* ── IMPACT STATS ─────────────────────────────────────────────────── */}
      <section className="py-32 px-6 bg-[#f4f4f0]">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-24">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[#1A7A4A] mb-6">Impact Régional</p>
            <h2 className="text-5xl lg:text-7xl font-black tracking-tighter leading-none mb-8">
              Le futur de la finance éthique<br />en zone CEMAC
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 pt-12 border-t border-gray-300">
            {STATS.map((stat, i) => (
              <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <p className="text-6xl lg:text-8xl font-black tracking-tighter text-[#0a0a0a] mb-4">
                  {stat.value}
                  {stat.unit && <span className="text-xl text-gray-400 ml-1 font-bold">{stat.unit}</span>}
                </p>
                <p className="text-gray-500 text-sm font-bold uppercase tracking-widest leading-relaxed max-w-[180px]">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCTS ─────────────────────────────────────────────────────── */}
      <section className="py-32 px-6 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-24">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-[#bef264] mb-4">Gamme complète</p>
              <h2 className="text-5xl lg:text-7xl font-black tracking-tighter leading-none text-white">
                Investissez en toute<br />conscience.
              </h2>
            </motion.div>
            <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-white/50 text-xl max-w-sm">
              4 produits islamiques conçus pour l'économie réelle d'Afrique Centrale.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PRODUCTS.map((p, i) => (
              <motion.div
                key={i}
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                whileHover={{ y: -10 }}
              >
                <Link
                  to={p.path}
                  className="group relative block rounded-[3rem] overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500"
                >
                  <div className="relative h-72 overflow-hidden">
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute top-8 left-8">
                      <span className="px-5 py-2 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-black">
                        {p.tag}
                      </span>
                    </div>
                  </div>
                  <div className="p-12">
                    <h3 className="text-4xl font-black tracking-tighter mb-4 group-hover:text-[#1A7A4A] transition-colors">{p.title}</h3>
                    <p className="text-gray-500 text-lg leading-relaxed mb-10">{p.desc}</p>
                    <div className="flex items-end justify-between">
                       <div>
                          <p className="text-3xl font-black tracking-tighter text-[#1A7A4A]">{p.stat}</p>
                          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mt-1">{p.statLabel}</p>
                       </div>
                       <div className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-gray-400 group-hover:text-black group-hover:gap-6 transition-all">
                          Explorer <ChevronRight className="w-5 h-5" />
                       </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ROADMAP ───────────────────────────────────────────────────────── */}
      <section className="py-32 px-6 bg-[#0a0a0a] text-white">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-24">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[#bef264] mb-6">Écosystème</p>
            <h2 className="text-5xl lg:text-7xl font-black tracking-tighter leading-none mb-8">
              Une intégration en<br />4 phases majeures
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PHASES.map((ph, i) => (
              <motion.div
                key={i}
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 transition-all duration-300"
              >
                <div className="inline-block px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-8" style={{ backgroundColor: ph.color, color: ph.color === '#bef264' ? 'black' : 'white' }}>
                  {ph.status}
                </div>
                <p className="text-xs font-black text-white/30 uppercase tracking-[0.2em] mb-4">{ph.period}</p>
                <h3 className="text-2xl font-black tracking-tighter mb-4">{ph.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{ph.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BOTTOM ───────────────────────────────────────────────────── */}
      <section className="py-32 px-6 bg-[#f4f4f0]">
         <div className="max-w-7xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative rounded-[4rem] bg-[#0a0a0a] p-20 lg:p-32 text-center overflow-hidden"
            >
               <div className="absolute top-0 right-0 w-96 h-96 bg-[#bef264] opacity-20 blur-[150px]" />
               <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#1A7A4A] opacity-20 blur-[150px]" />
               
               <h2 className="text-5xl lg:text-8xl font-black tracking-tighter leading-none mb-16 text-white relative z-10">
                 Prêt pour une<br />finance éthique ?
               </h2>
               
               <Link 
                 to="/inscription"
                 className="inline-block px-14 py-7 bg-[#bef264] text-black font-black rounded-full text-xl hover:scale-105 transition-all duration-300 relative z-10"
               >
                 Ouvrir mon compte QPB
               </Link>
            </motion.div>
         </div>
      </section>

    </div>
  );
}
