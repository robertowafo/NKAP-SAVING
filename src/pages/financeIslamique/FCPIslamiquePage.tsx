import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { Layers, TrendingUp, XCircle, CheckCircle2, BarChart3, Lock, ArrowRight, ChevronDown, Users, Coins, ShieldCheck } from 'lucide-react';

const img = (name: string) => encodeURI(`/images/${name}`);

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  }),
};

const FONDS = [
  {
    nom: 'QPB Moudharaba Actions CEMAC', code: 'QPBMAC', type: 'Actions Halal',
    desc: 'Fonds investissant dans les actions Charia-compatibles cotées à la BVMAC et DSX.',
    vl: '12 450 FCFA', vlVar: '+0.82%', perfYTD: '+11.3%', perf1an: '+18.7%',
    actifNet: '2.34 Mds FCFA', frais: '1.5% / an', minLabel: '25 000 FCFA',
    minSouscription: 25000, distribution: 'Annuelle', risque: 3,
    exclusions: ['Banques à intérêt', 'Alcool & tabac', 'Armement', 'Jeux de hasard'],
    gradient: 'from-[#1A7A4A] to-[#0a2a15]',
  },
  {
    nom: 'QPB Moudharaba Obligations Halal', code: 'QPBMOH', type: 'Sukuk',
    desc: 'Fonds exclusivement dans des Sukuk et instruments de dette Charia-conformes CEMAC.',
    vl: '10 230 FCFA', vlVar: '+0.21%', perfYTD: '+6.8%', perf1an: '+9.2%',
    actifNet: '890M FCFA', frais: '1.0% / an', minLabel: '10 000 FCFA',
    minSouscription: 10000, distribution: 'Semestrielle', risque: 2,
    exclusions: ['Obligations à intérêt fixe', 'Émetteurs haram', 'Dérivés spéculatifs'],
    gradient: 'from-[#1a1a2e] to-[#0a0a0a]',
  },
  {
    nom: 'QPB Moudharaba Diversifié CEMAC', code: 'QPBMDC', type: 'Multi-actifs',
    desc: 'Fonds diversifié : Sukuk (60%), actions Halal (30%), liquidités (10%). Profil équilibré.',
    vl: '11 180 FCFA', vlVar: '+0.54%', perfYTD: '+9.1%', perf1an: '+14.4%',
    actifNet: '1.56 Mds FCFA', frais: '1.2% / an', minLabel: '10 000 FCFA',
    minSouscription: 10000, distribution: 'Trimestrielle', risque: 2,
    exclusions: ['Banques conventionnelles', 'Produits dérivés', 'Alcool & pornographie'],
    gradient: 'from-[#2a0a4a] to-[#0d060a]',
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
  'Immobilier & construction', 'Agriculture & agroalimentaire',
  'Santé & pharmacie', 'Technologie & digital',
  'Transport & logistique', 'Éducation & formation',
  'Énergie renouvelable', 'Télécom',
];

const ETAPES = [
  { num: '01', icon: Users, titre: 'Ouvrez votre compte', desc: 'Inscription rapide, KYC simplifié, portefeuille NKAP activé en quelques minutes.' },
  { num: '02', icon: BarChart3, titre: 'Choisissez un FCP', desc: 'Comparez nos 3 fonds islamiques selon votre profil : actions, Sukuk, ou multi-actifs.' },
  { num: '03', icon: Coins, titre: 'Souscrivez en FCFA', desc: 'À partir de 10 000 FCFA. Votre commande est exécutée à la prochaine Valeur Liquidative.' },
  { num: '04', icon: TrendingUp, titre: 'Suivez vos parts', desc: 'Tableau de bord temps réel. Revenus distribués automatiquement selon votre fonds.' },
];

const FAQS = [
  { q: "C'est quoi un FCP islamique pour un débutant ?", r: "Un FCP (Fonds Commun de Placement) islamique, c'est comme mettre votre argent dans une cagnotte gérée par des experts. Ces experts investissent uniquement dans des entreprises et projets halal. Vous détenez des 'parts' du fonds et recevez une portion des gains." },
  { q: "En quoi c'est différent d'un fonds classique ?", r: "Un fonds classique peut investir dans des banques à intérêt, l'alcool, l'armement ou des produits dérivés spéculatifs. Notre FCP islamique applique un screening Charia automatique : tout actif haram est exclu. Vous investissez l'âme en paix, dans un cadre éthique certifié." },
  { q: "Comment fonctionne le screening Charia automatique ?", r: "Un algorithme vérifie en permanence que chaque position du fonds respecte les normes AAOIFI. Si une entreprise commence à générer plus de 5% de revenus haram, elle est automatiquement exclue du portefeuille. Le Comité Charia valide le processus deux fois par an." },
  { q: "Puis-je retirer mes parts à tout moment ?", r: "Oui. Les FCP NKAP sont des fonds ouverts : vous pouvez racheter vos parts à tout moment à la Valeur Liquidative (VL) du jour. Le délai de règlement est de 3 jours ouvrés. Aucune pénalité de sortie." },
  { q: "Comment sont distribués les bénéfices ?", r: "Selon le fonds choisi : annuellement (QPBMAC), semestriellement (QPBMOH) ou trimestriellement (QPBMDC). Les distributions sont versées directement sur votre portefeuille NKAP automatiquement, sans aucune action de votre part." },
];

function RisqueBar({ niveau }: { niveau: number }) {
  return (
    <div className="flex items-center gap-1.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="h-2 w-6 rounded-sm transition-all" style={{ backgroundColor: i <= niveau ? '#bef264' : '#1a1a1a' }} />
      ))}
      <span className="text-[10px] font-black ml-2 text-white/40">{niveau}/5</span>
    </div>
  );
}

function FaqItem({ faq, idx }: { faq: { q: string; r: string }; idx: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div variants={fadeUp} custom={idx} initial="hidden" whileInView="visible" viewport={{ once: true }}
      className="border-b border-gray-200">
      <button onClick={() => setOpen(!open)} className="w-full flex justify-between items-center py-7 text-left gap-4">
        <span className="font-black text-lg text-[#0a0a0a]">{faq.q}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }} className="shrink-0">
          <ChevronDown className="w-6 h-6 text-[#1A7A4A]" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div key="content" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
            <p className="text-gray-500 text-lg leading-relaxed pb-8">{faq.r}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function SouscriptionModal({ fonds, onClose }: { fonds: typeof FONDS[0]; onClose: () => void }) {
  const [montant, setMontant] = useState(fonds.minSouscription);
  const [done, setDone] = useState(false);
  const vlNum = parseInt(fonds.vl.replace(/\s/g, '').replace('FCFA', ''));
  const parts = Math.floor(montant / vlNum);

  if (done) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-[3rem] p-12 max-w-md w-full text-center shadow-2xl">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 bg-[#bef264]">
            <CheckCircle2 className="w-10 h-10 text-black" />
          </div>
          <h3 className="font-black text-3xl tracking-tighter mb-4">Souscription enregistrée !</h3>
          <p className="text-gray-500 mb-2 text-lg">{fonds.nom}</p>
          <p className="font-black text-2xl text-[#1A7A4A] mb-10">{montant.toLocaleString()} FCFA — {parts} parts</p>
          <button onClick={onClose} className="px-12 py-5 rounded-full font-black text-black text-lg bg-[#bef264] hover:scale-105 transition-all">Fermer</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-[3rem] p-10 max-w-md w-full shadow-2xl">
        <div className="flex justify-between items-start mb-8">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full text-[10px] font-black uppercase bg-[#bef264] text-black mb-3">{fonds.code}</span>
            <h3 className="font-black text-xl tracking-tighter">{fonds.nom}</h3>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gray-100 text-xl">×</button>
        </div>
        <div className="grid grid-cols-2 gap-4 bg-gray-50 rounded-2xl p-5 mb-6">
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase mb-1">VL actuelle</p>
            <p className="font-black text-lg">{fonds.vl}</p>
            <p className="text-xs font-black text-[#1A7A4A]">{fonds.vlVar}</p>
          </div>
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Perf. 1 an</p>
            <p className="font-black text-2xl text-[#1A7A4A]">{fonds.perf1an}</p>
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Montant (FCFA)</label>
          <input type="number" value={montant} onChange={(e) => setMontant(Number(e.target.value))} min={fonds.minSouscription} step={5000}
            className="w-full px-6 py-4 rounded-2xl border border-gray-100 text-lg font-black focus:outline-none focus:border-[#bef264] bg-gray-50" />
          <p className="text-xs font-black mt-2 text-[#1A7A4A]">≈ {parts > 0 ? parts : 0} part(s) — Min : {fonds.minLabel}</p>
        </div>
        <button onClick={() => setDone(true)} className="w-full py-5 rounded-full font-black text-black text-lg bg-[#bef264] hover:shadow-2xl hover:shadow-[#bef264]/40 transition-all flex items-center justify-center gap-3">
          <Layers className="w-6 h-6" /> Souscrire {montant.toLocaleString()} FCFA
        </button>
      </motion.div>
    </div>
  );
}

export default function FCPIslamiquePage() {
  const [selected, setSelected] = useState<typeof FONDS[0] | null>(null);

  return (
    <div className="flex flex-col min-h-screen bg-[#f4f4f0] text-[#0a0a0a] selection:bg-[#bef264] selection:text-black">
      {selected && <SouscriptionModal fonds={selected} onClose={() => setSelected(null)} />}

      {/* ── HERO ── */}
      <section className="relative flex flex-col items-center text-center px-6 pt-28 pb-0 overflow-hidden bg-[#0a1a0f]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 opacity-[0.12]" style={{ backgroundImage: `url(${img('Islamic Pattern Background.jpeg')})`, backgroundSize: '280px', backgroundRepeat: 'repeat' }} />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse_at_50%_0%,#1A7A4A30_0%,transparent_60%)]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[radial-gradient(circle,#bef26412_0%,transparent_60%)]" />
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#0a1a0f] to-transparent" />
        </div>

        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative z-10 mb-8">
          <Link to="/finance-islamique" className="inline-flex items-center gap-2 text-white/40 text-xs font-black hover:text-white/80 transition-colors tracking-[0.3em] uppercase">
            ← Finance Islamique
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="relative z-10 mb-10">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/10 border border-white/20 backdrop-blur-sm rounded-full text-[10px] font-black uppercase tracking-widest text-white">
            <BarChart3 className="w-4 h-4 text-[#bef264]" />
            Moudharaba · Screening Auto
          </div>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 font-black tracking-tighter leading-[0.85] mb-8 text-white" style={{ fontSize: 'clamp(64px, 11vw, 140px)' }}>
          FCP<br />
          <span className="text-white/18">Islamique.</span>
        </motion.h1>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
          className="relative z-10 text-white/60 text-xl leading-relaxed mb-10 max-w-xl mx-auto">
          Fonds Communs de Placement structurés Moudharaba. Screening Charia automatique, gestion professionnelle BVMAC.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="relative z-10 flex flex-wrap gap-4 justify-center mb-20">
          <a href="#fonds" className="px-10 py-5 bg-[#bef264] text-black font-black rounded-full text-lg hover:scale-105 hover:shadow-2xl hover:shadow-[#bef264]/40 transition-all duration-300">
            Souscrire maintenant
          </a>
          <a href="#screening" className="px-10 py-5 bg-white/10 border border-white/25 text-white font-black rounded-full text-lg hover:bg-white/20 backdrop-blur-sm transition-all duration-300">
            Screening Charia
          </a>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 1, ease: [0.22, 1, 0.36, 1] }} className="relative z-10 mb-0">
          <motion.div animate={{ y: [0, -14, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
            <div className="relative w-72 rounded-[2.5rem] overflow-hidden shadow-2xl bg-gradient-to-br from-[#2a0a4a] to-[#0d060a]">
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#bef264]" />
                    <span className="text-[#bef264] text-[10px] font-black uppercase tracking-widest">QPBMAC · BVMAC</span>
                  </div>
                  <BarChart3 className="w-5 h-5 text-[#bef264]/50" />
                </div>
                <p className="text-white/60 text-xs font-black uppercase tracking-widest mb-2">Performance 1 an</p>
                <p className="text-white text-4xl font-black tracking-tighter mb-1">+18.7%</p>
                <p className="text-[#bef264] text-sm font-black mb-8">screening Charia auto</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/10 rounded-2xl p-4">
                    <p className="text-white/50 text-[10px] font-black uppercase mb-1">Actif net</p>
                    <p className="text-white text-lg font-black">4.8 Mds</p>
                  </div>
                  <div className="bg-white/10 rounded-2xl p-4">
                    <p className="text-white/50 text-[10px] font-black uppercase mb-1">Min.</p>
                    <p className="text-white text-lg font-black">10 000 F</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#f4f4f0] to-transparent pointer-events-none" />
      </section>

      {/* ── EXPLICATION NOVICES ── */}
      <section className="py-32 px-6 bg-[#f4f4f0]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-[#1A7A4A] mb-6">Pour les novices</p>
              <h2 className="text-5xl lg:text-6xl font-black tracking-tighter leading-none mb-8">
                Épargner Halal,<br />c'est possible.
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-10">
                Un FCP islamique, c'est comme une coopérative d'investissement. Des experts gèrent votre argent dans des entreprises 100% halal. Vous détenez des parts et recevez votre portion des profits. Zéro intérêt (riba), zéro compromis moral.
              </p>

              <div className="space-y-4">
                {[
                  { icon: ShieldCheck, titre: 'Screening Charia automatique', desc: 'Chaque actif est filtré selon les normes AAOIFI. Tout haram est exclu en temps réel.' },
                  { icon: BarChart3, titre: 'Gestion professionnelle', desc: 'Votre argent est géré par des experts agréés par la COBAC et supervisés par le BVMAC.' },
                  { icon: TrendingUp, titre: 'Rendements compétitifs', desc: 'Jusqu\'à +18.7% de performance annuelle. Votre épargne travaille pour vous, halalement.' },
                ].map((item, i) => (
                  <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                    className="flex items-start gap-5 p-6 rounded-[1.5rem] bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="w-12 h-12 rounded-xl bg-[#bef264] flex items-center justify-center shrink-0">
                      <item.icon className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <p className="font-black text-base mb-1">{item.titre}</p>
                      <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative">
              <div className="relative rounded-[3rem] overflow-hidden aspect-[4/5]">
                <img src={img('Screening Charia visualization.jpeg')} alt="Screening Charia" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/70 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="bg-[#0a0a0a]/90 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
                    <p className="text-[#bef264] text-[10px] font-black uppercase tracking-[0.25em] mb-3">Screening en cours</p>
                    <div className="space-y-2">
                      {['Alcool & tabac', 'Armement', 'Banques Riba'].map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                          <span className="text-white/60 text-sm line-through">{item}</span>
                          <span className="text-xs text-red-400 font-black ml-auto">Exclu</span>
                        </div>
                      ))}
                      {['Immobilier halal', 'Agro-industrie'].map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <CheckCircle2 className="w-4 h-4 text-[#bef264] shrink-0" />
                          <span className="text-white text-sm">{item}</span>
                          <span className="text-xs text-[#bef264] font-black ml-auto">✓ Halal</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-6 -left-6 bg-[#bef264] rounded-[2rem] p-6 shadow-2xl hidden lg:block">
                <p className="text-3xl font-black">100%</p>
                <p className="text-xs font-black">Halal</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FONDS GRID ── */}
      <section id="fonds" className="py-32 px-6 bg-[#0a0a0a] text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: `url(${img('Islamic Pattern Background.jpeg')})`, backgroundSize: '260px', backgroundRepeat: 'repeat' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[#bef264]/8 blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-24">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[#bef264] mb-6">Gamme islamique</p>
            <h2 className="text-5xl lg:text-7xl font-black tracking-tighter leading-none">
              3 fonds islamiques<br />disponibles.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {FONDS.map((f, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                whileHover={{ y: -10, scale: 1.02 }}
                className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 transition-all duration-500 flex flex-col">
                <div className="flex justify-between items-start mb-8">
                  <span className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase bg-[#bef264] text-black">{f.code}</span>
                  <span className="text-[10px] font-black text-white/30 uppercase">{f.type}</span>
                </div>
                <h3 className="text-2xl font-black tracking-tighter mb-4">{f.nom}</h3>
                <p className="text-white/40 text-sm leading-relaxed mb-8">{f.desc}</p>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                    <p className="text-[10px] font-black text-white/30 uppercase mb-1">Perf. 1 an</p>
                    <p className="text-2xl font-black text-[#bef264]">{f.perf1an}</p>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                    <p className="text-[10px] font-black text-white/30 uppercase mb-1">YTD</p>
                    <p className="text-2xl font-black">{f.perfYTD}</p>
                  </div>
                </div>
                <div className="space-y-3 mb-8 text-xs">
                  {[
                    { l: 'VL', v: `${f.vl} ${f.vlVar}` },
                    { l: 'Actif net', v: f.actifNet },
                    { l: 'Frais', v: f.frais },
                    { l: 'Minimum', v: f.minLabel },
                    { l: 'Distribution', v: f.distribution },
                  ].map((row, j) => (
                    <div key={j} className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-white/30 font-bold">{row.l}</span>
                      <span className="font-black">{row.v}</span>
                    </div>
                  ))}
                </div>
                <div className="mb-8">
                  <p className="text-[10px] font-black text-white/30 uppercase mb-3">Niveau de risque</p>
                  <RisqueBar niveau={f.risque} />
                </div>
                <button onClick={() => setSelected(f)}
                  className="mt-auto w-full py-5 rounded-full font-black text-black text-lg bg-[#bef264] hover:shadow-2xl hover:shadow-[#bef264]/40 transition-all flex items-center justify-center gap-3">
                  <Layers className="w-5 h-5" /> Souscrire
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── IMMERSIVE ── */}
      <section className="relative h-[65vh] min-h-[480px] overflow-hidden">
        <img src={img('Fund Performance visualization.jpeg')} alt="Performance des fonds" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-l from-[#0a0a0a]/85 via-[#0a0a0a]/50 to-transparent" />
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: `url(${img('Islamic Pattern Background.jpeg')})`, backgroundSize: '200px', backgroundRepeat: 'repeat' }} />
        <div className="relative z-10 h-full flex items-center justify-end px-6 lg:px-20">
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-xl text-right">
            <p className="text-[#bef264] text-xs font-black uppercase tracking-[0.3em] mb-6">Gestion professionnelle</p>
            <h2 className="text-5xl lg:text-7xl font-black tracking-tighter leading-none text-white mb-8">
              Votre épargne<br />mérite mieux<br />que le mattelas.
            </h2>
            <p className="text-white/60 text-lg leading-relaxed mb-10">
              Nos FCP islamiques délivrent des performances compétitives tout en respectant rigoureusement la Charia. Investissez sereinement.
            </p>
            <a href="#fonds" className="inline-flex items-center gap-3 px-10 py-5 bg-[#bef264] text-black font-black rounded-full text-lg hover:scale-105 transition-all duration-300">
              Voir les fonds <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── SCREENING HARAM / HALAL ── */}
      <section id="screening" className="py-32 px-6 bg-[#f4f4f0]">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-24">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[#1A7A4A] mb-6">Screening Charia</p>
            <h2 className="text-5xl lg:text-7xl font-black tracking-tighter leading-none">
              Haram vs Halal<br />le filtre islamique.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="rounded-[3rem] p-10 border border-red-100 bg-red-50/30">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center"><XCircle className="w-7 h-7 text-red-500" /></div>
                <h3 className="text-2xl font-black tracking-tighter">Secteurs exclus (Haram)</h3>
              </div>
              <div className="space-y-4">
                {EXCLUS.map((e, i) => (
                  <div key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-red-100">
                    <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-black text-sm">{e.nom}</p>
                      <p className="text-gray-400 text-xs mt-0.5">{e.raison}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}
              className="rounded-[3rem] p-10 border border-[#bef264]/40 bg-[#bef264]/8">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-14 h-14 rounded-2xl bg-[#bef264] flex items-center justify-center"><CheckCircle2 className="w-7 h-7 text-black" /></div>
                <h3 className="text-2xl font-black tracking-tighter">Secteurs autorisés (Halal)</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {AUTORISES.map((s, i) => (
                  <div key={i} className="flex items-center gap-3 p-5 rounded-2xl bg-white border border-gray-100">
                    <CheckCircle2 className="w-5 h-5 text-[#1A7A4A] shrink-0" />
                    <p className="font-bold text-sm">{s}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex items-center gap-3 text-xs rounded-2xl p-5 border border-gray-100 bg-white text-gray-500">
                <Lock className="w-5 h-5 shrink-0 text-[#1A7A4A]" />
                Screening automatique mis à jour à chaque rebalancement.
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="py-32 px-6 bg-[#0a0a0a] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: `url(${img('Islamic Pattern Background.jpeg')})`, backgroundSize: '240px', backgroundRepeat: 'repeat' }} />
        <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-[#bef264]/6 blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-24">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[#bef264] mb-6">Procédure</p>
            <h2 className="text-5xl lg:text-7xl font-black tracking-tighter leading-none">
              Souscrire en<br />4 étapes simples.
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ETAPES.map((e, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                whileHover={{ y: -8 }}
                className="relative p-10 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-[#bef264] flex items-center justify-center mb-8">
                  <e.icon className="w-7 h-7 text-black" />
                </div>
                <p className="text-6xl font-black tracking-tighter text-white/8 absolute top-8 right-8">{e.num}</p>
                <h3 className="text-xl font-black tracking-tighter mb-4">{e.titre}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{e.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-32 px-6 bg-[#f4f4f0]">
        <div className="max-w-4xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-20">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[#1A7A4A] mb-6">Questions fréquentes</p>
            <h2 className="text-5xl lg:text-7xl font-black tracking-tighter leading-none">
              Tout comprendre<br />avant d'investir.
            </h2>
          </motion.div>
          <div>
            {FAQS.map((faq, i) => <FaqItem key={i} faq={faq} idx={i} />)}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6 bg-[#f4f4f0]">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="relative rounded-[4rem] overflow-hidden">
            <img src={img('BVMAC Stock Exchange Yaoundé.jpeg')} alt="BVMAC Yaoundé" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-[#0a0a0a]/82" />
            <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: `url(${img('Islamic Pattern Background.jpeg')})`, backgroundSize: '240px', backgroundRepeat: 'repeat' }} />
            <div className="relative z-10 p-20 lg:p-32 text-center">
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#bef264] opacity-12 blur-[150px]" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#1A7A4A] opacity-12 blur-[150px]" />
              <p className="text-[#bef264] text-xs font-black uppercase tracking-[0.3em] mb-6 relative z-10">FCP Islamique · BVMAC</p>
              <h2 className="text-5xl lg:text-8xl font-black tracking-tighter leading-none mb-8 text-white relative z-10">
                Investissement<br />professionnel Halal.
              </h2>
              <p className="text-white/50 text-xl leading-relaxed max-w-xl mx-auto mb-12 relative z-10">
                Rejoignez les investisseurs qui font croître leur épargne éthiquement. Comité Charia indépendant, screening automatique, rendements compétitifs.
              </p>
              <div className="flex flex-wrap gap-4 justify-center relative z-10">
                <a href="#fonds" className="px-14 py-7 bg-[#bef264] text-black font-black rounded-full text-xl hover:scale-105 transition-all duration-300">
                  Souscrire maintenant
                </a>
                <Link to="/finance-islamique/comite-charia" className="px-14 py-7 bg-white/10 border border-white/25 text-white font-black rounded-full text-xl hover:bg-white/20 transition-all duration-300">
                  Voir le Comité Charia
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
