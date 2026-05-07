import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Building2, TrendingUp, Star, Users, Zap, FileText,
  Check, Lock, Layers, ArrowUpRight
} from 'lucide-react';
import { cn } from '../../lib/utils';

const img = (name: string) => encodeURI(`/images/${name}`);

function AnimatedCounter({ end, suffix = "", duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref as any, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!inView) return;
    let startTime: number | null = null;
    let frame: number;
    const tick = (ts: number) => {
      if (!startTime) startTime = ts;
      const pct = Math.min((ts - startTime) / duration, 1);
      setCount(Math.floor(end * (pct === 1 ? 1 : 1 - Math.pow(2, -10 * pct))));
      if (pct < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [end, inView, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const SERVICES = [
  {
    num: '01', titre: 'Accès au Financement',
    sous: 'Banques · EMF · SDB · Co-financement',
    desc: "Publiez votre besoin de financement. Des dizaines d'établissements vous répondent avec des offres concrètes — taux, durée, garanties — en moins de 48h. Comparez sans bouger de votre bureau.",
    bg: 'bg-[#0a0a0a]', text: 'text-white', badge: 'Mise en relation',
  },
  {
    num: '02', titre: "Rating d'Entreprise",
    sous: 'AAA → D · COSUMAF conforme',
    desc: "Obtenez une notation de solvabilité officielle pour rassurer vos partenaires financiers, négocier de meilleurs taux et débloquer des financements plus importants. Résultat en 5 jours ouvrés.",
    bg: 'bg-[#bef264]', text: 'text-[#0a0a0a]', badge: 'Crédibilité',
  },
  {
    num: '03', titre: 'Crowdfunding',
    sous: 'Don avec récompense · Prêt participatif',
    desc: "Levez des fonds auprès de la communauté NKAP via le don avec récompense (reward) ou le prêt participatif remboursé avec intérêts (crowdlending). Campagne active en 48h.",
    bg: 'bg-[#f4f4f0]', text: 'text-[#0a0a0a]', badge: 'Financement participatif',
  },
  {
    num: '04', titre: 'Finance Islamique',
    sous: 'Mourabaha · Moucharaka · Sukuk',
    desc: "Financez vos projets sans intérêt. Mourabaha pour vos achats de biens et équipements, Moucharaka pour des partenariats d'investissement, Sukuk pour de grands projets d'infrastructure.",
    bg: 'bg-[#0a1a0f]', text: 'text-white', badge: '100% Halal · AAOIFI',
  },
  {
    num: '05', titre: "Tokenisation d'actifs",
    sous: 'Immobilier · Agro · Infrastructure',
    desc: "Transformez vos actifs réels (immobilier, plantations, entrepôts) en tokens numériques échangeables. Des centaines d'investisseurs participent depuis 10 000 FCFA par token.",
    bg: 'bg-[#e5ecf6]', text: 'text-[#0a0a0a]', badge: 'Blockchain · BVMAC',
  },
  {
    num: '06', titre: 'Gestion & IA',
    sous: 'Trésorerie · Recommandations · Documents',
    desc: "Notre IA analyse votre profil et vous recommande les meilleures options. Optimisez votre trésorerie et centralisez vos documents financiers dans un coffre-fort sécurisé AES-256.",
    bg: 'bg-white', text: 'text-[#0a0a0a]', badge: 'Intelligence artificielle',
  },
];

const STATS = [
  { end: 52, suffix: '', label: 'Institutions partenaires', sub: 'Banques, EMF, SDB, AM', bg: 'bg-[#bef264] text-[#0a0a0a]' },
  { end: 137, suffix: '', label: 'Entreprises financées', sub: 'Cameroun & CEMAC', bg: 'bg-white text-[#0a0a0a]' },
  { end: 48, suffix: 'h', label: 'Délai moyen', sub: 'Première offre reçue', bg: 'bg-[#141517] text-white border border-white/5' },
  { end: 98, suffix: '%', label: 'Satisfaction clients', sub: 'Entreprises certifiées', bg: 'bg-[#141517] text-white border border-white/5' },
];

const PROCESS = [
  { num: '01', icon: Building2, titre: 'Profil entreprise', desc: "Renseignez votre dénomination, secteur, CA. Vérification KYC par notre équipe en moins de 48h.", duree: '5 min' },
  { num: '02', icon: FileText, titre: 'Documents financiers', desc: "Uploadez bilans (3 ans), registre de commerce, statuts. Coffre-fort AES-256, RGPD compatible.", duree: '10 min' },
  { num: '03', icon: TrendingUp, titre: 'Publication du besoin', desc: "Montant, durée, objet. Transmis aux institutions qualifiées. Premières offres sous 48h ouvrés.", duree: '3 min' },
  { num: '04', icon: Check, titre: 'Comparaison & accord', desc: "Comparez taux, durées et garanties. Messagerie intégrée pour négocier. Finalisez à votre rythme.", duree: 'À votre rythme' },
];

const COMMISSIONS = [
  { service: 'Mise en relation financement', tarif: '1,5%', base: 'du montant financé', note: 'Payable à la finalisation uniquement' },
  { service: "Rating d'entreprise", tarif: '150 000 FCFA', base: 'par dossier', note: 'Résultat en 5 jours ouvrés' },
  { service: 'Crowdfunding (don / prêt)', tarif: '3%', base: 'des fonds collectés', note: "Uniquement si l'objectif est atteint" },
  { service: 'Abonnement Professionnel', tarif: '25 000 FCFA', base: '/mois · 250 000/an', note: 'Accès illimité à tous les services' },
];

const PARTENAIRES = [
  'Afriland First Bank', 'Ecobank Cameroun', 'UBA Cameroun', 'SGBC', 'CCA Bank',
  'BICEC', 'BGFI Bank', 'Société Générale', 'National Financial Credit',
  'COBAC', 'BVMAC', 'COSUMAF', 'Atlantic Business International', 'Crédit du Sahel',
  'SCB Cameroun', 'CBC Bank', 'Banque Atlantique', 'CEMAC Finance',
];

const ISLAMIQUE = [
  { titre: 'Mourabaha', lien: '/finance-islamique/mourabaha', desc: 'Financement halal pour achats de biens, équipements et matières premières. Marge fixe, 0% intérêt, validé Comité Charia.', emoji: '🏪', badge: 'Achat de biens' },
  { titre: 'Moucharaka', lien: '/finance-islamique/crowdfunding-halal', desc: 'Partenariat en capital avec la communauté NKAP. Les investisseurs financent votre projet, bénéfices partagés au prorata.', emoji: '🤝', badge: 'Levée de fonds' },
  { titre: 'Sukuk', lien: '/finance-islamique/sukuk', desc: 'Obligations islamiques pour grands projets d\'infrastructure, immobilier ou agro-industrie CEMAC. Dès 10M FCFA.', emoji: '📊', badge: 'Grands projets' },
];

export default function EntrepriseHub() {
  const stackRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col w-full overflow-x-clip bg-[#0a0a0a] text-white selection:bg-[#bef264] selection:text-black">

      {/* ── HERO ── */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-32 pb-20 md:pt-44 md:pb-28 bg-[#0a0a0a] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-full opacity-15">
            <div className="absolute top-[10%] left-[15%] w-[550px] h-[550px] bg-[#bef264] rounded-full blur-[160px]" />
            <div className="absolute top-[30%] right-[5%] w-[450px] h-[450px] bg-[#1A7A4A] rounded-full blur-[160px]" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white text-sm font-black mb-10">
            <span className="bg-[#bef264] text-[#0a0a0a] px-2 py-0.5 rounded-full text-xs mr-1 uppercase tracking-wider">Pro</span>
            Espace Professionnel — Entreprises CEMAC
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="font-black text-5xl md:text-7xl lg:text-[5.5rem] tracking-tighter leading-[0.9] mb-8">
                Levez des fonds.<br />
                <span className="text-[#bef264]">Développez votre</span><br />
                entreprise.
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="text-white/50 text-lg font-medium mb-10 max-w-lg leading-relaxed">
                NKAP connecte les entreprises CEMAC avec 52+ institutions financières. Publiez votre besoin, recevez des offres réelles en moins de 48h. Banques, EMF, crowdfunding, finance islamique — tout en un.
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4">
                <Link to="/professionnel/tableau-de-bord"
                  className="px-8 py-4 bg-[#bef264] text-[#0a0a0a] font-black rounded-full hover:bg-white transition-colors flex items-center gap-2 justify-center text-base">
                  Accéder à mon espace <ArrowRight className="w-5 h-5" />
                </Link>
                <a href="#services"
                  className="px-8 py-4 border border-white/20 text-white font-black rounded-full hover:bg-white/10 transition-colors flex items-center gap-2 justify-center text-base">
                  Voir les services
                </a>
              </motion.div>
            </div>

            {/* Floating dashboard */}
            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
              className="relative hidden lg:block">
              <div className="bg-[#141517] border border-white/5 rounded-[2rem] p-7 mb-4 shadow-2xl">
                <div className="flex items-center justify-between mb-5">
                  <span className="text-xs font-black text-white/40 uppercase tracking-widest">Offres reçues · Dossier #47</span>
                  <span className="px-3 py-1 bg-[#bef264]/15 text-[#bef264] rounded-full text-[10px] font-black">2 nouvelles</span>
                </div>
                <div className="space-y-3">
                  {[
                    { bank: 'Ecobank Cameroun', taux: '8.5%', montant: '50M FCFA', note: 'AA' },
                    { bank: 'Afriland First Bank', taux: '9.2%', montant: '50M FCFA', note: 'AA' },
                  ].map((o, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-[#bef264]/15 rounded-xl flex items-center justify-center">
                          <Building2 className="w-4 h-4 text-[#bef264]" />
                        </div>
                        <div>
                          <span className="text-sm font-black block">{o.bank}</span>
                          <span className="text-[10px] text-white/30 font-bold">{o.note}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-black text-[#bef264]">{o.taux}</div>
                        <div className="text-xs text-white/30">{o.montant}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="bg-[#bef264] rounded-2xl p-5">
                  <Star className="w-5 h-5 text-[#0a0a0a] mb-3" />
                  <div className="font-black text-2xl text-[#0a0a0a]">BBB+</div>
                  <div className="text-[10px] font-black text-[#0a0a0a]/60">Rating actuel</div>
                </motion.div>
                <div className="bg-[#141517] border border-white/5 rounded-2xl p-5">
                  <TrendingUp className="w-5 h-5 text-[#bef264] mb-3" />
                  <div className="font-black text-2xl">3</div>
                  <div className="text-[10px] font-black text-white/30">Dossiers actifs</div>
                </div>
                <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
                  className="bg-[#141517] border border-white/5 rounded-2xl p-5">
                  <Users className="w-5 h-5 text-[#bef264] mb-3" />
                  <div className="font-black text-2xl">120</div>
                  <div className="text-[10px] font-black text-white/30">Contributeurs</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <section className="py-5 bg-[#bef264] overflow-hidden border-y-4 border-[#0a0a0a]">
        <div className="flex whitespace-nowrap animate-marquee-enterprise items-center">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center text-[#0a0a0a] font-black text-sm">
              <span className="mx-6">52 INSTITUTIONS PARTENAIRES</span>
              <span className="mx-4 opacity-25">✦</span>
              <span className="mx-6">2.3 MDS FCFA LEVÉS</span>
              <span className="mx-4 opacity-25">✦</span>
              <span className="mx-6">137 ENTREPRISES FINANCÉES</span>
              <span className="mx-4 opacity-25">✦</span>
              <span className="mx-6">DÉLAI MOYEN 48H</span>
              <span className="mx-4 opacity-25">✦</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── GROS TITRE + STICKY SERVICES ── */}
      <section className="bg-[#f4f4f0] pt-24 pb-0 px-4 sm:px-6 lg:px-8 rounded-t-[3rem] -mt-6 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div id="services" className="flex flex-col items-center justify-center mb-16 overflow-hidden">
            <motion.h2 initial={{ x: '-30%', opacity: 0 }} whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }} viewport={{ once: true }}
              className="font-black text-[10vw] md:text-[6rem] lg:text-[8rem] xl:text-[10rem] tracking-tighter leading-[0.85] text-[#0a0a0a] uppercase">
              VOS
            </motion.h2>
            <motion.div initial={{ x: '-30%', opacity: 0 }} whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }} viewport={{ once: true }}
              className="flex items-center gap-6 justify-center w-full">
              <div className="flex-1 h-2 bg-[#bef264] hidden md:block" />
              <h2 className="font-black text-[10vw] md:text-[6rem] lg:text-[8rem] xl:text-[10rem] tracking-tighter leading-[0.85] text-[#0a0a0a] uppercase whitespace-nowrap">
                SERVICES
              </h2>
              <div className="w-16 h-2 bg-[#bef264] hidden md:block shrink-0" />
            </motion.div>
            <motion.h2 initial={{ x: '-30%', opacity: 0 }} whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }} viewport={{ once: true }}
              className="font-black text-[10vw] md:text-[6rem] lg:text-[8rem] xl:text-[10rem] tracking-tighter leading-[0.85] text-[#0a0a0a] uppercase">
              ENTREPRISE
            </motion.h2>
          </div>

          {/* Sticky scroll */}
          <div className="w-full max-w-6xl mx-auto space-y-0" ref={stackRef}>
            {SERVICES.map((s, i) => (
              <div
                key={i}
                style={{ top: `calc(5rem + ${i * 1.5}rem)` }}
                className={cn(
                  'sticky w-full h-[75vh] min-h-[480px] max-h-[680px] rounded-[3rem] p-8 md:p-14 flex flex-col justify-between shadow-[0_-12px_40px_rgba(0,0,0,0.18)] overflow-hidden border border-black/5',
                  s.bg
                )}
              >
                <div className="flex justify-between items-start">
                  <h3 className={cn('font-black text-4xl md:text-5xl lg:text-7xl tracking-tighter max-w-2xl', s.text)}>{s.titre}</h3>
                  <span className={cn('font-black text-4xl md:text-6xl', s.text === 'text-white' ? 'text-white/15' : 'text-black/12')}>{s.num}</span>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-end gap-8 mt-auto">
                  <div className="max-w-md w-full">
                    <span className={cn('inline-block px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-5',
                      s.bg === 'bg-[#bef264]' ? 'bg-[#0a0a0a] text-[#bef264]' :
                      s.text === 'text-white' ? 'bg-white/15 text-white' : 'bg-[#0a0a0a] text-white')}>
                      {s.badge}
                    </span>
                    <h4 className={cn('text-lg md:text-xl font-black tracking-tight mb-4', s.text)}>{s.sous}</h4>
                    <p className={cn('text-sm md:text-base mb-8 leading-relaxed font-medium',
                      s.text === 'text-white' ? 'text-white/55' : 'text-[#0a0a0a]/55')}>
                      {s.desc}
                    </p>
                    <Link to="/professionnel/tableau-de-bord"
                      className={cn('inline-flex items-center gap-3 pl-2 pr-6 py-2 rounded-full font-black text-sm w-max hover:scale-105 transition-all duration-300',
                        s.bg === 'bg-[#bef264]' ? 'bg-[#0a0a0a] text-white' : 'bg-[#bef264] text-[#0a0a0a]')}>
                      <div className="w-8 h-8 rounded-full border border-current/20 flex items-center justify-center bg-white/10">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                      Accéder au service
                    </Link>
                  </div>

                  {/* Visual mockup */}
                  <div className={cn('hidden md:flex w-[42%] h-[220px] rounded-[2rem] overflow-hidden items-center justify-center relative',
                    s.text === 'text-white' ? 'bg-white/5 border border-white/10' : 'bg-black/5 border border-black/5')}>
                    {i === 0 && (
                      <div className="w-full h-full p-6 space-y-3">
                        {[{ b: 'Ecobank', t: '8.5%', y: 0 }, { b: 'Afriland', t: '9.2%', y: 1 }, { b: 'SGBC', t: '10.1%', y: 2 }].map((o, j) => (
                          <div key={j} className="flex items-center justify-between p-3 bg-white/8 rounded-xl">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center"><Building2 className="w-3.5 h-3.5 text-white" /></div>
                              <span className="text-white text-xs font-black">{o.b}</span>
                            </div>
                            <span className="font-black text-sm text-[#bef264]">{o.t}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    {i === 1 && (
                      <div className="flex flex-col items-center justify-center w-full h-full">
                        <div className="text-[4.5rem] font-black tracking-tighter leading-none text-[#0a0a0a]">BBB+</div>
                        <div className="flex gap-1.5 mt-3">
                          {[1,2,3,4,5].map(j => <div key={j} className={`w-9 h-2 rounded-full ${j <= 3 ? 'bg-[#0a0a0a]' : 'bg-[#0a0a0a]/20'}`} />)}
                        </div>
                        <p className="text-[#0a0a0a]/40 text-[10px] font-black mt-3 uppercase tracking-[0.2em]">Notation de solvabilité</p>
                      </div>
                    )}
                    {i === 2 && (
                      <div className="w-full h-full p-6">
                        <div className="mb-5">
                          <div className="flex justify-between text-xs font-black text-[#0a0a0a]/50 mb-2"><span>Fonds collectés</span><span>78%</span></div>
                          <div className="h-3 rounded-full bg-[#0a0a0a]/10 overflow-hidden">
                            <motion.div initial={{ width: 0 }} whileInView={{ width: '78%' }} transition={{ duration: 1.5 }} className="h-full bg-[#0a0a0a] rounded-full" />
                          </div>
                        </div>
                        <div className="flex items-center mt-6">
                          {[...Array(7)].map((_, j) => (
                            <div key={j} className="w-8 h-8 rounded-full bg-[#0a0a0a]/15 border-2 border-[#f4f4f0] -ml-2 first:ml-0" />
                          ))}
                          <span className="text-[10px] font-black text-[#0a0a0a]/40 ml-3">+124 contributeurs</span>
                        </div>
                      </div>
                    )}
                    {i === 3 && (
                      <div className="flex flex-col items-center justify-center w-full h-full">
                        <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 22, repeat: Infinity, ease: 'linear' }} className="w-28 h-28 opacity-50">
                          <img src={img('Islamic Star Ornament-Photoroom.png')} alt="" className="w-full h-full object-contain" style={{ filter: 'brightness(10)' }} />
                        </motion.div>
                        <p className="text-[#bef264]/70 text-[10px] font-black mt-4 uppercase tracking-[0.2em]">Halal · AAOIFI · 0% Intérêt</p>
                      </div>
                    )}
                    {i === 4 && (
                      <div className="w-full h-full p-6 flex flex-col justify-center gap-3">
                        {[{ l: 'Résidence Douala', v: '75%', c: '#bef264' }, { l: 'Entrepôt Yaoundé', v: '53%', c: '#0a0a0a' }, { l: 'Plantation Kribi', v: '12%', c: '#0a0a0a' }].map((t, j) => (
                          <div key={j}>
                            <div className="flex justify-between text-[10px] font-black text-[#0a0a0a]/50 mb-1"><span>{t.l}</span><span>{t.v}</span></div>
                            <div className="h-2.5 rounded-full bg-[#0a0a0a]/10 overflow-hidden">
                              <motion.div initial={{ width: 0 }} whileInView={{ width: t.v }} transition={{ duration: 1, delay: j * 0.2 }} className="h-full rounded-full" style={{ backgroundColor: t.c }} />
                            </div>
                          </div>
                        ))}
                        <div className="flex items-center gap-2 mt-1">
                          <div className="w-5 h-5 rounded bg-[#bef264] flex items-center justify-center"><Layers className="w-3 h-3 text-black" /></div>
                          <span className="text-[10px] font-black text-[#0a0a0a]/40">10 000 FCFA / token</span>
                        </div>
                      </div>
                    )}
                    {i === 5 && (
                      <div className="w-full h-full p-6 flex flex-col justify-center gap-3">
                        {['IA recommande : Ecobank', 'Risque : Modéré · B+', 'Secteur : Commerce'].map((item, j) => (
                          <div key={j} className="flex items-center gap-3 p-3 rounded-xl bg-[#0a0a0a]/5">
                            <Zap className="w-4 h-4 text-[#0a0a0a]/30 shrink-0" />
                            <span className="text-xs font-black text-[#0a0a0a]/50">{item}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="bg-[#0a0a0a] py-32 px-4 sm:px-6 lg:px-8 relative z-30 overflow-hidden">
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[300px] bg-[#bef264]/5 blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
            <div className="lg:col-span-4 flex flex-col justify-between">
              <div>
                <p className="text-xs font-black text-[#bef264] tracking-[0.3em] uppercase mb-6">En chiffres</p>
                <h2 className="font-black text-4xl md:text-5xl leading-tight tracking-tighter text-white mb-8">
                  Les résultats<br />parlent<br />d'eux-mêmes.
                </h2>
              </div>
              <Link to="/professionnel/tableau-de-bord"
                className="inline-flex w-fit items-center gap-2 px-6 py-3 border border-white/20 rounded-full font-black text-sm hover:bg-white hover:text-[#0a0a0a] transition-all duration-300">
                Rejoindre maintenant <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="lg:col-span-8 grid grid-cols-2 gap-6">
              {STATS.map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                  className={cn('p-8 rounded-[2rem] flex flex-col justify-end min-h-[200px]', s.bg)}>
                  <h3 className="font-black text-[2.8rem] leading-none mb-3 tracking-tighter">
                    <AnimatedCounter end={s.end} suffix={s.suffix} />
                  </h3>
                  <p className={cn('text-xs font-black uppercase tracking-widest', i < 2 ? 'text-[#0a0a0a]/70' : 'text-white/40')}>{s.label}</p>
                  <p className={cn('text-[10px] mt-1', i < 2 ? 'text-[#0a0a0a]/40' : 'text-white/25')}>{s.sub}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Pill tags */}
          <div className="flex flex-wrap gap-3 pt-16 border-t border-white/5">
            {['Mise en relation', 'Rating COSUMAF', 'Crowdfunding halal', 'Finance islamique', 'Tokenisation blockchain', 'Gestion IA'].map((pill, i) => (
              <div key={i} className={cn('px-7 py-3.5 rounded-full font-black text-sm cursor-default',
                i === 0 ? 'bg-white text-[#0a0a0a]' :
                i === 2 ? 'bg-gradient-to-r from-[#bef264] to-[#1A7A4A] text-[#0a0a0a]' :
                i === 3 ? 'bg-[#0a1a0f] text-[#bef264] border border-[#1A7A4A]/30' :
                'bg-[#141517] text-white border border-white/10')}>
                {pill}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINANCE ISLAMIQUE ── */}
      <section className="bg-[#0a1a0f] py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.10]" style={{ backgroundImage: `url(${img('Islamic Pattern Background.jpeg')})`, backgroundSize: '280px', backgroundRepeat: 'repeat' }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#1A7A4A]/20 blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/10 border border-white/20 rounded-full text-[10px] font-black uppercase tracking-widest text-white mb-8">
              <span className="w-2 h-2 rounded-full bg-[#bef264]" />
              Finance Islamique · AAOIFI certifié
            </div>
            <h2 className="font-black text-5xl lg:text-7xl tracking-tighter leading-none text-white mb-8">
              Financement Halal<br />
              <span className="text-[#bef264]">pour votre entreprise.</span>
            </h2>
            <p className="text-white/50 text-lg max-w-xl mx-auto leading-relaxed">
              Financez vos projets sans intérêt (riba). 3 produits islamiques adaptés aux entreprises CEMAC, validés par notre Comité Charia indépendant de 3 scholars internationaux.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {ISLAMIQUE.map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group p-10 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 transition-all duration-500">
                <div className="text-5xl mb-6">{p.emoji}</div>
                <div className="flex items-center gap-3 mb-5">
                  <h3 className="font-black text-2xl tracking-tighter text-white">{p.titre}</h3>
                  <span className="px-3 py-1 bg-[#bef264] text-black text-[10px] font-black rounded-full">{p.badge}</span>
                </div>
                <p className="text-white/45 text-sm leading-relaxed mb-8">{p.desc}</p>
                <Link to={p.lien} className="inline-flex items-center gap-2 text-[#bef264] text-sm font-black hover:gap-4 transition-all duration-300">
                  En savoir plus <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center">
            <Link to="/finance-islamique"
              className="px-10 py-5 bg-[#bef264] text-[#0a0a0a] font-black rounded-full text-lg hover:scale-105 hover:shadow-2xl hover:shadow-[#bef264]/25 transition-all duration-300 flex items-center gap-3">
              Découvrir la Finance Islamique <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── TOKENISATION IMMERSIVE ── */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <img src={img('Hero visual — Tokenized Real Estate.jpeg')} alt="Tokenisation actifs" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/92 via-[#0a0a0a]/65 to-transparent" />
        <div className="relative z-10 h-full flex items-center px-6 lg:px-20">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }} className="max-w-xl">
            <p className="text-[#bef264] text-xs font-black uppercase tracking-[0.3em] mb-6">Blockchain · BVMAC</p>
            <h2 className="text-5xl lg:text-6xl font-black tracking-tighter leading-none text-white mb-8">
              Tokenisez vos actifs.<br />
              <span className="text-[#bef264]">Levez plus.</span>
            </h2>
            <p className="text-white/55 text-lg leading-relaxed mb-10 max-w-lg">
              Immobilier, plantations, entrepôts, infrastructure — transformez n'importe quel actif en tokens numériques échangeables. Des centaines d'investisseurs participent depuis 10 000 FCFA.
            </p>
            <Link to="/investir/tokenisation"
              className="inline-flex items-center gap-3 px-10 py-5 bg-[#bef264] text-[#0a0a0a] font-black rounded-full text-lg hover:scale-105 transition-all duration-300">
              Tokeniser mon projet <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── PARTENAIRES ── */}
      <section className="bg-[#0a0a0a] py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-20">
            <p className="text-xs font-black text-[#bef264] tracking-[0.3em] uppercase mb-6">Réseau CEMAC</p>
            <h2 className="font-black text-5xl lg:text-7xl tracking-tighter leading-none text-white">
              52 institutions<br />à votre service.
            </h2>
          </motion.div>
          <div className="flex flex-wrap gap-3 justify-center">
            {PARTENAIRES.map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                whileHover={{ scale: 1.06, y: -3 }}
                className={cn('px-6 py-3 rounded-full font-black text-sm cursor-default transition-all duration-300',
                  i % 6 === 0 ? 'bg-white text-[#0a0a0a]' :
                  i % 6 === 1 ? 'bg-[#bef264] text-[#0a0a0a]' :
                  i % 6 === 2 ? 'bg-[#0a1a0f] text-[#bef264] border border-[#1A7A4A]/30' :
                  'bg-[#141517] text-white border border-white/10')}>
                {p}
              </motion.div>
            ))}
          </div>
          <p className="text-center text-white/20 text-sm font-medium mt-10">
            Et bien d'autres institutions agréées COBAC & COSUMAF en zone CEMAC
          </p>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="bg-[#f4f4f0] py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <div>
              <p className="text-xs font-black text-[#1A7A4A] tracking-[0.3em] uppercase mb-4">Procédure simplifiée</p>
              <h2 className="font-black text-5xl lg:text-7xl tracking-tighter leading-none text-[#0a0a0a]">
                De zéro à financé<br />en 4 étapes.
              </h2>
            </div>
            <p className="text-gray-400 max-w-sm font-medium leading-relaxed">
              De la création de votre profil à la réception des fonds, tout se passe sur NKAP. Aucun déplacement requis.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="relative p-10 rounded-[2.5rem] bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-[#0a0a0a] flex items-center justify-center mb-8">
                  <s.icon className="w-7 h-7 text-[#bef264]" />
                </div>
                <p className="text-7xl font-black tracking-tighter text-gray-100 absolute top-6 right-7">{s.num}</p>
                <div className="inline-block px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-5 bg-[#bef264] text-[#0a0a0a]">{s.duree}</div>
                <h3 className="text-xl font-black tracking-tighter mb-4">{s.titre}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
                {i < PROCESS.length - 1 && (
                  <div className="absolute top-1/2 -right-3 w-6 h-0.5 bg-gray-200 hidden lg:block" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TARIFS ── */}
      <section className="bg-[#f4f4f0] py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <p className="text-xs font-black text-[#1A7A4A] tracking-[0.3em] uppercase mb-4">Transparence totale</p>
              <h2 className="font-black text-5xl lg:text-7xl tracking-tighter leading-none text-[#0a0a0a]">
                Commissions claires,<br />sans surprise.
              </h2>
            </div>
            <p className="text-gray-400 font-medium max-w-sm">Toutes nos commissions sont affichées avant validation. Aucun frais caché, jamais.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {COMMISSIONS.map((c, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm hover:shadow-lg flex items-center justify-between gap-6 transition-all duration-300">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-6 h-6 rounded-full bg-[#bef264] flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-[#0a0a0a]" />
                    </div>
                    <h3 className="font-black text-[#0a0a0a]">{c.service}</h3>
                  </div>
                  <p className="text-xs text-gray-400 font-medium ml-9">{c.note}</p>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-black text-2xl md:text-3xl text-[#0a0a0a]">{c.tarif}</div>
                  <div className="text-xs text-gray-400 font-medium">{c.base}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA MARQUEE ── */}
      <section className="bg-[#bef264] py-7 overflow-hidden border-t-4 border-[#0a0a0a]">
        <div className="flex whitespace-nowrap animate-marquee-enterprise items-center">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center text-5xl font-black leading-none text-[#0a0a0a]">
              <span className="mx-8">COMMENCEZ MAINTENANT</span>
              <span className="mx-6 opacity-20 text-xl">✦</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="bg-[#f4f4f0] py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="relative bg-[#0a0a0a] rounded-[3rem] p-16 md:p-24 text-center overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-1/3 w-[400px] h-[300px] bg-[#bef264]/8 blur-[100px]" />
              <div className="absolute bottom-0 right-1/4 w-[350px] h-[250px] bg-[#1A7A4A]/10 blur-[100px]" />
            </div>
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#bef264]/10 border border-[#bef264]/20 text-[#bef264] text-sm font-black mb-8">
                <Lock className="w-3.5 h-3.5" /> Profil vérifié en moins de 48h
              </div>
              <h2 className="font-black text-4xl md:text-7xl text-white tracking-tighter mb-6 leading-none">
                Votre prochain<br />financement<br />
                <span className="text-[#bef264]">commence ici.</span>
              </h2>
              <p className="text-white/40 font-medium text-lg mb-12 max-w-xl mx-auto leading-relaxed">
                Rejoignez plus de 137 entreprises qui ont déjà accédé à des financements via NKAP. KYC, rating, crowdfunding, Islamic finance, tokenisation — tout en un seul endroit.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/professionnel/tableau-de-bord"
                  className="px-10 py-5 bg-[#bef264] text-[#0a0a0a] font-black rounded-full hover:bg-white transition-colors flex items-center gap-2 justify-center text-lg">
                  Créer mon espace entreprise <ArrowRight className="w-5 h-5" />
                </Link>
                <Link to="/decouvrir"
                  className="px-10 py-5 border border-white/20 text-white font-black rounded-full hover:bg-white/10 transition-colors flex items-center gap-2 justify-center text-lg">
                  <Building2 className="w-5 h-5" /> Explorer les institutions
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee-enterprise {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-enterprise {
          animation: marquee-enterprise 28s linear infinite;
        }
      ` }} />
    </div>
  );
}
