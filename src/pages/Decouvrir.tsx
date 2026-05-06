import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Building2, Search, MapPin, Phone, Globe,
  BookOpen, Video, CalendarDays, Users, ChevronRight,
  Shield, TrendingUp, BarChart2, Landmark, Award
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '../lib/utils';

const ACTORS = [
  // BANQUES
  { name: 'Afriland First Bank', type: 'Banque', ville: 'Yaoundé', products: ['Crédit PME', 'Trade Finance', 'Banque digitale'], verified: true, note: 'AA' },
  { name: 'BGFI Bank Cameroun', type: 'Banque', ville: 'Douala', products: ["Banque d'affaires", 'Épargne', 'Crédit corporate'], verified: true, note: 'AA-' },
  { name: 'Ecobank Cameroun', type: 'Banque', ville: 'Douala', products: ['Banque de détail', 'Paiements mobiles', 'Change'], verified: true, note: 'A+' },
  { name: 'Société Générale Cameroun', type: 'Banque', ville: 'Douala', products: ['Banque de détail', 'Crédit immobilier', 'Assurance'], verified: true, note: 'A+' },
  { name: 'BICEC', type: 'Banque', ville: 'Yaoundé', products: ['Crédit Immobilier', 'Compte courant', 'Épargne'], verified: true, note: 'A' },
  { name: 'UBA Cameroun', type: 'Banque', ville: 'Douala', products: ['Paiements digitaux', 'Crédit entreprise', 'Change'], verified: true, note: 'A+' },
  { name: 'BANGE Bank Cameroun', type: 'Banque', ville: 'Douala', products: ['Banque de détail', 'Microfinancement', 'Épargne'], verified: true, note: 'A' },
  { name: 'Banque Atlantique Cameroun', type: 'Banque', ville: 'Douala', products: ['Crédit PME', 'Trade Finance', 'Épargne'], verified: true, note: 'A' },
  { name: 'CCA Bank', type: 'Banque', ville: 'Douala', products: ['Crédit agricole', 'Microfinancement', 'Épargne'], verified: true, note: 'A-' },
  { name: 'Commercial Bank of Cameroon', type: 'Banque', ville: 'Douala', products: ['Crédit corporate', 'Trade Finance', 'Compte courant'], verified: true, note: 'A-' },
  { name: 'NFC Bank', type: 'Banque', ville: 'Yaoundé', products: ['Banque de détail', 'Crédit immobilier', 'Épargne'], verified: true, note: 'A-' },
  { name: 'SCB Cameroun', type: 'Banque', ville: 'Douala', products: ['Banque de détail', 'Crédit immobilier', 'Paiements'], verified: true, note: 'A' },
  { name: 'La Régionale Bank', type: 'Banque', ville: 'Yaoundé', products: ['Banque de proximité', 'Épargne', 'Crédit PME'], verified: true, note: 'A-' },
  { name: 'Citibank Cameroun', type: 'Banque', ville: 'Douala', products: ['Banque corporate', 'Trade Finance', 'Trésorerie'], verified: true, note: 'AA' },
  { name: 'Access Bank Cameroun', type: 'Banque', ville: 'Douala', products: ['Banque de détail', 'Crédit PME', 'Paiements digitaux'], verified: true, note: 'A' },
  { name: 'Africa Golden Bank', type: 'Banque', ville: 'Douala', products: ['Banque de détail', 'Épargne', 'Crédit'], verified: true, note: 'A-' },
  { name: 'BC-PME S.A.', type: 'Banque', ville: 'Yaoundé', products: ['Financement PME', 'Garanties', 'Appui entrepreneurial'], verified: true, note: 'A' },
  { name: 'Union Bank of Cameroon', type: 'Banque', ville: 'Douala', products: ['Banque de détail', 'Épargne', 'Crédit'], verified: true, note: 'A-' },

  // SOCIÉTÉS DE BOURSE
  { name: 'Attijari Securities Central Africa', type: 'Société de Bourse', ville: 'Douala', products: ['Courtage BVMAC', 'Introductions en bourse', 'Conseil'], verified: true, note: 'AA' },
  { name: 'SG Capital Securities Central Africa', type: 'Société de Bourse', ville: 'Douala', products: ['Courtage', 'Gestion de portefeuille', 'Intermédiation'], verified: true, note: 'AA' },
  { name: 'Africa Bright Securities S.A.', type: 'Société de Bourse', ville: 'Douala', products: ['Courtage BVMAC', "Conseil en investissement", 'IPO'], verified: true, note: 'A+' },
  { name: 'Afriland Bourse & Investissement', type: 'Société de Bourse', ville: 'Yaoundé', products: ['Courtage', 'Introductions en bourse', 'Gestion'], verified: true, note: 'A+' },
  { name: 'AFG Capital Central Africa', type: 'Société de Bourse', ville: 'Douala', products: ['Courtage', 'Conseil financier', 'Émissions'], verified: true, note: 'A' },
  { name: 'CCA Bourse', type: 'Société de Bourse', ville: 'Douala', products: ['Courtage BVMAC', "Gestion d'actifs"], verified: true, note: 'A-' },
  { name: 'ESS Bourse', type: 'Société de Bourse', ville: 'Douala', products: ['Courtage BVMAC', "Conseil en investissement"], verified: true, note: 'A' },
  { name: 'CBC Bourse', type: 'Société de Bourse', ville: 'Douala', products: ['Courtage', 'Gestion de portefeuille', 'Obligations'], verified: true, note: 'A' },
  { name: 'BGFI Bourse', type: 'Société de Bourse', ville: 'Douala', products: ['Courtage', 'Introductions en bourse', 'Trésorerie'], verified: true, note: 'A+' },

  // GESTIONNAIRES DE PORTEFEUILLE
  { name: 'Harvest Asset Management', type: 'Gestionnaire de Portefeuille', ville: 'Douala', products: ['FCP actions', 'FCP obligataire', 'Gestion sous mandat'], verified: true, note: 'AAA' },
  { name: 'Elite Capital AM (ELCAM)', type: 'Gestionnaire de Portefeuille', ville: 'Douala', products: ['FCP diversifié', 'Épargne institutionnelle', 'OPCVM'], verified: true, note: 'AA' },
  { name: 'ASCA Asset Management', type: 'Gestionnaire de Portefeuille', ville: 'Douala', products: ['FCP monétaire', 'FCP obligataire', 'Gestion privée'], verified: true, note: 'AA' },
  { name: 'Africa Bright Asset Management', type: 'Gestionnaire de Portefeuille', ville: 'Douala', products: ['FCP actions', 'FCP diversifié', 'OPCVM'], verified: true, note: 'A+' },
  { name: 'Corridor Asset Management', type: 'Gestionnaire de Portefeuille', ville: 'Douala', products: ['FCP monétaire', 'Gestion obligataire', 'OPCVM'], verified: true, note: 'A+' },
  { name: 'SG Capital AM Central Africa', type: 'Gestionnaire de Portefeuille', ville: 'Douala', products: ['FCP actions', 'Gestion institutionnelle', 'OPCVM'], verified: true, note: 'AA' },
  { name: 'Makeda Asset Management', type: 'Gestionnaire de Portefeuille', ville: 'Douala', products: ['FCP diversifié', 'Gestion privée', 'OPCVM'], verified: true, note: 'A' },
  { name: 'Stoneshed Asset Management', type: 'Gestionnaire de Portefeuille', ville: 'Douala', products: ['FCP monétaire', 'Obligations', 'Gestion privée'], verified: true, note: 'A' },
  { name: 'Contacturer Asset Management', type: 'Gestionnaire de Portefeuille', ville: 'Douala', products: ['FCP diversifié', 'Gestion sous mandat', 'OPCVM'], verified: true, note: 'A-' },

  // MICROFINANCES
  { name: 'Advans Cameroun', type: 'Microfinance', ville: 'Douala', products: ['Crédit PME', 'Épargne', "Transferts d'argent"], verified: true, note: 'AA' },
  { name: 'CAMCCUL', type: 'Microfinance', ville: 'Bafoussam', products: ['Épargne coopérative', 'Microcrédit', 'Assurance mutuelle'], verified: true, note: 'A+' },
  { name: 'MC² Cameroun', type: 'Microfinance', ville: 'Bafoussam', products: ['Microcrédit agricole', 'Épargne solidaire', 'Tontine digitale'], verified: true, note: 'A' },
  { name: 'C-GIFT Cameroun', type: 'Microfinance', ville: 'Yaoundé', products: ['Microcrédit', 'Épargne', 'Formations financières'], verified: true, note: 'A-' },
  { name: 'Union CVECA / CECA', type: 'Microfinance', ville: 'Maroua', products: ['Épargne mutualiste', 'Crédit agricole', 'Microassurance'], verified: true, note: 'A' },
];

const REGULATORS = [
  {
    name: 'COSUMAF',
    fullName: 'Commission de Surveillance du Marché Financier de l\'Afrique Centrale',
    role: 'Supervise les SDB, AM, OPCVM et appels publics à l\'épargne en zone CEMAC.',
    color: 'bg-[#0a0a0a]',
    textColor: 'text-white',
    icon: Shield,
    badge: 'Marchés financiers',
    site: '#',
  },
  {
    name: 'COBAC',
    fullName: 'Commission Bancaire de l\'Afrique Centrale',
    role: 'Supervise les banques, établissements de crédit et microfinances (EMF).',
    color: 'bg-brand-neon',
    textColor: 'text-brand-dark',
    icon: Building2,
    badge: 'Bancaire & Crédit',
    site: '#',
  },
  {
    name: 'BVMAC',
    fullName: 'Bourse des Valeurs Mobilières de l\'Afrique Centrale',
    role: 'Gère les opérations boursières en zone CEMAC. Cotation des titres.',
    color: 'bg-[#1b5e4c]',
    textColor: 'text-white',
    icon: TrendingUp,
    badge: 'Bourse régionale',
    site: '#',
  },
  {
    name: 'BEAC',
    fullName: 'Banque des États de l\'Afrique Centrale',
    role: 'Régule les flux de capitaux, la monnaie et les paiements dans la zone CEMAC.',
    color: 'bg-white',
    textColor: 'text-brand-dark',
    icon: Landmark,
    badge: 'Monnaie & Paiements',
    site: '#',
  },
];

const STORIES = [
  {
    title: 'Comment le Cameroun a levé 150 Mds FCFA pour ses routes',
    type: 'Emprunt obligataire',
    pays: 'Cameroun',
    montant: '150 Mds FCFA',
    impact: 'Construction de 200 km de routes nationales',
    year: '2023',
    color: 'bg-[#e5f0ff]',
  },
  {
    title: 'SEMC entre en bourse : une IPO historique pour l\'eau minérale',
    type: 'Introduction en bourse',
    pays: 'Cameroun',
    montant: '23 Mds FCFA',
    impact: 'Expansion de 3 nouvelles usines de production',
    year: '2022',
    color: 'bg-[#fff4e5]',
  },
  {
    title: 'BDEAC finance le barrage hydroélectrique de Lom Pangar',
    type: 'Co-financement régional',
    pays: 'Cameroun / CEMAC',
    montant: '340 Mds FCFA',
    impact: '420 MW d\'énergie propre pour 6 pays',
    year: '2021',
    color: 'bg-[#e5fff4]',
  },
];

const WEBINARS = [
  {
    title: 'Comment investir en bourse avec 10 000 FCFA ?',
    date: '20 mai 2026',
    heure: '18h00',
    formateur: 'Dr. Paul Ngando',
    niveau: 'Débutant',
    places: 142,
    color: 'bg-brand-neon',
    textColor: 'text-brand-dark',
  },
  {
    title: 'Obligations d\'État : comprendre les risques et rendements',
    date: '27 mai 2026',
    heure: '17h30',
    formateur: 'Mme. Claire Mbemba',
    niveau: 'Intermédiaire',
    places: 87,
    color: 'bg-[#0a0a0a]',
    textColor: 'text-white',
  },
  {
    title: 'La tokenisation d\'actifs en Afrique : cas pratiques',
    date: '3 juin 2026',
    heure: '19h00',
    formateur: 'M. Yves Fotso',
    niveau: 'Avancé',
    places: 55,
    color: 'bg-[#1b5e4c]',
    textColor: 'text-white',
  },
];

const ACTOR_TYPES = ['Tous', 'Banque', 'Société de Bourse', 'Gestionnaire de Portefeuille', 'Microfinance'];

const TYPE_COUNTS = ACTOR_TYPES.slice(1).map(t => ({ type: t, count: ACTORS.filter(a => a.type === t).length }));

export default function Decouvrir() {
  const [search, setSearch] = useState('');
  const [activeType, setActiveType] = useState('Tous');

  const filtered = ACTORS.filter(a => {
    const matchType = activeType === 'Tous' || a.type === activeType;
    const matchSearch = a.name.toLowerCase().includes(search.toLowerCase()) || a.ville.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  return (
    <div className="flex flex-col min-h-screen bg-brand-gray">

      {/* HERO */}
      <section className="bg-[#0a0a0a] text-white px-4 sm:px-6 lg:px-8 pt-16 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-brand-neon/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-emerald-500/10 rounded-full blur-[100px]"></div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-bold mb-8"
          >
            <span className="w-2 h-2 bg-brand-neon rounded-full animate-pulse"></span>
            Portail Public d'Information Financière CEMAC
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display font-bold text-5xl md:text-7xl tracking-tighter leading-tight mb-6"
          >
            Découvrez l'écosystème<br />
            <span className="text-brand-neon">financier CEMAC</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-medium"
          >
            Institutions financières, régulateurs, marchés, émissions et opportunités. Tout ce dont vous avez besoin pour comprendre et investir.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a href="#annuaire" className="px-8 py-4 bg-brand-neon text-brand-dark font-bold rounded-full hover:bg-white transition-colors flex items-center gap-2 justify-center">
              Voir les institutions <ArrowRight className="w-5 h-5" />
            </a>
            <Link to="/marches" className="px-8 py-4 border border-white/20 text-white font-bold rounded-full hover:bg-white/10 transition-colors flex items-center gap-2 justify-center">
              <BarChart2 className="w-5 h-5" /> Marchés en temps réel
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 1. ANNUAIRE DES ACTEURS */}
      <section id="annuaire" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
            <div>
              <span className="text-xs font-bold text-brand-green tracking-widest uppercase mb-3 block">MODULE 1 — DÉCOUVERTE</span>
              <h2 className="font-display font-bold text-4xl md:text-5xl text-brand-dark tracking-tight">
                Annuaire des Institutions
              </h2>
              <p className="text-gray-500 font-medium mt-3 max-w-lg">Toutes les institutions financières agréées en zone CEMAC, leurs produits et leurs coordonnées.</p>
            </div>
            <Link to="/marches" className="flex items-center gap-2 text-sm font-bold text-brand-dark hover:text-brand-green transition-colors">
              Voir les cours de bourse <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Stats rapides */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {TYPE_COUNTS.map(({ type, count }) => (
              <button
                key={type}
                onClick={() => setActiveType(type)}
                className={cn(
                  "rounded-2xl p-4 border text-left transition-all",
                  activeType === type
                    ? "bg-brand-dark border-brand-dark text-white"
                    : "bg-white border-gray-200 hover:border-gray-300"
                )}
              >
                <div className={cn("font-display font-bold text-3xl mb-1", activeType === type ? "text-brand-neon" : "text-brand-dark")}>{count}</div>
                <div className={cn("text-xs font-bold leading-tight", activeType === type ? "text-white/70" : "text-gray-400")}>{type}s</div>
              </button>
            ))}
          </div>

          {/* Search & Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Chercher une institution, une ville..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-10 pr-4 py-3 w-full bg-white border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-brand-neon/30 text-sm font-medium"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {ACTOR_TYPES.map(type => (
                <button
                  key={type}
                  onClick={() => setActiveType(type)}
                  className={cn(
                    "px-4 py-2.5 rounded-full text-xs font-bold transition-all border",
                    activeType === type
                      ? "bg-brand-dark text-white border-brand-dark"
                      : "bg-white text-gray-500 border-gray-200 hover:border-gray-300"
                  )}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Actors grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {filtered.map((actor, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
                className="bg-white rounded-[2rem] p-6 border border-black/5 hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer group"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-gray-400" />
                  </div>
                  {actor.verified && (
                    <span className="px-2 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-[10px] font-bold flex items-center gap-1">
                      <Shield className="w-3 h-3" /> Vérifié
                    </span>
                  )}
                </div>
                <h3 className="font-display font-bold text-lg text-brand-dark mb-1 group-hover:text-brand-green transition-colors">{actor.name}</h3>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-bold px-2 py-0.5 bg-gray-100 text-gray-600 rounded-md">{actor.type}</span>
                  <span className="flex items-center gap-1 text-xs text-gray-400 font-medium">
                    <MapPin className="w-3 h-3" /> {actor.ville}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {actor.products.slice(0, 2).map((p, j) => (
                    <span key={j} className="text-[10px] font-bold px-2 py-1 bg-brand-gray text-gray-600 rounded-full">{p}</span>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-gray-400">Note : <span className="text-brand-green">{actor.note}</span></span>
                  <button className="text-xs font-bold text-brand-dark group-hover:text-brand-green flex items-center gap-1 transition-colors">
                    Voir <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-gray-400 font-medium">Aucune institution ne correspond à votre recherche.</div>
          )}
        </div>
      </section>

      {/* 2. RÉGULATEURS CEMAC */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-brand-neon tracking-widest uppercase mb-3 block">Cadre Réglementaire</span>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white tracking-tight mb-4">
              Les Régulateurs de la Zone CEMAC
            </h2>
            <p className="text-white/50 font-medium max-w-xl mx-auto">
              Ces institutions garantissent la stabilité et la conformité du marché financier régional.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {REGULATORS.map((reg, i) => {
              const Icon = reg.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className={cn("rounded-[2rem] p-8 flex flex-col justify-between min-h-[260px]", reg.color)}
                >
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", reg.textColor === 'text-white' ? 'bg-white/10' : 'bg-black/5')}>
                        <Icon className={cn("w-6 h-6", reg.textColor)} />
                      </div>
                      <span className={cn("text-[10px] font-bold px-3 py-1 rounded-full", reg.textColor === 'text-white' ? 'bg-white/10 text-white' : 'bg-black/5 text-brand-dark')}>
                        {reg.badge}
                      </span>
                    </div>
                    <h3 className={cn("font-display font-bold text-2xl mb-2", reg.textColor)}>{reg.name}</h3>
                    <p className={cn("text-sm font-bold mb-2 opacity-60", reg.textColor)}>{reg.fullName}</p>
                    <p className={cn("text-sm font-medium leading-relaxed opacity-80", reg.textColor)}>{reg.role}</p>
                  </div>
                  <a
                    href={reg.site}
                    className={cn(
                      "mt-6 self-start flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-full transition-all",
                      reg.textColor === 'text-white' ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-black/5 text-brand-dark hover:bg-black/10'
                    )}
                  >
                    <Globe className="w-3.5 h-3.5" /> Site officiel
                  </a>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. STORYTELLING – ÉMISSIONS & IPOs */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <span className="text-xs font-bold text-brand-green tracking-widest uppercase mb-3 block">Storytelling — Émissions & IPOs</span>
              <h2 className="font-display font-bold text-4xl md:text-5xl text-brand-dark tracking-tight">
                L'impact concret<br />de la finance
              </h2>
            </div>
            <p className="text-gray-500 font-medium max-w-sm mt-4 md:mt-0">
              Découvrez comment les levées de fonds ont transformé l'économie en Afrique Centrale.
            </p>
          </div>

          <div className="space-y-5">
            {STORIES.map((story, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className={cn("rounded-[2rem] p-8 md:p-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 group cursor-pointer hover:shadow-md transition-all", story.color)}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[10px] font-bold px-3 py-1 bg-white/60 rounded-full text-brand-dark">{story.type}</span>
                    <span className="text-xs font-medium text-gray-500">{story.pays} • {story.year}</span>
                  </div>
                  <h3 className="font-display font-bold text-2xl md:text-3xl text-brand-dark mb-3 group-hover:text-brand-green transition-colors leading-tight">
                    {story.title}
                  </h3>
                  <p className="text-gray-600 font-medium text-sm">
                    Impact : <span className="font-bold text-brand-dark">{story.impact}</span>
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-display font-bold text-3xl md:text-4xl text-brand-dark mb-1">{story.montant}</div>
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">Montant levé</div>
                  <button className="mt-4 flex items-center gap-2 text-xs font-bold text-brand-dark hover:text-brand-green ml-auto transition-colors">
                    Lire l'histoire <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WEBINAIRES */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-brand-gray border-t border-black/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <span className="text-xs font-bold text-brand-green tracking-widest uppercase mb-3 block">Formation Continue</span>
              <h2 className="font-display font-bold text-4xl md:text-5xl text-brand-dark tracking-tight">
                Webinaires à venir
              </h2>
            </div>
            <button className="mt-4 md:mt-0 px-6 py-3 bg-brand-dark text-white font-bold rounded-full text-sm hover:bg-brand-neon hover:text-brand-dark transition-colors flex items-center gap-2">
              <Video className="w-4 h-4" /> Voir tout le calendrier
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {WEBINARS.map((w, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className={cn("rounded-[2rem] p-8 flex flex-col justify-between min-h-[320px] group cursor-pointer hover:-translate-y-2 transition-all", w.color)}
              >
                <div>
                  <div className={cn("inline-flex items-center gap-2 text-[10px] font-bold px-3 py-1.5 rounded-full mb-6", w.textColor === 'text-white' ? 'bg-white/10' : 'bg-black/5')}>
                    <Award className="w-3 h-3" />
                    {w.niveau}
                  </div>
                  <h3 className={cn("font-display font-bold text-xl leading-snug mb-4", w.textColor)}>{w.title}</h3>
                  <p className={cn("text-sm font-medium opacity-70", w.textColor)}>Par {w.formateur}</p>
                </div>
                <div>
                  <div className={cn("flex items-center gap-3 text-sm font-bold mb-4", w.textColor)}>
                    <span className="flex items-center gap-1.5 opacity-80">
                      <CalendarDays className="w-4 h-4" /> {w.date}
                    </span>
                    <span>• {w.heure}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={cn("flex items-center gap-1.5 text-xs font-medium opacity-60", w.textColor)}>
                      <Users className="w-3.5 h-3.5" /> {w.places} inscrits
                    </span>
                    <button className={cn(
                      "flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-full transition-all",
                      w.textColor === 'text-white' ? 'bg-white text-brand-dark hover:bg-brand-neon' : 'bg-brand-dark text-white hover:bg-brand-green'
                    )}>
                      S'inscrire <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto bg-[#0a0a0a] rounded-[2rem] p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="font-display font-bold text-3xl md:text-4xl text-white mb-3">Prêt à investir ?</h3>
            <p className="text-white/60 font-medium">Créez votre compte et accédez à toutes les opportunités du marché CEMAC.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <Link to="/inscription" className="px-8 py-4 bg-brand-neon text-brand-dark font-bold rounded-full hover:bg-white transition-colors text-sm">
              Créer un compte
            </Link>
            <Link to="/marches" className="px-8 py-4 border border-white/20 text-white font-bold rounded-full hover:bg-white/10 transition-colors text-sm flex items-center gap-2">
              <BarChart2 className="w-4 h-4" /> Explorer les marchés
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
