import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, ShieldCheck, TrendingUp, Users, Landmark,
  ArrowUpRight, ChevronRight, Star, Zap, Globe, Lock,
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
    accent: '#1A7A4A',
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
    accent: '#C8972B',
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
    accent: '#1A7A4A',
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
    accent: '#C8972B',
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
  { num: '01', title: 'Phase MVP+', period: '0 – 3 mois', desc: 'Crowdfunding Halal labellisé, FCP islamique partenaire', status: 'Actif', color: '#1A7A4A' },
  { num: '02', title: 'Phase Métier', period: '3 – 6 mois', desc: 'Mourabaha/Ijara PME, Islamic Window bancaire', status: 'En cours', color: '#C8972B' },
  { num: '03', title: 'Phase Invest.', period: '6 – 12 mois', desc: 'Sukuk pilote 500M FCFA, smart contract AAOIFI', status: 'Planifié', color: '#6b7280' },
  { num: '04', title: 'Écosystème', period: '12 – 24 mois', desc: 'Takaful / Waqf digital, marché secondaire Sukuk', status: 'Futur', color: '#d1d5db' },
];

/* ─── Animation variants ─────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  }),
};
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
};

/* ─── Component ─────────────────────────────────────────────── */
export default function FinanceIslamiqueHub() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <div className="flex flex-col min-h-screen bg-white text-[#0a0a0a] overflow-x-hidden">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-[95vh] flex items-center px-4 sm:px-6 lg:px-8 pt-10 pb-16 overflow-hidden">
        {/* Soft green aura top-right */}
        <motion.div style={{ y: heroY }} className="absolute inset-0 pointer-events-none">
          <div
            className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full"
            style={{ background: 'radial-gradient(circle, #dcf0e4 0%, transparent 65%)' }}
          />
          <div
            className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full"
            style={{ background: 'radial-gradient(circle, #fef9ec 0%, transparent 70%)' }}
          />
          {/* Islamic pattern overlay — very subtle */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: `url(${img('Islamic Pattern Background.jpeg')})`, backgroundSize: '200px' }}
          />
        </motion.div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20 items-center">

            {/* ── Left col ── */}
            <motion.div style={{ opacity: heroOpacity }}>
              {/* Breadcrumb */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                <Link to="/investir" className="inline-flex items-center gap-2 text-gray-400 text-xs font-semibold mb-10 hover:text-gray-700 transition-colors tracking-widest uppercase">
                  ← Investissements
                </Link>
              </motion.div>

              {/* Label badge */}
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.05 }}>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#e8f5ee] border border-[#1A7A4A]/20 rounded-full text-[#1A7A4A] text-xs font-bold mb-8">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Premier en zone CEMAC · Certifié Charia AAOIFI
                </div>
              </motion.div>

              {/* H1 */}
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="font-display font-black tracking-tight leading-[0.9] mb-8"
                style={{ fontSize: 'clamp(48px, 7.5vw, 88px)' }}
              >
                Investissez<br />
                dans une<br />
                <span
                  className="relative"
                  style={{
                    background: 'linear-gradient(135deg, #1A7A4A 0%, #2da55e 50%, #C8972B 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  finance éthique.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="text-gray-500 text-lg leading-relaxed mb-10 max-w-[480px]"
              >
                QPB — la première plateforme digitale de finance islamique en Afrique centrale.
                Sukuk, Mourabaha, Moucharaka, FCP Islamique. Certifié Charia. Zéro ribā.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42, duration: 0.6 }}
                className="flex flex-wrap gap-3"
              >
                <Link
                  to="/finance-islamique/sukuk"
                  className="group flex items-center gap-2 px-7 py-4 bg-[#1A7A4A] text-white font-bold rounded-full text-sm hover:bg-[#145d38] transition-all hover:shadow-xl hover:shadow-[#1A7A4A]/25 hover:-translate-y-0.5"
                >
                  Découvrir les Sukuk
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/finance-islamique/comite-charia"
                  className="group flex items-center gap-2 px-7 py-4 bg-gray-100 text-gray-700 font-bold rounded-full text-sm hover:bg-gray-200 transition-all"
                >
                  Comité Charia
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </motion.div>

              {/* Social proof line */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex items-center gap-4 mt-12 pt-8 border-t border-gray-100"
              >
                <div className="flex -space-x-2">
                  {['#1A7A4A', '#C8972B', '#2da55e', '#a07020'].map((c, i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white text-[10px] font-bold" style={{ backgroundColor: c }}>
                      {['A', 'B', 'C', 'D'][i]}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-500">
                  <span className="font-bold text-[#0a0a0a]">478+ investisseurs</span> font déjà confiance à QPB
                </p>
              </motion.div>
            </motion.div>

            {/* ── Right col — visual stack ── */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-[540px] lg:h-[600px]"
            >
              {/* Main hero image card */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-0 left-0 right-0 h-[400px] rounded-3xl overflow-hidden shadow-2xl shadow-black/10"
              >
                <img
                  src={img('Hero visual — Tokenized Real Estate.jpeg')}
                  alt="Sukuk tokenisé — immobilier CEMAC"
                  className="w-full h-full object-cover"
                />
                {/* Gradient overlay bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                {/* Overlay label */}
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                  <div>
                    <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-1">Sukuk Pilote QPB</p>
                    <p className="text-white font-display font-bold text-2xl">500 000 000 FCFA</p>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-white text-xs font-bold">LIVE</span>
                  </div>
                </div>
              </motion.div>

              {/* Floating stat card — market size */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute bottom-28 -left-4 bg-white rounded-2xl shadow-2xl shadow-black/10 border border-gray-100 p-5 w-[200px]"
              >
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Marché mondial</p>
                <p className="font-display font-black text-[#0a0a0a] text-2xl">$4 000 <span className="text-sm text-gray-400 font-normal">Mds</span></p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-3 h-3 text-[#1A7A4A]" />
                  <span className="text-[10px] text-[#1A7A4A] font-bold">+15% / an</span>
                </div>
              </motion.div>

              {/* Floating Charia badge */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute bottom-6 right-6 flex items-center gap-2.5 bg-white rounded-2xl shadow-xl border border-gray-100 px-4 py-3"
              >
                <img src={img('Islamic Star Ornament-Photoroom.png')} alt="" className="w-8 h-8 object-contain" />
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">Certifié</p>
                  <p className="text-xs font-bold text-[#1A7A4A]">Charia AAOIFI</p>
                </div>
              </motion.div>

              {/* Floating rendement badge top-right */}
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                className="absolute top-4 -right-4 bg-[#1A7A4A] text-white rounded-2xl shadow-xl px-4 py-3"
              >
                <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest mb-0.5">Rendement Sukuk</p>
                <p className="font-display font-black text-xl">8–11% <span className="text-sm font-normal text-white/60">/ an</span></p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TICKER ───────────────────────────────────────────────────────── */}
      <div className="py-4 bg-gray-50 border-y border-gray-100 overflow-hidden">
        <div className="flex gap-0 animate-marquee whitespace-nowrap">
          {[...TICKER_TAGS, ...TICKER_TAGS, ...TICKER_TAGS].map((tag, i) => (
            <span key={i} className="inline-flex items-center gap-2.5 px-8 text-sm font-semibold text-gray-400">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1A7A4A] shrink-0" />
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* ── HEADLINE SECTION — "Future de la finance éthique" ─────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <p className="text-[#1A7A4A] text-xs font-bold tracking-widest uppercase mb-4">Impact en Afrique Centrale</p>
            <h2 className="font-display font-black text-[#0a0a0a] tracking-tight leading-tight mx-auto max-w-4xl" style={{ fontSize: 'clamp(32px, 5vw, 60px)' }}>
              Le futur des investissements éthiques avec un accès digital en zone CEMAC
            </h2>
          </motion.div>

          {/* CEMAC countries grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-20">
            {[
              { code: 'CM', name: 'Cameroun', flag: '🇨🇲', active: true },
              { code: 'GA', name: 'Gabon', flag: '🇬🇦', active: true },
              { code: 'CG', name: 'Congo', flag: '🇨🇬', active: false },
              { code: 'TD', name: 'Tchad', flag: '🇹🇩', active: false },
              { code: 'CF', name: 'RCA', flag: '🇨🇫', active: false },
              { code: 'GQ', name: 'Guinée Éq.', flag: '🇬🇶', active: false },
            ].map((c, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className={`flex flex-col items-center gap-2 p-5 rounded-2xl border transition-all ${c.active ? 'border-[#1A7A4A]/30 bg-[#e8f5ee]' : 'border-gray-100 bg-gray-50'}`}
              >
                <span className="text-3xl">{c.flag}</span>
                <span className={`text-xs font-bold ${c.active ? 'text-[#1A7A4A]' : 'text-gray-400'}`}>{c.name}</span>
                {c.active && <span className="text-[9px] bg-[#1A7A4A] text-white px-2 py-0.5 rounded-full font-bold">Actif</span>}
              </motion.div>
            ))}
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 pt-8 border-t border-gray-100">
            {STATS.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={i}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="flex flex-col"
                >
                  <div className="w-10 h-10 bg-[#e8f5ee] rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-[#1A7A4A]" />
                  </div>
                  <p className="font-display font-black text-[#0a0a0a] mb-1 leading-none" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
                    {stat.value}
                    {stat.unit && <span className="text-[0.45em] text-gray-400 ml-1 font-normal">{stat.unit}</span>}
                  </p>
                  <p className="text-gray-400 text-sm mt-1">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── PRODUCTS GRID ─────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
            <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <p className="text-[#1A7A4A] text-xs font-bold tracking-widest uppercase mb-3">Gamme complète</p>
              <h2 className="font-display font-black text-[#0a0a0a] tracking-tight leading-tight" style={{ fontSize: 'clamp(30px, 4.5vw, 52px)' }}>
                Investissez, financez<br />et partagez en toute<br />
                <span style={{ color: '#1A7A4A' }}>conscience</span>
              </h2>
            </motion.div>
            <motion.p custom={1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="text-gray-500 text-base max-w-sm lg:text-right"
            >
              4 produits islamiques pour chaque besoin — de l'investissement immobilier aux projets communautaires.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {PRODUCTS.map((p, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -5, transition: { duration: 0.25 } }}
              >
                <Link
                  to={p.path}
                  className="group relative block rounded-3xl overflow-hidden border border-gray-100 bg-white hover:border-gray-200 hover:shadow-xl hover:shadow-black/5 transition-all"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />
                    {/* Tag overlay */}
                    <div className="absolute top-4 left-4">
                      <span className="text-[10px] font-bold px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-gray-600">
                        {p.tag}
                      </span>
                    </div>
                    {/* Number */}
                    <div className="absolute top-4 right-4 font-display font-black text-white/30 text-4xl leading-none">
                      {p.num}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-7">
                    <h3 className="font-display font-black text-2xl text-[#0a0a0a] mb-2 group-hover:text-[#1A7A4A] transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-6">{p.desc}</p>
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="font-display font-black text-2xl" style={{ color: p.accent }}>{p.stat}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{p.statLabel}</p>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400 group-hover:text-[#1A7A4A] group-hover:gap-3 transition-all">
                        Explorer <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SPLIT — SME Financing ─────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden h-[480px]">
                <img
                  src={img('Hero visual — SME Financing.jpeg')}
                  alt="Financement PME islamique CEMAC"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#1A7A4A]/30 to-transparent" />
              </div>
              {/* Floating card on image */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-2xl border border-gray-100 p-5 w-52"
              >
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Halal Commerce</p>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full bg-[#1A7A4A]" />
                  <span className="text-xs font-semibold text-[#0a0a0a]">Zéro intérêt</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#C8972B]" />
                  <span className="text-xs font-semibold text-[#0a0a0a]">Profit partagé</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Text */}
            <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <p className="text-[#1A7A4A] text-xs font-bold tracking-widest uppercase mb-4">Financement des PME</p>
              <h2 className="font-display font-black text-[#0a0a0a] tracking-tight leading-tight mb-6" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
                Améliorez votre<br />expérience financière
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-8">
                QPB propose des solutions de financement islamique sur-mesure pour les entrepreneurs de la zone CEMAC.
                Mourabaha, Ijara, Moudharaba — des instruments éthiques adaptés à votre activité.
              </p>
              <div className="space-y-4 mb-10">
                {[
                  { label: 'Mourabaha', desc: 'Vente à prix majoré transparent, sans intérêt' },
                  { label: 'Ijara', desc: 'Leasing islamique — crédit-bail conforme Charia' },
                  { label: 'Moudharaba', desc: 'Partage de profits entre investisseur et entrepreneur' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <div className="w-8 h-8 rounded-xl bg-[#e8f5ee] flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-[#1A7A4A] font-bold text-xs">0{i + 1}</span>
                    </div>
                    <div>
                      <p className="font-bold text-[#0a0a0a] text-sm">{item.label}</p>
                      <p className="text-gray-500 text-xs mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                to="/finance-islamique/mourabaha"
                className="group inline-flex items-center gap-2 px-7 py-4 bg-[#1A7A4A] text-white font-bold rounded-full text-sm hover:bg-[#145d38] transition-all hover:shadow-lg hover:shadow-[#1A7A4A]/20"
              >
                Voir Mourabaha & Ijara
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── DARK STRIP — Blockchain + Islamic Finance ─────────────────── */}
      <section className="relative overflow-hidden bg-[#0a1a0f] py-24 px-4 sm:px-6 lg:px-8">
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <img
            src={img('Blockchain + Islamic Finance.jpeg')}
            alt=""
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1a0f] via-[#0a1a0f]/90 to-[#0a1a0f]/70" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="text-[#4ade80] text-xs font-bold tracking-widest uppercase mb-4">Technologie</p>
            <h2 className="font-display font-black text-white tracking-tight leading-tight mx-auto" style={{ fontSize: 'clamp(28px, 4.5vw, 54px)' }}>
              Libérez la puissance de la<br />finance islamique digitale
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { icon: Globe, label: 'Blockchain Polygon', desc: 'Sukuk tokenisés sur blockchain publique. Transactions transparentes et immuables.', color: '#4ade80' },
              { icon: Lock, label: 'Smart Contracts AAOIFI', desc: 'Chaque contrat islamique est audité et validé on-chain avant mise en production.', color: '#fbbf24' },
              { icon: ShieldCheck, label: 'Carte Digitale Halal', desc: 'Paiements certifiés halal. Aucune transaction spéculative ou haram.', color: '#60a5fa' },
            ].map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={i}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="p-7 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all group"
                >
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5" style={{ backgroundColor: `${f.color}20` }}>
                    <Icon className="w-6 h-6" style={{ color: f.color }} />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">{f.label}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{f.desc}</p>
                  <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-white/30 group-hover:text-white/60 transition-colors">
                    En savoir plus <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SIMPLIFIER — Features ring ────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
        {/* Decorative ornament star */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-[0.03] pointer-events-none">
          <img src={img('Islamic Star Ornament-Photoroom.png')} alt="" className="w-full h-full object-contain" />
        </div>

        {/* Floating mini icons around */}
        {[
          { top: '15%', left: '8%', bg: '#e8f5ee', icon: ShieldCheck, color: '#1A7A4A' },
          { top: '20%', right: '10%', bg: '#fef9ec', icon: Star, color: '#C8972B' },
          { bottom: '20%', left: '10%', bg: '#fef9ec', icon: TrendingUp, color: '#C8972B' },
          { bottom: '15%', right: '8%', bg: '#e8f5ee', icon: Lock, color: '#1A7A4A' },
        ].map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={i}
              animate={{ y: [0, i % 2 === 0 ? -8 : 8, 0] }}
              transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.7 }}
              className="absolute hidden lg:flex w-10 h-10 rounded-2xl items-center justify-center shadow-lg"
              style={{ ...item as any, backgroundColor: item.bg }}
            >
              <Icon className="w-5 h-5" style={{ color: item.color }} />
            </motion.div>
          );
        })}

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-[#C8972B] text-xs font-bold tracking-widest uppercase mb-4">Tout-en-un</p>
            <h2 className="font-display font-black text-[#0a0a0a] tracking-tight leading-tight" style={{ fontSize: 'clamp(28px, 4.5vw, 56px)' }}>
              Simplifier la finance islamique<br />en une seule plateforme
            </h2>
            <p className="text-gray-500 text-lg mt-4 max-w-xl mx-auto">
              QPB rassemble tous les instruments de la finance éthique dans une interface digitale intuitive.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={i}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="p-6 rounded-3xl border border-gray-100 bg-white hover:border-[#1A7A4A]/20 hover:shadow-lg transition-all group cursor-default"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#e8f5ee] flex items-center justify-center mb-5 group-hover:bg-[#1A7A4A] transition-colors">
                    <Icon className="w-6 h-6 text-[#1A7A4A] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-bold text-[#0a0a0a] mb-2">{f.label}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed">{f.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── LARGE SCROLLING TEXT ─────────────────────────────────────────── */}
      <div className="py-8 overflow-hidden border-y border-gray-100 bg-gray-50">
        <div className="flex gap-0 animate-marquee-slow whitespace-nowrap">
          {['Finance Islamique', '·', 'QPB CEMAC', '·', 'Zéro Ribā', '·', 'Halal', '·', 'AAOIFI', '·',
            'Finance Islamique', '·', 'QPB CEMAC', '·', 'Zéro Ribā', '·', 'Halal', '·', 'AAOIFI', '·'].map((t, i) => (
            <span
              key={i}
              className={`font-display font-black tracking-tight px-6 ${t === '·' ? 'text-[#1A7A4A]' : 'text-gray-200'}`}
              style={{ fontSize: 'clamp(40px, 6vw, 80px)' }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* ── ROADMAP ───────────────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-[#C8972B] text-xs font-bold tracking-widest uppercase mb-4">Feuille de route</p>
            <h2 className="font-display font-black text-[#0a0a0a] tracking-tight" style={{ fontSize: 'clamp(28px, 4.5vw, 52px)' }}>
              Intégration en 4 phases
            </h2>
          </motion.div>

          <div className="relative">
            <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-[#1A7A4A] via-[#C8972B] to-gray-200" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {PHASES.map((ph, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <div className="relative mt-0 lg:mt-14">
                    <div
                      className="hidden lg:block absolute -top-[26px] left-1/2 -translate-x-1/2 w-4 h-4 rounded-full z-10 shadow-sm"
                      style={{ backgroundColor: ph.color }}
                    />
                    <div className="bg-[#fafafa] rounded-3xl p-6 border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all">
                      <span
                        className="text-[10px] font-bold px-2.5 py-1 rounded-full inline-block mb-4 text-white"
                        style={{ backgroundColor: ph.color }}
                      >
                        {ph.status}
                      </span>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">{ph.period}</p>
                      <h3 className="font-display font-black text-[#0a0a0a] text-lg mb-2">{ph.title}</h3>
                      <p className="text-gray-500 text-xs leading-relaxed">{ph.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── REGULATORY SPLIT ─────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left */}
            <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <p className="text-[#1A7A4A] text-xs font-bold tracking-widest uppercase mb-4">Cadre réglementaire</p>
              <h2 className="font-display font-black text-[#0a0a0a] tracking-tight leading-tight mb-6" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
                Finance intelligente<br />par l'intelligence<br />
                <span className="text-[#1A7A4A]">en temps réel</span>
              </h2>
              <p className="text-gray-500 text-base leading-relaxed mb-8">
                Le règlement CEMAC 2025 sur les DEEP légalise la tokenisation de titres islamiques depuis janvier 2026.
                QPB est parfaitement positionné.
              </p>

              <div className="space-y-3">
                {[
                  { label: 'COSUMAF', desc: 'Visa obligatoire pour émissions islamiques', tag: 'Requis', color: '#C8972B' },
                  { label: 'Règlement DEEP 2025', desc: 'Tokenisation Sukuk légale depuis janvier 2026', tag: 'En vigueur', color: '#1A7A4A' },
                  { label: 'COBAC R-2005/01', desc: 'Contrôle interne Mourabaha/Ijara', tag: 'En vigueur', color: '#1A7A4A' },
                  { label: 'AAOIFI / IFSB', desc: 'Standards internationaux finance islamique', tag: 'Référence', color: '#6b7280' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    custom={i}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all"
                  >
                    <div>
                      <p className="font-bold text-[#0a0a0a] text-sm">{item.label}</p>
                      <p className="text-gray-500 text-xs mt-0.5">{item.desc}</p>
                    </div>
                    <span className="text-[10px] font-bold px-3 py-1 rounded-full shrink-0 ml-3 text-white" style={{ backgroundColor: item.color }}>
                      {item.tag}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right — Screening Charia + governance */}
            <motion.div custom={1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-5">
              {/* Screening image card */}
              <div className="relative rounded-3xl overflow-hidden h-52">
                <img
                  src={img('Screening Charia visualization.jpeg')}
                  alt="Screening Charia"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-5 left-5">
                  <p className="text-white/70 text-xs font-bold uppercase tracking-widest">Screening Automatique</p>
                  <p className="text-white font-bold text-lg mt-0.5">Filtrage Charia IA</p>
                </div>
              </div>

              {/* Governance card */}
              <div className="bg-[#0a1a0f] rounded-3xl p-7 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[#1A7A4A]/30 rounded-xl flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-[#4ade80]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Gouvernance Charia</h3>
                    <p className="text-white/40 text-xs">Sharia Supervisory Board</p>
                  </div>
                </div>
                <ul className="space-y-2.5 mb-6">
                  {[
                    '3 scholars — 1 francophone + 2 GCC/Malaisie',
                    'Auditeur Charia interne — révision annuelle',
                    'Partenariat formel AAOIFI ou IFSB',
                    'Rapport Charia public annuel',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-white/70">
                      <span className="text-[#4ade80] shrink-0 font-bold mt-0.5">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/finance-islamique/comite-charia"
                  className="group flex items-center justify-between w-full py-3 px-5 bg-[#1A7A4A]/20 hover:bg-[#1A7A4A]/30 border border-[#1A7A4A]/30 rounded-xl text-[#4ade80] font-bold text-sm transition-all"
                >
                  Voir le Comité Charia
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ─────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="relative overflow-hidden rounded-[2.5rem] bg-[#0a1a0f] px-8 py-20 md:px-16 text-center">
              {/* BG image */}
              <div className="absolute inset-0">
                <img
                  src={img('Hero visual — Community Impact.jpeg')}
                  alt=""
                  className="w-full h-full object-cover opacity-15"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1a0f] via-[#0a1a0f]/80 to-[#0a1a0f]/60" />
              </div>

              {/* Glow */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[200px] rounded-full opacity-30 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse, #1A7A4A 0%, transparent 70%)' }}
              />
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1A7A4A]/50 to-transparent" />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1A7A4A]/20 border border-[#1A7A4A]/30 rounded-full text-[#4ade80] text-xs font-bold mb-8">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Une gestion monétaire moderne pour l'entrepreneur musulman
                </div>
                <h2 className="font-display font-black text-white tracking-tight leading-[0.95] mb-6" style={{ fontSize: 'clamp(32px, 6vw, 68px)' }}>
                  Rejoignez la révolution<br />de la finance éthique
                </h2>
                <p className="text-white/50 text-lg max-w-xl mx-auto mb-12">
                  QPB — premier agrégateur de finance islamique numérique en zone CEMAC.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/inscription"
                    className="group px-10 py-4 bg-[#b4ff39] text-[#0a0a0a] font-black rounded-full hover:bg-white transition-colors inline-flex items-center gap-2 text-sm hover:shadow-xl"
                  >
                    Ouvrir un compte Halal
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    to="/finance-islamique/comite-charia"
                    className="px-10 py-4 border border-white/20 text-white font-bold rounded-full hover:bg-white/10 transition-colors text-sm"
                  >
                    En savoir plus
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
