import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck, Building2, Wrench, Tractor, Package,
  CheckCircle2, AlertCircle, ArrowRight, ChevronDown,
  Clock, Banknote, FileText, ThumbsUp, TrendingDown, X
} from 'lucide-react';

const img = (name: string) => encodeURI(`/${name}`);

const PRODUITS = [
  {
    nom: 'Mourabaha Commerciale',
    emoji: '🛒',
    desc: "L'institution achète le bien souhaité, puis vous le revend avec une marge fixe connue à l'avance. Parfait pour les stocks, marchandises, matières premières.",
    icon: Package,
    montant: '500K – 50M FCFA',
    duree: '6 – 36 mois',
    margeMax: '12% / an',
    image: img('Halal Commerce illustration.jpeg'),
    secteurs: ['Commerce', 'Import/Export', 'Artisanat'],
    badge: 'Le plus demandé',
  },
  {
    nom: 'Ijara Équipement',
    emoji: '⚙️',
    desc: "Vous louez un équipement (machine, véhicule, matériel médical…) avec option d'achat à terme. Aucun intérêt — vous payez un loyer halal.",
    icon: Wrench,
    montant: '1M – 200M FCFA',
    duree: '12 – 60 mois',
    margeMax: '10% / an',
    image: img('Ijara Equipment concept.jpeg'),
    secteurs: ['Industrie', 'Transport', 'BTP', 'Médical'],
    badge: 'Pour les pros',
  },
  {
    nom: 'Mourabaha Agricole',
    emoji: '🌾',
    desc: "Financement d'intrants, semences, engrais et petit équipement pour exploitants et coopératives. Taux préférentiels agriculture CEMAC.",
    icon: Tractor,
    montant: '250K – 25M FCFA',
    duree: '3 – 24 mois',
    margeMax: '8% / an',
    image: img('Hero visual — Community Impact.jpeg'),
    secteurs: ['Agriculture', 'Élevage', 'Pêche'],
    badge: 'Taux réduit',
  },
  {
    nom: 'Ijara Immobilier PME',
    emoji: '🏢',
    desc: "Financez vos locaux professionnels (boutique, bureau, atelier) par leasing islamique. Optez pour l'achat au terme ou renouvelez le contrat.",
    icon: Building2,
    montant: '10M – 500M FCFA',
    duree: '24 – 120 mois',
    margeMax: '9% / an',
    image: img('Business handshake Islamic finance.jpeg'),
    secteurs: ['Commerce', 'Industrie', 'Services'],
    badge: 'Long terme',
  },
];

const ETAPES = [
  { num: '01', icon: FileText, titre: 'Déposez votre demande', desc: 'Formulaire en ligne 15 min. Précisez le bien, le montant, votre secteur. Aucun document à envoyer à ce stade.', duree: '15 min' },
  { num: '02', icon: ShieldCheck, titre: 'Vérification Charia', desc: 'QPB vérifie que le bien et le projet sont conformes. Exclusion automatique des activités haram (alcool, tabac, armement…).', duree: '24–48h' },
  { num: '03', icon: ThumbsUp, titre: 'Offres des partenaires', desc: '2–4 institutions Islamic Window vous soumettent leurs propositions. Vous comparez et choisissez librement.', duree: '3–5 jours' },
  { num: '04', icon: CheckCircle2, titre: 'Signature & déblocage', desc: 'Signature électronique du contrat halal certifié. Les fonds sont débloqués directement chez le fournisseur.', duree: '24h' },
];

const COMPARATIF = [
  { critere: 'Intérêt / taux variable', conventionnel: true, islamique: false },
  { critere: 'Marge fixe transparente', conventionnel: false, islamique: true },
  { critere: 'Bien physique identifiable', conventionnel: false, islamique: true },
  { critere: 'Pénalité de retard bancaire', conventionnel: true, islamique: false },
  { critere: 'Validation éthique du projet', conventionnel: false, islamique: true },
  { critere: 'Certification Charia AAOIFI', conventionnel: false, islamique: true },
];

const FAQS = [
  { q: 'Quelle est la différence entre Mourabaha et un crédit classique ?', r: 'Dans un crédit classique, la banque vous prête de l\'argent et vous facture des intérêts (Riba — interdit en Islam). En Mourabaha, l\'institution achète elle-même le bien, puis vous le revend avec une marge fixe et transparente. Vous ne payez jamais d\'intérêt : vous remboursez un prix de vente convenu à l\'avance.' },
  { q: 'Est-ce que l\'Ijara c\'est comme un crédit-bail classique ?', r: 'Similaire en apparence, mais différent en nature. Dans l\'Ijara, vous payez un loyer pour l\'usage d\'un bien (la banque en est propriétaire). Aucun intérêt, pas de pénalité abusive. L\'option d\'achat est séparée et optionnelle. Tout est transparent et validé Charia.' },
  { q: 'Quels biens sont exclus du financement ?', r: 'Les biens haram : alcool, tabac, armement, jeux de hasard, pornographie, porc. Tous les projets sont vérifiés lors de l\'analyse Charia (étape 2). Si votre bien est exclu, nous vous le signalons immédiatement.' },
  { q: 'Quelle est la durée minimum pour obtenir un financement ?', r: 'Une fois votre dossier complet soumis, notre Comité Charia analyse en 24–48h. Les offres partenaires arrivent sous 3–5 jours ouvrés. La signature et le déblocage s\'effectuent en 24h supplémentaires. Total : environ 1 semaine.' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

function DemandeForm() {
  const [type, setType] = useState('mourabaha');
  const [secteur, setSecteur] = useState('');
  const [montant, setMontant] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="rounded-[3rem] p-12 text-center bg-white border border-gray-100 shadow-xl">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 bg-[#bef264]">
          <CheckCircle2 className="w-10 h-10 text-black" />
        </div>
        <h3 className="text-3xl font-black tracking-tighter mb-4">Demande enregistrée !</h3>
        <p className="text-gray-500 mb-10 text-lg leading-relaxed">
          Votre demande Charia-compatible a été transmise. Vous serez contacté sous 24–48h.
        </p>
        <button onClick={() => setSubmitted(false)} className="px-12 py-5 rounded-full font-black text-black text-lg bg-[#bef264] hover:scale-105 transition-all">
          Nouvelle demande
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="rounded-[3rem] p-10 border border-gray-100 bg-white shadow-2xl shadow-black/5 space-y-8">
      <div>
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6">Type de financement</p>
        <div className="grid grid-cols-2 gap-4">
          {[{ val: 'mourabaha', label: 'Mourabaha', sub: 'Achat de bien' }, { val: 'ijara', label: 'Ijara', sub: 'Leasing islamique' }].map((opt) => (
            <button key={opt.val} type="button" onClick={() => setType(opt.val)}
              className={`p-6 rounded-[2rem] border-2 text-left transition-all ${type === opt.val ? 'border-[#bef264] bg-[#bef264]/5' : 'border-gray-100 bg-gray-50'}`}>
              <p className={`font-black text-lg ${type === opt.val ? 'text-black' : 'text-gray-400'}`}>{opt.label}</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">{opt.sub}</p>
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Secteur d'activité</label>
        <select value={secteur} onChange={(e) => setSecteur(e.target.value)} required
          className="w-full px-6 py-4 rounded-2xl border border-gray-100 text-sm font-bold focus:outline-none focus:border-[#bef264] bg-gray-50 text-gray-700">
          <option value="">Choisir un secteur...</option>
          <option>Commerce / Négoce</option>
          <option>Agriculture / Élevage</option>
          <option>Industrie / BTP</option>
          <option>Transport / Logistique</option>
          <option>Services / Santé</option>
        </select>
      </div>
      <div>
        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Montant souhaité (FCFA)</label>
        <input type="number" value={montant} onChange={(e) => setMontant(e.target.value)} required min="500000" step="100000" placeholder="Ex : 5 000 000"
          className="w-full px-6 py-4 rounded-2xl border border-gray-100 text-sm font-bold focus:outline-none focus:border-[#bef264] bg-gray-50 placeholder:text-gray-300" />
      </div>
      <div className="flex items-start gap-4 rounded-[2rem] p-6 bg-[#0a0a0a] text-white">
        <AlertCircle className="w-6 h-6 shrink-0 mt-1 text-[#bef264]" />
        <p className="text-xs font-bold leading-relaxed text-white/70">
          Le bien doit être conforme aux valeurs islamiques. Exclusion : alcool, tabac, armement, jeux de hasard.
        </p>
      </div>
      <button type="submit" className="w-full py-5 rounded-full font-black text-black text-lg bg-[#bef264] hover:shadow-2xl hover:shadow-[#bef264]/40 transition-all flex items-center justify-center gap-3">
        <ShieldCheck className="w-6 h-6" />
        Soumettre ma demande Halal
      </button>
    </form>
  );
}

function FaqItem({ faq, idx }: { faq: typeof FAQS[0]; idx: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={idx} className="border-b border-white/10 last:border-0">
      <button onClick={() => setOpen(!open)} className="w-full flex justify-between items-center py-7 text-left gap-6">
        <span className="font-black text-lg text-white leading-snug">{faq.q}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown className="w-5 h-5 text-white/40 shrink-0" />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35 }} className="overflow-hidden">
            <p className="text-white/50 text-lg leading-relaxed pb-8 max-w-2xl">{faq.r}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function MourabahaPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f4f4f0] text-[#0a0a0a] overflow-x-hidden selection:bg-[#bef264] selection:text-black">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative flex flex-col items-center text-center px-6 pt-28 pb-0 overflow-hidden bg-[#0a1a0f]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 opacity-[0.12]" style={{ backgroundImage: `url(${img('Islamic Pattern Background.jpeg')})`, backgroundSize: '280px', backgroundRepeat: 'repeat' }} />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse_at_50%_0%,#1A7A4A30_0%,transparent_60%)]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[radial-gradient(circle,#bef26412_0%,transparent_60%)]" />
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#0a1a0f] to-transparent" />
        </div>
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative z-10 mb-8">
          <Link to="/finance-islamique" className="inline-flex items-center gap-2 text-white/40 text-xs font-black hover:text-white/80 transition-colors tracking-[0.3em] uppercase">← Finance Islamique</Link>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="relative z-10 mb-10">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/10 border border-white/20 backdrop-blur-sm rounded-full text-[10px] font-black uppercase tracking-widest text-white">
            <ShieldCheck className="w-4 h-4 text-[#bef264]" />Zéro Intérêt · Conforme Charia COBAC
          </div>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 font-black tracking-tighter leading-[0.85] mb-8 text-white" style={{ fontSize: 'clamp(64px, 11vw, 140px)' }}>
          Mourabaha<br /><span className="text-white/18">& Ijara.</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
          className="relative z-10 text-white/60 text-xl leading-relaxed mb-10 max-w-xl mx-auto">
          Financez votre activité sans intérêt. Marge transparente, bien physique garanti, validé par le Comité Charia.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="relative z-10 flex flex-wrap gap-4 justify-center mb-20">
          <a href="#demande" className="px-10 py-5 bg-[#bef264] text-black font-black rounded-full text-lg hover:scale-105 hover:shadow-2xl hover:shadow-[#bef264]/40 transition-all duration-300">
            Faire une demande
          </a>
          <a href="#produits" className="px-10 py-5 bg-white/10 border border-white/25 text-white font-black rounded-full text-lg hover:bg-white/20 backdrop-blur-sm transition-all duration-300">
            Voir les produits
          </a>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 1, ease: [0.22, 1, 0.36, 1] }} className="relative z-10 mb-0">
          <motion.div animate={{ y: [0, -14, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
            <div className="relative w-72 rounded-[2.5rem] overflow-hidden shadow-2xl bg-gradient-to-br from-[#0a2a1a] to-[#060d09]">
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#bef264]" /><span className="text-[#bef264] text-[10px] font-black uppercase tracking-widest">PME · Halal</span></div>
                  <ShieldCheck className="w-5 h-5 text-[#bef264]/50" />
                </div>
                <p className="text-white/60 text-xs font-black uppercase tracking-widest mb-2">Finançable CEMAC</p>
                <p className="text-white text-4xl font-black tracking-tighter mb-1">500M</p>
                <p className="text-[#bef264] text-sm font-black mb-8">FCFA · zéro intérêt</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/10 rounded-2xl p-4"><p className="text-white/50 text-[10px] font-black uppercase mb-1">Durée</p><p className="text-white text-lg font-black">6–60 mois</p></div>
                  <div className="bg-white/10 rounded-2xl p-4"><p className="text-white/50 text-[10px] font-black uppercase mb-1">Marge</p><p className="text-white text-lg font-black">3–6%</p></div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#f4f4f0] to-transparent pointer-events-none" />
      </section>

      {/* ── EXPLICATION SIMPLE ────────────────────────────────────────────── */}
      <section className="py-32 px-6 bg-[#f4f4f0]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-[#1A7A4A] mb-6">Pour les novices</p>
              <h2 className="text-5xl lg:text-6xl font-black tracking-tighter leading-none mb-8">
                Financer sans<br />intérêt — comment<br />ça marche ?
              </h2>
              <p className="text-gray-500 text-xl leading-relaxed mb-6">
                Vous voulez acheter une machine, un stock ou un local. Au lieu de vous prêter de l'argent avec intérêt, <strong className="text-[#0a0a0a]">QPB achète le bien à votre place</strong>, puis vous le revend avec une marge fixe, transparente, convenue à l'avance.
              </p>
              <p className="text-gray-500 text-xl leading-relaxed mb-10">
                Résultat : vous avez votre bien, vous remboursez en mensualités sans jamais payer d'intérêt. <strong className="text-[#0a0a0a]">Halal. Légal. Simple.</strong>
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { val: '500M FCFA', label: 'Maximum finançable' },
                  { val: '48h', label: 'Délai de réponse' },
                  { val: '0%', label: 'Intérêt facturé' },
                  { val: '100%', label: 'Certifié Charia' },
                ].map((s, i) => (
                  <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                    <p className="text-3xl font-black tracking-tighter text-[#1A7A4A] mb-1">{s.val}</p>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{s.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
              className="relative">
              <div className="relative rounded-[3rem] overflow-hidden shadow-2xl">
                <img src={img('Hero visual — SME Financing.jpeg')} alt="Financement PME" className="w-full h-[550px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/70 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
                    <p className="text-[#bef264] text-xs font-black uppercase tracking-widest mb-2">Exemple réel</p>
                    <p className="text-white font-black text-lg">Commerçant · Douala</p>
                    <p className="text-white/60 text-sm mt-1">Mourabaha 15M FCFA — Remboursé en 24 mois. Aucun intérêt payé.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── COMPARATIF HALAL vs CLASSIQUE ─────────────────────────────────── */}
      <section className="py-32 px-6 bg-[#0a0a0a] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: `url(${img('Islamic Pattern Background.jpeg')})`, backgroundSize: '200px', backgroundRepeat: 'repeat' }} />
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-20">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[#bef264] mb-6">Comparatif</p>
            <h2 className="text-5xl lg:text-7xl font-black tracking-tighter leading-none">
              Halal vs Classique :<br />la différence.
            </h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}
            className="rounded-[2.5rem] overflow-hidden border border-white/10">
            <div className="grid grid-cols-3 bg-white/5 border-b border-white/10">
              <div className="p-6 text-white/30 text-[10px] font-black uppercase tracking-widest">Critère</div>
              <div className="p-6 text-center border-l border-white/10">
                <span className="text-red-400 text-xs font-black uppercase tracking-widest">Crédit classique</span>
              </div>
              <div className="p-6 text-center border-l border-white/10 bg-[#bef264]/5">
                <span className="text-[#bef264] text-xs font-black uppercase tracking-widest">Mourabaha / Ijara</span>
              </div>
            </div>
            {COMPARATIF.map((row, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.5}
                className="grid grid-cols-3 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                <div className="p-6 text-white/70 font-bold text-sm">{row.critere}</div>
                <div className="p-6 flex justify-center items-center border-l border-white/5">
                  {row.conventionnel
                    ? <span className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center"><TrendingDown className="w-4 h-4 text-red-400" /></span>
                    : <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/20 text-xl font-black">—</span>
                  }
                </div>
                <div className="p-6 flex justify-center items-center border-l border-white/5 bg-[#bef264]/3">
                  {row.islamique
                    ? <span className="w-8 h-8 rounded-full bg-[#bef264]/20 flex items-center justify-center"><CheckCircle2 className="w-4 h-4 text-[#bef264]" /></span>
                    : <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/20 text-xl font-black">—</span>
                  }
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 4 PRODUITS ───────────────────────────────────────────────────── */}
      <section id="produits" className="py-32 px-6 bg-[#f4f4f0]">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-20">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[#1A7A4A] mb-6">Instruments Halal</p>
            <h2 className="text-5xl lg:text-7xl font-black tracking-tighter leading-none">
              4 produits pour<br />tous les besoins.
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PRODUITS.map((p, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                whileHover={{ y: -10 }}
                className="group bg-white rounded-[3rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500">
                <div className="relative h-64 overflow-hidden">
                  <img src={p.image} alt={p.nom} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-6 left-6">
                    <span className="px-4 py-2 bg-[#bef264] rounded-full text-[10px] font-black text-black uppercase">{p.badge}</span>
                  </div>
                  <div className="absolute bottom-6 left-6">
                    <span className="text-4xl">{p.emoji}</span>
                  </div>
                </div>
                <div className="p-10">
                  <div className="flex justify-between items-start mb-5">
                    <h3 className="text-2xl font-black tracking-tighter group-hover:text-[#1A7A4A] transition-colors">{p.nom}</h3>
                  </div>
                  <p className="text-gray-500 text-base leading-relaxed mb-8">{p.desc}</p>
                  <div className="grid grid-cols-3 gap-3 mb-8">
                    {[{ l: 'Montant', v: p.montant }, { l: 'Durée', v: p.duree }, { l: 'Marge max', v: p.margeMax }].map((info, j) => (
                      <div key={j} className="bg-gray-50 rounded-2xl p-4 text-center">
                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">{info.l}</p>
                        <p className="text-sm font-black text-[#0a0a0a]">{info.v}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {p.secteurs.map((s, j) => (
                      <span key={j} className="px-3 py-1.5 bg-[#1A7A4A]/10 text-[#1A7A4A] rounded-full text-[10px] font-black uppercase tracking-widest">{s}</span>
                    ))}
                  </div>
                  <a href="#demande" className="flex items-center justify-center gap-2 w-full py-4 bg-[#0a0a0a] text-white font-black rounded-full text-sm hover:bg-[#1A7A4A] transition-all duration-300">
                    Demander ce financement <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── IMAGE IMMERSIVE ───────────────────────────────────────────────── */}
      <section className="relative h-[50vh] min-h-[350px] overflow-hidden">
        <img src={img('Halal Commerce illustration.jpeg')} alt="Commerce halal" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-l from-[#0a0a0a]/90 via-[#0a0a0a]/50 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-end px-8 lg:px-20">
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="max-w-lg text-right">
            <p className="text-[#bef264] text-xs font-black uppercase tracking-[0.3em] mb-4">Commerce éthique</p>
            <h2 className="text-4xl lg:text-5xl font-black tracking-tighter text-white leading-tight mb-6">
              Croissez sans compromettre vos valeurs.
            </h2>
            <a href="#demande" className="inline-flex items-center gap-3 px-8 py-4 bg-[#bef264] text-black font-black rounded-full text-base hover:scale-105 transition-all duration-300">
              Obtenir un financement halal <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── PROCESSUS EN 4 ÉTAPES ─────────────────────────────────────────── */}
      <section className="py-32 px-6 bg-[#f4f4f0]">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-20">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[#1A7A4A] mb-6">Procédure</p>
            <h2 className="text-5xl lg:text-7xl font-black tracking-tighter leading-none">
              De la demande<br />au financement.
            </h2>
          </motion.div>
          <div className="space-y-6">
            {ETAPES.map((e, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                whileHover={{ x: 8 }}
                className="flex items-center gap-8 bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#bef264]/30 transition-all duration-300 group">
                <div className="w-20 h-20 rounded-[1.5rem] bg-[#0a0a0a] group-hover:bg-[#bef264] flex items-center justify-center shrink-0 transition-colors duration-300">
                  <e.icon className="w-10 h-10 text-white group-hover:text-black transition-colors duration-300" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <span className="text-5xl font-black text-gray-100 tracking-tighter leading-none">{e.num}</span>
                    <h3 className="text-2xl font-black tracking-tighter">{e.titre}</h3>
                  </div>
                  <p className="text-gray-500 text-lg leading-relaxed">{e.desc}</p>
                </div>
                <div className="shrink-0 flex flex-col items-center gap-2">
                  <Clock className="w-4 h-4 text-[#1A7A4A]" />
                  <span className="text-[10px] font-black text-[#1A7A4A] uppercase tracking-widest text-center">{e.duree}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FORMULAIRE & FAQ ──────────────────────────────────────────────── */}
      <section id="demande" className="py-32 px-6 bg-[#0a0a0a] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: `url(${img('Islamic Pattern Background.jpeg')})`, backgroundSize: '200px', backgroundRepeat: 'repeat' }} />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-12">
                <p className="text-xs font-black uppercase tracking-[0.3em] text-[#bef264] mb-6">Demande en ligne</p>
                <h2 className="text-5xl lg:text-6xl font-black tracking-tighter leading-none">
                  Faites votre<br />demande en<br />2 minutes.
                </h2>
              </motion.div>
              <DemandeForm />
            </div>
            <div>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1} className="mb-12">
                <p className="text-xs font-black uppercase tracking-[0.3em] text-[#bef264] mb-6">FAQ</p>
                <h2 className="text-5xl lg:text-6xl font-black tracking-tighter leading-none">
                  Vos questions,<br />nos réponses.
                </h2>
              </motion.div>
              <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10">
                {FAQS.map((faq, i) => <FaqItem key={i} faq={faq} idx={i} />)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ────────────────────────────────────────────────────── */}
      <section className="py-32 px-6 bg-[#f4f4f0]">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="relative rounded-[4rem] overflow-hidden">
            <img src={img('Business handshake Islamic finance.jpeg')} alt="" className="w-full h-[450px] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-br from-[#0a1a0f]/95 via-[#0a1a0f]/80 to-transparent" />
            <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: `url(${img('Islamic Pattern Background.jpeg')})`, backgroundSize: '200px', backgroundRepeat: 'repeat' }} />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-12">
              <h2 className="text-5xl lg:text-7xl font-black tracking-tighter text-white leading-none mb-8">
                Financement halal<br />dès aujourd'hui.
              </h2>
              <p className="text-white/60 text-xl mb-10 max-w-xl">500 000 FCFA à 500 000 000 FCFA. Réponse en 48h. Aucun intérêt.</p>
              <a href="#demande" className="px-12 py-6 bg-[#bef264] text-black font-black rounded-full text-xl hover:scale-105 hover:shadow-2xl hover:shadow-[#bef264]/30 transition-all duration-300">
                Démarrer ma demande maintenant
              </a>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
