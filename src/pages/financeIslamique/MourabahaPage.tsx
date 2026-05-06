import { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Building2, Wrench, Tractor, Package, CheckCircle2, AlertCircle } from 'lucide-react';

const img = (name: string) => encodeURI(`/${name}`);

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] } }),
};

const PRODUITS = [
  {
    nom: 'Mourabaha Commerciale',
    desc: "Financement d'achat de marchandises pour commerçants et artisans. L'institution achète le bien et vous le revend avec une marge connue à l'avance.",
    icon: Package,
    montant: '500K – 50M FCFA',
    duree: '6 – 36 mois',
    margeMax: '12% / an',
    image: img('Halal Commerce illustration.jpeg'),
    secteurs: ['Commerce', 'Import/Export', 'Artisanat', 'Textile'],
    accent: '#1A7A4A',
  },
  {
    nom: 'Ijara Équipement',
    desc: "Leasing islamique pour l'acquisition d'équipements industriels, véhicules ou matériel agricole. Vous louez avec option d'achat au terme.",
    icon: Wrench,
    montant: '1M – 200M FCFA',
    duree: '12 – 60 mois',
    margeMax: '10% / an',
    image: img('Ijara Equipment concept.jpeg'),
    secteurs: ['Industrie', 'Transport', 'BTP', 'Médical'],
    accent: '#C8972B',
  },
  {
    nom: 'Mourabaha Agricole',
    desc: "Financement d'intrants agricoles, semences et matériels pour exploitants et coopératives de la zone CEMAC.",
    icon: Tractor,
    montant: '250K – 25M FCFA',
    duree: '3 – 24 mois',
    margeMax: '8% / an',
    image: img('Ijara Equipment concept.jpeg'),
    secteurs: ['Agriculture', 'Élevage', 'Pêche', 'Agroalim.'],
    accent: '#1A7A4A',
  },
  {
    nom: 'Ijara Immobilier PME',
    desc: "Financement de locaux commerciaux via leasing islamique. Location avec option d'achat — aucun intérêt, contrat transparent.",
    icon: Building2,
    montant: '10M – 500M FCFA',
    duree: '24 – 120 mois',
    margeMax: '9% / an',
    image: img('Business handshake Islamic finance.jpeg'),
    secteurs: ['Commerce', 'Industrie', 'Services', 'Santé'],
    accent: '#C8972B',
  },
];

const ETAPES = [
  { num: 1, titre: 'Dépôt de demande', desc: 'Remplissez le formulaire en ligne. Précisez le bien, le montant et votre secteur.', duree: '15 min', color: '#1A7A4A' },
  { num: 2, titre: 'Analyse & Éligibilité', desc: 'QPB évalue votre dossier KYC/AML et vérifie la conformité Charia du bien.', duree: '24–48h', color: '#C8972B' },
  { num: 3, titre: 'Offres partenaires', desc: 'Les institutions Islamic Window vous soumettent leurs offres de financement halal.', duree: '3–5 jours', color: '#1A7A4A' },
  { num: 4, titre: 'Signature du contrat', desc: 'Signature électronique du contrat Mourabaha/Ijara avec avis du Comité Charia.', duree: '1 jour', color: '#C8972B' },
  { num: 5, titre: 'Déblocage des fonds', desc: "L'institution achète le bien chez le fournisseur, puis vous le cède. Pas de versement direct.", duree: '2–5 jours', color: '#1A7A4A' },
];

const PARTENAIRES = [
  { nom: 'BGFI Bank', pays: 'Cameroun, Gabon, Congo', type: 'Islamic Window', status: 'Partenaire', color: '#1A7A4A' },
  { nom: 'Afriland First Bank', pays: 'Cameroun', type: 'Islamic Window', status: 'Négociation', color: '#C8972B' },
  { nom: 'Ecobank CEMAC', pays: 'Zone CEMAC', type: 'Partenaire régional', status: 'Étude', color: '#6b7280' },
];

function DemandeForm() {
  const [type, setType] = useState('mourabaha');
  const [secteur, setSecteur] = useState('');
  const [montant, setMontant] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="rounded-3xl p-10 text-center bg-[#e8f5ee] border border-[#1A7A4A]/20">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 bg-[#1A7A4A]/10">
          <CheckCircle2 className="w-8 h-8 text-[#1A7A4A]" />
        </div>
        <h3 className="font-display font-black text-[#0a0a0a] text-2xl mb-3">Demande enregistrée !</h3>
        <p className="text-gray-500 mb-8 text-sm leading-relaxed">
          Votre demande de financement Charia-compatible a été transmise. Vous serez contacté sous 24–48h.
        </p>
        <button onClick={() => setSubmitted(false)} className="px-8 py-3 rounded-full font-bold text-white text-sm bg-[#1A7A4A] hover:bg-[#145d38] transition-colors">
          Nouvelle demande
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="rounded-3xl p-8 border border-gray-100 bg-white shadow-sm space-y-6">
      <div>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Type de financement</p>
        <div className="grid grid-cols-2 gap-3">
          {[
            { val: 'mourabaha', label: 'Mourabaha', sub: 'Achat de bien' },
            { val: 'ijara', label: 'Ijara', sub: 'Leasing islamique' },
          ].map((opt) => (
            <button key={opt.val} type="button" onClick={() => setType(opt.val)}
              className={`p-4 rounded-2xl border-2 text-left transition-all ${type === opt.val ? 'border-[#C8972B] bg-[#fef9ec]' : 'border-gray-100 bg-gray-50'}`}
            >
              <p className={`font-bold text-sm ${type === opt.val ? 'text-[#C8972B]' : 'text-gray-600'}`}>{opt.label}</p>
              <p className="text-[10px] text-gray-400 font-medium">{opt.sub}</p>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Secteur d'activité</label>
        <select value={secteur} onChange={(e) => setSecteur(e.target.value)} required
          className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-sm font-medium focus:outline-none focus:border-[#1A7A4A] bg-gray-50 text-gray-700 transition-colors">
          <option value="">Choisir un secteur...</option>
          <option value="commerce">Commerce / Négoce</option>
          <option value="agriculture">Agriculture / Élevage</option>
          <option value="industrie">Industrie / BTP</option>
          <option value="transport">Transport / Logistique</option>
          <option value="services">Services / Santé</option>
          <option value="artisanat">Artisanat / PME</option>
        </select>
      </div>

      <div>
        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Montant souhaité (FCFA)</label>
        <input type="number" value={montant} onChange={(e) => setMontant(e.target.value)} required min="500000" step="100000" placeholder="Ex : 5 000 000"
          className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-sm font-medium focus:outline-none focus:border-[#1A7A4A] bg-gray-50 placeholder:text-gray-300 transition-colors" />
      </div>

      <div>
        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Description du bien à financer</label>
        <textarea required rows={3} placeholder="Ex : Achat de 2 tonnes de riz pour mon commerce à Douala..."
          className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-sm font-medium focus:outline-none focus:border-[#1A7A4A] bg-gray-50 resize-none placeholder:text-gray-300 transition-colors" />
      </div>

      <div className="flex items-start gap-3 rounded-2xl p-4 bg-amber-50 border border-amber-200">
        <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-[#C8972B]" />
        <p className="text-xs font-medium text-amber-700">
          Le bien financé ne doit pas être lié à l'alcool, le tabac, les armes, la pornographie ou les jeux de hasard pour être éligible au financement Halal.
        </p>
      </div>

      <button type="submit" className="w-full py-4 rounded-full font-bold text-white text-sm bg-[#C8972B] hover:bg-[#a07020] transition-colors flex items-center justify-center gap-2">
        <ShieldCheck className="w-5 h-5" />
        Soumettre ma demande Halal
      </button>
    </form>
  );
}

export default function MourabahaPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-[#0a0a0a] overflow-x-hidden">

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center px-4 sm:px-6 lg:px-8 pt-10 pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full" style={{ background: 'radial-gradient(circle, #fef9ec 0%, transparent 65%)' }} />
          <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full" style={{ background: 'radial-gradient(circle, #dcf0e4 0%, transparent 70%)' }} />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url(${img('Islamic Pattern Background.jpeg')})`, backgroundSize: '200px' }} />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
              <Link to="/finance-islamique" className="inline-flex items-center gap-2 text-gray-400 text-xs font-semibold mb-10 hover:text-gray-700 transition-colors tracking-widest uppercase">
                ← Finance Islamique
              </Link>

              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 border border-[#C8972B]/20 rounded-full text-[#C8972B] text-xs font-bold mb-8">
                <ShieldCheck className="w-3.5 h-3.5" />
                Zéro Intérêt — Conforme Charia
              </div>

              <h1 className="font-display font-black tracking-tight leading-[0.9] mb-8" style={{ fontSize: 'clamp(48px, 8vw, 96px)' }}>
                Mourabaha<br />
                <span style={{ background: 'linear-gradient(135deg, #C8972B, #e0b050)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  & Ijara
                </span>
              </h1>

              <p className="text-gray-500 text-lg leading-relaxed mb-10 max-w-md">
                Financez vos projets professionnels sans payer d'intérêts. Marge transparente, connue dès le premier jour.
                100% conforme Charia pour les PME CEMAC.
              </p>

              <div className="flex flex-wrap gap-2 mb-10">
                {['Zéro Riba', 'Transparence totale', 'PME & artisans', 'Islamic Window', 'COBAC conforme'].map((tag, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-full bg-amber-50 border border-[#C8972B]/15 text-[11px] font-bold text-[#C8972B]">{tag}</span>
                ))}
              </div>

              <Link to="/inscription" className="group inline-flex items-center gap-2 px-8 py-4 bg-[#C8972B] text-white font-bold rounded-full text-sm hover:bg-[#a07020] transition-all hover:shadow-xl hover:shadow-[#C8972B]/25">
                Demander un financement
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Right — image + example card */}
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="relative h-[520px]">
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} className="absolute top-0 left-0 right-8 h-[380px] rounded-3xl overflow-hidden shadow-2xl shadow-black/10">
                <img src={img('Hero visual — SME Financing.jpeg')} alt="Financement PME Halal" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest mb-1">Financement PME</p>
                  <p className="text-white font-display font-bold text-xl">500K – 500M FCFA</p>
                </div>
              </motion.div>

              {/* Floating example card */}
              <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }} className="absolute bottom-24 -left-4 bg-white rounded-2xl shadow-xl border border-gray-100 p-5 w-52">
                <p className="text-[10px] font-bold text-gray-400 uppercase mb-2">Exemple Mourabaha</p>
                <p className="text-xs text-gray-600 mb-1">Besoin : <span className="font-bold text-[#0a0a0a]">5 000 000 FCFA</span></p>
                <p className="text-xs text-gray-600 mb-1">Marge : <span className="font-bold text-[#C8972B]">12% = 600 000 FCFA</span></p>
                <p className="text-xs text-gray-600">Total : <span className="font-bold text-[#1A7A4A]">5 600 000 FCFA</span></p>
                <p className="text-[9px] text-gray-400 mt-2">Connu dès le 1er jour — Zéro intérêt</p>
              </motion.div>

              <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }} className="absolute bottom-6 right-4 flex items-center gap-2 bg-white rounded-2xl shadow-xl border border-gray-100 px-4 py-3">
                <ShieldCheck className="w-4 h-4 text-[#C8972B]" />
                <div>
                  <p className="text-[9px] text-gray-400 font-bold uppercase">Certifié</p>
                  <p className="text-xs font-bold text-[#C8972B]">Charia COBAC</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── PRODUITS GRID ─────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto">
          <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-14">
            <p className="text-[#C8972B] text-xs font-bold tracking-widest uppercase mb-3">Gamme</p>
            <h2 className="font-display font-black text-[#0a0a0a] tracking-tight" style={{ fontSize: 'clamp(28px, 4.5vw, 52px)' }}>
              4 produits Halal disponibles
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PRODUITS.map((produit, i) => {
              const Icon = produit.icon;
              return (
                <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} whileHover={{ y: -4, transition: { duration: 0.2 } }}>
                  <div className="group rounded-3xl overflow-hidden bg-white border border-gray-100 hover:border-gray-200 hover:shadow-xl hover:shadow-black/5 transition-all">
                    <div className="relative h-44 overflow-hidden">
                      <img src={produit.image} alt={produit.nom} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
                      <div className="absolute bottom-4 left-4 flex items-center gap-1.5">
                        <span className="inline-flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-sm text-white">
                          <ShieldCheck className="w-2.5 h-2.5" /> Conforme Charia
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-start gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: produit.accent + '15' }}>
                          <Icon className="w-5 h-5" style={{ color: produit.accent }} />
                        </div>
                        <h3 className="font-display font-black text-[#0a0a0a] text-xl mt-1">{produit.nom}</h3>
                      </div>
                      <p className="text-gray-500 text-sm leading-relaxed mb-5">{produit.desc}</p>
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        {[
                          { label: 'Montant', value: produit.montant },
                          { label: 'Durée', value: produit.duree },
                          { label: 'Marge max', value: produit.margeMax },
                        ].map((info, j) => (
                          <div key={j} className="bg-gray-50 rounded-xl p-3">
                            <p className="text-[9px] text-gray-400 font-bold uppercase mb-1">{info.label}</p>
                            <p className="text-xs font-bold text-[#0a0a0a] leading-tight">{info.value}</p>
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {produit.secteurs.map((s, j) => (
                          <span key={j} className="text-[10px] font-bold px-2.5 py-1 rounded-lg" style={{ backgroundColor: produit.accent + '12', color: produit.accent }}>
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── PROCESS + FORM ────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Steps */}
          <div>
            <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <p className="text-[#C8972B] text-xs font-bold tracking-widest uppercase mb-3">Processus</p>
              <h2 className="font-display font-black text-[#0a0a0a] tracking-tight mb-10" style={{ fontSize: 'clamp(24px, 3.5vw, 40px)' }}>
                Comment ça fonctionne ?
              </h2>
            </motion.div>

            <div className="relative space-y-4">
              <div className="absolute left-5 top-5 bottom-5 w-px bg-gradient-to-b from-[#1A7A4A] via-[#C8972B] to-[#1A7A4A]" />
              {ETAPES.map((etape, i) => (
                <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex gap-5">
                  <div className="w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm text-white shrink-0 z-10" style={{ backgroundColor: etape.color }}>
                    {etape.num}
                  </div>
                  <div className="flex-1 bg-gray-50 rounded-2xl p-4 border border-gray-100">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-[#0a0a0a] text-sm">{etape.titre}</h3>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ml-2 text-white" style={{ backgroundColor: etape.color }}>
                        {etape.duree}
                      </span>
                    </div>
                    <p className="text-gray-500 text-xs leading-relaxed">{etape.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Partners */}
            <div className="mt-10">
              <h3 className="font-display font-black text-[#0a0a0a] text-xl mb-5">Institutions partenaires</h3>
              <div className="space-y-3">
                {PARTENAIRES.map((p, i) => (
                  <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                    className="flex items-center justify-between rounded-2xl p-4 border border-gray-100 bg-gray-50 hover:border-gray-200 hover:bg-white transition-all"
                  >
                    <div>
                      <p className="font-bold text-[#0a0a0a] text-sm">{p.nom}</p>
                      <p className="text-gray-400 text-xs">{p.pays} · {p.type}</p>
                    </div>
                    <span className="text-[10px] font-bold px-3 py-1 rounded-full text-white shrink-0" style={{ backgroundColor: p.color }}>
                      {p.status}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div>
            <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <p className="text-[#C8972B] text-xs font-bold tracking-widest uppercase mb-3">Demande</p>
              <h2 className="font-display font-black text-[#0a0a0a] tracking-tight mb-8" style={{ fontSize: 'clamp(24px, 3.5vw, 40px)' }}>
                Faire une demande
              </h2>
            </motion.div>
            <DemandeForm />
          </div>
        </div>
      </section>

      {/* ── SPLIT IMAGE — Halal Commerce ──────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <p className="text-[#1A7A4A] text-xs font-bold tracking-widest uppercase mb-4">Commerce Éthique</p>
              <h2 className="font-display font-black text-[#0a0a0a] tracking-tight leading-tight mb-6" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
                Le commerce halal<br />au cœur de la CEMAC
              </h2>
              <p className="text-gray-500 text-base leading-relaxed mb-8">
                QPB finance uniquement des activités économiques conformes aux valeurs islamiques. Chaque transaction est vérifiée par notre équipe de conformité Charia avant approbation.
              </p>
              <ul className="space-y-3">
                {[
                  'Exclusion des secteurs haram (alcool, tabac, armes)',
                  'Vérification de la licéité du bien financé',
                  'Avis du Comité Charia joint à chaque dossier',
                  'Audit de conformité annuel obligatoire',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                    <span className="text-[#1A7A4A] font-bold shrink-0 mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }} className="relative">
              <div className="rounded-3xl overflow-hidden h-[420px] shadow-xl shadow-black/5">
                <img src={img('Business handshake Islamic finance.jpeg')} alt="Partenariat islamique" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#C8972B]/20 to-transparent" />
              </div>
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-xl border border-gray-100 p-5 w-52">
                <p className="text-[10px] font-bold text-gray-400 uppercase mb-2">Partenariat halal</p>
                <p className="font-bold text-[#0a0a0a] text-sm">Marge connue<br />dès le premier jour</p>
                <div className="flex items-center gap-1 mt-2">
                  <ShieldCheck className="w-3 h-3 text-[#C8972B]" />
                  <span className="text-[10px] text-[#C8972B] font-bold">Zéro intérêt caché</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
}
