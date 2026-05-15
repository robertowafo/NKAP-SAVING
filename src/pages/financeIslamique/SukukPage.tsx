import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck, Lock, TrendingUp, Home, Building2, Leaf,
  ChevronRight, Globe, Zap, CheckCircle2, ArrowRight,
  ChevronDown, Star, Users, Coins, BarChart3, Clock
} from 'lucide-react';

const img = (name: string) => encodeURI(`/images/${name}`);

const PROJECTS = [
  {
    name: 'Résidence Al-Amal',
    location: 'Douala · Akwa',
    type: 'Sukuk Ijara',
    yield: '8.0%',
    maturity: '5 ans',
    price: '10 000 FCFA',
    progress: 23,
    raised: '115M FCFA',
    target: '500M FCFA',
    status: 'Pilote',
    statusColor: '#bef264',
    image: img('Finance Islamique.jpeg'),
    icon: Home,
    desc: 'Immeuble résidentiel 48 appartements. Revenus de loyer distribués trimestriellement.',
  },
  {
    name: 'Entrepôt Al-Baraka',
    location: 'Yaoundé · Mvan',
    type: 'Sukuk Moucharaka',
    yield: '9.5%',
    maturity: '7 ans',
    price: '10 000 FCFA',
    progress: 7,
    raised: '35M FCFA',
    target: '500M FCFA',
    status: 'Nouveau',
    statusColor: '#1A7A4A',
    image: img('Finance Islamique.jpeg'),
    icon: Building2,
    desc: 'Entrepôt logistique 5 000 m². Contrats de location signés avec 3 entreprises.',
  },
  {
    name: 'Plantation Kribi',
    location: 'Kribi · Sud',
    type: 'Sukuk Moucharaka',
    yield: '11.0%',
    maturity: '10 ans',
    price: '10 000 FCFA',
    progress: 1,
    raised: '5M FCFA',
    target: '500M FCFA',
    status: 'Pré-lancement',
    statusColor: '#6b7280',
    image: img('Finance Islamique.jpeg'),
    icon: Leaf,
    desc: '120 hectares de palmiers. Export certifié Halal vers marché GCC.',
  },
];

const TYPES_SUKUK = [
  {
    nom: 'Sukuk Ijara',
    emoji: '🏗️',
    desc: 'Vous achetez une part d\'un bien immobilier (bâtiment, entrepôt…). Les loyers perçus vous sont redistribués périodiquement.',
    exemple: 'Résidence Al-Amal — 8% / an',
    avantages: ['Revenu régulier (loyers)', 'Actif physique identifiable', 'Risque modéré'],
    gradient: 'from-[#1A7A4A] to-[#0a2a15]',
  },
  {
    nom: 'Sukuk Moucharaka',
    emoji: '🤝',
    desc: 'Vous co-investissez dans une entreprise ou projet. Les profits ET les pertes sont partagés équitablement.',
    exemple: 'Entrepôt Al-Baraka — 9.5% / an',
    avantages: ['Potentiel de gain plus élevé', 'Participation directe', 'Éthique totale'],
    gradient: 'from-[#1a1a2e] to-[#0a0a0a]',
  },
  {
    nom: 'Sukuk Moudaraba',
    emoji: '📈',
    desc: 'Vous apportez le capital, un gestionnaire expert le fait fructifier. Le profit est partagé selon un ratio fixé à l\'avance.',
    exemple: 'Bientôt disponible',
    avantages: ['Gestion déléguée', 'Aucune expertise requise', 'Rapport qualité/risque optimal'],
    gradient: 'from-[#2a0a4a] to-[#0d060a]',
  },
];

const ETAPES = [
  { num: '01', titre: 'Créez votre compte', desc: 'Inscription en 3 minutes. Vérification d\'identité simple (pièce + selfie). 100% en ligne.', duree: '3 min', icon: Users },
  { num: '02', titre: 'Choisissez un projet', desc: 'Parcourez les Sukuk disponibles. Chaque fiche détaille l\'actif, le rendement, la durée et le Comité Charia.', duree: '5 min', icon: BarChart3 },
  { num: '03', titre: 'Investissez dès 10 000 FCFA', desc: 'Saisissez votre montant. Paiement sécurisé par Mobile Money ou virement. Zéro frais cachés.', duree: '2 min', icon: Coins },
  { num: '04', titre: 'Recevez vos revenus', desc: 'Loyers ou profits distribués automatiquement sur votre portefeuille. Traçabilité complète on-chain.', duree: 'Automatique', icon: TrendingUp },
];

const GARANTIES = [
  { icon: ShieldCheck, titre: 'Actif réel en garantie', desc: 'Chaque Sukuk est adossé à un bien physique identifié, évalué et enregistré. Pas de spéculation.' },
  { icon: Lock, titre: 'Smart contract Polygon', desc: 'Distribution automatique des revenus via blockchain. Impossible à falsifier. Transparence totale.' },
  { icon: Star, titre: 'Certifié Charia AAOIFI', desc: 'Validé par 3 scholars indépendants avant lancement. Zéro intérêt (Riba), zéro incertitude (Gharar).' },
  { icon: Globe, titre: 'Régulé COSUMAF', desc: 'Conforme au Règlement DEEP 2025. Dossier de visa réglementaire CEMAC en cours de dépôt.' },
];

const FAQS = [
  { q: 'C\'est quoi exactement un Sukuk ?', r: 'Un Sukuk est l\'équivalent islamique d\'une obligation. Au lieu de prêter de l\'argent contre intérêt (interdit en Islam), vous achetez une part de propriété dans un actif réel (immeuble, entrepôt, plantation). Vous recevez ensuite les revenus générés par cet actif : loyers, profits…' },
  { q: 'Quelle est la différence avec une obligation classique ?', r: 'Une obligation classique = prêt d\'argent avec intérêt fixe (Riba — interdit). Un Sukuk = participation à un actif réel, revenus liés à la performance. Le risque est partagé, les gains sont halal.' },
  { q: 'Puis-je perdre mon capital ?', r: 'Comme tout investissement, un risque existe. Cependant, chaque Sukuk est adossé à un actif physique qui sert de garantie. En cas de défaillance, l\'actif peut être liquidé pour rembourser les porteurs de Sukuk.' },
  { q: 'Comment sont payés les revenus ?', r: 'Les revenus (loyers Sukuk Ijara, profits Sukuk Moucharaka) sont distribués automatiquement via smart contract sur Polygon, directement sur votre portefeuille NKAP. Vous recevez une notification et un relevé à chaque distribution.' },
  { q: 'Le minimum de 10 000 FCFA est-il vraiment accessible ?', r: 'Absolument. Nous avons volontairement fixé ce minimum pour permettre aux jeunes actifs de la zone CEMAC d\'accéder à ces investissements. Vous pouvez investir dans plusieurs Sukuk simultanément pour diversifier.' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

function FaqItem({ faq, idx }: { faq: typeof FAQS[0]; idx: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={idx}
      className="border-b border-gray-200 last:border-0"
    >
      <button onClick={() => setOpen(!open)} className="w-full flex justify-between items-center py-7 text-left gap-6">
        <span className="font-black text-lg text-[#0a0a0a] leading-snug">{faq.q}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="text-gray-500 text-lg leading-relaxed pb-8 max-w-2xl">{faq.r}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function SukukPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f4f4f0] text-[#0a0a0a] font-sans selection:bg-[#bef264] selection:text-black">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative flex flex-col items-center text-center px-6 pt-28 pb-0 overflow-hidden bg-[#0a1a0f]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 opacity-[0.12]" style={{ backgroundImage: `url(${img('Finance Islamique.jpeg')})`, backgroundSize: '280px', backgroundRepeat: 'repeat' }} />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse_at_50%_0%,#1A7A4A30_0%,transparent_60%)]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[radial-gradient(circle,#bef26412_0%,transparent_60%)]" />
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#0a1a0f] to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto w-full">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-center gap-4 mb-10">
            <Link to="/finance-islamique" className="text-white/40 text-[10px] font-black tracking-[0.3em] uppercase hover:text-white/80 transition-colors">← Finance Islamique</Link>
            <div className="w-1 h-1 rounded-full bg-white/20" />
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 backdrop-blur-sm rounded-full text-[10px] font-black uppercase tracking-widest text-white">
              <ShieldCheck className="w-3.5 h-3.5 text-[#bef264]" />
              Certifié AAOIFI · Blockchain Polygon
            </div>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="font-black tracking-tighter leading-[0.88] mb-8 text-white" style={{ fontSize: 'clamp(52px, 9vw, 108px)' }}>
            Créez du<br />patrimoine<br /><span className="text-white/18">sans le bruit.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.28 }} className="text-white/60 text-lg lg:text-xl leading-relaxed mb-10 max-w-xl mx-auto">
            Le Sukuk est l'alternative halal à l'obligation. Investissez dans des actifs réels en zone CEMAC dès <strong className="text-white">10 000 FCFA</strong>.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flex flex-wrap gap-4 justify-center mb-16">
            <Link to="/inscription" className="px-9 py-4 bg-[#bef264] text-black font-black rounded-full text-base hover:scale-105 hover:shadow-2xl hover:shadow-[#bef264]/40 transition-all duration-300">
              Investir dès 10 000 FCFA
            </Link>
            <a href="#projets" className="px-9 py-4 bg-white/10 border border-white/20 text-white font-bold rounded-full text-base hover:bg-white/20 backdrop-blur-sm transition-all">
              Voir les projets
            </a>
          </motion.div>

          {/* Stats bar */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}
            className="flex flex-wrap justify-center gap-8 mb-16">
            {[
              { val: '8–11%', label: 'Rendement annuel' },
              { val: '10 000 F', label: 'Ticket minimum' },
              { val: '100%', label: 'Halal certifié' },
              { val: '0', label: 'Frais cachés' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-white font-black text-2xl tracking-tighter">{s.val}</p>
                <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mt-1">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Floating card */}
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.9 }}
          className="relative z-10 w-full max-w-sm mx-auto">
          <motion.div animate={{ y: [0, -14, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="relative w-full rounded-[2.5rem] bg-gradient-to-br from-[#1A7A4A] to-[#060d09] overflow-hidden" style={{ height: '340px' }}>
            <div className="absolute inset-0 flex flex-col justify-between p-10">
              <div className="flex justify-between items-start">
                <div className="px-4 py-2 bg-white/10 border border-white/20 rounded-full text-[9px] font-black text-white/70 uppercase tracking-widest">Sukuk Token</div>
                <ShieldCheck className="w-8 h-8 text-[#bef264]" />
              </div>
              <div>
                <p className="text-white font-mono text-sm mb-5 tracking-wider opacity-50">0x8842...SUKUK</p>
                <p className="text-[#bef264] text-[10px] font-black uppercase tracking-widest mb-1">Sukuk Pilote</p>
                <p className="text-white font-black tracking-tighter" style={{ fontSize: 'clamp(24px, 5vw, 40px)' }}>500 000 000 FCFA</p>
                <p className="text-white/50 text-sm font-bold mt-2">Rendement : 8–11% / an · Certifié AAOIFI</p>
              </div>
            </div>
            <div className="absolute -right-16 -top-16 w-56 h-56 border-[24px] border-[#bef264]/10 rounded-full" />
            <div className="absolute -left-10 -bottom-10 w-40 h-40 border-[16px] border-white/5 rounded-full" />
          </motion.div>
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#f4f4f0] to-transparent pointer-events-none" />
        </motion.div>
      </section>

      {/* ── C'EST QUOI UN SUKUK ? ────────────────────────────────────────── */}
      <section className="py-32 px-6 bg-[#f4f4f0]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
              className="relative order-2 lg:order-1">
              <div className="relative rounded-[3rem] overflow-hidden shadow-2xl">
                <img src={img('tokenisation.jpeg')} alt="Sukuk Blockchain" className="w-full h-[500px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
                    <p className="text-white/60 text-xs font-black uppercase tracking-widest mb-2">Différence clé</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-red-500/20 rounded-xl p-3 text-center">
                        <p className="text-white text-xs font-black">Obligation classique</p>
                        <p className="text-red-300 text-[10px] mt-1">Prêt + intérêt = Haram ❌</p>
                      </div>
                      <div className="bg-[#bef264]/20 rounded-xl p-3 text-center">
                        <p className="text-white text-xs font-black">Sukuk NKAP</p>
                        <p className="text-[#bef264] text-[10px] mt-1">Part d'actif = Halal ✓</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Decorative badge */}
              <motion.div animate={{ rotate: [0, 5, 0, -5, 0] }} transition={{ duration: 6, repeat: Infinity }}
                className="absolute -top-6 -right-6 w-24 h-24 bg-[#bef264] rounded-[2rem] flex items-center justify-center shadow-xl">
                <img src={img('Finance Islamique.jpeg')} alt="" className="w-14 h-14 object-contain" />
              </motion.div>
            </motion.div>

            {/* Text */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="order-1 lg:order-2">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-[#1A7A4A] mb-6">Pour les novices</p>
              <h2 className="text-5xl lg:text-6xl font-black tracking-tighter leading-none mb-8">
                Le Sukuk,<br />expliqué simplement.
              </h2>
              <p className="text-gray-500 text-xl leading-relaxed mb-8">
                Imaginez que vous achetez une <strong className="text-[#0a0a0a]">part d'un immeuble</strong> avec d'autres investisseurs. Cet immeuble génère des loyers. Ces loyers vous sont redistribués proportionnellement à votre part.
              </p>
              <p className="text-gray-500 text-xl leading-relaxed mb-10">
                C'est exactement ça un Sukuk — sauf que tout est <strong className="text-[#0a0a0a]">digitalisé sur blockchain</strong>, transparent, et certifié conforme à la Charia.
              </p>
              <div className="space-y-4">
                {[
                  'Pas d\'intérêt (Riba) — 100% halal',
                  'Actif physique réel en garantie',
                  'Revenus tracés on-chain, immuables',
                  'Accessible dès 10 000 FCFA',
                ].map((point, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-6 h-6 rounded-full bg-[#bef264] flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-black" />
                    </div>
                    <p className="font-bold text-lg text-[#0a0a0a]">{point}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 3 TYPES DE SUKUK ─────────────────────────────────────────────── */}
      <section className="py-32 px-6 bg-[#0a0a0a] text-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `url(${img('Finance Islamique.jpeg')})`, backgroundSize: '200px', backgroundRepeat: 'repeat' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#1A7A4A] blur-[150px] opacity-15" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-20">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[#bef264] mb-6">Nos structures</p>
            <h2 className="text-5xl lg:text-7xl font-black tracking-tighter leading-none">
              3 types de Sukuk,<br />1 principe éthique.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {TYPES_SUKUK.map((t, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`relative rounded-[2.5rem] bg-gradient-to-br ${t.gradient} p-10 border border-white/10 overflow-hidden group cursor-pointer`}>
                <div className="absolute top-0 right-0 w-48 h-48 rounded-full border-[24px] border-white/5 translate-x-16 -translate-y-16" />
                <div className="text-5xl mb-8">{t.emoji}</div>
                <h3 className="text-2xl font-black tracking-tighter mb-4">{t.nom}</h3>
                <p className="text-white/60 text-base leading-relaxed mb-8">{t.desc}</p>
                <div className="space-y-3 mb-10">
                  {t.avantages.map((a, j) => (
                    <div key={j} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#bef264]" />
                      <span className="text-white/80 text-sm font-bold">{a}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-6 border-t border-white/10">
                  <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-1">Exemple NKAP</p>
                  <p className="text-[#bef264] font-black text-sm">{t.exemple}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMMENT ÇA MARCHE ─────────────────────────────────────────────── */}
      <section className="py-32 px-6 bg-[#f4f4f0]">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-20">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[#1A7A4A] mb-6">Procédure</p>
            <h2 className="text-5xl lg:text-7xl font-black tracking-tighter leading-none">
              Investir en<br />4 étapes simples.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ETAPES.map((e, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                whileHover={{ y: -8 }}
                className="group relative bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-[#1A7A4A]/10 transition-all duration-500">
                {/* Connector line */}
                {i < 3 && <div className="hidden lg:block absolute top-16 left-full w-6 h-0.5 bg-gray-200 z-10" />}
                <div className="w-16 h-16 rounded-[1.5rem] bg-[#0a0a0a] group-hover:bg-[#bef264] flex items-center justify-center mb-8 transition-colors duration-300">
                  <e.icon className="w-8 h-8 text-white group-hover:text-black transition-colors duration-300" />
                </div>
                <div className="text-5xl font-black text-gray-100 mb-4 tracking-tighter">{e.num}</div>
                <h3 className="text-xl font-black tracking-tighter mb-3">{e.titre}</h3>
                <p className="text-gray-500 text-base leading-relaxed mb-6">{e.desc}</p>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#bef264]/10 rounded-full">
                  <Clock className="w-3.5 h-3.5 text-[#1A7A4A]" />
                  <span className="text-[10px] font-black text-[#1A7A4A] uppercase tracking-widest">{e.duree}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJETS DISPONIBLES ───────────────────────────────────────────── */}
      <section id="projets" className="py-32 px-6 bg-[#0a0a0a] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: `url(${img('Finance Islamique.jpeg')})`, backgroundSize: '200px', backgroundRepeat: 'repeat' }} />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-20">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-[#bef264] mb-4">Opportunités actives</p>
              <h2 className="text-5xl lg:text-7xl font-black tracking-tighter leading-none">
                Choisissez votre<br />Sukuk.
              </h2>
            </motion.div>
            <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}
              className="text-white/50 text-lg max-w-sm">
              Chaque projet est audité, validé Charia et publié avec sa fiche technique complète.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {PROJECTS.map((p, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                whileHover={{ y: -10 }}
                className="group bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all duration-500">
                <div className="relative h-56 overflow-hidden">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-80" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-6 left-6 flex gap-2">
                    <span className="px-3 py-1.5 rounded-full text-[10px] font-black uppercase" style={{ backgroundColor: p.statusColor, color: p.statusColor === '#bef264' ? 'black' : 'white' }}>
                      {p.status}
                    </span>
                    <span className="px-3 py-1.5 bg-white/10 border border-white/20 backdrop-blur-md rounded-full text-[10px] font-black uppercase text-white">
                      {p.type}
                    </span>
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-black tracking-tighter">{p.name}</h3>
                      <p className="text-white/40 text-xs font-bold uppercase tracking-widest mt-1">{p.location}</p>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                      <p.icon className="w-6 h-6 text-[#bef264]" />
                    </div>
                  </div>
                  <p className="text-white/50 text-sm leading-relaxed mb-6">{p.desc}</p>
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {[
                      { label: 'Rendement', value: p.yield, color: '#bef264' },
                      { label: 'Durée', value: p.maturity, color: 'white' },
                      { label: 'Min.', value: p.price, color: 'white' },
                    ].map((stat, j) => (
                      <div key={j} className="bg-white/5 rounded-xl p-3 text-center border border-white/10">
                        <p className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-1">{stat.label}</p>
                        <p className="font-black text-sm" style={{ color: stat.color }}>{stat.value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mb-6">
                    <div className="flex justify-between text-[10px] font-black uppercase text-white/30 mb-2">
                      <span>{p.raised} collectés</span>
                      <span className="text-[#bef264]">{p.progress}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: `${p.progress}%` }} transition={{ duration: 1.2, delay: 0.3 + i * 0.1 }}
                        className="h-full bg-[#bef264] rounded-full" />
                    </div>
                    <p className="text-white/20 text-[10px] mt-1 text-right">Objectif : {p.target}</p>
                  </div>
                  <Link to="/inscription" className="flex items-center justify-center gap-2 w-full py-4 bg-[#bef264] text-black font-black rounded-full text-sm hover:scale-105 hover:shadow-xl hover:shadow-[#bef264]/20 transition-all duration-300">
                    Souscrire <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── IMAGE IMMERSIVE ───────────────────────────────────────────────── */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <img src={img('tokenisation.jpeg')} alt="Immobilier tokenisé" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/90 via-[#0a0a0a]/50 to-transparent" />
        <div className="absolute inset-0 flex items-center px-8 lg:px-20">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="max-w-xl">
            <p className="text-[#bef264] text-xs font-black uppercase tracking-[0.3em] mb-6">Vision 2026</p>
            <h2 className="text-4xl lg:text-6xl font-black tracking-tighter leading-tight text-white mb-6">
              L'immobilier CEMAC tokenisé, accessible à tous.
            </h2>
            <p className="text-white/60 text-lg leading-relaxed mb-8">
              Plus besoin de millions pour investir dans l'immobilier. 10 000 FCFA suffisent pour posséder une part de l'économie réelle africaine.
            </p>
            <Link to="/inscription" className="inline-flex items-center gap-3 px-8 py-4 bg-[#bef264] text-black font-black rounded-full text-base hover:scale-105 transition-all duration-300">
              Rejoindre dès maintenant <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── GARANTIES ────────────────────────────────────────────────────── */}
      <section className="py-32 px-6 bg-[#f4f4f0]">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-20">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[#1A7A4A] mb-6">Sécurité</p>
            <h2 className="text-5xl lg:text-7xl font-black tracking-tighter leading-none">
              Votre argent est<br />protégé par design.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {GARANTIES.map((g, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                whileHover={{ x: 8 }}
                className="flex items-start gap-8 p-10 bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#bef264]/30 transition-all duration-300 group">
                <div className="w-16 h-16 rounded-[1.25rem] bg-[#0a0a0a] group-hover:bg-[#bef264] flex items-center justify-center shrink-0 transition-colors duration-300">
                  <g.icon className="w-8 h-8 text-white group-hover:text-black transition-colors duration-300" />
                </div>
                <div>
                  <h3 className="text-2xl font-black tracking-tighter mb-3">{g.titre}</h3>
                  <p className="text-gray-500 text-lg leading-relaxed">{g.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="py-32 px-6 bg-[#0a0a0a] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: `url(${img('Finance Islamique.jpeg')})`, backgroundSize: '200px', backgroundRepeat: 'repeat' }} />
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-20">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[#bef264] mb-6">Questions fréquentes</p>
            <h2 className="text-5xl lg:text-7xl font-black tracking-tighter leading-none">
              Tout ce que vous<br />voulez savoir.
            </h2>
          </motion.div>
          <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 lg:p-16">
            {FAQS.map((faq, i) => (
              <div key={i} className="border-b border-white/10 last:border-0">
                <FaqItem faq={{ ...faq }} idx={i} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ────────────────────────────────────────────────────── */}
      <section className="py-32 px-6 bg-[#f4f4f0]">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="relative rounded-[4rem] overflow-hidden">
            <img src={img('Institutionnels.jpeg')} alt="BVMAC" className="w-full h-[500px] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-br from-[#0a1a0f]/95 via-[#0a1a0f]/80 to-[#0a1a0f]/60" />
            <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: `url(${img('Finance Islamique.jpeg')})`, backgroundSize: '200px', backgroundRepeat: 'repeat' }} />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-12">
              <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                className="text-[#bef264] text-xs font-black uppercase tracking-[0.3em] mb-6">Commencer maintenant</motion.p>
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
                className="text-5xl lg:text-8xl font-black tracking-tighter text-white leading-none mb-8">
                Votre premier Sukuk<br />vous attend.
              </motion.h2>
              <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
                className="text-white/60 text-xl mb-12 max-w-xl">
                Rejoignez 478 investisseurs CEMAC qui construisent leur patrimoine halal.
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-4 justify-center">
                <Link to="/inscription" className="px-12 py-6 bg-[#bef264] text-black font-black rounded-full text-xl hover:scale-105 hover:shadow-2xl hover:shadow-[#bef264]/30 transition-all duration-300">
                  Ouvrir mon compte gratuitement
                </Link>
                <Link to="/finance-islamique/comite-charia" className="px-12 py-6 bg-white/10 border border-white/20 text-white font-bold rounded-full text-xl hover:bg-white/20 backdrop-blur-sm transition-all">
                  Voir les certifications
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
