import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Layers, TrendingUp, TrendingDown, FileText, Info, Search, SlidersHorizontal, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../../lib/utils';

// Données officielles BVMAC — Bulletin Officiel de la Cote N°2502 du 04/05/2026
// Source : Sociétés de Gestion de Portefeuilles agréées COSUMAF
const FONDS_DATA = [
  // ── AFRICA BRIGHT ASSET MANAGEMENT ──
  { nom: 'FCP AB AVENIR', gestionnaire: 'Africa Bright AM', depositaire: 'BGFIBank Cameroun', categorie: 'D', origine: 1000, vlActuelle: 1261.57, variationOrigine: 26.16, variationPrec: 0.75, dateVL: '01/05/2026', periodicite: 'Quotidienne' },
  { nom: 'FCP AB CASH', gestionnaire: 'Africa Bright AM', depositaire: 'UBA Bank Cameroun', categorie: 'M', origine: 10000, vlActuelle: 13045.58, variationOrigine: 30.46, variationPrec: 0.09, dateVL: '01/05/2026', periodicite: 'Hebdomadaire' },
  { nom: 'FCP AB INVEST', gestionnaire: 'Africa Bright AM', depositaire: 'UBA Bank Cameroun', categorie: 'O', origine: 10000, vlActuelle: 12504.14, variationOrigine: 25.04, variationPrec: 0.07, dateVL: '01/05/2026', periodicite: 'Hebdomadaire' },
  { nom: 'FCP PERFORMANCE', gestionnaire: 'Africa Bright AM', depositaire: 'Orabank Gabon', categorie: 'O', origine: 10000, vlActuelle: 11754.32, variationOrigine: 17.54, variationPrec: 0.08, dateVL: '01/05/2026', periodicite: 'Hebdomadaire' },
  { nom: 'FCP CAP OBLIGATIONS', gestionnaire: 'Africa Bright AM', depositaire: 'BGFIBank Cameroun', categorie: 'O', origine: 10000, vlActuelle: 12457.70, variationOrigine: 24.58, variationPrec: 0.58, dateVL: '01/05/2026', periodicite: 'Hebdomadaire' },
  { nom: 'FCP AB DIVERSIFIE', gestionnaire: 'Africa Bright AM', depositaire: 'BGFIBank Cameroun', categorie: 'D', origine: 10000, vlActuelle: 11166.05, variationOrigine: 11.66, variationPrec: 0.06, dateVL: '01/05/2026', periodicite: 'Hebdomadaire' },
  { nom: 'FCP ABD KOMO', gestionnaire: 'Africa Bright AM', depositaire: 'Orabank Gabon', categorie: 'A', origine: 10000, vlActuelle: 11174.45, variationOrigine: 11.74, variationPrec: -0.29, dateVL: '01/05/2026', periodicite: 'Mensuelle' },

  // ── ASCA ASSET MANAGEMENT ──
  { nom: 'FCP ASCA LIQUIDITES', gestionnaire: 'ASCA AM', depositaire: 'ASCA', categorie: 'M', origine: 10000, vlActuelle: 14586.16, variationOrigine: 45.86, variationPrec: 0.03, dateVL: '24/04/2026', periodicite: 'Hebdomadaire' },
  { nom: 'FCP ASCA PATRIMOINE', gestionnaire: 'ASCA AM', depositaire: 'ASCA', categorie: 'O', origine: 10000, vlActuelle: 15815.08, variationOrigine: 58.15, variationPrec: 0.08, dateVL: '24/04/2026', periodicite: 'Hebdomadaire' },
  { nom: 'FCP ASCA HORIZON', gestionnaire: 'ASCA AM', depositaire: 'Crédit du Congo', categorie: 'O', origine: 10000, vlActuelle: 15353.65, variationOrigine: 53.54, variationPrec: 0.07, dateVL: '24/04/2026', periodicite: 'Hebdomadaire' },
  { nom: 'FCP CRBC PROSPERITE', gestionnaire: 'ASCA AM', depositaire: 'ASCA', categorie: 'O', origine: 10000, vlActuelle: 13963.38, variationOrigine: 39.63, variationPrec: 0.10, dateVL: '24/04/2026', periodicite: 'Hebdomadaire' },
  { nom: 'FCP WAFA ASSURANCE CEMAC', gestionnaire: 'ASCA AM', depositaire: 'Crédit du Congo', categorie: 'O', origine: 10000, vlActuelle: 11642.56, variationOrigine: 16.43, variationPrec: 0.10, dateVL: '24/04/2026', periodicite: 'Hebdomadaire' },

  // ── CONTACTURER ASSET MANAGEMENT ──
  { nom: 'FCP CONTACTURER OBLIGATAIRE A', gestionnaire: 'Contacturer AM', depositaire: 'BGFIBank Cameroun', categorie: 'O', origine: 10000, vlActuelle: 11218.80, variationOrigine: 12.19, variationPrec: 0.12, dateVL: '01/05/2026', periodicite: 'Hebdomadaire' },
  { nom: 'FCP CONTACTURER OBLIGATAIRE B', gestionnaire: 'Contacturer AM', depositaire: 'BGFIBank Cameroun', categorie: 'O', origine: 10000, vlActuelle: 10361.37, variationOrigine: 3.61, variationPrec: 0.11, dateVL: '01/05/2026', periodicite: 'Hebdomadaire' },
  { nom: 'FCPE CONTACTURER EPARGNE SALARIALE', gestionnaire: 'Contacturer AM', depositaire: 'UBA Cameroon', categorie: 'O', origine: 10000, vlActuelle: 10389.06, variationOrigine: 3.89, variationPrec: 0.11, dateVL: '01/05/2026', periodicite: 'Hebdomadaire' },

  // ── CORRIDOR ASSET MANAGEMENT ──
  { nom: 'FCP CORRIDOR RENDEMENT', gestionnaire: 'Corridor AM', depositaire: 'LCB Bank', categorie: 'D', origine: 7723, vlActuelle: 11305.25, variationOrigine: 46.38, variationPrec: 0.01, dateVL: '24/04/2026', periodicite: 'Hebdomadaire' },

  // ── EDC ASSET MANAGEMENT CEMAC ──
  { nom: 'FCP ECOBANK MONETAIRE CEMAC', gestionnaire: 'EDC AM Cemac', depositaire: 'Ecobank Cameroun', categorie: 'M', origine: 1000, vlActuelle: 1151.07, variationOrigine: 15.11, variationPrec: 0.02, dateVL: '15/04/2026', periodicite: 'Quotidienne' },
  { nom: 'FCP ECOBANK OBLIGATAIRE CEMAC', gestionnaire: 'EDC AM Cemac', depositaire: 'Ecobank Cameroun', categorie: 'M', origine: 10000, vlActuelle: 14454.00, variationOrigine: 44.54, variationPrec: 0.14, dateVL: '15/04/2026', periodicite: 'Hebdomadaire' },

  // ── ELITE CAPITAL ASSET MANAGEMENT ──
  { nom: 'FCP ELITE CAPITAL INVEST', gestionnaire: 'Elite Capital AM', depositaire: 'Afriland First Bank', categorie: 'O', origine: 10000, vlActuelle: 12610.95, variationOrigine: 26.11, variationPrec: 0.12, dateVL: '24/04/2026', periodicite: 'Hebdomadaire' },
  { nom: 'FCP ELITE CAPITAL RECORD', gestionnaire: 'Elite Capital AM', depositaire: 'Afriland First Bank', categorie: 'D', origine: 10000, vlActuelle: 12514.87, variationOrigine: 25.15, variationPrec: 0.12, dateVL: '24/04/2026', periodicite: 'Hebdomadaire' },
  { nom: 'FCP CCA PERFORMANCE', gestionnaire: 'Elite Capital AM', depositaire: 'CCA Bank', categorie: 'O', origine: 10000, vlActuelle: 12604.50, variationOrigine: 26.05, variationPrec: 0.11, dateVL: '24/04/2026', periodicite: 'Hebdomadaire' },

  // ── ENKO CAPITAL CENTRAL AFRICA ──
  { nom: 'FCP ENKO CAPITAL PALMARES', gestionnaire: 'Enko Capital Central Africa', depositaire: 'UBA Cameroun', categorie: 'O', origine: 10000, vlActuelle: 12764.30, variationOrigine: 27.64, variationPrec: 0.18, dateVL: '23/04/2026', periodicite: 'Hebdomadaire' },

  // ── ESS ASSET MANAGEMENT ──
  { nom: 'FCP ESS CONFORT', gestionnaire: 'ESS AM', depositaire: 'Orabank Gabon', categorie: 'O', origine: 10000, vlActuelle: 12579.00, variationOrigine: 25.79, variationPrec: 0.10, dateVL: '28/04/2026', periodicite: 'Hebdomadaire' },
  { nom: 'FCP ESS TRESO PRIVILEGE', gestionnaire: 'ESS AM', depositaire: 'Orabank Gabon', categorie: 'M', origine: 10000, vlActuelle: 12367.00, variationOrigine: 23.67, variationPrec: 0.11, dateVL: '28/04/2026', periodicite: 'Hebdomadaire' },
  { nom: 'FCP ESS PROMO PME', gestionnaire: 'ESS AM', depositaire: 'Orabank Gabon', categorie: 'M', origine: 10000, vlActuelle: 11966.00, variationOrigine: 19.66, variationPrec: 0.08, dateVL: '28/04/2026', periodicite: 'Hebdomadaire' },

  // ── HARVEST ASSET MANAGEMENT ──
  { nom: 'FCP HARVEST ACTIONS CEMAC', gestionnaire: 'Harvest AM', depositaire: 'Banque Atlantique Cameroun', categorie: 'A', origine: 100000, vlActuelle: 136117.66, variationOrigine: 36.12, variationPrec: -0.25, dateVL: '10/04/2026', periodicite: 'Hebdomadaire' },
  { nom: 'FCP ATLANTIQUE PERFORMANCE', gestionnaire: 'Harvest AM', depositaire: 'Banque Atlantique Cameroun', categorie: 'O', origine: 10000, vlActuelle: 15028.50, variationOrigine: 50.29, variationPrec: 0.05, dateVL: '10/04/2026', periodicite: 'Hebdomadaire' },
  { nom: 'FCP HARVEST LIQUIDITÉS', gestionnaire: 'Harvest AM', depositaire: 'Banque Atlantique Cameroun', categorie: 'M', origine: 10000, vlActuelle: 12515.30, variationOrigine: 25.15, variationPrec: 0.04, dateVL: '10/04/2026', periodicite: 'Hebdomadaire' },
  { nom: 'FCP EVEREST FINANCE RENDEMENT', gestionnaire: 'Harvest AM', depositaire: 'Banque Atlantique Cameroun', categorie: 'O', origine: 100000, vlActuelle: 126450.02, variationOrigine: 26.45, variationPrec: 0.05, dateVL: '10/04/2026', periodicite: 'Hebdomadaire' },
  { nom: 'FCP BGFIBank ATLAS', gestionnaire: 'Harvest AM', depositaire: 'BGFIBank Cameroun', categorie: 'O', origine: 100000, vlActuelle: 119777.90, variationOrigine: 19.78, variationPrec: 0.05, dateVL: '10/04/2026', periodicite: 'Hebdomadaire' },
  { nom: 'FCP CRBC LONGEVITÉ', gestionnaire: 'Harvest AM', depositaire: 'Banque Atlantique Cameroun', categorie: 'O', origine: 1000000, vlActuelle: 1244163.77, variationOrigine: 24.42, variationPrec: 0.26, dateVL: '06/04/2026', periodicite: 'Hebdomadaire' },
  { nom: 'FCP HARVEST TRÉSORERIE', gestionnaire: 'Harvest AM', depositaire: 'Ecobank Cameroun', categorie: 'M', origine: 10000, vlActuelle: 13791.93, variationOrigine: 37.92, variationPrec: 0.05, dateVL: '10/04/2026', periodicite: 'Hebdomadaire' },
  { nom: 'FCP HARVEST DIVERSIFIE', gestionnaire: 'Harvest AM', depositaire: 'AFG Bank Cameroun', categorie: 'D', origine: 100000, vlActuelle: 99697.51, variationOrigine: -0.30, variationPrec: -0.01, dateVL: '26/08/2025', periodicite: 'Quotidienne' },

  // ── KORI ASSET MANAGEMENT ──
  { nom: 'FCP KORI SERENITE', gestionnaire: 'Kori AM', depositaire: 'Ecobank Cameroun', categorie: 'D', origine: 10000, vlActuelle: 11332.83, variationOrigine: 13.33, variationPrec: 0.02, dateVL: '10/04/2026', periodicite: 'Hebdomadaire' },

  // ── L'ARCHER CAPITAL ASSET MANAGEMENT ──
  { nom: "FCP L'ACM KIMIA", gestionnaire: "L'Archer Capital AM", depositaire: 'UBA Cameroun', categorie: 'M', origine: 10000, vlActuelle: 11817.00, variationOrigine: 18.17, variationPrec: 0.20, dateVL: '17/04/2026', periodicite: 'Hebdomadaire' },
  { nom: "FCP L'ACM PERFORMANCE", gestionnaire: "L'Archer Capital AM", depositaire: 'UBA Cameroun', categorie: 'O', origine: 10000, vlActuelle: 13479.00, variationOrigine: 34.79, variationPrec: 0.53, dateVL: '17/04/2026', periodicite: 'Hebdomadaire' },
  { nom: 'FCP RAPEC', gestionnaire: "L'Archer Capital AM", depositaire: 'UBA Cameroun', categorie: 'O', origine: 10000, vlActuelle: 12047.00, variationOrigine: 20.47, variationPrec: 0.24, dateVL: '17/04/2026', periodicite: 'Hebdomadaire' },

  // ── MAKEDA ASSET MANAGEMENT ──
  { nom: 'FCP MAKEDA HORIZON', gestionnaire: 'Makeda AM', depositaire: 'UBA Cameroun', categorie: 'O', origine: 10000, vlActuelle: 11879.54, variationOrigine: 18.80, variationPrec: 0.11, dateVL: '06/03/2026', periodicite: 'Hebdomadaire' },

  // ── SOCIETE GENERALE CAM ──
  { nom: 'FCP SOGEFIRST', gestionnaire: 'SG Capital AM Central Africa', depositaire: 'Société Générale Cameroun', categorie: 'O', origine: 10000, vlActuelle: 11299.00, variationOrigine: 12.99, variationPrec: 0.14, dateVL: '30/04/2026', periodicite: 'Hebdomadaire' },
];

const CAT_LABELS: Record<string, string> = { A: 'Actions', O: 'Obligations', D: 'Diversifié', M: 'Monétaire', C: 'Contractuel' };
const CAT_COLORS: Record<string, string> = {
  A: 'bg-blue-100 text-blue-700',
  O: 'bg-emerald-100 text-emerald-700',
  D: 'bg-purple-100 text-purple-700',
  M: 'bg-orange-100 text-orange-700',
  C: 'bg-gray-100 text-gray-600',
};

// Top 4 pour les cartes vedettes
const TOP_FONDS = [
  { nom: 'FCP ASCA PATRIMOINE', gestionnaire: 'ASCA AM', categorie: 'O', vlActuelle: 15815.08, variationOrigine: 58.15, variationPrec: 0.08, accroche: 'Meilleur rendement sur les obligations CEMAC depuis l\'origine.', color: 'bg-[#0a0a0a]', textColor: 'text-white', tag: 'Top rendement' },
  { nom: 'FCP HARVEST ACTIONS CEMAC', gestionnaire: 'Harvest AM', categorie: 'A', vlActuelle: 136117.66, variationOrigine: 36.12, variationPrec: -0.25, accroche: 'Seul fonds actions de la zone CEMAC avec une exposition pure au marché boursier régional.', color: 'bg-brand-neon', textColor: 'text-brand-dark', tag: 'Fonds Actions CEMAC' },
  { nom: 'FCP ASCA LIQUIDITES', gestionnaire: 'ASCA AM', categorie: 'M', vlActuelle: 14586.16, variationOrigine: 45.86, variationPrec: 0.03, accroche: 'Le fonds monétaire le plus performant, idéal pour la gestion de trésorerie.', color: 'bg-[#e5f0ff]', textColor: 'text-brand-dark', tag: 'Meilleure trésorerie' },
  { nom: "FCP L'ACM PERFORMANCE", gestionnaire: "L'Archer Capital AM", categorie: 'O', vlActuelle: 13479.00, variationOrigine: 34.79, variationPrec: 0.53, accroche: 'Fonds obligataire à forte performance hebdomadaire, géré par L\'Archer Capital.', color: 'bg-[#e5fff4]', textColor: 'text-brand-dark', tag: 'Forte semaine' },
];

const CATEGORIES = ['Tous', 'Actions', 'Obligations', 'Diversifié', 'Monétaire'];

function formatVL(val: number): string {
  if (val >= 1000000) return (val / 1000000).toFixed(2) + ' M';
  if (val >= 10000) return val.toLocaleString('fr-FR', { maximumFractionDigits: 0 });
  return val.toLocaleString('fr-FR', { maximumFractionDigits: 2 });
}

export default function FondsPage() {
  const [activeType, setActiveType] = useState('Tous');
  const [search, setSearch] = useState('');
  const [selectedFond, setSelectedFond] = useState<typeof FONDS_DATA[0] | null>(null);
  const [sortBy, setSortBy] = useState<'variationOrigine' | 'variationPrec' | 'vlActuelle'>('variationOrigine');

  const filtered = FONDS_DATA
    .filter(f => {
      const typeMatch = activeType === 'Tous' || CAT_LABELS[f.categorie] === activeType;
      const searchMatch = f.nom.toLowerCase().includes(search.toLowerCase()) ||
        f.gestionnaire.toLowerCase().includes(search.toLowerCase()) ||
        f.depositaire.toLowerCase().includes(search.toLowerCase());
      return typeMatch && searchMatch;
    })
    .sort((a, b) => b[sortBy] - a[sortBy]);

  return (
    <div className="flex flex-col min-h-screen bg-brand-gray">

      {/* HERO */}
      <section className="bg-[#0a0a0a] text-white px-4 sm:px-6 lg:px-8 pt-16 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 w-[500px] h-[400px] bg-emerald-500/10 rounded-full blur-[120px]"></div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <Link to="/investir" className="inline-flex items-center gap-2 text-white/50 text-sm font-bold mb-8 hover:text-white transition-colors">
            ← Retour aux investissements
          </Link>
          <div className="flex flex-col lg:flex-row justify-between gap-12 items-end">
            <div>
              <span className="text-xs font-bold text-brand-neon tracking-widest uppercase mb-4 block">OPCVM — Bulletin BVMAC N°2502 du 04/05/2026</span>
              <h1 className="font-display font-bold text-5xl md:text-6xl tracking-tighter leading-tight mb-6">
                Fonds Communs de Placement<br />
                <span className="text-brand-neon">agréés COSUMAF</span>
              </h1>
              <p className="text-white/60 text-lg font-medium leading-relaxed max-w-xl">
                {FONDS_DATA.length} FCP disponibles en zone CEMAC. Données officielles issues du Bulletin Officiel de la Cote de la BVMAC.
              </p>
            </div>
            <div className="shrink-0 grid grid-cols-2 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <p className="text-white/50 text-xs font-bold mb-1">FCP disponibles</p>
                <p className="font-display font-bold text-3xl text-white">{FONDS_DATA.length}</p>
              </div>
              <div className="bg-brand-neon/10 border border-brand-neon/20 rounded-2xl p-5">
                <p className="text-brand-neon text-xs font-bold mb-1">Source officielle</p>
                <p className="font-display font-bold text-xl text-white">BVMAC</p>
                <p className="text-white/40 text-[10px]">04/05/2026</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TOP 4 VEDETTES */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display font-bold text-2xl text-brand-dark mb-6">Fonds en vedette</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {TOP_FONDS.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={cn("rounded-[2rem] p-7 flex flex-col justify-between min-h-[220px] hover:-translate-y-1 transition-all group cursor-pointer", f.color)}
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className={cn("text-[10px] font-bold px-2.5 py-1 rounded-full", f.textColor === 'text-white' ? 'bg-white/10 text-white' : 'bg-black/5 text-brand-dark')}>
                      {f.tag}
                    </span>
                    <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-md", CAT_COLORS[f.categorie])}>
                      {CAT_LABELS[f.categorie]}
                    </span>
                  </div>
                  <h3 className={cn("font-display font-bold text-lg leading-tight mb-1", f.textColor)}>{f.nom}</h3>
                  <p className={cn("text-xs font-medium opacity-60 mb-3", f.textColor)}>{f.gestionnaire}</p>
                  <p className={cn("text-xs font-medium leading-relaxed opacity-70", f.textColor)}>{f.accroche}</p>
                </div>
                <div className="flex justify-between items-end mt-4">
                  <div>
                    <p className={cn("text-[10px] font-bold opacity-50 uppercase mb-0.5", f.textColor)}>VL actuelle</p>
                    <p className={cn("font-display font-bold text-lg", f.textColor)}>{formatVL(f.vlActuelle)} XAF</p>
                  </div>
                  <div className="text-right">
                    <p className={cn("text-[10px] font-bold opacity-50 uppercase mb-0.5", f.textColor)}>Depuis origine</p>
                    <p className={cn("font-bold text-lg", f.variationOrigine >= 0 ? (f.textColor === 'text-white' ? 'text-brand-neon' : 'text-emerald-600') : 'text-red-500')}>
                      {f.variationOrigine >= 0 ? '+' : ''}{f.variationOrigine.toFixed(2)}%
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TABLEAU COMPLET */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-6">
            <h2 className="font-display font-bold text-2xl text-brand-dark">
              Tous les FCP CEMAC <span className="text-gray-400 font-medium text-lg">({filtered.length} / {FONDS_DATA.length})</span>
            </h2>
            <div className="flex gap-2 flex-wrap">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveType(cat)}
                  className={cn(
                    "px-4 py-2 rounded-full text-xs font-bold transition-all border",
                    activeType === cat ? "bg-brand-dark text-white border-brand-dark" : "bg-white text-gray-500 border-gray-200 hover:border-gray-400"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Search + sort */}
          <div className="flex flex-col sm:flex-row gap-3 mb-5">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Chercher un fonds, gestionnaire, dépositaire..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-10 pr-4 py-2.5 w-full bg-white border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-brand-neon/20 text-sm font-medium"
              />
            </div>
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-gray-400" />
              <span className="text-xs font-bold text-gray-400 uppercase">Trier par :</span>
              {[
                { key: 'variationOrigine', label: '% depuis origine' },
                { key: 'variationPrec', label: '% hebdo' },
                { key: 'vlActuelle', label: 'VL actuelle' },
              ].map(s => (
                <button
                  key={s.key}
                  onClick={() => setSortBy(s.key as typeof sortBy)}
                  className={cn(
                    "px-3 py-1.5 rounded-xl text-xs font-bold transition-all",
                    sortBy === s.key ? "bg-brand-dark text-white" : "bg-white border border-gray-200 text-gray-500"
                  )}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-[2rem] border border-black/5 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-black/5">
                  <tr className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    <th className="px-5 py-3.5 text-left">Fonds (OPCVM)</th>
                    <th className="px-5 py-3.5 text-left">Gestionnaire</th>
                    <th className="px-5 py-3.5 text-left">Dépositaire</th>
                    <th className="px-5 py-3.5 text-center">Catég.</th>
                    <th className="px-5 py-3.5 text-center">Périodicité</th>
                    <th className="px-5 py-3.5 text-right">VL actuelle (XAF)</th>
                    <th className="px-5 py-3.5 text-right">% Hebdo</th>
                    <th className="px-5 py-3.5 text-right">% Origine</th>
                    <th className="px-5 py-3.5 text-center">Date VL</th>
                    <th className="px-5 py-3.5"></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((fond, i) => (
                    <motion.tr
                      key={i}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.015 }}
                      onClick={() => setSelectedFond(fond)}
                      className="border-b border-gray-50 hover:bg-gray-50 cursor-pointer group transition-colors"
                    >
                      <td className="px-5 py-3.5">
                        <span className="font-bold text-brand-dark text-sm group-hover:text-brand-green transition-colors">{fond.nom}</span>
                      </td>
                      <td className="px-5 py-3.5 text-xs text-gray-500 font-medium">{fond.gestionnaire}</td>
                      <td className="px-5 py-3.5 text-xs text-gray-400 font-medium">{fond.depositaire}</td>
                      <td className="px-5 py-3.5 text-center">
                        <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-md", CAT_COLORS[fond.categorie])}>
                          {CAT_LABELS[fond.categorie]}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-center text-[10px] text-gray-400 font-medium">{fond.periodicite}</td>
                      <td className="px-5 py-3.5 text-right font-mono font-bold text-brand-dark text-sm">
                        {formatVL(fond.vlActuelle)}
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <span className={cn("font-bold text-sm", fond.variationPrec >= 0 ? 'text-emerald-600' : 'text-red-500')}>
                          {fond.variationPrec >= 0 ? '+' : ''}{fond.variationPrec.toFixed(2)}%
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <span className={cn("font-bold text-sm", fond.variationOrigine >= 0 ? 'text-emerald-600' : 'text-red-500')}>
                          {fond.variationOrigine >= 0 ? '+' : ''}{fond.variationOrigine.toFixed(2)}%
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-center text-[10px] text-gray-400 font-mono">{fond.dateVL}</td>
                      <td className="px-5 py-3.5 text-right">
                        <Link
                          to="/inscription"
                          onClick={e => e.stopPropagation()}
                          className="opacity-0 group-hover:opacity-100 inline-flex items-center gap-1 px-3 py-1.5 bg-brand-dark text-white rounded-xl text-[10px] font-bold hover:bg-brand-neon hover:text-brand-dark transition-all"
                        >
                          Souscrire <ArrowRight className="w-3 h-3" />
                        </Link>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
              {filtered.length === 0 && (
                <div className="p-12 text-center text-gray-400 font-medium">Aucun fonds ne correspond à votre recherche.</div>
              )}
            </div>
          </div>

          <div className="mt-5 flex items-start gap-3 text-sm text-gray-500 font-medium bg-amber-50 border border-amber-200 rounded-2xl p-5">
            <Info className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <p>
              Données issues du <strong className="text-brand-dark">Bulletin Officiel de la Cote N°2502 du 04/05/2026</strong> — BVMAC. Source : Sociétés de Gestion de Portefeuilles agréées <strong className="text-brand-dark">COSUMAF</strong>. Les performances passées ne préjugent pas des résultats futurs. Investir comporte des risques de perte en capital.
            </p>
          </div>
        </div>
      </section>

      {/* MODAL DETAIL */}
      <AnimatePresence>
        {selectedFond && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setSelectedFond(null)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-3xl shadow-2xl w-full max-w-xl z-10 overflow-hidden"
            >
              <div className="bg-[#0a0a0a] px-8 py-6 flex items-start justify-between">
                <div>
                  <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-md mb-3 inline-block", CAT_COLORS[selectedFond.categorie])}>
                    {CAT_LABELS[selectedFond.categorie]}
                  </span>
                  <h2 className="font-display font-bold text-2xl text-white leading-tight">{selectedFond.nom}</h2>
                  <p className="text-white/50 text-sm font-medium mt-1">{selectedFond.gestionnaire}</p>
                </div>
                <button onClick={() => setSelectedFond(null)} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors ml-4 shrink-0">
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>

              <div className="p-8">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-brand-gray rounded-2xl p-4">
                    <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">VL Actuelle</p>
                    <p className="font-display font-bold text-2xl text-brand-dark">{formatVL(selectedFond.vlActuelle)}</p>
                    <p className="text-xs text-gray-400 mt-0.5">XAF — au {selectedFond.dateVL}</p>
                  </div>
                  <div className="bg-brand-gray rounded-2xl p-4">
                    <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">VL Origine</p>
                    <p className="font-display font-bold text-2xl text-brand-dark">{selectedFond.origine.toLocaleString('fr-FR')}</p>
                    <p className="text-xs text-gray-400 mt-0.5">XAF</p>
                  </div>
                  <div className={cn("rounded-2xl p-4", selectedFond.variationOrigine >= 0 ? 'bg-emerald-50' : 'bg-red-50')}>
                    <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Perf. depuis origine</p>
                    <p className={cn("font-display font-bold text-2xl", selectedFond.variationOrigine >= 0 ? 'text-emerald-600' : 'text-red-500')}>
                      {selectedFond.variationOrigine >= 0 ? '+' : ''}{selectedFond.variationOrigine.toFixed(2)}%
                    </p>
                  </div>
                  <div className={cn("rounded-2xl p-4", selectedFond.variationPrec >= 0 ? 'bg-emerald-50' : 'bg-red-50')}>
                    <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Perf. hebdomadaire</p>
                    <p className={cn("font-display font-bold text-2xl", selectedFond.variationPrec >= 0 ? 'text-emerald-600' : 'text-red-500')}>
                      {selectedFond.variationPrec >= 0 ? '+' : ''}{selectedFond.variationPrec.toFixed(2)}%
                    </p>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  {[
                    { label: 'Dépositaire', val: selectedFond.depositaire },
                    { label: 'Catégorie', val: CAT_LABELS[selectedFond.categorie] },
                    { label: 'Périodicité VL', val: selectedFond.periodicite },
                    { label: 'Agrément', val: 'COSUMAF' },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                      <span className="text-sm text-gray-400 font-medium">{item.label}</span>
                      <span className="text-sm font-bold text-brand-dark">{item.val}</span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Link
                    to="/inscription"
                    className="flex-1 py-3.5 bg-brand-dark text-white rounded-xl font-bold text-sm hover:bg-brand-neon hover:text-brand-dark transition-colors flex items-center justify-center gap-2"
                  >
                    Souscrire maintenant <ArrowRight className="w-4 h-4" />
                  </Link>
                  <button className="py-3.5 px-5 bg-gray-100 text-brand-dark rounded-xl font-bold text-sm hover:bg-gray-200 transition-colors flex items-center gap-2">
                    <FileText className="w-4 h-4" /> DICI
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
