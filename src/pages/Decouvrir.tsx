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
    gradient: 'from-blue-500/10 via-blue-500/5 to-transparent',
    accent: 'text-blue-400',
    border: 'group-hover:border-blue-500/30',
    badgeBg: 'bg-blue-500/10 text-blue-400',
    logo: '/logo cosumaf.png',
    badge: 'Marchés financiers',
    site: '#',
  },
  {
    name: 'COBAC',
    fullName: 'Commission Bancaire de l\'Afrique Centrale',
    role: 'Supervise les banques, établissements de crédit et microfinances (EMF).',
    gradient: 'from-brand-neon/10 via-brand-neon/5 to-transparent',
    accent: 'text-brand-neon',
    border: 'group-hover:border-brand-neon/30',
    badgeBg: 'bg-brand-neon/10 text-brand-neon',
    logo: '/COBAC LOGO.png',
    badge: 'Bancaire & Crédit',
    site: '#',
  },
  {
    name: 'BVMAC',
    fullName: 'Bourse des Valeurs Mobilières de l\'Afrique Centrale',
    role: 'Gère les opérations boursières en zone CEMAC. Cotation des titres.',
    gradient: 'from-emerald-500/10 via-emerald-500/5 to-transparent',
    accent: 'text-emerald-400',
    border: 'group-hover:border-emerald-500/30',
    badgeBg: 'bg-emerald-500/10 text-emerald-400',
    logo: '/BVMAC LOGO.png',
    badge: 'Bourse régionale',
    site: '#',
  },
  {
    name: 'BEAC',
    fullName: 'Banque des États de l\'Afrique Centrale',
    role: 'Régule les flux de capitaux, la monnaie et les paiements dans la zone CEMAC.',
    gradient: 'from-amber-500/10 via-amber-500/5 to-transparent',
    accent: 'text-amber-400',
    border: 'group-hover:border-amber-500/30',
    badgeBg: 'bg-amber-500/10 text-amber-400',
    logo: '/BEAC LOGO.png',
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
      <section id="annuaire" className="py-32 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a] relative overflow-hidden">
        {/* Abstract Dark Gradients */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-neon/10 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[120px] -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
            <div>
              <span className="text-xs font-bold text-brand-neon tracking-widest uppercase mb-4 block">MODULE 1 — DÉCOUVERTE</span>
              <h2 className="font-display font-bold text-4xl md:text-6xl text-white tracking-tight mb-4">
                Annuaire des Institutions
              </h2>
              <p className="text-gray-400 font-medium text-lg max-w-xl">
                Explorez l'ensemble des institutions financières agréées en zone CEMAC. Découvrez leurs produits, expertises et coordonnées en un clic.
              </p>
            </div>
            <Link to="/marches" className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white text-white hover:text-[#0a0a0a] text-sm font-bold transition-all backdrop-blur-md">
              Voir les cours de bourse <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Stats rapides */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {TYPE_COUNTS.map(({ type, count }) => (
              <button
                key={type}
                onClick={() => setActiveType(type)}
                className={cn(
                  "relative overflow-hidden rounded-[2rem] p-6 lg:p-8 text-left transition-all duration-500 group border",
                  activeType === type
                    ? "bg-brand-neon border-brand-neon text-[#0a0a0a] shadow-[0_0_30px_rgba(202,255,51,0.2)] scale-[1.02] z-10"
                    : "bg-white/5 border-white/10 hover:bg-white/10 text-white"
                )}
              >
                {activeType === type && <div className="absolute inset-0 bg-white/20 blur-2xl rounded-full translate-y-1/2 opacity-50 mix-blend-overlay"></div>}
                <div className="relative z-10 font-display font-medium text-4xl md:text-5xl lg:text-6xl mb-2">{count}</div>
                <div className={cn("relative z-10 text-sm font-bold leading-tight", activeType === type ? "text-[#0a0a0a]/70" : "text-gray-400")}>{type}s</div>
              </button>
            ))}
          </div>

          {/* Search & Filters */}
          <div className="flex flex-col lg:flex-row gap-6 mb-16 items-center bg-white/5 p-4 rounded-full border border-white/10 backdrop-blur-md">
            <div className="relative flex-1 w-full pl-2">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher une institution, une ville..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-14 pr-4 py-3 w-full bg-transparent border-none outline-none text-white placeholder:text-gray-500 font-medium text-lg"
              />
            </div>
            <div className="hidden lg:block w-px h-8 bg-white/10"></div>
            <div className="flex gap-2 flex-wrap w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 style-scrollbar items-center">
              {ACTOR_TYPES.map(type => (
                <button
                  key={type}
                  onClick={() => setActiveType(type)}
                  className={cn(
                    "px-6 py-3 rounded-full text-sm font-bold transition-all whitespace-nowrap",
                    activeType === type
                      ? "bg-white text-[#0a0a0a] shadow-lg"
                      : "bg-transparent text-gray-400 hover:text-white hover:bg-white/10"
                  )}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Actors grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((actor, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 + 0.1, duration: 0.5, ease: "easeOut" }}
                viewport={{ once: true, margin: "-50px" }}
                className="bg-white/5 backdrop-blur-md rounded-[2rem] p-6 lg:p-8 border border-white/10 hover:border-brand-neon/50 hover:bg-white/10 hover:shadow-[0_10px_40px_rgba(202,255,51,0.1)] transition-all duration-500 cursor-pointer group flex flex-col"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-gray-800 to-[#0a0a0a] rounded-2xl flex items-center justify-center border border-white/10 shadow-inner group-hover:scale-110 transition-transform duration-500 group-hover:rotate-3">
                    <Building2 className="w-6 h-6 text-brand-neon" />
                  </div>
                  {actor.verified && (
                    <span className="px-3 py-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-[10px] font-bold flex items-center gap-1.5">
                      <Shield className="w-3 h-3" /> Vérifié
                    </span>
                  )}
                </div>
                
                <h3 className="font-display font-medium text-2xl text-white mb-3 group-hover:text-brand-neon transition-colors line-clamp-2 leading-tight">
                  {actor.name}
                </h3>
                
                <div className="flex items-center gap-3 mb-8">
                  <span className="text-xs font-bold px-3 py-1.5 bg-white/10 text-gray-300 rounded-lg whitespace-nowrap overflow-hidden text-ellipsis">{actor.type}</span>
                  <span className="flex items-center gap-1.5 text-xs text-gray-400 font-medium whitespace-nowrap">
                    <MapPin className="w-3.5 h-3.5" /> {actor.ville}
                  </span>
                </div>
                
                <div className="mt-auto">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {actor.products.slice(0, 2).map((p, j) => (
                      <span key={j} className="text-[10px] font-bold px-3 py-1.5 bg-black/40 border border-white/5 text-gray-400 rounded-full">
                        {p}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center pt-5 border-t border-white/10">
                    <div className="flex items-center gap-2">
                       <div className="flex text-brand-neon">
                          {[...Array(5)].map((_, idx) => (
                            <svg key={idx} className={cn("w-3.5 h-3.5", idx < Math.floor(actor.note) ? "fill-current" : "text-white/10 fill-current")} viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                       </div>
                       <span className="text-xs font-bold text-white">{actor.note}</span>
                    </div>
                    <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white group-hover:bg-brand-neon group-hover:text-[#0a0a0a] transition-all duration-300">
                      <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-24 bg-white/5 rounded-[3rem] border border-white/10 mt-8">
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-500" />
              </div>
              <h3 className="text-xl font-display font-medium text-white mb-2">Aucun résultat trouvé</h3>
              <p className="text-gray-400 font-medium">Aucune institution ne correspond à votre recherche actuelle.</p>
              <button 
                onClick={() => {setSearch(''); setActiveType('Tous');}}
                className="mt-6 px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full font-bold text-sm transition-colors"
              >
                Réinitialiser la recherche
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 2. RÉGULATEURS CEMAC */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a] relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-neon/5 rounded-full blur-[150px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white text-xs font-bold uppercase tracking-widest mb-6">
              <Shield className="w-4 h-4 text-brand-neon" />
              Cadre Réglementaire
            </span>
            <h2 className="font-display font-medium text-4xl md:text-5xl lg:text-6xl text-white tracking-tight mb-6">
              Les Gardiens de la <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-neon to-emerald-400">Zone CEMAC</span>
            </h2>
            <p className="text-gray-400 font-medium text-lg max-w-2xl mx-auto">
              Ces piliers instutionnels garantissent la fiabilité, la transparence et le développement continu de notre marché financier régional.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {REGULATORS.map((reg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true, margin: "-50px" }}
                className={cn(
                  "relative group rounded-[2.5rem] bg-white/5 border border-white/10 overflow-hidden flex flex-col p-8 lg:p-10 transition-all duration-500",
                  reg.border,
                  "hover:bg-white/10 hover:shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
                )}
              >
                {/* Background Gradient Effect */}
                <div className={cn("absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none", reg.gradient)}></div>

                <div className="relative z-10 font-display flex flex-col h-full">
                  <div className="flex justify-between items-start mb-8">
                    <div className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center p-2 shadow-xl group-hover:scale-105 transition-transform duration-500">
                      <img src={reg.logo} alt={`Logo ${reg.name}`} className="w-full h-full object-contain" />
                    </div>
                    <span className={cn("text-[10px] sm:text-xs font-bold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-current", reg.badgeBg)}>
                      {reg.badge}
                    </span>
                  </div>
                  
                  <h3 className="font-display font-medium text-3xl sm:text-4xl text-white mb-2 line-clamp-1">{reg.name}</h3>
                  <p className={cn("text-sm sm:text-base font-bold mb-4", reg.accent)}>{reg.fullName}</p>
                  
                  <div className="w-12 h-1 bg-white/10 rounded-full mb-6 group-hover:w-24 transition-all duration-500"></div>

                  <p className="text-gray-300 font-medium text-sm sm:text-base leading-relaxed flex-grow">
                    {reg.role}
                  </p>

                  <a
                    href={reg.site}
                    className="mt-8 self-start flex items-center gap-2 text-sm font-bold text-white hover:text-brand-neon transition-colors group/link"
                  >
                    Visiter le portail officiel 
                    <ArrowRight className="w-4 h-4 -rotate-45 group-hover/link:rotate-0 transition-transform duration-300" />
                  </a>
                </div>
              </motion.div>
            ))}
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
