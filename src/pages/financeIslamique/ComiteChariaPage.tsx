import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ShieldCheck, BookOpen, Globe, FileText, Award, Lock, ArrowRight, CheckCircle2, Users, Star } from 'lucide-react';

const img = (name: string) => encodeURI(`/images/${name}`);

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  }),
};

const SCHOLARS = [
  {
    nom: 'Dr. Moussa Mbaye', titre: 'Président du Comité Charia QPB', origine: 'Sénégal',
    formation: 'Doctorat Jurisprudence Islamique — Université Al-Azhar, Le Caire',
    specialites: ['Muamalat (transactions islamiques)', 'Fiqh al-Mal (droit financier)', 'Sukuk & instruments de dette'],
    certifications: ['AAOIFI Certified Sharia Advisor', 'IFSB Expert Panel'],
    experience: '18 ans', initiales: 'MM', couleur: 'from-[#1A7A4A] to-[#0a2a15]',
  },
  {
    nom: 'Sheikh Abdullah Al-Rashidi', titre: 'Scholar International — GCC', origine: 'Koweït',
    formation: 'Maîtrise Économie Islamique — IIUM Malaisie',
    specialites: ['Sukuk structuration', 'Islamic banking windows', 'Takaful et assurance islamique'],
    certifications: ['AAOIFI Board Member', 'Kuwait Finance House Advisor'],
    experience: '22 ans', initiales: 'AR', couleur: 'from-[#1a1a2e] to-[#0a0a0a]',
  },
  {
    nom: 'Prof. Fatimah Noor binti Yusof', titre: 'Scholar International — Malaisie', origine: 'Malaisie',
    formation: 'PhD Islamic Finance — INCEIF, Kuala Lumpur',
    specialites: ['FCP islamiques (Moudharaba)', 'Smart contracts et blockchain Charia', 'Finance participative digitale'],
    certifications: ['BNM Registered Sharia Advisor', 'ISRA Research Fellow'],
    experience: '15 ans', initiales: 'FN', couleur: 'from-[#2a0a4a] to-[#0d060a]',
  },
];

const PROCESS = [
  { num: '01', icon: FileText, titre: 'Soumission', desc: "L'équipe QPB soumet le dossier complet : fiche produit, contrat, structure smart contract.", duree: 'J+0' },
  { num: '02', icon: BookOpen, titre: 'Analyse', desc: 'Un scholar analyse la conformité sectorielle et structurelle selon AAOIFI et IFSB.', duree: 'J+2 à J+5' },
  { num: '03', icon: Users, titre: 'Délibération', desc: 'Les 3 scholars délibèrent. Vote à la majorité qualifiée (2/3 minimum requis).', duree: 'J+7 à J+14' },
  { num: '04', icon: Award, titre: 'Avis formel', desc: "Rédaction de l'avis signé par le Président. Publication immuable sur IPFS.", duree: 'J+15' },
];

const AVIS = [
  { ref: 'AVIS-001', produit: 'Sukuk Ijara — Résidence Al-Amal Douala', date: '15 Mars 2026', statut: 'Conforme', scholars: 'Mbaye, Al-Rashidi, Noor', resume: "La structure Sukuk Ijara est conforme aux normes AAOIFI Standard No.17. Actif sous-jacent immobilier identifié, cash flows licites." },
  { ref: 'AVIS-002', produit: 'FCP Moudharaba Actions CEMAC — QPBMAC', date: '01 Avril 2026', statut: 'Conforme', scholars: 'Mbaye, Noor', resume: "Le FCP respecte le principe Moudharaba. Screening Charia automatique validé. Exclusions sectorielles conformes AAOIFI." },
  { ref: 'AVIS-003', produit: 'Crowdfunding Moucharaka — Coopérative Garoua', date: '20 Avril 2026', statut: 'Conforme', scholars: 'Mbaye', resume: "Projet agricole intégralement halal. Structure Moucharaka avec partage bénéfices valide selon la jurisprudence islamique." },
  { ref: 'AVIS-004', produit: 'Mourabaha Commerciale Standard', date: '30 Avril 2026', statut: 'Avec réserves', scholars: 'Al-Rashidi, Noor', resume: "Conforme sous réserve : la clause de pénalité de retard doit être versée intégralement à une œuvre caritative." },
];

const STANDARDS = [
  { org: 'AAOIFI', nom: 'Accounting and Auditing Organization for Islamic Financial Institutions', siege: 'Bahreïn', role: 'Standards de structuration Sukuk, FCP islamiques, contrats Mourabaha/Ijara.', icon: ShieldCheck },
  { org: 'IFSB', nom: 'Islamic Financial Services Board', siege: 'Malaisie', role: 'Standards prudentiels et de gouvernance pour les institutions financières islamiques.', icon: Globe },
  { org: 'IsDB', nom: 'Banque Islamique de Développement', siege: 'Jeddah', role: "Partenaire potentiel co-financement. Programme IsDB Engage pour fintech africaines.", icon: Star },
];

const POURQUOI = [
  { titre: 'Indépendance totale', desc: 'Le Comité est juridiquement indépendant de QPB. Aucun produit ne peut être commercialisé sans son avis favorable.' },
  { titre: 'Experts internationaux', desc: '3 scholars certifiés AAOIFI, formés en Égypte, Malaisie et au GCC. Plus de 55 ans d\'expérience cumulée.' },
  { titre: 'Avis publiés sur IPFS', desc: 'Chaque avis est archivé de façon immuable sur la blockchain. Transparent et vérifiable par tous.' },
  { titre: 'Mise à jour continue', desc: 'Le Comité réévalue chaque produit semestriellement. Votre investissement reste conforme dans le temps.' },
];

export default function ComiteChariaPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f4f4f0] text-[#0a0a0a] selection:bg-[#bef264] selection:text-black">

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
            <ShieldCheck className="w-4 h-4 text-[#bef264]" />
            Gouvernance indépendante · AAOIFI
          </div>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 font-black tracking-tighter leading-[0.85] mb-8 text-white" style={{ fontSize: 'clamp(64px, 11vw, 140px)' }}>
          Comité<br />
          <span className="text-white/18">Charia.</span>
        </motion.h1>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
          className="relative z-10 text-white/60 text-xl leading-relaxed mb-10 max-w-xl mx-auto">
          La conformité Charia ne s'auto-déclare pas. Notre Comité indépendant — 3 scholars qualifiés — valide chaque produit avant commercialisation.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="relative z-10 flex flex-wrap gap-4 justify-center mb-20">
          <a href="#avis" className="px-10 py-5 bg-[#bef264] text-black font-black rounded-full text-lg hover:scale-105 hover:shadow-2xl hover:shadow-[#bef264]/40 transition-all duration-300">
            Consulter les avis
          </a>
          <a href="#scholars" className="px-10 py-5 bg-white/10 border border-white/25 text-white font-black rounded-full text-lg hover:bg-white/20 backdrop-blur-sm transition-all duration-300">
            Nos scholars
          </a>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 1, ease: [0.22, 1, 0.36, 1] }} className="relative z-10 mb-0">
          <motion.div animate={{ y: [0, -14, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
            <div className="relative w-72 rounded-[2.5rem] overflow-hidden shadow-2xl bg-gradient-to-br from-[#3a2800] to-[#0a0800]">
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#bef264]" />
                    <span className="text-[#bef264] text-[10px] font-black uppercase tracking-widest">AAOIFI · Certifié</span>
                  </div>
                  <Award className="w-5 h-5 text-[#bef264]/50" />
                </div>
                <p className="text-white/60 text-xs font-black uppercase tracking-widest mb-2">Avis rendus</p>
                <p className="text-white text-4xl font-black tracking-tighter mb-1">5</p>
                <p className="text-[#bef264] text-sm font-black mb-8">100% indépendants</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/10 rounded-2xl p-4">
                    <p className="text-white/50 text-[10px] font-black uppercase mb-1">Scholars</p>
                    <p className="text-white text-lg font-black">3 experts</p>
                  </div>
                  <div className="bg-white/10 rounded-2xl p-4">
                    <p className="text-white/50 text-[10px] font-black uppercase mb-1">Délai</p>
                    <p className="text-white text-lg font-black">15 jours</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#f4f4f0] to-transparent pointer-events-none" />
      </section>

      {/* ── POURQUOI COMITÉ CHARIA ── */}
      <section className="py-32 px-6 bg-[#f4f4f0]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative">
              <div className="relative rounded-[3rem] overflow-hidden aspect-[4/5]">
                <img src={img('Business handshake Islamic finance.jpeg')} alt="Finance islamique" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 shadow-2xl">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.25em] mb-2">Normes respectées</p>
                    <div className="flex gap-2 flex-wrap">
                      {['AAOIFI', 'IFSB', 'COBAC'].map((s) => (
                        <span key={s} className="px-3 py-1.5 rounded-full bg-[#bef264] text-black text-[10px] font-black">{s}</span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 mt-4">
                      <div className="w-2 h-2 rounded-full bg-[#1A7A4A]" />
                      <p className="text-xs font-black text-[#1A7A4A]">Avis publiés sur IPFS · Vérifiables</p>
                    </div>
                  </div>
                </div>
              </div>
              <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute -top-8 -right-8 w-20 h-20 hidden lg:block">
                <img src={img('Islamic Star Ornament-Photoroom.png')} alt="" className="w-full h-full object-contain" />
              </motion.div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-[#1A7A4A] mb-6">Gouvernance</p>
              <h2 className="text-5xl lg:text-6xl font-black tracking-tighter leading-none mb-8">
                Pourquoi un<br />Comité Charia ?
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-12">
                En finance islamique, un produit ne peut pas se déclarer halal tout seul. Il faut l'avis d'un scholar qualifié qui analyse la structure, le contrat et les flux financiers. C'est le rôle de notre Comité : votre garantie que chaque produit NKAP est conforme à la Charia.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {POURQUOI.map((p, i) => (
                  <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                    className="p-6 rounded-[1.5rem] bg-white border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                    <div className="w-8 h-8 rounded-lg bg-[#bef264] flex items-center justify-center mb-4">
                      <CheckCircle2 className="w-4 h-4 text-black" />
                    </div>
                    <p className="font-black text-sm mb-2">{p.titre}</p>
                    <p className="text-gray-400 text-xs leading-relaxed">{p.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SCHOLARS ── */}
      <section id="scholars" className="py-32 px-6 bg-[#0a0a0a] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: `url(${img('Islamic Pattern Background.jpeg')})`, backgroundSize: '260px', backgroundRepeat: 'repeat' }} />
        <div className="absolute top-0 left-1/4 w-[500px] h-[400px] bg-[#1A7A4A]/10 blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-24">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[#bef264] mb-6">Membres</p>
            <h2 className="text-5xl lg:text-7xl font-black tracking-tighter leading-none">
              Sharia Supervisory<br />Board.
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {SCHOLARS.map((s, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                whileHover={{ y: -10 }}
                className="group rounded-[3rem] border border-white/10 overflow-hidden bg-white/5 backdrop-blur-xl hover:bg-white/10 transition-all duration-500">
                <div className={`h-3 bg-gradient-to-r ${s.couleur}`} />
                <div className="p-10">
                  <div className="flex items-center gap-5 mb-8">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${s.couleur} flex items-center justify-center text-[#bef264] text-xl font-black shrink-0`}>{s.initiales}</div>
                    <div>
                      <h3 className="text-xl font-black tracking-tighter">{s.nom}</h3>
                      <p className="text-white/40 text-xs font-bold uppercase tracking-widest mt-1">{s.titre}</p>
                      <p className="text-xs font-black text-[#bef264] mt-1">{s.origine} · {s.experience}</p>
                    </div>
                  </div>
                  <p className="text-white/40 text-sm leading-relaxed mb-8 pb-8 border-b border-white/10">{s.formation}</p>
                  <div className="mb-8">
                    <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-4">Spécialités</p>
                    <ul className="space-y-2">
                      {s.specialites.map((sp, j) => (
                        <li key={j} className="flex items-center gap-3 text-sm text-white/70">
                          <span className="w-2 h-2 rounded-full bg-[#bef264] shrink-0" /> {sp}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-4">Certifications</p>
                    <div className="flex flex-wrap gap-2">
                      {s.certifications.map((c, j) => (
                        <span key={j} className="text-[10px] font-black px-3 py-1.5 rounded-full bg-[#bef264]/15 text-[#bef264]">{c}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="py-32 px-6 bg-[#f4f4f0]">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-24">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[#1A7A4A] mb-6">Processus</p>
            <h2 className="text-5xl lg:text-7xl font-black tracking-tighter leading-none">Comment obtenir<br />l'avis Charia ?</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS.map((step, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                whileHover={{ y: -8 }}
                className="relative p-10 rounded-[2.5rem] bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-[#0a1a0f] flex items-center justify-center mb-8">
                  <step.icon className="w-7 h-7 text-[#bef264]" />
                </div>
                <p className="text-6xl font-black tracking-tighter text-gray-100 absolute top-8 right-8">{step.num}</p>
                <div className="inline-block px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 bg-[#bef264] text-black">{step.duree}</div>
                <h3 className="text-2xl font-black tracking-tighter mb-4">{step.titre}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                {i < PROCESS.length - 1 && (
                  <div className="absolute top-1/2 -right-3 w-6 h-0.5 bg-gray-200 hidden lg:block" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AVIS PUBLICS ── */}
      <section id="avis" className="py-32 px-6 bg-[#0a0a0a] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: `url(${img('Islamic Pattern Background.jpeg')})`, backgroundSize: '240px', backgroundRepeat: 'repeat' }} />
        <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-[#bef264]/6 blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-24">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[#bef264] mb-6">Registre public</p>
            <h2 className="text-5xl lg:text-7xl font-black tracking-tighter leading-none">Avis Charia<br />publiés.</h2>
          </motion.div>
          <div className="space-y-6">
            {AVIS.map((avis, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                whileHover={{ x: 8 }}
                className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 hover:bg-white/10 transition-all duration-500">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-6 flex-wrap">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase ${avis.statut === 'Conforme' ? 'bg-[#bef264] text-black' : 'bg-white/20 text-white/70'}`}>{avis.statut}</span>
                      <code className="text-[10px] font-mono text-white/30">{avis.ref}</code>
                      <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">{avis.date}</span>
                    </div>
                    <h3 className="text-xl font-black tracking-tighter mb-3">{avis.produit}</h3>
                    <p className="text-white/50 text-base leading-relaxed">{avis.resume}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-2">Scholars</p>
                    <p className="text-sm font-black">{avis.scholars}</p>
                    <div className="flex items-center gap-2 mt-4 justify-end">
                      <Lock className="w-4 h-4 text-[#bef264]" />
                      <span className="text-[10px] font-black text-[#bef264] uppercase tracking-widest">IPFS stocké</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── IMMERSIVE ── */}
      <section className="relative h-[65vh] min-h-[480px] overflow-hidden">
        <img src={img('Blockchain + Islamic Finance.jpeg')} alt="Blockchain & finance islamique" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/85 via-[#0a0a0a]/60 to-transparent" />
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: `url(${img('Islamic Pattern Background.jpeg')})`, backgroundSize: '200px', backgroundRepeat: 'repeat' }} />
        <div className="relative z-10 h-full flex items-center px-6 lg:px-20">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl">
            <p className="text-[#bef264] text-xs font-black uppercase tracking-[0.3em] mb-6">Transparence · Blockchain</p>
            <h2 className="text-5xl lg:text-7xl font-black tracking-tighter leading-none text-white mb-8">
              Chaque avis,<br />immuable sur<br />la blockchain.
            </h2>
            <p className="text-white/60 text-lg leading-relaxed mb-10 max-w-lg">
              Les avis du Comité Charia sont archivés sur IPFS et référencés sur la blockchain. Vérifiables par n'importe qui, à tout moment. Zéro manipulation possible.
            </p>
            <a href="#avis" className="inline-flex items-center gap-3 px-10 py-5 bg-[#bef264] text-black font-black rounded-full text-lg hover:scale-105 transition-all duration-300">
              Consulter les avis <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── STANDARDS ── */}
      <section className="py-32 px-6 bg-[#f4f4f0]">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-24">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[#1A7A4A] mb-6">Référentiels</p>
            <h2 className="text-5xl lg:text-7xl font-black tracking-tighter leading-none">
              Standards<br />internationaux.
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {STANDARDS.map((s, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                whileHover={{ y: -8 }}
                className="group p-10 rounded-[2.5rem] bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500">
                <div className="flex items-start gap-5 mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-[#0a1a0f] flex items-center justify-center shrink-0 group-hover:bg-[#1A7A4A] transition-colors duration-300">
                    <s.icon className="w-7 h-7 text-[#bef264]" />
                  </div>
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full bg-[#bef264] text-black text-[10px] font-black mb-2">{s.org}</span>
                    <p className="text-gray-400 text-xs font-bold">{s.siege}</p>
                  </div>
                </div>
                <h3 className="text-lg font-black tracking-tighter mb-4 leading-snug">{s.nom}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.role}</p>
              </motion.div>
            ))}
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
              <p className="text-[#bef264] text-xs font-black uppercase tracking-[0.3em] mb-6 relative z-10">Comité Charia QPB</p>
              <h2 className="text-5xl lg:text-8xl font-black tracking-tighter leading-none mb-8 text-white relative z-10">
                La certification<br />que vous méritez.
              </h2>
              <p className="text-white/50 text-xl leading-relaxed max-w-xl mx-auto mb-12 relative z-10">
                Chaque produit QPB est validé par des scholars reconnus internationalement. Zéro compromis sur la conformité Charia.
              </p>
              <div className="flex flex-wrap gap-4 justify-center relative z-10">
                <Link to="/inscription" className="px-14 py-7 bg-[#bef264] text-black font-black rounded-full text-xl hover:scale-105 transition-all duration-300">
                  Ouvrir un compte Halal
                </Link>
                <a href="#scholars" className="px-14 py-7 bg-white/10 border border-white/25 text-white font-black rounded-full text-xl hover:bg-white/20 transition-all duration-300">
                  Voir nos scholars
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
