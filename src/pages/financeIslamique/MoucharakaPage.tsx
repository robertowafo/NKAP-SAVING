import { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Users, Heart, TrendingUp, Sprout, Store, School, CheckCircle2 } from 'lucide-react';

const img = (name: string) => encodeURI(`/${name}`);

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] } }),
};

const CAMPAGNES = [
  {
    id: 1,
    titre: 'Coopérative Maraîchère Femmes',
    porteur: 'Association Al-Barakah',
    region: 'Garoua · Nord Cameroun',
    type: 'Moucharaka',
    desc: "Financement de semences et matériel d'irrigation pour 45 femmes agricoles du Nord-Cameroun. Partage des bénéfices après récolte.",
    icon: Sprout,
    objectif: 3000000,
    collecte: 1875000,
    contributeurs: 67,
    restant: '18 jours',
    rendement: '15–20% partage profits',
    statut: 'En cours',
    typeColor: '#1A7A4A',
    image: img('Cooperative Garoua campaign.jpeg'),
  },
  {
    id: 2,
    titre: 'École Coranique Numérique',
    porteur: 'Fondation Islamique Tchad',
    region: 'Ndjamena · Tchad',
    type: 'Qard Hassan',
    desc: "Prêt solidaire sans intérêt pour équipement informatique et formation des enseignants. Remboursement à 36 mois, zéro intérêt.",
    icon: School,
    objectif: 5000000,
    collecte: 3200000,
    contributeurs: 142,
    restant: '9 jours',
    rendement: 'Prêt solidaire 0%',
    statut: 'En cours',
    typeColor: '#C8972B',
    image: img('Islamic School Digital.jpeg'),
  },
  {
    id: 3,
    titre: 'Boucherie Halal Certifiée',
    porteur: 'SARL Al-Nour',
    region: 'Libreville · Gabon',
    type: 'Moucharaka',
    desc: "Participation au capital pour ouverture d'une boucherie halal certifiée. Les investisseurs répartissent les bénéfices mensuels au prorata.",
    icon: Store,
    objectif: 8000000,
    collecte: 8000000,
    contributeurs: 238,
    restant: 'Financé !',
    rendement: '18% partage profits',
    statut: 'Financé',
    typeColor: '#1A7A4A',
    image: img('Halal Butchery.jpeg'),
  },
  {
    id: 4,
    titre: 'Puits Communautaire',
    porteur: 'ONG Eau Pour Tous',
    region: 'Bangui Nord · Centrafrique',
    type: 'Qard Hassan',
    desc: "Financement d'un puits artésien pour 3 villages de la périphérie de Bangui. Don ou prêt solidaire bienvenu.",
    icon: Heart,
    objectif: 2500000,
    collecte: 890000,
    contributeurs: 31,
    restant: '25 jours',
    rendement: 'Don ou prêt 0%',
    statut: 'En cours',
    typeColor: '#C8972B',
    image: img('Community water well.jpeg'),
  },
];

function ContributionModal({ campagne, onClose }: { campagne: typeof CAMPAGNES[0]; onClose: () => void }) {
  const [montant, setMontant] = useState(10000);
  const [mode, setMode] = useState(campagne.type);
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-3xl p-10 max-w-md w-full text-center border border-gray-100 shadow-2xl">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 bg-[#e8f5ee]">
            <CheckCircle2 className="w-8 h-8 text-[#1A7A4A]" />
          </div>
          <h3 className="font-display font-black text-[#0a0a0a] text-2xl mb-3">Contribution enregistrée !</h3>
          <p className="text-gray-500 mb-2 text-sm">{montant.toLocaleString()} FCFA — {mode}</p>
          <p className="text-gray-400 text-sm mb-8">Votre contribution halal a été validée par le Comité Charia. Confirmation par email.</p>
          <button onClick={onClose} className="px-8 py-3 rounded-full font-bold text-white text-sm bg-[#1A7A4A] hover:bg-[#145d38] transition-colors">
            Fermer
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-3xl p-8 max-w-lg w-full border border-gray-100 shadow-2xl">
        <div className="flex justify-between items-start mb-6">
          <div>
            <span className="inline-flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded-full mb-2 text-white" style={{ backgroundColor: campagne.typeColor }}>
              <ShieldCheck className="w-2.5 h-2.5" /> Halal
            </span>
            <h3 className="font-display font-black text-[#0a0a0a] text-xl">{campagne.titre}</h3>
            <p className="text-gray-400 text-xs">{campagne.region}</p>
          </div>
          <button onClick={onClose} className="text-gray-300 hover:text-gray-600 text-2xl font-light leading-none transition-colors">×</button>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Type de contribution</label>
            <div className="flex gap-3">
              {[campagne.type === 'Qard Hassan' ? 'Qard Hassan' : 'Moucharaka', 'Don libre'].map((opt) => (
                <button key={opt} onClick={() => setMode(opt)}
                  className="flex-1 py-3 rounded-2xl border-2 text-sm font-bold transition-all"
                  style={{
                    borderColor: mode === opt ? campagne.typeColor : '#e5e7eb',
                    backgroundColor: mode === opt ? campagne.typeColor + '12' : 'transparent',
                    color: mode === opt ? campagne.typeColor : '#9ca3af',
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Montant (FCFA)</label>
            <input type="number" value={montant} onChange={(e) => setMontant(Number(e.target.value))} min={5000} step={5000}
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-base font-bold focus:outline-none focus:border-[#1A7A4A] transition-colors" />
            <div className="flex gap-2 mt-2">
              {[10000, 25000, 50000, 100000].map((v) => (
                <button key={v} onClick={() => setMontant(v)}
                  className="flex-1 py-2 rounded-xl text-xs font-bold border transition-all"
                  style={{
                    backgroundColor: montant === v ? campagne.typeColor : '#f9fafb',
                    borderColor: montant === v ? campagne.typeColor : '#e5e7eb',
                    color: montant === v ? 'white' : '#9ca3af',
                  }}>
                  {v / 1000}K
                </button>
              ))}
            </div>
          </div>

          {mode !== 'Don libre' && (
            <div className="rounded-2xl p-4 bg-[#e8f5ee] border border-[#1A7A4A]/20">
              <p className="text-xs font-bold text-[#1A7A4A] mb-1">Estimation retour {mode}</p>
              <p className="text-[#0a0a0a] font-bold text-sm">{campagne.rendement}</p>
            </div>
          )}

          <button onClick={() => setDone(true)}
            className="w-full py-4 rounded-full font-bold text-white text-sm transition-all flex items-center justify-center gap-2"
            style={{ backgroundColor: campagne.typeColor }}>
            <ShieldCheck className="w-5 h-5" />
            Contribuer {montant.toLocaleString()} FCFA
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default function MoucharakaPage() {
  const [selected, setSelected] = useState<typeof CAMPAGNES[0] | null>(null);

  return (
    <div className="flex flex-col min-h-screen bg-white text-[#0a0a0a] overflow-x-hidden">
      {selected && <ContributionModal campagne={selected} onClose={() => setSelected(null)} />}

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center px-4 sm:px-6 lg:px-8 pt-10 pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full" style={{ background: 'radial-gradient(circle, #dcf0e4 0%, transparent 65%)' }} />
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
                Label Halal QPB · Inclusion islamique
              </div>

              <h1 className="font-display font-black tracking-tight leading-[0.9] mb-8" style={{ fontSize: 'clamp(48px, 8vw, 96px)' }}>
                Crowdfunding<br />
                <span style={{ background: 'linear-gradient(135deg, #1A7A4A, #2da55e)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Halal
                </span>
              </h1>

              <p className="text-gray-500 text-lg leading-relaxed mb-10 max-w-md">
                Participez à des projets communautaires en zone CEMAC via la Moucharaka (profits et pertes partagés)
                ou le Qard Hassan (prêt solidaire sans intérêt).
              </p>

              <div className="grid grid-cols-2 gap-3 mb-10">
                {[
                  { val: '4', label: 'campagnes actives', icon: TrendingUp },
                  { val: '478', label: 'contributeurs', icon: Users },
                  { val: '13.9M', label: 'FCFA collectés', icon: Heart },
                  { val: '100%', label: 'certifiées Halal', icon: ShieldCheck },
                ].map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <div key={i} className="rounded-2xl p-4 border border-gray-100 bg-gray-50">
                      <Icon className="w-5 h-5 mb-2 text-[#1A7A4A]" />
                      <p className="font-display font-black text-[#0a0a0a] text-xl">{stat.val}</p>
                      <p className="text-gray-400 text-xs font-medium">{stat.label}</p>
                    </div>
                  );
                })}
              </div>

              <Link to="#campagnes" className="group inline-flex items-center gap-2 px-8 py-4 bg-[#1A7A4A] text-white font-bold rounded-full text-sm hover:bg-[#145d38] transition-all hover:shadow-xl hover:shadow-[#1A7A4A]/25">
                Voir les campagnes
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Right — hero image */}
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="relative h-[520px]">
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} className="absolute top-0 left-0 right-8 h-[400px] rounded-3xl overflow-hidden shadow-2xl shadow-black/10">
                <img src={img('Hero visual — Community Impact.jpeg')} alt="Impact communautaire CEMAC" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest mb-1">Impact collectif</p>
                  <p className="text-white font-display font-bold text-xl">478 contributeurs actifs</p>
                </div>
              </motion.div>

              <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }} className="absolute bottom-20 -left-4 bg-white rounded-2xl shadow-xl border border-gray-100 p-5 w-48">
                <p className="text-[10px] font-bold text-gray-400 uppercase mb-2">Moucharaka</p>
                <p className="font-display font-black text-[#1A7A4A] text-xl">15–20%</p>
                <p className="text-xs text-gray-400">partage des profits</p>
              </motion.div>

              <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }} className="absolute bottom-4 right-4 flex items-center gap-2 bg-white rounded-2xl shadow-xl border border-gray-100 px-4 py-3">
                <Heart className="w-4 h-4 text-[#1A7A4A]" />
                <div>
                  <p className="text-[9px] text-gray-400 font-bold uppercase">Qard Hassan</p>
                  <p className="text-xs font-bold text-[#1A7A4A]">Prêt solidaire 0%</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CAMPAGNES ─────────────────────────────────────────────── */}
      <section id="campagnes" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-14">
            <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <p className="text-[#C8972B] text-xs font-bold tracking-widest uppercase mb-3">Projets actifs</p>
              <h2 className="font-display font-black text-[#0a0a0a] tracking-tight" style={{ fontSize: 'clamp(28px, 4.5vw, 52px)' }}>
                Campagnes Halal actives
              </h2>
            </motion.div>
            <Link to="/inscription" className="hidden md:inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-white text-sm bg-[#1A7A4A] hover:bg-[#145d38] transition-colors">
              Lancer une campagne <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CAMPAGNES.map((campagne, i) => {
              const Icon = campagne.icon;
              const pct = Math.min(Math.round((campagne.collecte / campagne.objectif) * 100), 100);
              return (
                <motion.div key={campagne.id} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} whileHover={{ y: -4, transition: { duration: 0.2 } }}>
                  <div className="group rounded-3xl overflow-hidden bg-white border border-gray-100 hover:border-gray-200 hover:shadow-xl hover:shadow-black/5 transition-all">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img src={campagne.image} alt={campagne.titre} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
                      <div className="absolute top-4 left-4">
                        <span className="text-[10px] font-bold px-2.5 py-1 rounded-full text-white" style={{ backgroundColor: campagne.typeColor }}>{campagne.type}</span>
                      </div>
                      <div className="absolute top-4 right-4">
                        <span className="text-[10px] font-bold px-2.5 py-1 rounded-full text-white" style={{ backgroundColor: campagne.statut === 'Financé' ? '#1A7A4A' : 'rgba(0,0,0,0.4)' }}>
                          {campagne.statut}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: campagne.typeColor + '15' }}>
                          <Icon className="w-5 h-5" style={{ color: campagne.typeColor }} />
                        </div>
                        <div>
                          <h3 className="font-display font-black text-[#0a0a0a] text-lg leading-tight">{campagne.titre}</h3>
                          <p className="text-gray-400 text-xs mt-0.5">{campagne.porteur} · {campagne.region}</p>
                        </div>
                      </div>

                      <p className="text-gray-500 text-sm leading-relaxed mb-5">{campagne.desc}</p>

                      <div className="mb-4">
                        <div className="flex justify-between text-xs font-bold mb-1.5">
                          <span style={{ color: campagne.typeColor }}>{campagne.collecte.toLocaleString()} FCFA</span>
                          <span className="text-gray-400">{pct}%</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                          <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: campagne.typeColor }} />
                        </div>
                        <div className="flex justify-between text-[10px] text-gray-400 font-medium mt-1.5">
                          <span>{campagne.contributeurs} contributeurs · {campagne.restant}</span>
                          <span>Objectif : {campagne.objectif.toLocaleString()} FCFA</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[10px] text-gray-400 font-bold uppercase">Retour estimé</p>
                          <p className="text-sm font-bold text-[#0a0a0a]">{campagne.rendement}</p>
                        </div>
                        {campagne.statut !== 'Financé' ? (
                          <button onClick={() => setSelected(campagne)}
                            className="px-5 py-2.5 rounded-2xl font-bold text-white text-sm transition-all inline-flex items-center gap-2"
                            style={{ backgroundColor: campagne.typeColor }}>
                            <Heart className="w-4 h-4" /> Contribuer
                          </button>
                        ) : (
                          <span className="px-5 py-2.5 rounded-2xl font-bold text-sm bg-[#e8f5ee] text-[#1A7A4A]">
                            Financé ! ✓
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA DARK ──────────────────────────────────────────────── */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#0a1a0f] overflow-hidden">
        <div className="absolute inset-0">
          <img src={img('Community water well.jpeg')} alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a1a0f] via-[#0a1a0f]/90 to-[#0a1a0f]/70" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#1A7A4A]/40 text-[#4ade80] text-xs font-bold mb-8 bg-[#1A7A4A]/15">
              <ShieldCheck className="w-3.5 h-3.5" /> Porteurs de projets
            </span>
            <h2 className="font-display font-black text-white tracking-tight mb-6" style={{ fontSize: 'clamp(28px, 5vw, 60px)' }}>
              Lancez votre campagne Halal
            </h2>
            <p className="text-white/40 max-w-xl mx-auto mb-12 text-base leading-relaxed">
              Vous avez un projet communautaire, agricole ou commercial en zone CEMAC ? Obtenez votre certification Halal QPB et levez des fonds.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/inscription" className="group px-10 py-4 bg-[#b4ff39] text-[#0a0a0a] font-black rounded-full hover:bg-white transition-colors inline-flex items-center gap-2 text-sm">
                Soumettre mon projet
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/finance-islamique/comite-charia" className="px-10 py-4 border border-white/20 text-white font-bold rounded-full hover:bg-white/10 transition-colors text-sm">
                Critères de certification
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
