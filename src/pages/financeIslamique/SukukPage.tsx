import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Lock, TrendingUp, Home, Building2, Leaf, ChevronRight } from 'lucide-react';

const img = (name: string) => encodeURI(`/${name}`);

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] } }),
};

const PROJECTS = [
  {
    name: 'Résidence Al-Amal',
    location: 'Douala · Akwa',
    type: 'Sukuk Ijara',
    yield: '8.0%',
    maturity: '5 ans',
    price: '10 000 FCFA',
    progress: 23,
    status: 'Pilote',
    statusColor: '#1A7A4A',
    image: img('Sukuk Ijara concept.jpeg'),
    icon: Home,
    validated: true,
  },
  {
    name: 'Entrepôt Al-Baraka',
    location: 'Yaoundé · Mvan',
    type: 'Sukuk Moucharaka',
    yield: '9.5%',
    maturity: '7 ans',
    price: '10 000 FCFA',
    progress: 7,
    status: 'Nouveau',
    statusColor: '#C8972B',
    image: img('Al-Baraka Warehouse.jpeg'),
    icon: Building2,
    validated: false,
  },
  {
    name: 'Plantation Kribi',
    location: 'Kribi · Sud',
    type: 'Sukuk Moucharaka',
    yield: '11.0%',
    maturity: '10 ans',
    price: '10 000 FCFA',
    progress: 1,
    status: 'Pré-lancement',
    statusColor: '#1A7A4A',
    image: img('Plantation Kribi.jpeg'),
    icon: Leaf,
    validated: false,
  },
];

const COMPARISON = [
  { critere: 'Rémunération', conv: 'Intérêt fixe (coupon)', islam: "Part des loyers / bénéfices de l'actif" },
  { critere: 'Propriété', conv: "Créance sur l'émetteur", islam: "Quote-part de propriété dans l'actif" },
  { critere: 'Garantie', conv: "Bonne foi de l'émetteur", islam: 'Actif sous-jacent réel et identifié' },
  { critere: 'Risque', conv: 'Risque de défaut émetteur', islam: 'Risque partagé proportionnel à la part' },
  { critere: 'Charia', conv: 'Non — Riba interdit', islam: 'Oui — validé Comité Charia ✓' },
];

const STEPS = [
  { num: '01', title: "Sélection de l'actif", desc: 'QPB identifie un actif réel (immeuble, entrepôt, plantation) certifié Charia.', color: '#1A7A4A' },
  { num: '02', title: 'Tokenisation Sukuk', desc: 'Le bien est tokenisé en parts égales (ERC-20 Polygon). Token = quote-part de propriété.', color: '#C8972B' },
  { num: '03', title: 'Validation Charia', desc: 'Le Comité Charia valide le smart contract, le prospectus et la structure juridique.', color: '#1A7A4A' },
  { num: '04', title: 'Visa COSUMAF', desc: 'QPB soumet le dossier à la COSUMAF. Section Charia intégrée au prospectus.', color: '#C8972B' },
  { num: '05', title: 'Distribution auto', desc: 'Loyers/bénéfices distribués automatiquement via smart contract, sans intérêt.', color: '#1A7A4A' },
];

export default function SukukPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-[#0a0a0a] overflow-x-hidden">

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center px-4 sm:px-6 lg:px-8 pt-10 pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full" style={{ background: 'radial-gradient(circle, #dcf0e4 0%, transparent 65%)' }} />
          <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full" style={{ background: 'radial-gradient(circle, #fef9ec 0%, transparent 70%)' }} />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url(${img('Islamic Pattern Background.jpeg')})`, backgroundSize: '200px' }} />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            {/* Left */}
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
              <Link to="/finance-islamique" className="inline-flex items-center gap-2 text-gray-400 text-xs font-semibold mb-10 hover:text-gray-700 transition-colors tracking-widest uppercase">
                ← Finance Islamique
              </Link>

              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#e8f5ee] border border-[#1A7A4A]/20 rounded-full text-[#1A7A4A] text-xs font-bold mb-8">
                <ShieldCheck className="w-3.5 h-3.5" />
                Conforme Charia AAOIFI · Blockchain Polygon
              </div>

              <h1 className="font-display font-black tracking-tight leading-[0.9] mb-8" style={{ fontSize: 'clamp(52px, 8vw, 96px)' }}>
                Sukuk<br />
                <span style={{ background: 'linear-gradient(135deg, #1A7A4A, #2da55e)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Tokenisés
                </span>
              </h1>

              <p className="text-gray-500 text-lg leading-relaxed mb-10 max-w-md">
                L'équivalent islamique de l'obligation. Vous percevez les loyers d'un actif réel.
                Chaque token = une part de propriété certifiée Charia sur Blockchain Polygon.
              </p>

              <div className="flex flex-wrap gap-2 mb-10">
                {['Zéro Riba', 'Actif sous-jacent réel', 'Smart contract AAOIFI', 'Revenus automatiques', 'Polygon Mainnet'].map((tag, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-full bg-[#e8f5ee] border border-[#1A7A4A]/15 text-[11px] font-bold text-[#1A7A4A]">{tag}</span>
                ))}
              </div>

              <Link to="/inscription" className="group inline-flex items-center gap-2 px-8 py-4 bg-[#1A7A4A] text-white font-bold rounded-full text-sm hover:bg-[#145d38] transition-all hover:shadow-xl hover:shadow-[#1A7A4A]/25">
                Souscrire à un Sukuk
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Right — image + floating cards */}
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="relative h-[520px]">
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} className="absolute top-0 left-0 right-8 h-[380px] rounded-3xl overflow-hidden shadow-2xl shadow-black/10">
                <img src={img('Hero visual — Tokenized Real Estate.jpeg')} alt="Sukuk tokenisé" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest mb-1">Sukuk Pilote QPB</p>
                  <p className="text-white font-display font-bold text-xl">500 000 000 FCFA</p>
                </div>
              </motion.div>

              <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }} className="absolute bottom-28 -left-4 bg-white rounded-2xl shadow-xl border border-gray-100 p-5 w-48">
                <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Rendement Sukuk</p>
                <p className="font-display font-black text-[#1A7A4A] text-2xl">8–11%<span className="text-sm text-gray-400 font-normal"> / an</span></p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-3 h-3 text-[#1A7A4A]" />
                  <span className="text-[10px] text-[#1A7A4A] font-bold">Loyers halal</span>
                </div>
              </motion.div>

              <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }} className="absolute bottom-6 right-4 flex items-center gap-2 bg-white rounded-2xl shadow-xl border border-gray-100 px-4 py-3">
                <ShieldCheck className="w-4 h-4 text-[#1A7A4A]" />
                <div>
                  <p className="text-[9px] text-gray-400 font-bold uppercase">Certifié</p>
                  <p className="text-xs font-bold text-[#1A7A4A]">Charia AAOIFI</p>
                </div>
              </motion.div>

              <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }} className="absolute top-4 -right-2 bg-[#C8972B] text-white rounded-2xl shadow-xl px-4 py-3">
                <p className="text-[10px] font-bold text-white/60 mb-0.5">50 000 tokens</p>
                <p className="font-display font-black text-lg">10 000 <span className="text-sm font-normal text-white/60">FCFA</span></p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ──────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto">
          <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-14">
            <p className="text-[#C8972B] text-xs font-bold tracking-widest uppercase mb-3">Projets pilotes</p>
            <h2 className="font-display font-black text-[#0a0a0a] tracking-tight" style={{ fontSize: 'clamp(28px, 4.5vw, 52px)' }}>
              Sukuk disponibles
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PROJECTS.map((project, i) => {
              const Icon = project.icon;
              return (
                <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} whileHover={{ y: -5, transition: { duration: 0.2 } }}>
                  <div className="group rounded-3xl overflow-hidden bg-white border border-gray-100 hover:border-gray-200 hover:shadow-xl hover:shadow-black/5 transition-all">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img src={project.image} alt={project.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
                      <div className="absolute top-4 left-4">
                        <span className="text-[10px] font-bold px-2.5 py-1 rounded-full text-white" style={{ backgroundColor: project.statusColor }}>{project.status}</span>
                      </div>
                      {project.validated && (
                        <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/90 rounded-full px-2.5 py-1">
                          <ShieldCheck className="w-3 h-3 text-[#1A7A4A]" />
                          <span className="text-[9px] font-bold text-[#1A7A4A]">Halal</span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-start gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-[#e8f5ee] flex items-center justify-center shrink-0">
                          <Icon className="w-5 h-5 text-[#1A7A4A]" />
                        </div>
                        <div>
                          <h3 className="font-display font-black text-[#0a0a0a] text-lg leading-tight">{project.name}</h3>
                          <p className="text-gray-400 text-xs font-medium mt-0.5">{project.location} · {project.type}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2 mb-4">
                        {[
                          { label: 'Rendement', value: project.yield, highlight: true },
                          { label: 'Maturité', value: project.maturity, highlight: false },
                          { label: '/ Sukuk', value: project.price, highlight: false },
                        ].map((info, j) => (
                          <div key={j} className="bg-gray-50 rounded-xl p-2.5">
                            <p className="text-[9px] text-gray-400 font-bold uppercase mb-0.5">{info.label}</p>
                            <p className={`text-xs font-bold ${info.highlight ? 'text-[#1A7A4A]' : 'text-[#0a0a0a]'}`}>{info.value}</p>
                          </div>
                        ))}
                      </div>

                      <div className="mb-5">
                        <div className="flex justify-between text-xs font-bold text-gray-400 mb-1.5">
                          <span>Financé à {project.progress}%</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                          <div className="h-full rounded-full bg-[#1A7A4A]" style={{ width: `${project.progress}%` }} />
                        </div>
                      </div>

                      <Link to="/inscription" className="group/btn flex items-center justify-center gap-2 w-full py-3 rounded-2xl font-bold text-white text-sm bg-[#1A7A4A] hover:bg-[#145d38] transition-colors">
                        <TrendingUp className="w-4 h-4" /> Souscrire
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── PROCESS ───────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <p className="text-[#1A7A4A] text-xs font-bold tracking-widest uppercase mb-3">Processus</p>
            <h2 className="font-display font-black text-[#0a0a0a] tracking-tight" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
              Comment fonctionne un Sukuk QPB ?
            </h2>
          </motion.div>

          <div className="relative">
            <div className="hidden lg:block absolute top-6 left-[3rem] right-[3rem] h-px bg-gradient-to-r from-[#1A7A4A] via-[#C8972B] to-[#1A7A4A]" />
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {STEPS.map((step, i) => (
                <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white text-xs font-black mb-5 relative z-10" style={{ backgroundColor: step.color }}>
                    {step.num}
                  </div>
                  <h3 className="font-bold text-[#0a0a0a] text-sm mb-2">{step.title}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── COMPARISON ────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto">
          <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-12">
            <p className="text-[#C8972B] text-xs font-bold tracking-widest uppercase mb-3">Comparatif</p>
            <h2 className="font-display font-black text-[#0a0a0a] tracking-tight" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
              Sukuk vs Obligation conventionnelle
            </h2>
          </motion.div>

          <div className="rounded-3xl overflow-hidden border border-gray-100 bg-white shadow-sm">
            <div className="grid grid-cols-3 p-5 border-b border-gray-100 bg-gray-50">
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Critère</p>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest text-center">Obligation classique</p>
              <p className="text-[#1A7A4A] text-xs font-bold uppercase tracking-widest text-center">Sukuk Islamique ✓</p>
            </div>
            {COMPARISON.map((row, i) => (
              <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-3 p-5 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                <p className="font-bold text-[#0a0a0a] text-sm">{row.critere}</p>
                <p className="text-gray-400 text-sm text-center">{row.conv}</p>
                <p className={`text-sm font-bold text-center ${row.islam.startsWith('Oui') ? 'text-[#1A7A4A]' : 'text-[#0a0a0a]'}`}>{row.islam}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BLOCKCHAIN DARK STRIP ─────────────────────────────────── */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#0a1a0f] overflow-hidden">
        <div className="absolute inset-0">
          <img src={img('Blockchain + Islamic Finance.jpeg')} alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1a0f] via-[#0a1a0f]/90 to-[#0a1a0f]/60" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <p className="text-[#4ade80] text-xs font-bold tracking-widest uppercase mb-4">Technologie</p>
              <h2 className="font-display font-black text-white leading-tight mb-6" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
                Blockchain + Charia<br /><span className="text-[#4ade80]">la synergie parfaite</span>
              </h2>
              <p className="text-white/50 text-base leading-relaxed mb-8">
                La blockchain Polygon garantit la transparence et l'exécution automatique des distributions — au cœur des valeurs de la finance islamique. Chaque ligne du smart contract est validée par le Comité Charia.
              </p>
              <ul className="space-y-4">
                {[
                  { icon: ShieldCheck, text: 'Aucun intérêt caché dans le smart contract' },
                  { icon: Lock, text: 'Actif sous-jacent enregistré on-chain via IPFS' },
                  { icon: TrendingUp, text: 'Distribution automatique des loyers/bénéfices' },
                  { icon: ShieldCheck, text: 'Avis Charia stocké sur IPFS — auditabilité totale' },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <li key={i} className="flex items-center gap-3 text-sm text-white/60">
                      <Icon className="w-4 h-4 shrink-0 text-[#4ade80]" /> {item.text}
                    </li>
                  );
                })}
              </ul>
            </motion.div>

            <motion.div custom={1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-4">
              <div className="rounded-2xl p-5 border border-white/10 bg-white/5 backdrop-blur-sm">
                <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-2">Smart Contract Sukuk ERC-20</p>
                <code className="text-sm font-mono text-[#4ade80]">0x1A7A4A...SukukQPB</code>
                <p className="text-white/25 text-xs mt-2">Polygon Mainnet · Validé Comité Charia · AAOIFI Compliant</p>
              </div>
              <div className="rounded-2xl p-5 border border-white/10 bg-white/5 backdrop-blur-sm">
                <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-3">Dernière distribution Halal</p>
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Résidence Al-Amal — Loyers mai 2026</span>
                  <span className="font-bold text-[#4ade80]">+380 FCFA / Sukuk</span>
                </div>
                <p className="text-white/25 text-[10px] mt-1">01/05/2026 · Distribué automatiquement · Conforme Charia</p>
              </div>
              <div className="flex items-start gap-3 text-xs text-white/30 rounded-2xl p-4 border border-white/10 bg-white/5">
                <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5 text-[#C8972B]" />
                Visa COSUMAF en cours d'obtention. Chaque Sukuk fait l'objet d'une convention notariée et d'un avis formel du Comité Charia.
              </div>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
}
