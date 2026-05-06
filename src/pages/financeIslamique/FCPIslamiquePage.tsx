import { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Layers, TrendingUp, XCircle, CheckCircle2, BarChart3, Lock, ArrowRight } from 'lucide-react';

const img = (name: string) => encodeURI(`/${name}`);

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] } }),
};

const FONDS = [
  {
    nom: 'QPB Moudharaba Actions CEMAC',
    code: 'QPBMAC',
    type: 'Actions Halal',
    desc: 'Fonds investissant dans les actions Charia-compatibles cotées à la BVMAC et DSX. Exclusion systématique des secteurs haram.',
    vl: '12 450 FCFA',
    vlVar: '+0.82%',
    perfYTD: '+11.3%',
    perf1an: '+18.7%',
    actifNet: '2 340 000 000 FCFA',
    frais: '1.5% / an',
    minSouscription: 25000,
    minLabel: '25 000 FCFA',
    distribution: 'Annuelle',
    risque: 3,
    statut: 'Ouvert',
    exclusions: ['Banques à intérêt', 'Alcool & tabac', 'Armement', 'Jeux de hasard'],
    accent: '#1A7A4A',
  },
  {
    nom: 'QPB Moudharaba Obligations Halal',
    code: 'QPBMOH',
    type: 'Sukuk',
    desc: 'Fonds investissant exclusivement dans des Sukuk et instruments de dette Charia-conformes de la zone CEMAC.',
    vl: '10 230 FCFA',
    vlVar: '+0.21%',
    perfYTD: '+6.8%',
    perf1an: '+9.2%',
    actifNet: '890 000 000 FCFA',
    frais: '1.0% / an',
    minSouscription: 10000,
    minLabel: '10 000 FCFA',
    distribution: 'Semestrielle',
    risque: 2,
    statut: 'Ouvert',
    exclusions: ['Obligations à intérêt fixe', 'Émetteurs haram', 'Dérivés spéculatifs'],
    accent: '#C8972B',
  },
  {
    nom: 'QPB Moudharaba Diversifié CEMAC',
    code: 'QPBMDC',
    type: 'Multi-actifs',
    desc: 'Fonds diversifié alliant Sukuk (60%), actions Halal (30%) et liquidités (10%). Profil équilibré, idéal pour débuter.',
    vl: '11 180 FCFA',
    vlVar: '+0.54%',
    perfYTD: '+9.1%',
    perf1an: '+14.4%',
    actifNet: '1 560 000 000 FCFA',
    frais: '1.2% / an',
    minSouscription: 10000,
    minLabel: '10 000 FCFA',
    distribution: 'Trimestrielle',
    risque: 2,
    statut: 'Ouvert',
    exclusions: ['Banques conventionnelles', 'Produits dérivés', 'Alcool & pornographie'],
    accent: '#1A7A4A',
  },
];

const EXCLUS = [
  { nom: 'Alcool & Tabac', raison: 'Produits nocifs interdits par la Charia' },
  { nom: 'Armement', raison: 'Industrie de destruction interdite' },
  { nom: 'Jeux de hasard', raison: 'Spéculation (Gharar) interdite' },
  { nom: 'Pornographie', raison: 'Atteinte à la dignité humaine' },
  { nom: 'Banques à intérêt', raison: 'Riba (intérêt) interdit' },
  { nom: 'Porc & dérivés', raison: 'Produit haram selon la Charia' },
];

const AUTORISES = [
  'Immobilier & construction', 'Agriculture & agroalimentaire halal',
  'Santé & pharmacie', 'Technologie & digital',
  'Transport & logistique', 'Éducation & formation',
  'Énergie renouvelable', 'Télécom',
];

function RisqueBar({ niveau, accent }: { niveau: number; accent: string }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="h-1.5 w-5 rounded-sm" style={{ backgroundColor: i <= niveau ? accent : '#e5e7eb' }} />
      ))}
      <span className="text-[10px] font-bold ml-1 text-gray-400">{niveau}/5</span>
    </div>
  );
}

function SouscriptionModal({ fonds, onClose }: { fonds: typeof FONDS[0]; onClose: () => void }) {
  const [montant, setMontant] = useState(fonds.minSouscription);
  const [done, setDone] = useState(false);
  const vlNum = parseInt(fonds.vl.replace(/\s/g, '').replace('FCFA', ''));
  const parts = Math.floor(montant / vlNum);

  if (done) {
    return (
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-3xl p-10 max-w-md w-full text-center border border-gray-100 shadow-2xl">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 bg-[#e8f5ee]">
            <CheckCircle2 className="w-8 h-8 text-[#1A7A4A]" />
          </div>
          <h3 className="font-display font-black text-[#0a0a0a] text-2xl mb-2">Souscription enregistrée !</h3>
          <p className="text-gray-500 mb-1 text-sm">{fonds.nom}</p>
          <p className="font-black text-2xl mb-8" style={{ color: fonds.accent }}>{montant.toLocaleString()} FCFA — {parts} parts</p>
          <button onClick={onClose} className="px-8 py-3 rounded-full font-bold text-white text-sm bg-[#1A7A4A] hover:bg-[#145d38] transition-colors">Fermer</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-3xl p-8 max-w-md w-full border border-gray-100 shadow-2xl">
        <div className="flex justify-between items-start mb-6">
          <div>
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full block w-fit mb-2 text-white" style={{ backgroundColor: fonds.accent }}>{fonds.code}</span>
            <h3 className="font-display font-black text-[#0a0a0a] text-lg leading-tight">{fonds.nom}</h3>
          </div>
          <button onClick={onClose} className="text-gray-300 hover:text-gray-600 text-2xl font-light leading-none transition-colors">×</button>
        </div>

        <div className="grid grid-cols-2 gap-3 bg-gray-50 rounded-2xl p-4 mb-5">
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">VL actuelle</p>
            <p className="font-bold text-[#0a0a0a] text-sm">{fonds.vl}</p>
            <p className="text-xs font-bold text-[#1A7A4A]">{fonds.vlVar}</p>
          </div>
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Perf. 1 an</p>
            <p className="font-black text-2xl" style={{ color: fonds.accent }}>{fonds.perf1an}</p>
          </div>
        </div>

        <div className="mb-5">
          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Montant de souscription (FCFA)</label>
          <input type="number" value={montant} onChange={(e) => setMontant(Number(e.target.value))} min={fonds.minSouscription} step={5000}
            className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-base font-bold focus:outline-none focus:border-[#1A7A4A] transition-colors" />
          <p className="text-xs font-bold mt-1" style={{ color: fonds.accent }}>≈ {parts > 0 ? parts : 0} part(s) — Min : {fonds.minLabel}</p>
        </div>

        <div className="flex items-center gap-2 rounded-2xl p-3 mb-5 bg-[#e8f5ee] border border-[#1A7A4A]/20">
          <ShieldCheck className="w-4 h-4 text-[#1A7A4A]" />
          <p className="text-xs font-bold text-[#1A7A4A]">Validé Comité Charia QPB — Avis disponible</p>
        </div>

        <button onClick={() => setDone(true)} className="w-full py-4 rounded-full font-bold text-white text-sm transition-all flex items-center justify-center gap-2 hover:opacity-90" style={{ backgroundColor: fonds.accent }}>
          <Layers className="w-5 h-5" /> Souscrire {montant.toLocaleString()} FCFA
        </button>
      </motion.div>
    </div>
  );
}

export default function FCPIslamiquePage() {
  const [selected, setSelected] = useState<typeof FONDS[0] | null>(null);

  return (
    <div className="flex flex-col min-h-screen bg-white text-[#0a0a0a] overflow-x-hidden">
      {selected && <SouscriptionModal fonds={selected} onClose={() => setSelected(null)} />}

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center px-4 sm:px-6 lg:px-8 pt-10 pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full" style={{ background: 'radial-gradient(circle, #dcf0e4 0%, transparent 65%)' }} />
          <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full" style={{ background: 'radial-gradient(circle, #fef9ec 0%, transparent 70%)' }} />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url(${img('Islamic Pattern Background.jpeg')})`, backgroundSize: '200px' }} />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
              <Link to="/finance-islamique" className="inline-flex items-center gap-2 text-gray-400 text-xs font-semibold mb-10 hover:text-gray-700 transition-colors tracking-widest uppercase">
                ← Finance Islamique
              </Link>

              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#e8f5ee] border border-[#1A7A4A]/20 rounded-full text-[#1A7A4A] text-xs font-bold mb-8">
                <ShieldCheck className="w-3.5 h-3.5" />
                Moudharaba · Screening Charia Automatique
              </div>

              <h1 className="font-display font-black tracking-tight leading-[0.9] mb-8" style={{ fontSize: 'clamp(48px, 8vw, 96px)' }}>
                FCP<br />
                <span style={{ background: 'linear-gradient(135deg, #1A7A4A, #C8972B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Islamique
                </span>
              </h1>

              <p className="text-gray-500 text-lg leading-relaxed mb-10 max-w-md">
                Fonds Communs de Placement structurés Moudharaba. Screening Charia automatique,
                gestion professionnelle BVMAC, sans aucune spéculation ni riba.
              </p>

              <div className="flex flex-wrap gap-2 mb-10">
                {['Moudharaba', 'BVMAC', 'Gestion pro', 'Screening auto', 'Zéro Gharar'].map((tag, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-full bg-[#e8f5ee] border border-[#1A7A4A]/15 text-[11px] font-bold text-[#1A7A4A]">{tag}</span>
                ))}
              </div>

              {/* Mini perf preview */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'QPBMAC Perf. 1 an', value: '+18.7%', color: '#1A7A4A' },
                  { label: 'Actif net total', value: '4.8 Mds', color: '#C8972B' },
                  { label: 'Souscription min.', value: '10 000 FCFA', color: '#0a0a0a' },
                ].map((s, i) => (
                  <div key={i} className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                    <p className="font-display font-black text-xl" style={{ color: s.color }}>{s.value}</p>
                    <p className="text-gray-400 text-[10px] font-bold uppercase mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right — hero image + floating cards */}
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="relative h-[520px]">
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} className="absolute top-0 left-0 right-8 h-[390px] rounded-3xl overflow-hidden shadow-2xl shadow-black/10">
                <img src={img('Hero visual — Investment Dashboard.jpeg')} alt="Tableau de bord investissement islamique" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest mb-1">FCP Islamique</p>
                  <p className="text-white font-display font-bold text-xl">Géré par des pros</p>
                </div>
              </motion.div>

              <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }} className="absolute bottom-28 -left-4 bg-white rounded-2xl shadow-xl border border-gray-100 p-5 w-48">
                <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">QPBMAC</p>
                <p className="font-display font-black text-[#1A7A4A] text-2xl">+18.7%</p>
                <p className="text-xs text-gray-400">performance 1 an</p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-3 h-3 text-[#1A7A4A]" />
                  <span className="text-[10px] text-[#1A7A4A] font-bold">Halal certifié</span>
                </div>
              </motion.div>

              <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }} className="absolute bottom-6 right-4 flex items-center gap-2 bg-white rounded-2xl shadow-xl border border-gray-100 px-4 py-3">
                <ShieldCheck className="w-4 h-4 text-[#1A7A4A]" />
                <div>
                  <p className="text-[9px] text-gray-400 font-bold uppercase">Screening</p>
                  <p className="text-xs font-bold text-[#1A7A4A]">Charia Auto</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FONDS ─────────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto">
          <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-14">
            <p className="text-[#C8972B] text-xs font-bold tracking-widest uppercase mb-3">Gamme</p>
            <h2 className="font-display font-black text-[#0a0a0a] tracking-tight" style={{ fontSize: 'clamp(28px, 4.5vw, 52px)' }}>
              3 fonds islamiques disponibles
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {FONDS.map((fonds, i) => (
              <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} whileHover={{ y: -5, transition: { duration: 0.2 } }}>
                <div className="group bg-white rounded-3xl border border-gray-100 overflow-hidden hover:border-gray-200 hover:shadow-xl hover:shadow-black/5 transition-all h-full flex flex-col">
                  {/* Top accent */}
                  <div className="h-1 w-full" style={{ backgroundColor: fonds.accent }} />

                  <div className="p-7 flex flex-col flex-1">
                    <div className="flex items-start justify-between mb-5">
                      <div>
                        <span className="text-[10px] font-bold px-2.5 py-1 rounded-full text-white" style={{ backgroundColor: fonds.accent }}>{fonds.code}</span>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">{fonds.type}</p>
                      </div>
                      <div className="flex items-center gap-1.5 text-[9px] font-bold px-2 py-1 rounded-full bg-[#e8f5ee] text-[#1A7A4A]">
                        <ShieldCheck className="w-2.5 h-2.5" /> Halal
                      </div>
                    </div>

                    <h3 className="font-display font-black text-[#0a0a0a] text-lg mb-3 leading-tight">{fonds.nom}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-5">{fonds.desc}</p>

                    {/* Performance */}
                    <div className="grid grid-cols-2 gap-3 mb-5">
                      <div className="bg-gray-50 rounded-2xl p-3">
                        <p className="text-[9px] text-gray-400 font-bold uppercase mb-1">Perf. 1 an</p>
                        <p className="font-black text-xl" style={{ color: fonds.accent }}>{fonds.perf1an}</p>
                      </div>
                      <div className="bg-gray-50 rounded-2xl p-3">
                        <p className="text-[9px] text-gray-400 font-bold uppercase mb-1">YTD</p>
                        <p className="font-black text-xl text-[#0a0a0a]">{fonds.perfYTD}</p>
                      </div>
                    </div>

                    <div className="space-y-2 mb-5 text-xs">
                      {[
                        { l: 'VL', v: fonds.vl, sub: fonds.vlVar },
                        { l: 'Actif net', v: fonds.actifNet, sub: null },
                        { l: 'Frais gestion', v: fonds.frais, sub: null },
                        { l: 'Minimum', v: fonds.minLabel, sub: null },
                        { l: 'Distribution', v: fonds.distribution, sub: null },
                      ].map((row, j) => (
                        <div key={j} className="flex justify-between text-xs border-b border-gray-50 pb-2">
                          <span className="text-gray-400 font-medium">{row.l}</span>
                          <span className="font-bold text-[#0a0a0a]">
                            {row.v}
                            {row.sub && <span className="text-[#1A7A4A] ml-1">{row.sub}</span>}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mb-5">
                      <p className="text-[9px] text-gray-400 font-bold uppercase mb-2">Risque</p>
                      <RisqueBar niveau={fonds.risque} accent={fonds.accent} />
                    </div>

                    <button onClick={() => setSelected(fonds)}
                      className="mt-auto w-full py-3 rounded-full font-bold text-white text-sm transition-all hover:opacity-90 flex items-center justify-center gap-2"
                      style={{ backgroundColor: fonds.accent }}>
                      <Layers className="w-4 h-4" /> Souscrire
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SPLIT — Performance + BVMAC ───────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            {/* Image */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }} className="relative">
              <div className="rounded-3xl overflow-hidden h-[420px] shadow-xl shadow-black/5">
                <img src={img('Fund Performance visualization.jpeg')} alt="Performance FCP Islamique" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#1A7A4A]/20 to-transparent" />
              </div>
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-5 -right-5 bg-white rounded-2xl shadow-xl border border-gray-100 p-5 w-52">
                <p className="text-[10px] font-bold text-gray-400 uppercase mb-2">BVMAC Yaoundé</p>
                <p className="font-bold text-[#0a0a0a] text-sm">Investissements<br />Charia-compatibles</p>
                <div className="flex items-center gap-1 mt-2">
                  <BarChart3 className="w-3 h-3 text-[#1A7A4A]" />
                  <span className="text-[10px] text-[#1A7A4A] font-bold">Screening automatique</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Text */}
            <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <p className="text-[#1A7A4A] text-xs font-bold tracking-widest uppercase mb-4">Performance & Transparence</p>
              <h2 className="font-display font-black text-[#0a0a0a] tracking-tight leading-tight mb-6" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
                Finance intelligente<br />en temps réel
              </h2>
              <p className="text-gray-500 text-base leading-relaxed mb-8">
                Chaque titre en portefeuille est filtré automatiquement par notre moteur de screening Charia.
                Les ratios financiers (dette/capitalisation &lt; 33%, revenus haram &lt; 5%) sont contrôlés en continu.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Ratio dette/capitalisation < 33%',
                  'Revenus haram < 5% du CA total',
                  'Trésorerie non investie en produits à intérêt',
                  'Revue semestrielle du Comité Charia',
                  'Purification des dividendes haram',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                    <span className="text-[#1A7A4A] font-bold shrink-0 mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/finance-islamique/comite-charia" className="group inline-flex items-center gap-2 px-7 py-4 bg-[#1A7A4A] text-white font-bold rounded-full text-sm hover:bg-[#145d38] transition-all">
                Voir le Comité Charia
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SCREENING DARK ────────────────────────────────────────── */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#0a1a0f] overflow-hidden">
        <div className="absolute inset-0">
          <img src={img('BVMAC Stock Exchange Yaoundé.jpeg')} alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1a0f] via-[#0a1a0f]/90 to-[#0a1a0f]/70" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-14">
            <p className="text-[#4ade80] text-xs font-bold tracking-widest uppercase mb-4">Screening Charia</p>
            <h2 className="font-display font-black text-white tracking-tight" style={{ fontSize: 'clamp(28px, 4.5vw, 52px)' }}>
              Haram vs Halal — Le filtre islamique
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Exclus */}
            <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="rounded-3xl p-7 border border-white/10 bg-white/5 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-6">
                <XCircle className="w-6 h-6 text-red-400" />
                <h3 className="font-bold text-white text-xl">Secteurs exclus (Haram)</h3>
              </div>
              <div className="space-y-3">
                {EXCLUS.map((e, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-2xl bg-white/5 border border-white/10">
                    <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-white text-sm">{e.nom}</p>
                      <p className="text-white/40 text-xs">{e.raison}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Autorisés */}
            <motion.div custom={1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="rounded-3xl p-7 border border-[#1A7A4A]/30 bg-[#1A7A4A]/10 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle2 className="w-6 h-6 text-[#4ade80]" />
                <h3 className="font-bold text-white text-xl">Secteurs autorisés (Halal)</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {AUTORISES.map((s, i) => (
                  <div key={i} className="flex items-center gap-2 p-3 rounded-2xl bg-[#1A7A4A]/20 border border-[#1A7A4A]/30">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#4ade80] shrink-0" />
                    <p className="text-white/80 text-xs font-medium">{s}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex items-center gap-3 text-xs text-white/30 rounded-2xl p-4 border border-white/10 bg-white/5">
                <Lock className="w-4 h-4 shrink-0 text-[#C8972B]" />
                Screening automatique mis à jour à chaque rebalancement. Comité Charia notifié immédiatement en cas d'anomalie.
              </div>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
}
