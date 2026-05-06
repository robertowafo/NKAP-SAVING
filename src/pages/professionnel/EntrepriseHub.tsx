import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, TrendingUp, Star, Users, BarChart2, Zap, FileText,
  Check, Building2, Lock, Shield, Clock, ChevronRight
} from 'lucide-react';
import { cn } from '../../lib/utils';

const FEATURES = [
  {
    icon: TrendingUp,
    titre: 'Accès au Financement',
    desc: "Publiez votre besoin de financement. Des dizaines d'établissements (banques, EMF, SDB) vous répondent avec des offres concrètes adaptées à votre situation.",
    badge: 'Mise en relation',
    color: 'bg-brand-neon',
    textColor: 'text-brand-dark',
  },
  {
    icon: Star,
    titre: 'Rating d\'Entreprise',
    desc: "Obtenez une notation de solvabilité officielle (AAA → D) pour rassurer vos partenaires financiers et négocier de meilleurs taux d'intérêt.",
    badge: 'Crédibilité',
    color: 'bg-[#0a0a0a]',
    textColor: 'text-white',
  },
  {
    icon: Users,
    titre: 'Crowdfunding',
    desc: "Levez des fonds auprès du grand public via le don avec récompense (reward) ou le prêt participatif remboursé avec intérêts (crowdlending).",
    badge: 'Financement participatif',
    color: 'bg-[#1b5e4c]',
    textColor: 'text-white',
  },
  {
    icon: BarChart2,
    titre: 'Gestion de Trésorerie',
    desc: "Optimisez votre trésorerie : placez vos excédents sur des produits monétaires ou obligataires proposés par les gestionnaires d'actifs partenaires.",
    badge: 'Trésorerie',
    color: 'bg-white',
    textColor: 'text-brand-dark',
  },
  {
    icon: Zap,
    titre: 'Orientation IA',
    desc: "Notre intelligence artificielle analyse votre profil, votre secteur et vos besoins pour vous recommander les produits et institutions financières les plus adaptés.",
    badge: 'IA & Recommandations',
    color: 'bg-brand-neon',
    textColor: 'text-brand-dark',
  },
  {
    icon: FileText,
    titre: 'Gestion Documentaire',
    desc: "Centralisez vos documents financiers (bilans, KYC, statuts) dans un coffre-fort sécurisé et partagez-les instantanément avec vos partenaires financiers.",
    badge: 'Documents sécurisés',
    color: 'bg-[#0a0a0a]',
    textColor: 'text-white',
  },
];

const STEPS = [
  {
    num: '01',
    titre: 'Créez votre profil entreprise',
    desc: "Renseignez les informations de votre société : dénomination, secteur, chiffre d'affaires, forme juridique. La vérification KYC par notre équipe prend moins de 48h.",
    icon: Building2,
  },
  {
    num: '02',
    titre: 'Déposez vos documents',
    desc: "Uploadez vos bilans (3 dernières années), votre registre de commerce, vos statuts. Ces documents servent pour vos demandes de financement et votre rating.",
    icon: FileText,
  },
  {
    num: '03',
    titre: 'Publiez votre besoin',
    desc: "Décrivez votre besoin (montant, durée, objet). La demande est transmise aux institutions partenaires qualifiées. Vous recevez les premières offres sous 48h.",
    icon: TrendingUp,
  },
  {
    num: '04',
    titre: 'Comparez & Finalisez',
    desc: "Comparez les offres reçues (taux, durée, garanties), posez vos questions directement via la messagerie intégrée, puis finalisez votre accord.",
    icon: Check,
  },
];

const STATS = [
  { value: '52', label: 'Institutions partenaires', sub: 'Banques, EMF, SDB, AM' },
  { value: '2.3 Mds', label: 'FCFA levés', sub: 'En financement en 2025' },
  { value: '137', label: 'Entreprises financées', sub: 'Au Cameroun & CEMAC' },
  { value: '48h', label: "Délai moyen d'offre", sub: 'Première proposition reçue' },
];

const COMMISSIONS = [
  { service: 'Mise en relation financement', tarif: '1,5%', base: 'du montant financé', note: 'Payable à la finalisation uniquement' },
  { service: "Rating d'entreprise", tarif: '150 000 FCFA', base: 'par dossier', note: 'Résultat en 5 jours ouvrés' },
  { service: 'Crowdfunding (don / prêt)', tarif: '3%', base: 'des fonds collectés', note: "Uniquement si l'objectif est atteint" },
  { service: 'Abonnement Professionnel', tarif: '25 000 FCFA', base: '/mois ou 250 000/an', note: 'Accès illimité à tous les services' },
];

const GUARANTEES = [
  { icon: Shield, label: 'KYC certifié', desc: 'Tous les comptes pros sont vérifiés' },
  { icon: Lock, label: 'Documents chiffrés', desc: 'Stockage AES-256, RGPD compatible' },
  { icon: Clock, label: 'Support 24/7', desc: 'Équipe dédiée aux entreprises' },
];

export default function EntrepriseHub() {
  return (
    <div className="flex flex-col min-h-screen bg-brand-gray">

      {/* HERO */}
      <section className="bg-[#0a0a0a] text-white px-4 sm:px-6 lg:px-8 pt-20 pb-28 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 -left-20 w-[500px] h-[500px] bg-brand-neon/8 rounded-full blur-[140px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-emerald-500/8 rounded-full blur-[120px]" />
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-brand-neon/5 rounded-full blur-[100px]" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-neon/10 border border-brand-neon/20 text-brand-neon text-sm font-bold mb-8"
          >
            <span className="w-2 h-2 bg-brand-neon rounded-full animate-pulse" />
            Espace Professionnel — Entreprises CEMAC
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-display font-bold text-5xl md:text-7xl tracking-tighter leading-tight mb-6"
              >
                Le financement<br />
                <span className="text-brand-neon">à portée de main</span><br />
                pour votre entreprise
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-white/60 text-lg font-medium mb-10 max-w-lg leading-relaxed"
              >
                NKAP connecte les entreprises camerounaises et CEMAC avec les banques, EMF et sociétés de bourse.
                Publiez votre besoin, recevez des offres réelles en moins de 48h.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link
                  to="/professionnel/tableau-de-bord"
                  className="px-8 py-4 bg-brand-neon text-brand-dark font-bold rounded-full hover:bg-white transition-colors flex items-center gap-2 justify-center"
                >
                  Accéder à mon espace <ArrowRight className="w-5 h-5" />
                </Link>
                <a
                  href="#services"
                  className="px-8 py-4 border border-white/20 text-white font-bold rounded-full hover:bg-white/10 transition-colors flex items-center gap-2 justify-center"
                >
                  Découvrir les services
                </a>
              </motion.div>
            </div>

            {/* Preview cards */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="relative hidden lg:block"
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 mb-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-white/50 uppercase tracking-widest">Offres reçues</span>
                  <span className="px-2 py-1 bg-brand-neon/20 text-brand-neon rounded-full text-[10px] font-bold">2 nouvelles</span>
                </div>
                <div className="space-y-3">
                  {[
                    { bank: 'Ecobank Cameroun', taux: '8.5%', montant: '50M FCFA', note: 'AA' },
                    { bank: 'Afriland First Bank', taux: '9.2%', montant: '50M FCFA', note: 'AA' },
                  ].map((o, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-brand-neon/20 rounded-lg flex items-center justify-center">
                          <Building2 className="w-4 h-4 text-brand-neon" />
                        </div>
                        <div>
                          <span className="text-sm font-bold text-white block">{o.bank}</span>
                          <span className="text-[10px] text-white/40 font-bold">{o.note}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-brand-neon">{o.taux}</div>
                        <div className="text-xs text-white/50">{o.montant}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-brand-neon rounded-2xl p-5">
                  <Star className="w-5 h-5 text-brand-dark mb-3" />
                  <div className="font-display font-bold text-2xl text-brand-dark">BBB+</div>
                  <div className="text-[10px] font-bold text-brand-dark/70">Rating actuel</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                  <TrendingUp className="w-5 h-5 text-brand-neon mb-3" />
                  <div className="font-display font-bold text-2xl text-white">3</div>
                  <div className="text-[10px] font-bold text-white/50">Dossiers actifs</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                  <Users className="w-5 h-5 text-brand-neon mb-3" />
                  <div className="font-display font-bold text-2xl text-white">120</div>
                  <div className="text-[10px] font-bold text-white/50">Contributeurs</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-brand-neon">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="font-display font-bold text-4xl md:text-5xl text-brand-dark mb-1">{s.value}</div>
              <div className="font-bold text-sm text-brand-dark">{s.label}</div>
              <div className="text-xs text-brand-dark/60 font-medium mt-1">{s.sub}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-brand-green tracking-widest uppercase mb-3 block">Nos Services</span>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-brand-dark tracking-tight mb-4">
              Tout ce dont votre entreprise<br />a besoin
            </h2>
            <p className="text-gray-500 font-medium max-w-xl mx-auto">
              Un écosystème complet pour financer, structurer et développer votre activité en zone CEMAC.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  viewport={{ once: true }}
                  className={cn(
                    'rounded-[2rem] p-8 min-h-[280px] flex flex-col justify-between group hover:-translate-y-1 transition-all cursor-pointer',
                    f.color
                  )}
                >
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div className={cn('w-12 h-12 rounded-2xl flex items-center justify-center',
                        f.color === 'bg-white' ? 'bg-gray-100' : 'bg-white/10')}>
                        <Icon className={cn('w-6 h-6', f.textColor)} />
                      </div>
                      <span className={cn('text-[10px] font-bold px-3 py-1 rounded-full',
                        f.color === 'bg-white' ? 'bg-gray-100 text-gray-600' : 'bg-white/10 opacity-80', f.textColor)}>
                        {f.badge}
                      </span>
                    </div>
                    <h3 className={cn('font-display font-bold text-xl mb-3', f.textColor)}>{f.titre}</h3>
                    <p className={cn('text-sm font-medium leading-relaxed',
                      f.color === 'bg-white' ? 'text-gray-600' : cn(f.textColor, 'opacity-70'))}>
                      {f.desc}
                    </p>
                  </div>
                  <Link
                    to="/professionnel/tableau-de-bord"
                    className={cn('mt-6 self-start flex items-center gap-2 text-xs font-bold transition-all group-hover:gap-3', f.textColor)}
                  >
                    Accéder <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* COMMENT ÇA MARCHE */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-brand-neon tracking-widest uppercase mb-3 block">Processus simplifié</span>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white tracking-tight">
              Comment ça fonctionne ?
            </h2>
            <p className="text-white/40 font-medium mt-4 max-w-lg mx-auto">
              De la création de votre profil à la réception des fonds, tout se passe sur NKAP.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  {i < STEPS.length - 1 && (
                    <div className="hidden lg:flex absolute top-8 left-[4.5rem] items-center" style={{ width: 'calc(100% - 1rem)' }}>
                      <div className="flex-1 border-t border-dashed border-white/10" />
                      <ChevronRight className="w-4 h-4 text-white/20 -ml-2" />
                    </div>
                  )}
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-brand-neon/10 border border-brand-neon/20 flex items-center justify-center mb-6">
                      <span className="font-display font-bold text-brand-neon text-xl">{s.num}</span>
                    </div>
                    <h3 className="font-display font-bold text-lg text-white mb-3">{s.titre}</h3>
                    <p className="text-white/50 text-sm font-medium leading-relaxed">{s.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TARIFS */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <span className="text-xs font-bold text-brand-green tracking-widest uppercase mb-3 block">Transparence totale</span>
              <h2 className="font-display font-bold text-4xl md:text-5xl text-brand-dark tracking-tight">
                Commissions claires,<br />sans surprise
              </h2>
            </div>
            <p className="text-gray-500 font-medium max-w-sm mt-4 md:mt-0">
              Toutes nos commissions sont affichées avant validation. Aucun frais caché, jamais.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {COMMISSIONS.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-[2rem] p-8 border border-black/5 flex items-center justify-between gap-6"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-5 h-5 rounded-full bg-brand-neon flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-brand-dark" />
                    </div>
                    <h3 className="font-bold text-brand-dark">{c.service}</h3>
                  </div>
                  <p className="text-xs text-gray-400 font-medium ml-7">{c.note}</p>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-display font-bold text-2xl md:text-3xl text-brand-dark">{c.tarif}</div>
                  <div className="text-xs text-gray-400 font-medium">{c.base}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* GUARANTEES */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white border-t border-b border-black/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-around gap-8">
          {GUARANTEES.map((g, i) => {
            const Icon = g.icon;
            return (
              <div key={i} className="flex items-center gap-4">
                <div className="w-12 h-12 bg-brand-gray rounded-2xl flex items-center justify-center">
                  <Icon className="w-5 h-5 text-brand-green" />
                </div>
                <div>
                  <div className="font-bold text-brand-dark text-sm">{g.label}</div>
                  <div className="text-xs text-gray-500 font-medium">{g.desc}</div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#0a0a0a] rounded-[2rem] p-12 md:p-16 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-1/3 w-[400px] h-[200px] bg-brand-neon/5 blur-[80px]" />
              <div className="absolute bottom-0 right-1/4 w-[300px] h-[200px] bg-emerald-500/5 blur-[80px]" />
            </div>
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-neon/10 border border-brand-neon/20 text-brand-neon text-sm font-bold mb-8">
                <Lock className="w-3.5 h-3.5" /> Profil vérifié en moins de 48h
              </div>
              <h2 className="font-display font-bold text-4xl md:text-6xl text-white tracking-tighter mb-6">
                Votre prochain financement<br />
                <span className="text-brand-neon">commence ici</span>
              </h2>
              <p className="text-white/50 font-medium text-lg mb-10 max-w-xl mx-auto">
                Rejoignez plus de 137 entreprises qui ont déjà accédé à des financements via NKAP.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/professionnel/tableau-de-bord"
                  className="px-10 py-4 bg-brand-neon text-brand-dark font-bold rounded-full hover:bg-white transition-colors flex items-center gap-2 justify-center"
                >
                  Créer mon espace entreprise <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/decouvrir"
                  className="px-10 py-4 border border-white/20 text-white font-bold rounded-full hover:bg-white/10 transition-colors flex items-center gap-2 justify-center"
                >
                  <Building2 className="w-4 h-4" /> Explorer les institutions
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
