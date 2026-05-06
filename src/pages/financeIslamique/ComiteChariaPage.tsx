import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ShieldCheck, BookOpen, Globe, FileText, Users, Award, AlertCircle, ArrowRight, Lock } from 'lucide-react';

const img = (name: string) => encodeURI(`/${name}`);

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] } }),
};

const SCHOLARS = [
  {
    nom: 'Dr. Moussa Mbaye',
    titre: 'Président du Comité Charia QPB',
    origine: 'Sénégal',
    formation: 'Doctorat Jurisprudence Islamique — Université Al-Azhar, Le Caire',
    specialites: ['Muamalat (transactions islamiques)', 'Fiqh al-Mal (droit financier)', 'Sukuk & instruments de dette'],
    certifications: ['AAOIFI Certified Sharia Advisor', 'IFSB Expert Panel'],
    experience: '18 ans',
    initiales: 'MM',
    accent: '#1A7A4A',
  },
  {
    nom: 'Sheikh Abdullah Al-Rashidi',
    titre: 'Scholar International — GCC',
    origine: 'Koweït',
    formation: 'Maîtrise Économie Islamique — Université Islamique Internationale Malaisie (IIUM)',
    specialites: ['Sukuk structuration', 'Islamic banking windows', 'Takaful et assurance islamique'],
    certifications: ['AAOIFI Board Member', 'Kuwait Finance House Advisor'],
    experience: '22 ans',
    initiales: 'AR',
    accent: '#C8972B',
  },
  {
    nom: 'Prof. Fatimah Noor binti Yusof',
    titre: 'Scholar International — Malaisie',
    origine: 'Malaisie',
    formation: 'PhD Islamic Finance — INCEIF, Kuala Lumpur',
    specialites: ['FCP islamiques (Moudharaba)', 'Smart contracts et blockchain Charia', 'Finance participative digitale'],
    certifications: ['BNM Registered Sharia Advisor', 'ISRA Research Fellow'],
    experience: '15 ans',
    initiales: 'FN',
    accent: '#1A7A4A',
  },
];

const PROCESS = [
  { num: '01', titre: 'Soumission du produit', desc: "L'équipe QPB soumet le dossier : fiche produit, contrat juridique, smart contract, note de structuration.", duree: 'J+0' },
  { num: '02', titre: 'Analyse préliminaire', desc: 'Un scholar analyse la conformité sectorielle et structurelle. Vérification des références AAOIFI et IFSB.', duree: 'J+2 à J+5' },
  { num: '03', titre: 'Session Comité', desc: 'Les 3 scholars délibèrent. Vote à la majorité qualifiée (2/3 minimum). Questions/clarifications à l\'équipe QPB.', duree: 'J+7 à J+14' },
  { num: '04', titre: 'Avis Charia formel', desc: "Rédaction de l'avis formel signé par le Président. Publication sur la plateforme QPB et stockage sur IPFS.", duree: 'J+15' },
  { num: '05', titre: 'Audit annuel', desc: 'Révision annuelle systématique de tous les produits actifs. Rapport Charia annuel public.', duree: 'Annuel' },
];

const AVIS = [
  { ref: 'AVIS-CHARIA-QPB-001', produit: 'Sukuk Ijara — Résidence Al-Amal Douala', date: '15 Mars 2026', statut: 'Conforme', scholars: 'Mbaye, Al-Rashidi, Noor', resume: "La structure Sukuk Ijara est conforme aux normes AAOIFI Standard No.17. L'actif sous-jacent est halal." },
  { ref: 'AVIS-CHARIA-QPB-002', produit: 'FCP Moudharaba Actions CEMAC — QPBMAC', date: '01 Avril 2026', statut: 'Conforme', scholars: 'Mbaye, Noor', resume: "Le FCP respecte le principe Moudharaba. Le screening Charia automatique exclut correctement les secteurs haram." },
  { ref: 'AVIS-CHARIA-QPB-003', produit: 'Crowdfunding Moucharaka — Coopérative Garoua', date: '20 Avril 2026', statut: 'Conforme', scholars: 'Mbaye', resume: "Le projet agricole est intégralement halal. La structure Moucharaka avec partage bénéfices post-récolte est valide." },
  { ref: 'AVIS-CHARIA-QPB-004', produit: 'Mourabaha Commerciale Standard', date: '30 Avril 2026', statut: 'Conforme avec réserves', scholars: 'Al-Rashidi, Noor', resume: "Structure conforme. Réserve : la clause de pénalité de retard doit être reformulée et versée à une œuvre caritative." },
];

const STANDARDS = [
  { org: 'AAOIFI', nom: 'Accounting and Auditing Organization for Islamic Financial Institutions', siege: 'Bahreïn', role: 'Standards de structuration Sukuk, FCP islamiques, contrats Mourabaha/Ijara. Référence mondiale.', accent: '#1A7A4A' },
  { org: 'IFSB', nom: 'Islamic Financial Services Board', siege: 'Malaisie', role: 'Standards prudentiels et de gouvernance pour les institutions financières islamiques.', accent: '#C8972B' },
  { org: 'IsDB', nom: 'Banque Islamique de Développement', siege: 'Arabie Saoudite (Jeddah)', role: "Partenaire potentiel co-financement. Programme IsDB Engage pour fintech africaines.", accent: '#1A7A4A' },
];

export default function ComiteChariaPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-[#0a0a0a] overflow-x-hidden">

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center px-4 sm:px-6 lg:px-8 pt-10 pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full" style={{ background: 'radial-gradient(circle, #dcf0e4 0%, transparent 65%)' }} />
          <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full" style={{ background: 'radial-gradient(circle, #fef9ec 0%, transparent 70%)' }} />
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `url(${img('Islamic Pattern Background.jpeg')})`, backgroundSize: '200px' }} />
        </div>

        {/* Ornamental divider as BG accent */}
        <div className="absolute bottom-0 left-0 right-0 h-24 opacity-10 pointer-events-none">
          <img src={img('Ornate_Islamic_geometric_horizontal_border_divider,_202605060937.jpeg')} alt="" className="w-full h-full object-cover object-top" />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
              <Link to="/finance-islamique" className="inline-flex items-center gap-2 text-gray-400 text-xs font-semibold mb-10 hover:text-gray-700 transition-colors tracking-widest uppercase">
                ← Finance Islamique
              </Link>

              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#e8f5ee] border border-[#1A7A4A]/20 rounded-full text-[#1A7A4A] text-xs font-bold mb-8">
                <ShieldCheck className="w-3.5 h-3.5" />
                Gouvernance indépendante · Transparence totale
              </div>

              <h1 className="font-display font-black tracking-tight leading-[0.9] mb-8" style={{ fontSize: 'clamp(52px, 8vw, 96px)' }}>
                Comité<br />
                <span style={{ background: 'linear-gradient(135deg, #1A7A4A, #2da55e)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Charia
                </span>
              </h1>

              <p className="text-gray-500 text-lg leading-relaxed mb-10 max-w-md">
                La conformité Charia ne s'auto-déclare pas. Notre Comité indépendant — 3 scholars qualifiés —
                valide chaque produit, contrat et smart contract avant commercialisation.
              </p>

              <div className="flex flex-wrap gap-2 mb-10">
                {['3 scholars indépendants', 'Standards AAOIFI', 'Avis publics IPFS', 'Audit annuel', 'Rapport Charia public'].map((tag, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-full bg-[#e8f5ee] border border-[#1A7A4A]/15 text-[11px] font-bold text-[#1A7A4A]">{tag}</span>
                ))}
              </div>

              {/* Why SSB quick hits */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Award, label: 'Crédibilité', desc: 'Condition pour attirer les capitaux GCC' },
                  { icon: FileText, label: 'Protection juridique', desc: 'Contre le halal-washing' },
                  { icon: Globe, label: 'Accès mondial', desc: '800+ Mds USD de Sukuk émis' },
                  { icon: Users, label: 'Confiance', desc: 'Investisseurs et PME musulmans' },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="flex items-start gap-3 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                      <div className="w-8 h-8 rounded-xl bg-[#e8f5ee] flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-[#1A7A4A]" />
                      </div>
                      <div>
                        <p className="font-bold text-[#0a0a0a] text-xs">{item.label}</p>
                        <p className="text-gray-400 text-[10px] mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Right — star ornament + islamic pattern */}
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="relative h-[520px]">
              {/* Large star ornament */}
              <div className="absolute inset-8 flex items-center justify-center">
                <motion.img
                  src={img('Islamic Star Ornament-Photoroom.png')}
                  alt=""
                  className="w-full h-full object-contain"
                  animate={{ rotate: [0, 5, 0, -5, 0] }}
                  transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ opacity: 0.15 }}
                />
              </div>

              {/* Scholar cards floating */}
              {SCHOLARS.map((s, i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, i % 2 === 0 ? -8 : 8, 0] }}
                  transition={{ duration: 3.5 + i * 0.7, repeat: Infinity, ease: 'easeInOut', delay: i * 0.8 }}
                  className="absolute bg-white rounded-2xl shadow-xl border border-gray-100 p-4"
                  style={{
                    top: i === 0 ? '10%' : i === 1 ? '42%' : '70%',
                    left: i === 1 ? '40%' : '5%',
                    right: i === 0 ? '10%' : i === 2 ? '5%' : undefined,
                    width: 220,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-black" style={{ backgroundColor: s.accent }}>
                      {s.initiales}
                    </div>
                    <div>
                      <p className="font-bold text-[#0a0a0a] text-xs leading-tight">{s.nom}</p>
                      <p className="text-gray-400 text-[10px] mt-0.5">{s.origine} · {s.experience}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SCHOLARS ──────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto">
          <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-14">
            <p className="text-[#C8972B] text-xs font-bold tracking-widest uppercase mb-3">Membres</p>
            <h2 className="font-display font-black text-[#0a0a0a] tracking-tight" style={{ fontSize: 'clamp(28px, 4.5vw, 52px)' }}>
              Sharia Supervisory Board
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {SCHOLARS.map((scholar, i) => (
              <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} whileHover={{ y: -4, transition: { duration: 0.2 } }}>
                <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden hover:border-gray-200 hover:shadow-xl hover:shadow-black/5 transition-all h-full">
                  {/* Top accent */}
                  <div className="h-1" style={{ backgroundColor: scholar.accent }} />

                  <div className="p-7">
                    {/* Avatar + name */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-lg font-black shrink-0" style={{ backgroundColor: scholar.accent }}>
                        {scholar.initiales}
                      </div>
                      <div>
                        <h3 className="font-display font-black text-[#0a0a0a] text-lg leading-tight">{scholar.nom}</h3>
                        <p className="text-gray-400 text-xs mt-0.5">{scholar.titre}</p>
                        <p className="text-xs font-bold mt-1" style={{ color: scholar.accent }}>{scholar.origine} · {scholar.experience} d'expérience</p>
                      </div>
                    </div>

                    <p className="text-gray-400 text-xs leading-relaxed mb-5 pb-5 border-b border-gray-100">{scholar.formation}</p>

                    <div className="mb-5">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Spécialités</p>
                      <ul className="space-y-1.5">
                        {scholar.specialites.map((s, j) => (
                          <li key={j} className="flex items-center gap-2 text-xs text-gray-600">
                            <span className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: scholar.accent }} />
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Certifications</p>
                      <div className="flex flex-wrap gap-2">
                        {scholar.certifications.map((c, j) => (
                          <span key={j} className="text-[10px] font-bold px-2.5 py-1 rounded-lg" style={{ backgroundColor: scholar.accent + '12', color: scholar.accent }}>
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ───────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <p className="text-[#1A7A4A] text-xs font-bold tracking-widest uppercase mb-3">Processus</p>
            <h2 className="font-display font-black text-[#0a0a0a] tracking-tight" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
              Comment un produit obtient l'avis Charia ?
            </h2>
          </motion.div>

          <div className="relative">
            <div className="hidden lg:block absolute top-6 left-12 right-12 h-px bg-gradient-to-r from-[#1A7A4A] via-[#C8972B] to-[#1A7A4A]" />
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {PROCESS.map((step, i) => (
                <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white text-xs font-black mb-5 relative z-10" style={{ backgroundColor: i % 2 === 0 ? '#1A7A4A' : '#C8972B' }}>
                    {step.num}
                  </div>
                  <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white mb-3 inline-block" style={{ backgroundColor: i % 2 === 0 ? '#1A7A4A' : '#C8972B' }}>
                      {step.duree}
                    </span>
                    <h3 className="font-bold text-[#0a0a0a] text-sm mb-2">{step.titre}</h3>
                    <p className="text-gray-400 text-xs leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── AVIS PUBLICS ──────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto">
          <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-14">
            <p className="text-[#C8972B] text-xs font-bold tracking-widest uppercase mb-3">Registre public</p>
            <h2 className="font-display font-black text-[#0a0a0a] tracking-tight" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
              Avis Charia publiés
            </h2>
          </motion.div>

          <div className="space-y-4">
            {AVIS.map((avis, i) => (
              <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <div className="bg-white rounded-3xl border border-gray-100 p-6 hover:border-gray-200 hover:shadow-md transition-all">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-[10px] font-bold px-2.5 py-1 rounded-full text-white" style={{ backgroundColor: avis.statut === 'Conforme' ? '#1A7A4A' : '#C8972B' }}>
                          {avis.statut}
                        </span>
                        <code className="text-[10px] font-mono text-gray-400">{avis.ref}</code>
                        <span className="text-[10px] text-gray-400">{avis.date}</span>
                      </div>
                      <h3 className="font-bold text-[#0a0a0a] mb-2">{avis.produit}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{avis.resume}</p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Scholars</p>
                      <p className="text-xs font-bold text-[#0a0a0a]">{avis.scholars}</p>
                      <div className="flex items-center gap-1.5 mt-3 justify-end">
                        <Lock className="w-3 h-3 text-[#1A7A4A]" />
                        <span className="text-[10px] text-[#1A7A4A] font-bold">IPFS stocké</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BLOCKCHAIN IPFS DARK ──────────────────────────────────── */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#0a1a0f] overflow-hidden">
        <div className="absolute inset-0">
          <img src={img('Blockchain + Islamic Finance.jpeg')} alt="" className="w-full h-full object-cover opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1a0f] via-[#0a1a0f]/90 to-[#0a1a0f]/70" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <p className="text-[#4ade80] text-xs font-bold tracking-widest uppercase mb-4">Transparence radicale</p>
              <h2 className="font-display font-black text-white tracking-tight leading-tight mb-6" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
                Chaque avis Charia<br />stocké sur IPFS
              </h2>
              <p className="text-white/50 text-base leading-relaxed mb-8">
                Contrairement aux Comités Charia traditionnels dont les avis restent confidentiels, QPB publie chaque avis formel sur IPFS — un stockage décentralisé immuable. N'importe qui peut vérifier la conformité de n'importe quel produit QPB.
              </p>
              <ul className="space-y-4">
                {[
                  { icon: ShieldCheck, text: 'Avis Charia signé par le Président du Comité' },
                  { icon: Lock, text: 'Stockage IPFS — immuable et décentralisé' },
                  { icon: Globe, text: 'Hash IPFS publié dans le smart contract Sukuk' },
                  { icon: FileText, text: 'Rapport Charia annuel global publié sur la plateforme' },
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
              {/* Standards cards */}
              {STANDARDS.map((s, i) => (
                <div key={i} className="rounded-2xl p-5 border border-white/10 bg-white/5 backdrop-blur-sm">
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full text-white" style={{ backgroundColor: s.accent }}>{s.org}</span>
                    <span className="text-[10px] text-white/30">{s.siege}</span>
                  </div>
                  <p className="text-[10px] text-white/40 font-medium mb-2">{s.nom}</p>
                  <p className="text-white/60 text-xs leading-relaxed">{s.role}</p>
                </div>
              ))}

              <div className="flex items-start gap-3 text-xs text-white/30 rounded-2xl p-4 border border-white/10 bg-white/5">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#C8972B]" />
                Visa COSUMAF en cours. Les avis Charia sont complémentaires à la réglementation prudentielle COBAC et COSUMAF.
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="relative bg-[#0a1a0f] rounded-[2.5rem] overflow-hidden px-10 py-20 md:px-16 text-center">
              {/* Ornamental divider top */}
              <div className="absolute top-0 left-0 right-0 h-16 opacity-20">
                <img src={img('Ornate_Islamic_geometric_horizontal_border_divider,_202605060937.jpeg')} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C8972B]/50 to-transparent" />
              <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url(${img('Islamic Pattern Background.jpeg')})`, backgroundSize: '150px' }} />

              <div className="relative z-10">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#1A7A4A]/20 border border-[#1A7A4A]/30 rounded-full text-[#4ade80] text-xs font-bold mb-8">
                  <ShieldCheck className="w-3.5 h-3.5" /> Gouvernance islamique indépendante
                </span>
                <h2 className="font-display font-black text-white tracking-tight mb-6" style={{ fontSize: 'clamp(28px, 5vw, 60px)' }}>
                  La certification Charia<br />que vous méritez
                </h2>
                <p className="text-white/50 text-base max-w-xl mx-auto mb-12">
                  Chaque produit QPB est validé par des scholars reconnus internationalement avant commercialisation. Zéro compromis sur la conformité.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/inscription" className="group px-10 py-4 bg-[#b4ff39] text-[#0a0a0a] font-black rounded-full hover:bg-white transition-colors inline-flex items-center gap-2 text-sm">
                    Ouvrir un compte Halal
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link to="/finance-islamique" className="px-10 py-4 border border-white/20 text-white font-bold rounded-full hover:bg-white/10 transition-colors text-sm">
                    Tous les produits islamiques
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
