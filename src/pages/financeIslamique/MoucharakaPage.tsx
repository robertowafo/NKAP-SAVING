import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, TrendingUp, Sprout, Store, School, CheckCircle2, ChevronDown, Users, Coins } from 'lucide-react';

const img = (name: string) => encodeURI(`/images/${name}`);

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  }),
};

const CAMPAGNES = [
  {
    id: 1, titre: 'Coopérative Maraîchère Femmes', porteur: 'Association Al-Barakah',
    region: 'Garoua · Nord Cameroun', type: 'Moucharaka',
    desc: "Financement de semences et matériel d'irrigation pour 45 femmes agricoles. Partage des bénéfices après récolte.",
    icon: Sprout, objectif: 3000000, collecte: 1875000, contributeurs: 67,
    restant: '18 jours', rendement: '15–20% partage profits', statut: 'En cours',
    image: img('Cooperative Garoua campaign.jpeg'),
  },
  {
    id: 2, titre: 'École Coranique Numérique', porteur: 'Fondation Islamique Tchad',
    region: 'Ndjamena · Tchad', type: 'Qard Hassan',
    desc: "Prêt solidaire sans intérêt pour équipement informatique et formation des enseignants.",
    icon: School, objectif: 5000000, collecte: 3200000, contributeurs: 142,
    restant: '9 jours', rendement: 'Prêt solidaire 0%', statut: 'En cours',
    image: img('Islamic School Digital.jpeg'),
  },
  {
    id: 3, titre: 'Boucherie Halal Certifiée', porteur: 'SARL Al-Nour',
    region: 'Libreville · Gabon', type: 'Moucharaka',
    desc: "Participation au capital pour ouverture d'une boucherie halal certifiée. Bénéfices mensuels au prorata.",
    icon: Store, objectif: 8000000, collecte: 8000000, contributeurs: 238,
    restant: 'Financé !', rendement: '18% partage profits', statut: 'Financé',
    image: img('Halal Butchery.jpeg'),
  },
  {
    id: 4, titre: 'Puits Communautaire', porteur: 'ONG Eau Pour Tous',
    region: 'Bangui Nord · Centrafrique', type: 'Qard Hassan',
    desc: "Financement d'un puits artésien pour 3 villages de la périphérie de Bangui.",
    icon: Heart, objectif: 2500000, collecte: 890000, contributeurs: 31,
    restant: '25 jours', rendement: 'Don ou prêt 0%', statut: 'En cours',
    image: img('Community water well.jpeg'),
  },
];

const STATS = [
  { val: '13.9M', label: 'FCFA collectés', sub: 'en zone CEMAC' },
  { val: '478', label: 'Contributeurs', sub: 'actifs aujourd\'hui' },
  { val: '4', label: 'Projets actifs', sub: 'validés Charia' },
  { val: '92%', label: 'Taux de succès', sub: 'projets financés' },
];

const ETAPES = [
  { num: '01', icon: Users, titre: 'Créez votre compte', desc: 'Inscription rapide, vérification KYC simple, activation de votre portefeuille NKAP en 5 minutes.' },
  { num: '02', icon: Coins, titre: 'Explorez les campagnes', desc: 'Parcourez les projets actifs, lisez les fiches détaillées et consultez l\'avis du Comité Charia.' },
  { num: '03', icon: Heart, titre: 'Contribuez dès 5 000 F', desc: 'Choisissez votre montant, confirmez votre contribution. Tout se fait depuis votre téléphone.' },
  { num: '04', icon: TrendingUp, titre: 'Suivez & recevez', desc: 'Tableau de bord en temps réel. Bénéfices ou remboursements versés automatiquement selon le projet.' },
];

const FAQS = [
  { q: "La Moucharaka, c'est quoi exactement ?", r: "C'est un partenariat d'investissement. Vous apportez du capital à un projet, le porteur apporte son travail. Les bénéfices sont partagés selon un ratio convenu. En cas de perte, chacun supporte selon sa mise. Aucun intérêt n'est prélevé : tout est 100% halal." },
  { q: "Le Qard Hassan, comment ça marche ?", r: "C'est un prêt solidaire sans intérêt accordé à des projets à impact communautaire. Vous prêtez une somme et le porteur vous rembourse uniquement le capital. Votre bénéfice est spirituel : contribuer au bien commun sans usure." },
  { q: "Puis-je perdre mon argent ?", r: "En Moucharaka : oui, si le projet échoue, les pertes sont partagées. C'est pourquoi notre Comité Charia analyse chaque projet avant publication. En Qard Hassan : vous récupérez uniquement votre capital — sans rendement mais sans perte au-delà d'un éventuel défaut." },
  { q: "Quel est le montant minimum pour contribuer ?", r: "À partir de 5 000 FCFA seulement. Vous pouvez augmenter votre contribution au fur et à mesure selon votre capacité. Il n'y a pas de maximum." },
  { q: "Comment je reçois mes bénéfices ?", r: "Pour la Moucharaka, les bénéfices sont distribués selon le calendrier de chaque campagne (mensuel, trimestriel ou après récolte). Tout est automatisé via votre portefeuille NKAP. Vous recevez une notification à chaque versement." },
];

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

function ContributionModal({ campagne, onClose }: { campagne: typeof CAMPAGNES[0]; onClose: () => void }) {
  const [montant, setMontant] = useState(10000);
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-[3rem] p-12 max-w-md w-full text-center shadow-2xl">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 bg-[#bef264]">
            <CheckCircle2 className="w-10 h-10 text-black" />
          </div>
          <h3 className="font-black text-3xl tracking-tighter mb-4">Contribution enregistrée !</h3>
          <p className="text-gray-500 mb-2 text-lg">{montant.toLocaleString()} FCFA — {campagne.type}</p>
          <p className="text-gray-400 text-sm mb-10">Validée par le Comité Charia.</p>
          <button onClick={onClose} className="px-12 py-5 rounded-full font-black text-black text-lg bg-[#bef264] hover:scale-105 transition-all">Fermer</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-[3rem] p-10 max-w-lg w-full shadow-2xl">
        <div className="flex justify-between items-start mb-8">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full text-[10px] font-black uppercase bg-[#bef264] text-black mb-3">{campagne.type}</span>
            <h3 className="font-black text-2xl tracking-tighter">{campagne.titre}</h3>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gray-100 text-xl">×</button>
        </div>
        <div className="space-y-6">
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Montant (FCFA)</label>
            <input type="number" value={montant} onChange={(e) => setMontant(Number(e.target.value))} min={5000} step={5000}
              className="w-full px-6 py-4 rounded-2xl border border-gray-100 text-lg font-black focus:outline-none focus:border-[#bef264] bg-gray-50" />
            <div className="flex gap-2 mt-3">
              {[10000, 25000, 50000, 100000].map((v) => (
                <button key={v} onClick={() => setMontant(v)}
                  className={`flex-1 py-3 rounded-xl text-xs font-black transition-all ${montant === v ? 'bg-[#bef264] text-black' : 'bg-gray-50 text-gray-400'}`}>
                  {v / 1000}K
                </button>
              ))}
            </div>
          </div>
          <button onClick={() => setDone(true)}
            className="w-full py-5 rounded-full font-black text-black text-lg bg-[#bef264] hover:shadow-2xl hover:shadow-[#bef264]/40 transition-all flex items-center justify-center gap-3">
            <Heart className="w-6 h-6" /> Contribuer {montant.toLocaleString()} FCFA
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default function MoucharakaPage() {
  const [selected, setSelected] = useState<typeof CAMPAGNES[0] | null>(null);

  return (
    <div className="flex flex-col min-h-screen bg-[#f4f4f0] text-[#0a0a0a] selection:bg-[#bef264] selection:text-black">
      {selected && <ContributionModal campagne={selected} onClose={() => setSelected(null)} />}

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
            <Heart className="w-4 h-4 text-[#bef264]" />
            Moucharaka · Qard Hassan
          </div>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 font-black tracking-tighter leading-[0.85] mb-8 text-white" style={{ fontSize: 'clamp(64px, 11vw, 140px)' }}>
          Crowdfunding<br />
          <span className="text-white/18">Halal.</span>
        </motion.h1>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
          className="relative z-10 text-white/60 text-xl leading-relaxed mb-10 max-w-xl mx-auto">
          Participez à des projets communautaires en zone CEMAC. Moucharaka ou Qard Hassan. Impact réel, éthique pure.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="relative z-10 flex flex-wrap gap-4 justify-center mb-20">
          <a href="#campagnes" className="px-10 py-5 bg-[#bef264] text-black font-black rounded-full text-lg hover:scale-105 hover:shadow-2xl hover:shadow-[#bef264]/40 transition-all duration-300">
            Voir les campagnes
          </a>
          <Link to="/inscription" className="px-10 py-5 bg-white/10 border border-white/25 text-white font-black rounded-full text-lg hover:bg-white/20 backdrop-blur-sm transition-all duration-300">
            Lancer un projet
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 1, ease: [0.22, 1, 0.36, 1] }} className="relative z-10 mb-0">
          <motion.div animate={{ y: [0, -14, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
            <div className="relative w-72 rounded-[2.5rem] overflow-hidden shadow-2xl bg-gradient-to-br from-[#0a2a4a] to-[#060918]">
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#bef264]" />
                    <span className="text-[#bef264] text-[10px] font-black uppercase tracking-widest">Impact · CEMAC</span>
                  </div>
                  <Heart className="w-5 h-5 text-[#bef264]/50" />
                </div>
                <p className="text-white/60 text-xs font-black uppercase tracking-widest mb-2">Contributeurs actifs</p>
                <p className="text-white text-4xl font-black tracking-tighter mb-1">478</p>
                <p className="text-[#bef264] text-sm font-black mb-8">investisseurs CEMAC</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/10 rounded-2xl p-4">
                    <p className="text-white/50 text-[10px] font-black uppercase mb-1">Collectés</p>
                    <p className="text-white text-lg font-black">13.9M F</p>
                  </div>
                  <div className="bg-white/10 rounded-2xl p-4">
                    <p className="text-white/50 text-[10px] font-black uppercase mb-1">Projets</p>
                    <p className="text-white text-lg font-black">4 actifs</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#f4f4f0] to-transparent pointer-events-none" />
      </section>

      {/* ── EXPLICATION ── */}
      <section className="py-32 px-6 bg-[#f4f4f0]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative">
              <div className="relative rounded-[3rem] overflow-hidden aspect-[4/5]">
                <img src={img('Hero visual — Community Impact.jpeg')} alt="Impact communautaire" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 shadow-2xl">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.25em] mb-2">Certifié par</p>
                    <p className="font-black text-lg text-[#0a0a0a]">Comité Charia QPB</p>
                    <div className="flex items-center gap-2 mt-3">
                      <div className="w-2 h-2 rounded-full bg-[#bef264]" />
                      <p className="text-xs font-black text-[#1A7A4A]">Conforme AAOIFI · 100% Halal</p>
                    </div>
                  </div>
                </div>
              </div>
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-6 -right-6 bg-[#bef264] rounded-[2rem] p-6 shadow-2xl hidden lg:block">
                <p className="text-3xl font-black">0%</p>
                <p className="text-xs font-black">d'intérêt</p>
              </motion.div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-[#1A7A4A] mb-6">Pour les novices</p>
              <h2 className="text-5xl lg:text-6xl font-black tracking-tighter leading-none mb-8">
                Deux façons<br />d'investir Halal.
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-12">
                La finance participative islamique, c'est simple : vous financez des projets réels et recevez une part des bénéfices. Aucun intérêt n'est perçu ou versé. Votre argent travaille dans l'économie réelle, conformément à la Charia.
              </p>

              <div className="space-y-5">
                <div className="rounded-[2rem] p-8 bg-[#0a1a0f] text-white">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-3xl">🤝</span>
                    <div>
                      <p className="font-black text-xl">Moucharaka</p>
                      <p className="text-white/50 text-sm">Partenariat · Partage profits & pertes</p>
                    </div>
                  </div>
                  <p className="text-white/60 text-sm leading-relaxed">Vous investissez dans un projet et partagez les bénéfices. Si le projet réussit, vous gagnez. C'est une vraie participation au capital.</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="px-3 py-1.5 bg-[#bef264]/15 text-[#bef264] rounded-full text-[10px] font-black">15–20% de retour</span>
                    <span className="px-3 py-1.5 bg-white/10 text-white/50 rounded-full text-[10px] font-black">Partage des risques</span>
                  </div>
                </div>

                <div className="rounded-[2rem] p-8 bg-white border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-3xl">💙</span>
                    <div>
                      <p className="font-black text-xl">Qard Hassan</p>
                      <p className="text-gray-400 text-sm">Prêt solidaire · 0% d'intérêt</p>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed">Vous prêtez une somme à un projet solidaire. L'emprunteur vous rembourse le capital uniquement. Votre récompense est spirituelle et communautaire.</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="px-3 py-1.5 bg-[#bef264] text-black rounded-full text-[10px] font-black">0% intérêt</span>
                    <span className="px-3 py-1.5 bg-gray-100 text-gray-500 rounded-full text-[10px] font-black">Impact solidaire</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-24 px-6 bg-[#0a0a0a] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: `url(${img('Islamic Pattern Background.jpeg')})`, backgroundSize: '220px', backgroundRepeat: 'repeat' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#1A7A4A]/20 blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map((s, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                className="p-8 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-xl text-center hover:bg-white/10 transition-all duration-300">
                <p className="text-4xl lg:text-5xl font-black tracking-tighter text-[#bef264] mb-3">{s.val}</p>
                <p className="text-white font-black text-sm mb-1">{s.label}</p>
                <p className="text-white/30 text-xs">{s.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CAMPAGNES ── */}
      <section id="campagnes" className="py-32 px-6 bg-[#f4f4f0]">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-24">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-[#1A7A4A] mb-4">Projets actifs</p>
              <h2 className="text-5xl lg:text-7xl font-black tracking-tighter leading-none">Investissez dans<br />l'impact réel.</h2>
            </div>
            <Link to="/inscription" className="px-10 py-5 bg-[#0a0a0a] text-white font-black rounded-full text-lg hover:bg-[#1A7A4A] transition-all whitespace-nowrap flex items-center gap-3">
              Lancer une campagne <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {CAMPAGNES.map((c, i) => {
              const pct = Math.min(Math.round((c.collecte / c.objectif) * 100), 100);
              return (
                <motion.div key={c.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} whileHover={{ y: -10 }}
                  className="group bg-white rounded-[3rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500">
                  <div className="relative h-64 overflow-hidden">
                    <img src={c.image} alt={c.titre} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute top-6 left-6 flex gap-2">
                      <span className="px-4 py-2 bg-[#bef264] rounded-full text-[10px] font-black uppercase text-black">{c.type}</span>
                      {c.statut === 'Financé' && <span className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase text-[#1A7A4A]">✓ Financé</span>}
                    </div>
                  </div>
                  <div className="p-10">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center shrink-0"><c.icon className="w-7 h-7 text-[#1A7A4A]" /></div>
                      <div>
                        <h3 className="text-2xl font-black tracking-tighter">{c.titre}</h3>
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">{c.porteur} · {c.region}</p>
                      </div>
                    </div>
                    <p className="text-gray-500 text-lg leading-relaxed mb-8">{c.desc}</p>
                    <div className="mb-8">
                      <div className="flex justify-between text-sm font-black mb-3">
                        <span className="text-[#1A7A4A]">{c.collecte.toLocaleString()} FCFA</span>
                        <span className="text-gray-300">{pct}%</span>
                      </div>
                      <div className="h-3 rounded-full bg-gray-100 overflow-hidden">
                        <motion.div initial={{ width: 0 }} whileInView={{ width: `${pct}%` }} transition={{ duration: 1, delay: 0.3 }} className="h-full bg-[#bef264] rounded-full" />
                      </div>
                      <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-3">
                        <span>{c.contributeurs} contributeurs · {c.restant}</span>
                        <span>Objectif : {c.objectif.toLocaleString()} FCFA</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="bg-gray-50 rounded-2xl p-4">
                        <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Retour</p>
                        <p className="text-sm font-black">{c.rendement}</p>
                      </div>
                      {c.statut !== 'Financé' ? (
                        <button onClick={() => setSelected(c)} className="px-8 py-4 bg-[#0a0a0a] text-white font-black rounded-full text-sm hover:bg-[#1A7A4A] transition-all flex items-center gap-2">
                          <Heart className="w-4 h-4" /> Contribuer
                        </button>
                      ) : (
                        <span className="px-8 py-4 bg-[#bef264] text-black font-black rounded-full text-sm">Financé ✓</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── IMMERSIVE ── */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <img src={img('Plantation Kribi.jpeg')} alt="Agriculture Cameroun" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/85 via-[#0a0a0a]/50 to-transparent" />
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: `url(${img('Islamic Pattern Background.jpeg')})`, backgroundSize: '200px', backgroundRepeat: 'repeat' }} />
        <div className="relative z-10 h-full flex items-center px-6 lg:px-20">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl">
            <p className="text-[#bef264] text-xs font-black uppercase tracking-[0.3em] mb-6">Agriculture Halal · CEMAC</p>
            <h2 className="text-5xl lg:text-7xl font-black tracking-tighter leading-none text-white mb-8">
              Des projets qui<br />nourrissent<br />des familles.
            </h2>
            <p className="text-white/60 text-lg leading-relaxed mb-10 max-w-lg">
              Chaque contribution finance un projet réel en zone CEMAC — de l'agriculture à l'éducation, en passant par le commerce halal. Votre argent crée de l'impact mesurable.
            </p>
            <a href="#campagnes" className="inline-flex items-center gap-3 px-10 py-5 bg-[#bef264] text-black font-black rounded-full text-lg hover:scale-105 transition-all duration-300">
              Choisir un projet <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="py-32 px-6 bg-[#0a0a0a] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: `url(${img('Islamic Pattern Background.jpeg')})`, backgroundSize: '240px', backgroundRepeat: 'repeat' }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#1A7A4A]/15 blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-24">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[#bef264] mb-6">Procédure</p>
            <h2 className="text-5xl lg:text-7xl font-black tracking-tighter leading-none">
              4 étapes pour<br />commencer.
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
              Vous avez des<br />questions ?
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
            <img src={img('Al-Baraka Warehouse.jpeg')} alt="Commerce Halal" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-[#0a0a0a]/80" />
            <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: `url(${img('Islamic Pattern Background.jpeg')})`, backgroundSize: '240px', backgroundRepeat: 'repeat' }} />
            <div className="relative z-10 p-20 lg:p-32 text-center">
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#bef264] opacity-15 blur-[150px]" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#1A7A4A] opacity-15 blur-[150px]" />
              <p className="text-[#bef264] text-xs font-black uppercase tracking-[0.3em] mb-6 relative z-10">Crowdfunding Halal</p>
              <h2 className="text-5xl lg:text-8xl font-black tracking-tighter leading-none mb-8 text-white relative z-10">
                Lancez votre<br />campagne Halal.
              </h2>
              <p className="text-white/50 text-xl leading-relaxed max-w-xl mx-auto mb-12 relative z-10">
                Porteur de projet ou investisseur, rejoignez la communauté NKAP. Votre projet mérite d'être financé éthiquement.
              </p>
              <div className="flex flex-wrap gap-4 justify-center relative z-10">
                <Link to="/inscription" className="px-14 py-7 bg-[#bef264] text-black font-black rounded-full text-xl hover:scale-105 transition-all duration-300">
                  Soumettre mon projet
                </Link>
                <a href="#campagnes" className="px-14 py-7 bg-white/10 border border-white/25 text-white font-black rounded-full text-xl hover:bg-white/20 transition-all duration-300">
                  Voir les campagnes
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
