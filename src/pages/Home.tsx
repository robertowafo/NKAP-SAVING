import { motion, useScroll, useTransform, useInView } from "motion/react";
import { Link } from "react-router-dom";
import {
  Play,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
  Building2,
  Coins,
  BarChart3,
  Briefcase,
  Users,
} from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { cn } from "../lib/utils";

function AnimatedCounter({
  end,
  suffix = "",
  duration = 2000,
}: {
  end: number;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;
    let startTime: number | null = null;
    let animationFrame: number;

    const updateCounter = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);

      const easeProgress =
        percentage === 1 ? 1 : 1 - Math.pow(2, -10 * percentage);

      setCount(Math.floor(end * easeProgress));

      if (progress < duration) {
        animationFrame = requestAnimationFrame(updateCounter);
      }
    };

    animationFrame = requestAnimationFrame(updateCounter);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, inView, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

const TESTIMONIALS = [
  {
    quote:
      "Ils ont fourni une stratégie complète qui a immédiatement focalisé toute notre équipe. La différence d'engagement s'est remarquée dès le premier mois.",
    name: "Edward Hayes",
    role: "Directeur financier",
    theme: "dark",
    qColor: "text-brand-neon",
  },
  {
    quote:
      "Nos précédentes campagnes ressemblaient à jeter des spaghettis sur un mur. L'équipe a apporté une structure claire et data-driven.",
    name: "Alistair Finch",
    role: "CEO de PME",
    theme: "light-purple",
    qColor: "text-[#5b58f6]",
  },
  {
    quote:
      "Les concepts innovants qu'ils ont développés étaient frais, engageants et parfaitement ciblés. La meilleure plateforme institutionnelle de la région CEMAC.",
    name: "James Cornell",
    role: "Directeur de Banque",
    theme: "neon",
    qColor: "text-brand-dark",
  },
  {
    quote:
      "L'aspect le plus précieux de notre travail avec eux est leur communication proactive. On ne s'est jamais senti comme un simple client distant.",
    name: "Luna Fox",
    role: "Directrice des opérations",
    theme: "light",
    qColor: "text-gray-300",
  },
];

const OFFERS = [
  {
    title: "Fractions de titres",
    subtitle: "Accessibilité & Liquidité du Marché",
    desc: "Achetez et vendez des fractions d'actions ou d'obligations d'entreprises cotées à la BVMAC. Investissez à votre rythme, même avec un petit budget.",
    num: "01",
    bgColor: "bg-[#7bbfa4]",
    link: "/investir/fractions",
    image: "/fractions de titres.jpeg"
  },
  {
    title: "Tokenisation",
    subtitle: "Actifs Tangibles & Infrastructures",
    desc: "Participez à des projets immobiliers ou de grandes infrastructures en Afrique Centrale à travers des tokens numériques sécurisés.",
    num: "02",
    bgColor: "bg-[#ffcce7]",
    link: "/investir/tokenisation",
    image: "/tokenisation.jpeg"
  },
  {
    title: "Levée de Fonds",
    subtitle: "Financement Participatif & Croissance",
    desc: "Ouvrez votre capital à notre communauté ou contractez des dettes obligataires sous forme de campagnes participatives intuitives.",
    num: "03",
    bgColor: "bg-[#e5ecf6]",
    link: "/financement",
    image: "/levée de fonds.jpeg"
  },
  {
    title: "Distribution FCP",
    subtitle: "Gestion d'Actifs & Scalabilité",
    desc: "Asset Managers, distribuez vos Fonds Communs de Placement directement aux particuliers à travers un canal digital innovant et sécurisé.",
    num: "04",
    bgColor: "bg-[#ffffff]",
    link: "/professionnel/institution",
    image: "/Distribution FCP.jpeg"
  },
  {
    title: "Institutionnels",
    subtitle: "Syndication & Dossiers Exclusifs",
    desc: "Banques et institutions financières : accédez à des dossiers qualifiés, proposez vos offres de crédit ou participez à d'importantes levées.",
    num: "05",
    bgColor: "bg-[#d8e0ff]",
    link: "/professionnel/institution",
    image: "/Institutionnels.jpeg"
  },
  {
    title: "Finance Islamique",
    subtitle: "Fonds, Sukuk & Charia Compatibilité",
    desc: "Investissez selon vos convictions : accédez à des produits validés par notre Comité Charia (Mourabaha, Moucharaka, FCP Islamiques).",
    num: "06",
    bgColor: "bg-[#fdeae3]",
    link: "/finance-islamique",
    image: "/Finance Islamique.jpeg"
  },
  {
    title: "Apprentissage",
    subtitle: "Académie & Simulateur de Marché",
    desc: "Formez-vous aux rouages de la BVMAC. Cours interactifs, quiz et capital fictif pour tester vos stratégies sans risque.",
    num: "07",
    bgColor: "bg-[#e9d5ff]",
    link: "/apprendre",
    image: "/Apprentissage.jpeg"
  },
  {
    title: "Opportunités",
    subtitle: "Carrières & Talents Financiers",
    desc: "Trouvez votre prochain défi professionnel ou proposez vos services aux acteurs de la finance et entreprises de la zone CEMAC.",
    num: "08",
    bgColor: "bg-[#ffedd5]",
    link: "/opportunites",
    image: "/Opportunités.jpeg"
  },
  {
    title: "Mobile Money",
    subtitle: "Paiements & Transferts Instantanés",
    desc: "Rechargez votre portefeuille, investissez et retirez vos gains directement via Mobile Money en toute simplicité en zone CEMAC.",
    num: "09",
    bgColor: "bg-[#dcfce7]",
    link: "/mobile-money",
    image: "/Mobile Money.jpeg"
  },
];

export default function Home() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  // About text animation
  const textRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: textProgress } = useScroll({
    target: textRef,
    offset: ["start 80%", "center center"],
  });
  const textWords =
    "Chez NKAP INVEST, nous croyons que la finance ne consiste pas seulement à placer de l'argent. C'est tisser des liens de confiance. Nous sommes une plateforme de services financiers complète conçue pour aider les investisseurs à croître avec stratégie. De la conception de financements à l'exécution, nous allions technologie et données.".split(
      " ",
    );

  return (
    <div className="flex flex-col w-full overflow-x-clip bg-[#0a0a0a]">
      {/* 1. HERO SECTION (Dark) */}
      <section
        className="relative px-4 sm:px-6 lg:px-8 pt-32 pb-24 md:pt-40 md:pb-32 bg-[#0a0a0a] text-white"
        style={{
          backgroundImage: "url('/hero-background.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white text-sm font-bold mb-8"
            >
              <span className="bg-white text-[#0a0a0a] px-2 py-0.5 rounded-full text-xs mr-1 uppercase tracking-wider">
                Nouveau
              </span>
              Aucun frais caché sur la plateforme
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-display font-medium text-5xl md:text-7xl lg:text-[7rem] tracking-tighter leading-[1] max-w-5xl mb-6"
            >
              NKAP <span className="text-brand-neon">INVEST</span>
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-display font-medium text-2xl md:text-4xl lg:text-5xl tracking-tight leading-snug max-w-4xl text-white/90 mb-6"
            >
              La Triple Révolution Financière <br className="hidden md:block" />
              de l'Afrique Centrale
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center gap-4 text-sm md:text-lg text-white/70 font-semibold mb-10"
            >
              <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-full">
                Finance Islamique
              </div>
              <div className="text-brand-neon">•</div>
              <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-full">
                Tokenisation
              </div>
              <div className="text-brand-neon">•</div>
              <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-full">
                Mobile Money
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
            >
              <Link
                to="/inscription"
                className="w-full sm:w-auto px-8 py-4 bg-brand-neon text-[#0a0a0a] font-bold rounded-full hover:bg-white transition-all text-base flex items-center justify-center gap-2"
              >
                Commencer maintenant <ArrowRight className="w-5 h-5" />
              </Link>
              <button className="w-full sm:w-auto px-8 py-4 text-white font-bold rounded-full flex items-center justify-center gap-3 hover:text-brand-neon transition-colors">
                <span className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center bg-white/5 backdrop-blur-sm">
                  <Play className="w-4 h-4 fill-current" />
                </span>
                Voir la Démo
              </button>
            </motion.div>
          </div>

          {/* Floating Dashboard Elements */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-20 grid grid-cols-1 md:grid-cols-12 gap-4"
          >
            {/* L E F T */}
            <div className="md:col-span-4 bg-[#141517] rounded-3xl p-6 border border-white/5 flex flex-col justify-end bg-cover bg-center overflow-hidden relative min-h-[280px]">
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/90 to-black/0 z-0"></div>
              <img
                src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=600"
                alt="Team"
                className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-40"
              />
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-white text-[#0a0a0a] px-3 py-1.5 rounded-lg text-xs font-bold mb-4">
                  <Users className="w-3 h-3" /> Communauté
                </div>
                <h3 className="font-display font-medium text-4xl">200+</h3>
                <p className="text-white/50 text-sm mt-1">
                  Nos partenaires et clients vérifiés
                </p>
              </div>
            </div>

            {/* C E N T E R */}
            <div className="md:col-span-4 grid grid-rows-2 gap-4 min-h-[280px]">
              <div className="bg-[#141517] rounded-3xl p-6 border border-white/5 flex items-center justify-between">
                <div>
                  <h3 className="font-display font-medium text-2xl mb-1">
                    Croissance
                    <br />
                    Transparente
                  </h3>
                </div>
                <div className="w-14 h-14 bg-brand-neon/10 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-brand-neon" />
                </div>
              </div>
              <div className="bg-[#141517] rounded-3xl p-6 border border-white/5 flex items-center justify-between relative overflow-hidden">
                <div className="absolute right-0 top-0 w-32 h-32 bg-emerald-500/0 blur-[40px] rounded-full group-hover:bg-emerald-500/20 transition-colors"></div>
                <div className="relative z-10">
                  <h3 className="font-display font-medium text-2xl mb-1">
                    Sécurité
                    <br />
                    Renforcée
                  </h3>
                </div>
                <div className="w-14 h-14 bg-emerald-500/10 rounded-full flex items-center justify-center relative z-10">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                </div>
              </div>
            </div>

            {/* R I G H T */}
            <div className="md:col-span-4 bg-[#141517] rounded-3xl p-6 border border-white/5 relative min-h-[280px] overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-64 h-64 border border-white/10 rounded-full"></div>
              <div className="absolute -right-20 -bottom-20 w-64 h-64 border border-white/5 rounded-full"></div>

              <h3 className="font-display font-medium text-5xl mb-4 relative z-10">
                20+
              </h3>
              <p className="text-white/50 text-md pr-12 leading-snug mb-6 relative z-10">
                Institutions Financières de premier plan de la zone CEMAC.
              </p>
              <div className="flex gap-2 relative z-10">
                <span className="px-4 py-1.5 bg-brand-neon text-[#0a0a0a] rounded-full text-xs font-bold">
                  Gabon
                </span>
                <span className="px-4 py-1.5 bg-white/10 text-white rounded-full text-xs font-bold">
                  Cameroun
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. ABOUT NKAP INVEST (White Section) */}
      <section className="bg-brand-gray pt-24 pb-12 px-4 sm:px-6 lg:px-8 rounded-t-[3rem] -mt-10 relative z-20 border-t border-black/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start mb-16">
            <div className="lg:w-1/4">
              <span className="text-sm font-bold text-gray-500 tracking-widest uppercase">
                À propos de NKAP
              </span>
            </div>
            <div
              ref={textRef}
              className="lg:w-3/4 flex flex-wrap font-display font-medium text-3xl md:text-5xl leading-tight tracking-tight"
            >
              {textWords.map((word, i) => {
                const start = i / textWords.length;
                const end = start + 1 / textWords.length;
                const color = useTransform(
                  textProgress,
                  [start, end],
                  ["#9ca3af", "#0a0a0a"],
                );
                return (
                  <motion.span
                    key={i}
                    style={{ color }}
                    className="mr-2 md:mr-3 mb-2"
                  >
                    {word}
                  </motion.span>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-auto lg:h-[500px]">
             {/* Left Card: Value Proposition */}
            <div className="w-full h-full rounded-3xl bg-brand-dark text-white p-10 md:p-14 flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-80 h-80 bg-brand-neon/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 transition-transform duration-1000 group-hover:scale-110"></div>
              
              <div className="relative z-10">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-md border border-white/10 shadow-xl">
                  <TrendingUp className="w-7 h-7 text-brand-neon" />
                </div>
                <h3 className="font-display font-medium text-4xl md:text-5xl leading-tight mb-6 text-white tracking-tight">
                  L'Innovation Financière <br className="hidden md:block" />au cœur de la CEMAC
                </h3>
                <p className="text-gray-400 text-lg md:text-xl max-w-md leading-relaxed font-light">
                  NKAP Invest démocratise l'accès aux marchés financiers avec des solutions d'investissement simples, sécurisées et accessibles à tous, du particulier à l'institutionnel.
                </p>
              </div>

              <div className="relative z-10 mt-12 lg:mt-0">
                <Link
                  to="/decouvrir"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-brand-neon text-brand-dark rounded-full font-bold text-sm hover:bg-white hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(202,255,51,0.2)]"
                >
                  Découvrir notre vision <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Card: Image / Graphic */}
            <div className="w-full h-[400px] lg:h-full rounded-3xl overflow-hidden relative group bg-[#f3f4f6]">
              {/* Floating Stat Card */}
              <div className="absolute top-6 right-6 z-20 bg-white/90 backdrop-blur-md rounded-2xl p-4 md:p-5 shadow-2xl border border-white/40 flex flex-col items-center transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-4 h-4 text-emerald-500" />
                  <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Croissance</span>
                </div>
                <span className="font-display font-medium text-3xl text-brand-dark">+14.2%</span>
              </div>

              <img
                src="https://images.unsplash.com/photo-1611974789855-9c2a0a223690?auto=format&fit=crop&q=80&w=1200" 
                alt="Impact financier"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="absolute bottom-8 left-8 right-8 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <p className="font-display font-medium text-2xl mb-4">Conçu pour l'avenir</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold tracking-wide">Fractions de titres</span>
                  <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold tracking-wide">Mobile Money</span>
                  <span className="px-4 py-1.5 rounded-full bg-brand-neon/20 backdrop-blur-md border border-brand-neon/30 text-brand-neon text-xs font-semibold tracking-wide">Tokenisation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OUR BEST WORKS -> TOUT CE DONT VOUS AVEZ BESOIN */}
      <section className="bg-brand-gray pt-12 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center w-full mb-16 overflow-hidden">
            <motion.h2
              initial={{ x: "-30%", opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, margin: "0px" }}
              className="font-display font-bold text-[10vw] md:text-[6rem] lg:text-[8rem] xl:text-[11rem] tracking-tighter leading-[0.85] text-brand-dark uppercase"
            >
              TOUT CE DONT
            </motion.h2>
            <motion.div
              initial={{ x: "-30%", opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
              viewport={{ once: true, margin: "0px" }}
              className="flex items-center gap-6 justify-center w-full"
            >
              <div className="flex-1 h-2 bg-brand-neon hidden md:block"></div>
              <h2 className="font-display font-bold text-[10vw] md:text-[6rem] lg:text-[8rem] xl:text-[11rem] tracking-tighter leading-[0.85] text-brand-dark uppercase whitespace-nowrap">
                VOUS AVEZ
              </h2>
              <div className="w-16 h-2 bg-brand-neon hidden md:block shrink-0"></div>
            </motion.div>
            <motion.h2
              initial={{ x: "-30%", opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              viewport={{ once: true, margin: "0px" }}
              className="font-display font-bold text-[10vw] md:text-[6rem] lg:text-[8rem] xl:text-[11rem] tracking-tighter leading-[0.85] text-brand-dark uppercase"
            >
              BESOIN
            </motion.h2>
          </div>

          <div className="w-full max-w-6xl mx-auto space-y-0" ref={targetRef}>
            {OFFERS.map((offer, i) => (
              <div
                key={i}
                style={{ top: `calc(7rem + ${i * 1.5}rem)` }}
                className={cn(
                  "sticky w-full h-[75vh] min-h-[500px] max-h-[700px] rounded-[3rem] p-8 md:p-14 flex flex-col justify-between shadow-[0_-10px_40px_rgba(0,0,0,0.1)] overflow-hidden border border-black/5",
                  offer.bgColor,
                )}
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-display font-medium text-4xl md:text-5xl lg:text-7xl text-brand-dark tracking-tight max-w-2xl">
                    {offer.title}
                  </h3>
                  <span className="font-display font-medium text-4xl md:text-6xl text-brand-dark">
                    {offer.num}
                  </span>
                </div>

                <div className="flex flex-col-reverse md:flex-row justify-between items-end gap-12 mt-12 md:mt-auto relative z-10 h-full md:h-auto pb-8 md:pb-0">
                  <div className="max-w-md w-full flex flex-col justify-end bg-brand-gray/50 md:bg-transparent backdrop-blur-xl md:backdrop-blur-none p-6 md:p-0 rounded-3xl md:rounded-none">
                    <h4 className="text-xl md:text-2xl font-bold text-brand-dark mb-4 leading-tight">
                      {offer.subtitle}
                    </h4>
                    <p className="text-brand-dark/80 font-medium text-sm md:text-base mb-6">
                      {offer.desc}
                    </p>
                    <Link
                      to={offer.link || "/decouvrir"}
                      className="inline-flex items-center gap-3 bg-[#111] text-white pl-2 pr-6 py-2 rounded-full font-medium hover:bg-black transition-transform hover:scale-105 w-max group"
                    >
                      <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center shrink-0 bg-white/10 group-hover:bg-white group-hover:text-[#111] transition-colors">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                      <span className="text-sm">En savoir plus</span>
                    </Link>
                  </div>

                  {/* Abstract Image Block */}
                  <div className="absolute right-0 bottom-0 md:relative w-[70%] md:w-[45%] h-[60%] md:h-[350px] -z-10 md:z-0 rounded-tl-3xl md:rounded-3xl overflow-hidden opacity-50 md:opacity-100 mix-blend-multiply md:mix-blend-normal">
                    <img
                      src={offer.image}
                      alt={offer.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. TRUSTED BRANDS & SOLUTIONS */}
      <section className="bg-[#0a0a0a] py-32 px-4 sm:px-6 lg:px-8 text-white relative z-30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center mb-24">
            <div className="text-xs font-bold text-[#b4ff39] flex items-center gap-2 mb-8 uppercase tracking-widest">
              <div className="w-2 h-2 bg-[#b4ff39] rounded-sm"></div>
              Notre ADN & Nos Valeurs
            </div>
            <div className="flex w-full justify-center overflow-hidden py-10 md:py-12">
              <div className="relative w-[1000px] h-[280px] shrink-0 scale-[0.6] sm:scale-75 md:scale-90 lg:scale-[0.95] xl:scale-100 flex-none transition-transform origin-center">
                <div className="absolute bg-white text-brand-dark px-6 py-3 rounded-full text-sm font-medium shadow-xl transform rotate-[15deg] left-[20px] top-[100px] z-10 hover:scale-105 hover:z-50 transition-all cursor-default text-center min-w-[160px]">
                  Strategic Agency
                </div>

                <div className="absolute bg-[#b4ff39] text-[#111] px-6 py-3 rounded-full text-sm font-medium shadow-xl transform -rotate-[30deg] left-[180px] top-[50px] z-30 hover:scale-105 hover:z-50 transition-all cursor-default text-center min-w-[160px]">
                  Results-driven
                </div>

                <div className="absolute bg-[#1a1a1a] text-white border border-white/20 px-6 py-3 rounded-full text-sm font-medium shadow-xl transform rotate-[10deg] left-[120px] top-[170px] z-20 hover:scale-105 hover:z-50 transition-all cursor-default text-center min-w-[160px]">
                  Growth Focused
                </div>

                <div className="absolute bg-[#ff5a36] text-white px-6 py-3 rounded-full text-sm font-medium shadow-xl transform -rotate-[5deg] left-[340px] top-[30px] z-20 hover:scale-105 hover:z-50 transition-all cursor-default text-center min-w-[160px]">
                  Influential
                </div>

                <div className="absolute bg-white text-brand-dark px-6 py-3 rounded-full text-sm font-medium shadow-xl transform rotate-[6deg] left-[320px] top-[130px] z-40 hover:scale-105 hover:z-50 transition-all cursor-default text-center min-w-[160px]">
                  Innovation Driven
                </div>

                <div className="absolute bg-gradient-to-r from-gray-500 to-[#1a1a1a] text-white border border-white/10 px-6 py-3 rounded-full text-sm font-medium shadow-xl transform -rotate-[28deg] left-[490px] top-[70px] z-30 hover:scale-105 hover:z-50 transition-all cursor-default text-center min-w-[160px]">
                  Multidimensional
                </div>

                <div className="absolute bg-[#00e5ff] text-[#111] px-6 py-3 rounded-full text-sm font-medium shadow-xl transform rotate-[20deg] left-[430px] top-[180px] z-20 hover:scale-105 hover:z-50 transition-all cursor-default text-center min-w-[160px]">
                  Transparent
                </div>

                <div className="absolute bg-[#b4ff39] text-[#111] px-6 py-3 rounded-full text-sm font-medium shadow-xl transform rotate-[12deg] left-[620px] top-[150px] z-50 hover:scale-105 hover:z-50 transition-all cursor-default text-center min-w-[160px]">
                  Strategic - minded
                </div>

                <div className="absolute bg-[#7857ff] text-white px-6 py-3 rounded-full text-sm font-medium shadow-xl transform -rotate-[10deg] left-[660px] top-[60px] z-20 hover:scale-105 hover:z-50 transition-all cursor-default text-center min-w-[160px]">
                  Result oriented
                </div>

                <div className="absolute bg-white text-brand-dark px-6 py-3 rounded-full text-sm font-medium shadow-xl transform rotate-[5deg] left-[830px] top-[130px] z-40 hover:scale-105 hover:z-50 transition-all cursor-default text-center min-w-[160px]">
                  Value Creation
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 mb-16 justify-between items-end">
            <h2 className="font-display font-medium text-4xl md:text-6xl max-w-2xl leading-[1.1] tracking-tight text-white mb-4">
              Des solutions taillées <br /> pour votre{" "}
              <span className="text-brand-neon underline decoration-brand-neon decoration-4 underline-offset-8">
                Croissance
              </span>
            </h2>
            <Link
              to="/connexion"
              className="px-8 py-4 bg-brand-neon text-[#0a0a0a] font-bold rounded-full hover:bg-white transition-colors text-sm"
            >
              Commencer maintenant
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                title: "Épargnant Particulier",
                desc: "Investissez dans des fractions d'actions, des FCP et de l'immobilier.",
                icon: BarChart3,
              },
              {
                title: "Entreprise & PME",
                desc: "Levez des fonds via le crowdfunding ou trouvez des financements.",
                icon: Building2,
              },
              {
                title: "Institution Bancaire",
                desc: "Accédez à des dossiers qualifiés, proposez vos offres de crédit.",
                icon: Briefcase,
              },
              {
                title: "Asset Manager",
                desc: "Distribuez vos FCP directement aux particuliers.",
                icon: Coins,
              },
            ].map((card, i) => (
              <div
                key={i}
                className="bg-[#141517] origin-bottom-left border border-white/5 p-8 rounded-[2rem] flex flex-col justify-between min-h-[360px] group overflow-hidden relative cursor-pointer hover:bg-white hover:text-brand-dark transition-all duration-500 hover:-rotate-3 hover:-translate-y-2 hover:-translate-x-2"
              >
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <card.icon className="w-8 h-8 text-brand-neon group-hover:text-brand-dark transition-colors duration-500 mb-8" />
                  <div>
                    <h3 className="font-display font-medium text-3xl mb-4 group-hover:text-brand-dark transition-colors duration-500 tracking-tight leading-tight">
                      {card.title}
                    </h3>

                    <div className="max-h-0 opacity-0 group-hover:max-h-[150px] group-hover:opacity-100 transition-all duration-500 ease-in-out">
                      <p className="text-[#0a0a0a]/70 text-sm font-medium pt-2 pb-6">
                        {card.desc}
                      </p>
                    </div>

                    <span className="text-white group-hover:text-brand-dark font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                      Découvrir <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. NUMBERS BEHIND SUCCESS */}
      <section className="bg-[#0a0a0a] px-4 sm:px-6 lg:px-8 text-white relative z-20 overflow-hidden pb-40">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
            <div className="lg:col-span-4 flex flex-col justify-between">
              <h2 className="font-display font-medium text-4xl md:text-5xl leading-tight mb-8">
                Les Chiffres <br /> de la
                <br /> Réussite
              </h2>
              <Link
                to="/connexion"
                className="inline-flex w-fit items-center gap-2 px-6 py-3 border border-white/20 rounded-full font-bold text-sm hover:bg-white hover:text-brand-dark transition-colors"
              >
                Commencer <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-brand-neon text-brand-dark p-8 rounded-[2rem] flex flex-col justify-end min-h-[300px]">
                <h3 className="font-display font-bold text-[4rem] leading-none mb-4 tracking-tighter">
                  <AnimatedCounter end={500} suffix="K" />
                </h3>
                <p className="text-sm font-bold uppercase tracking-widest pl-1">
                  Utilisateurs
                </p>
              </div>
              <div className="bg-white text-brand-dark p-8 rounded-[2rem] flex flex-col justify-end min-h-[300px]">
                <h3 className="font-display font-bold text-[4rem] leading-none mb-4 tracking-tighter">
                  <AnimatedCounter end={98} suffix="%" />
                </h3>
                <p className="text-sm font-bold uppercase tracking-widest pl-1 text-gray-400">
                  Satisfaction
                </p>
              </div>
              <div className="bg-[#141517] text-white p-8 rounded-[2rem] flex flex-col justify-end min-h-[300px] border border-white/5">
                <h3 className="font-display font-bold text-[4rem] leading-none mb-4 tracking-tighter">
                  <AnimatedCounter end={23} suffix="K" />
                </h3>
                <p className="text-sm font-bold uppercase tracking-widest pl-1 text-white/50">
                  Demandes
                </p>
              </div>
            </div>
          </div>

        <div className="relative flex overflow-hidden pt-12 pb-8 -mx-4 sm:-mx-6 lg:-mx-8 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
            className="flex flex-nowrap gap-4 w-max px-4"
          >
            {[...Array(2)].map((_, arrayIndex) => (
              <div key={arrayIndex} className="flex gap-4 items-center">
                {[
                  "Stratégie Financière",
                  "Orienté Résultats",
                  "Innovation Continue",
                  "Excellence",
                  "Vision Locale",
                  "Création de Valeur",
                  "Technologie Avancée",
                  "Transparence",
                ].map((pill, i) => (
                  <div
                    key={`${arrayIndex}-${i}`}
                    className={cn(
                      "px-8 py-4 rounded-full font-bold text-sm whitespace-nowrap",
                      i === 0
                        ? "bg-white text-[#0a0a0a]"
                        : i === 2
                          ? "bg-gradient-to-r from-brand-neon to-emerald-400 text-[#0a0a0a]"
                          : "bg-[#141517] text-white border border-white/10",
                    )}
                  >
                    {pill}
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
        </div>
      </section>

      {/* 7. REAL PEOPLE, REAL RESULTS */}
      <section className="bg-brand-gray py-32 rounded-t-[3rem] -mt-16 relative z-30 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <h2 className="font-display font-medium text-4xl md:text-5xl text-brand-dark mb-6 tracking-tight">
            De Vraies Personnes, <br />
            De Vrais Retours
          </h2>
          <p className="text-gray-500 font-medium">
            Découvrez ce que disent nos utilisateurs de leur expérience.
          </p>
        </div>

        <div className="w-full relative flex items-center overflow-hidden">
          <div className="flex w-max animate-scroll-left hover:[animation-play-state:paused] gap-6 px-4">
            {[...TESTIMONIALS, ...TESTIMONIALS].map((testi, i) => (
              <div
                key={i}
                className={cn(
                  "w-[350px] md:w-[450px] p-8 md:p-10 rounded-[2rem] shrink-0",
                  testi.theme === "dark"
                    ? "bg-[#0a0a0a] text-white"
                    : testi.theme === "light-purple"
                      ? "bg-[#e4e2fd] text-brand-dark"
                      : testi.theme === "neon"
                        ? "bg-brand-neon text-brand-dark"
                        : "bg-white border border-black/5 text-brand-dark shadow-sm",
                )}
              >
                <div
                  className={cn(
                    "text-5xl font-display mb-6 leading-none",
                    testi.qColor,
                  )}
                >
                  "
                </div>
                <p
                  className={cn(
                    "text-lg font-medium leading-relaxed mb-10 h-[120px] md:h-[100px]",
                    testi.theme === "dark"
                      ? "text-white/90"
                      : "text-brand-dark/90",
                  )}
                >
                  {testi.quote}
                </p>
                <div className="flex items-center gap-4">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-full shrink-0",
                      testi.theme === "dark"
                        ? "bg-white/10"
                        : testi.theme === "light-purple"
                          ? "bg-white/50"
                          : testi.theme === "neon"
                            ? "bg-white/30"
                            : "bg-gray-100",
                    )}
                  ></div>
                  <div>
                    <h4 className="font-bold">{testi.name}</h4>
                    <p
                      className={cn(
                        "text-xs",
                        testi.theme === "dark"
                          ? "text-white/50"
                          : testi.theme === "neon"
                            ? "text-brand-dark/70"
                            : "text-gray-500",
                      )}
                    >
                      {testi.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. MARKET INSIGHTS */}
      <section className="bg-brand-gray py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <h2 className="font-display font-medium text-4xl md:text-5xl text-brand-dark leading-tight tracking-tight">
              Analyse de <br />
              Marché
            </h2>
            <Link
              to="/actualites"
              className="px-6 py-3 bg-white border border-black/10 rounded-full font-bold hover:bg-[#0a0a0a] hover:text-white transition-colors text-sm"
            >
              Voir le Blog
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                cat: "Marché",
                title: "Comprendre la valorisation complexe en zone CEMAC",
                date: "Dec 15, 2025",
              },
              {
                cat: "Clarté",
                title: "Bâtir une audience financière très précise",
                date: "Dec 16, 2025",
              },
              {
                cat: "Revenu",
                title: "L'erreur fatale de croissance pour les jeunes PME",
                date: "Dec 20, 2025",
              },
            ].map((post, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="w-full aspect-square bg-gray-200 rounded-[2rem] mb-6 overflow-hidden relative">
                  <img
                    src={`https://images.unsplash.com/photo-1611${i}16261747-4cd1c05d6dcc?auto=format&fit=crop&q=80&w=800`}
                    alt="Blog cover"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-1.5 text-xs font-bold rounded-full text-brand-dark">
                    {post.cat}
                  </div>
                </div>
                <h3 className="font-display font-medium text-2xl text-brand-dark mb-4 group-hover:text-brand-green transition-colors leading-tight">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-500 font-medium">
                  Lars Walker • {post.date}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. MARQUEE CTA FOOTER PREP */}
      <section className="bg-brand-neon py-8 overflow-hidden border-t-8 border-[#0a0a0a]">
        <div className="flex whitespace-nowrap animate-marquee items-center">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="flex items-center text-4xl md:text-5xl font-display font-bold leading-none text-[#0a0a0a]"
            >
              <span className="mx-6">LET'S GET STARTED</span>
              <span className="mx-6 opacity-30 text-xl">✦</span>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-brand-gray py-24 px-4 pb-32">
        <div 
          className="max-w-7xl mx-auto relative flex flex-col items-center text-center p-12 sm:p-16 lg:p-24 rounded-[3rem] overflow-hidden shadow-2xl"
          style={{
            backgroundImage: "url('/hero-background.jpeg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Overlay to ensure text readability */}
          <div className="absolute inset-0 bg-[#0a0a0a]/80 z-0"></div>
          
          <div className="relative z-10 w-full max-w-3xl flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white text-sm font-bold mb-8">
              <span className="text-brand-neon">✦</span> Restez aux commandes
            </div>
            
            <h3 className="font-display font-medium text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6 tracking-tight text-balance">
              L'avenir financier se dessine. <br className="hidden md:block"/>Ne restez pas en marge.
            </h3>
            
            <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl font-light">
              Rejoignez les esprits pionniers de la CEMAC. Obtenez un accès privilégié à nos nouveautés, aux lancements de tokenisation et aux meilleures opportunités de marché.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-4 w-full justify-center" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Votre adresse email"
                className="px-6 py-4 bg-white/5 backdrop-blur-md border border-white/20 text-white rounded-xl outline-none focus:border-brand-neon/50 focus:ring-1 focus:ring-brand-neon/50 w-full sm:min-w-[320px] placeholder:text-gray-400 transition-all font-medium"
              />
              <button 
                type="submit"
                className="px-8 py-4 bg-brand-neon text-[#0a0a0a] rounded-xl font-bold transition-all hover:bg-white hover:scale-105 shadow-[0_0_20px_rgba(202,255,51,0.2)] whitespace-nowrap"
              >
                Rejoindre le cercle
              </button>
            </form>
          </div>
        </div>
      </section>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        @keyframes scroll-left {
          0% { transform: translateX(0%); }
          100% { transform: translateX(calc(-50% - 1.5rem)); }
        }
        .animate-scroll-left {
          animation: scroll-left 30s linear infinite;
        }
      `,
        }}
      />
    </div>
  );
}
