import { motion, AnimatePresence } from 'motion/react';
import { ArrowDownRight, ArrowUpRight, Search, SlidersHorizontal, LineChart as LineChartIcon, X, FileText, Info } from 'lucide-react';
import { cn } from '../lib/utils';
import { useState } from 'react';

// Real Data based on BVMAC Bulletin (04/05/2026)
const TICKER_DATA = [
  { symbol: 'BVMAC-AS', price: '1 135.10', change: '-1.05%' },
  { symbol: 'SEMC', price: '49 000', change: '-2.00%' },
  { symbol: 'SAFACAM', price: '30 000', change: '-9.09%' },
  { symbol: 'SOCAPALM', price: '55 000', change: '0.00%' },
  { symbol: 'REG', price: '42 000', change: '0.00%' },
  { symbol: 'BANGE', price: '228 085', change: '0.00%' },
  { symbol: 'SCG-Re', price: '21 499', change: '0.00%' },
];

const STOCKS_DATA = [
  { id: 1, name: 'SEMC', fullName: 'SOCIETE DES EAUX MINERALES DU CAMEROUN', sector: 'Agro-industrie', price: 49000, change: '-2.00', volume: 100 },
  { id: 2, name: 'SAFACAM', fullName: 'SOCIETE AFRICAINE FORESTIERE ET AGRICOLE', sector: 'Agro-industrie', price: 30000, change: '-9.09', volume: 90 },
  { id: 3, name: 'SOCAPALM', fullName: 'SOCIETE CAMEROUNAISE DE PALMERAIE', sector: 'Agro-industrie', price: 55000, change: '0.00', volume: 20 },
  { id: 4, name: 'LA REGIONALE', fullName: 'LA REGIONALE EPARGNE CREDIT', sector: 'Finance', price: 42000, change: '0.00', volume: 0 },
  { id: 5, name: 'BANGE', fullName: 'BANCO NACIONAL DE GUINEA ECUATORIAL', sector: 'Finance', price: 228085, change: '0.00', volume: 0 },
  { id: 6, name: 'SCG-Re', fullName: 'SOCIETE COMMERCIALE GABONAISE DE REASSURANCE', sector: 'Assurance', price: 21499, change: '0.00', volume: 0 },
];

const RAW_BONDS_DATA = [
  // Obligations d'États (20)
  { id: 'O1', name: 'EOG 6.00% NET 2021-2026', issuer: 'ETAT DU GABON', type: 'État', price: '99.50', yield: '6.00%' },
  { id: 'O2', name: 'ECMR 6.25% NET 2022-2029', issuer: 'ETAT DU CAMEROUN', type: 'État', price: '100.00', yield: '6.25%' },
  { id: 'O3', name: 'EOG 6.25% NET 2022-2028', issuer: 'ETAT DU GABON', type: 'État', price: '100.00', yield: '6.25%' },
  { id: 'O4', name: 'EOTD 6.5% NET 2022-2027', issuer: 'ETAT DU TCHAD', type: 'État', price: '100.00', yield: '6.50%' },
  { id: 'O5', name: 'ECMR 5.8% NET 2023-2026', issuer: 'ETAT DU CAMEROUN', type: 'État', price: '98.40', yield: '5.80%' },
  { id: 'O6', name: 'ECMR 6.00% NET 2023-2027', issuer: 'ETAT DU CAMEROUN', type: 'État', price: '100.00', yield: '6.00%' },
  { id: 'O7', name: 'ECMR 6.75% NET 2023-2029', issuer: 'ETAT DU CAMEROUN', type: 'État', price: '100.00', yield: '6.75%' },
  { id: 'O8', name: 'ECMR 7.25% NET 2023-2031', issuer: 'ETAT DU CAMEROUN', type: 'État', price: '99.00', yield: '7.25%' },
  { id: 'O9', name: 'EOG 6.25% NET 2023-2028', issuer: 'ETAT DU GABON', type: 'État', price: '96.00', yield: '6.25%' },
  { id: 'O10', name: 'EOG 6% NET 2024-2027', issuer: 'ETAT DU GABON', type: 'État', price: '100.00', yield: '6.00%' },
  { id: 'O11', name: 'EOG 6.5% NET 2024-2029', issuer: 'ETAT DU GABON', type: 'État', price: '100.00', yield: '6.50%' },
  { id: 'O12', name: 'EOG 7.5% NET 2024-2031', issuer: 'ETAT DU GABON', type: 'État', price: '100.00', yield: '7.50%' },
  { id: 'O13', name: 'EOG MT 6.60% NET 2024-2027', issuer: 'ETAT DU GABON', type: 'État', price: '100.00', yield: '6.60%' },
  { id: 'O14', name: 'EOG MT 6.75% NET 2024-2028', issuer: 'ETAT DU GABON', type: 'État', price: '100.00', yield: '6.75%' },
  { id: 'O15', name: 'EOG MT 7% NET 2024-2030', issuer: 'ETAT DU GABON', type: 'État', price: '100.00', yield: '7.00%' },
  { id: 'O16', name: 'EOG MT 6.6% NET 2024-2027-II', issuer: 'ETAT DU GABON', type: 'État', price: '97.00', yield: '6.60%' },
  { id: 'O17', name: 'EOG MT 6.75% NET 2024-2028-II', issuer: 'ETAT DU GABON', type: 'État', price: '100.00', yield: '6.75%' },
  { id: 'O18', name: 'EOG MT 7.00% NET 2024-2030-II', issuer: 'ETAT DU GABON', type: 'État', price: '100.00', yield: '7.00%' },
  { id: 'O19', name: 'EOG 5.6% NET 2025-2027', issuer: 'ETAT DU GABON', type: 'État', price: '100.00', yield: '5.60%' },
  { id: 'O20', name: 'EOG 6% NET 2025-2028', issuer: 'ETAT DU GABON', type: 'État', price: '100.00', yield: '6.00%' },

  // Obligations Régionales (6)
  { id: 'O21', name: 'BDEAC 5.45% NET 2020-2027', issuer: 'BDEAC', type: 'Régionale', price: '100.00', yield: '5.45%' },
  { id: 'O22', name: 'BDEAC 5.6% NET 2021-2028', issuer: 'BDEAC', type: 'Régionale', price: '98.50', yield: '5.60%' },
  { id: 'O23', name: 'BDEAC 6% NET 2022-2029', issuer: 'BDEAC', type: 'Régionale', price: '100.00', yield: '6.00%' },
  { id: 'O24', name: 'BDEAC 6.20% NET 2024-2031', issuer: 'BDEAC', type: 'Régionale', price: '100.00', yield: '6.20%' },
  { id: 'O25', name: 'BDEAC 5.95% NET 2024-2029', issuer: 'BDEAC', type: 'Régionale', price: '94.96', yield: '5.95%' },
  { id: 'O26', name: 'BDEAC 4.70% NET 2024-2027', issuer: 'BDEAC', type: 'Régionale', price: '100.00', yield: '4.70%' },

  // Obligations Privées (6)
  { id: 'O27', name: 'ALIOS 6.5% BRUT 2023-2028', issuer: 'ALIOS FINANCE', type: 'Privée', price: '100.00', yield: '6.50%' },
  { id: 'O28', name: 'ALIOS 6.00% BRUT 2023-2026', issuer: 'ALIOS FINANCE', type: 'Privée', price: '100.00', yield: '6.00%' },
  { id: 'O29', name: 'ACEP 7% BRUT 2024-2027', issuer: 'ACEP CAMEROUN', type: 'Privée', price: '100.00', yield: '7.00%' },
  { id: 'O30', name: 'SNPC 6.5% NET 2024-2029', issuer: 'SNPC', type: 'Privée', price: '100.00', yield: '6.50%' },
  { id: 'O31', name: 'ALIOS-05 6% BRUT 2025-2028', issuer: 'ALIOS FINANCE', type: 'Privée', price: '100.00', yield: '6.00%' },
  { id: 'O32', name: 'ALIOS-06 7% BRUT 2025-2030', issuer: 'ALIOS FINANCE', type: 'Privée', price: '100.00', yield: '7.00%' },
];

const BONDS_DATA = RAW_BONDS_DATA.map(bond => {
  const isinPrefix = bond.issuer.includes('GABON') ? 'GA' : bond.issuer.includes('CAMEROUN') ? 'CM' : bond.issuer.includes('TCHAD') ? 'TD' : bond.issuer.includes('BDEAC') ? 'CG' : 'CM';
  const mnemo = bond.name.split(' ')[0] + Math.floor(Math.random() * 10) + 1;
  return {
    ...bond,
    details: {
      isin: `${isinPrefix}0000${Math.floor(Math.random() * 90000) + 10000}`,
      mnemo: mnemo,
      tauxFacial: bond.yield,
      nominal: bond.type === 'État' || bond.type === 'Régionale' ? '10 000 XAF' : '10 000 XAF',
      montantLeve: Math.floor(Math.random() * 100 + 50) + ' Milliards XAF',
      encours: Math.floor(Math.random() * 80 + 20) + ' Milliards XAF',
      amortissement: bond.id === 'O26' ? 'In Fine' : 'Constant',
      periodicite: 'Annuelle',
      prochaineEcheance: `15/0${Math.floor(Math.random() * 9) + 1}/2026`,
      maturite: '5 Ans',
    }
  };
});


export default function Marches() {
  const [activeTab, setActiveTab] = useState<'actions'|'obligations'>('actions');
  const [activeBondType, setActiveBondType] = useState<string>('Toutes');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBond, setSelectedBond] = useState<any>(null);

  const bondTypes = ['Toutes', 'État', 'Régionale', 'Privée'];

  const filteredBonds = BONDS_DATA.filter((bond) => {
    const matchesType = activeBondType === 'Toutes' || bond.type === activeBondType;
    const matchesSearch = bond.name.toLowerCase().includes(searchQuery.toLowerCase()) || bond.issuer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const filteredStocks = STOCKS_DATA.filter((stock) => 
    stock.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    stock.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* TICKER BAND */}
      <div className="bg-brand-dark text-white border-b border-white/10 overflow-hidden relative">
         <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-brand-dark to-transparent z-10"></div>
         <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-brand-dark to-transparent z-10"></div>
         
         <div className="flex whitespace-nowrap py-3 animate-marquee items-center gap-8 px-4 w-max hover:[animation-play-state:paused] text-sm font-medium">
          {/* Double array for infinite scroll effect */}
          {[...TICKER_DATA, ...TICKER_DATA].map((ticker, i) => {
            const isUp = ticker.change.startsWith('+');
            const isDown = ticker.change.startsWith('-');
            return (
              <div key={i} className="flex items-center gap-3">
                <span className="font-bold text-white/50">{ticker.symbol}</span>
                <span>{ticker.price}</span>
                <span className={cn(
                  "flex items-center text-xs px-1.5 py-0.5 rounded",
                  isUp ? "text-emerald-400 bg-emerald-400/10" : isDown ? "text-red-400 bg-red-400/10" : "text-gray-400 bg-gray-400/10"
                )}>
                  {isUp && <ArrowUpRight className="w-3 h-3 mr-1" />}
                  {isDown && <ArrowDownRight className="w-3 h-3 mr-1" />}
                  {ticker.change}
                </span>
                <span className="w-1.5 h-1.5 bg-white/10 rounded-full ml-4"></span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex-1 bg-brand-gray px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          
          <div className="mb-12">
            <h1 className="font-display font-bold text-4xl text-brand-dark mb-4">Marchés Financiers CEMAC</h1>
            <p className="text-gray-600 font-medium">Suivez en temps réel les cours de la BVMAC et la courbe des taux régionaux.</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* L eft Column - Table */}
            <div className="w-full lg:w-2/3 flex flex-col gap-6">
              
              <div className="bg-white rounded-[2rem] border border-black/5 p-6 shadow-sm flex flex-col gap-6">
                
                {/* Table Header Controls */}
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <div className="flex bg-gray-100 p-1 rounded-xl w-fit">
                    <button 
                      onClick={() => setActiveTab('actions')}
                      className={cn("px-4 py-2 rounded-lg text-sm font-bold transition-all", activeTab === 'actions' ? "bg-white text-brand-dark shadow-sm" : "text-gray-500 hover:text-brand-dark")}
                    >
                      Actions
                    </button>
                    <button 
                      onClick={() => setActiveTab('obligations')}
                      className={cn("px-4 py-2 rounded-lg text-sm font-bold transition-all", activeTab === 'obligations' ? "bg-white text-brand-dark shadow-sm" : "text-gray-500 hover:text-brand-dark")}
                    >
                      Obligations
                    </button>
                  </div>

                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input 
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Rechercher un titre..." 
                        className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-green/20 outline-none w-full sm:w-64" 
                      />
                    </div>
                  </div>
                </div>

                {/* Sub Filters for Obligations */}
                {activeTab === 'obligations' && (
                   <div className="flex flex-wrap gap-2 pt-2 border-t border-black/5">
                      {bondTypes.map(type => (
                        <button
                          key={type}
                          onClick={() => setActiveBondType(type)}
                          className={cn(
                            "px-4 py-1.5 rounded-full text-xs font-bold transition-colors border",
                            activeBondType === type 
                              ? "bg-brand-dark text-white border-brand-dark" 
                              : "bg-transparent text-gray-500 border-gray-200 hover:border-gray-300 hover:text-brand-dark"
                          )}
                        >
                          {type}
                        </button>
                      ))}
                   </div>
                )}

                {/* Table */}
                <div className="overflow-x-auto rounded-xl border border-gray-100 max-h-[600px] overflow-y-auto">
                  <table className="w-full text-left border-collapse sticky top-0 relative">
                    <thead className="sticky top-0 bg-white z-10 shadow-[0_1px_0_0_rgba(0,0,0,0.05)]">
                      <tr className="text-[10px] uppercase tracking-wider font-bold text-gray-400">
                        {activeTab === 'actions' ? (
                          <>
                            <th className="px-4 py-3">Titre</th>
                            <th className="px-4 py-3">Secteur</th>
                            <th className="px-4 py-3 text-right">Cours (XAF)</th>
                            <th className="px-4 py-3 text-right">Var.</th>
                            <th className="px-4 py-3 text-right">Vol.</th>
                            <th className="px-4 py-3"></th>
                          </>
                        ) : (
                          <>
                            <th className="px-4 py-3">Désignation du Titre</th>
                            <th className="px-4 py-3">Émetteur</th>
                            <th className="px-4 py-3 text-right">Prix (%)</th>
                            <th className="px-4 py-3 text-right">Rendt.</th>
                            <th className="px-4 py-3"></th>
                          </>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {activeTab === 'actions' ? (
                        filteredStocks.map((stock, i) => {
                          const changeNum = parseFloat(stock.change);
                          const isUp = changeNum > 0;
                          const isDown = changeNum < 0;
                          return (
                            <motion.tr 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: i * 0.05 }}
                              key={i} 
                              className="border-b border-gray-50 hover:bg-gray-50 group cursor-pointer transition-colors"
                            >
                              <td className="px-4 py-3">
                                <div className="font-bold text-brand-dark text-sm">{stock.name}</div>
                                <div className="text-[10px] text-gray-400 mt-0.5 line-clamp-1 max-w-[150px]" title={stock.fullName}>{stock.fullName}</div>
                              </td>
                              <td className="px-4 py-3 text-xs text-gray-500 font-medium">{stock.sector}</td>
                              <td className="px-4 py-3 text-right text-sm font-bold text-brand-dark">
                                {stock.price.toLocaleString()}
                              </td>
                              <td className="px-4 py-3 text-right">
                                 <span className={cn(
                                  "inline-flex items-center justify-end text-xs font-bold min-w-[60px]",
                                  isUp ? "text-emerald-500" : isDown ? "text-red-500" : "text-gray-500"
                                )}>
                                  {isUp && '+'}{stock.change}%
                                </span>
                              </td>
                              <td className="px-4 py-3 text-right text-xs text-gray-500 font-medium">
                                 {stock.volume.toLocaleString()}
                              </td>
                              <td className="px-4 py-3 text-right">
                                 <button className="opacity-0 group-hover:opacity-100 px-3 py-1 bg-brand-dark text-white rounded-lg text-[10px] uppercase tracking-wider font-bold transition-all hover:bg-brand-neon hover:text-brand-dark">
                                    Acheter
                                 </button>
                              </td>
                            </motion.tr>
                          );
                        })
                      ) : (
                        filteredBonds.map((bond, i) => {
                           return (
                            <motion.tr 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: i * 0.02 }}
                              key={i} 
                              className="border-b border-gray-50 hover:bg-gray-50 group cursor-pointer transition-colors"
                            >
                              <td className="px-4 py-3">
                                <div className="font-bold text-brand-dark text-xs">{bond.name}</div>
                                <div className="text-[10px] text-gray-400 mt-0.5 inline-block px-1.5 py-0.5 bg-gray-100 rounded">{bond.type}</div>
                              </td>
                              <td className="px-4 py-3 text-xs text-gray-500 font-medium">{bond.issuer}</td>
                              <td className="px-4 py-3 text-right text-sm font-bold text-brand-dark">
                                {bond.price}
                              </td>
                              <td className="px-4 py-3 text-right text-sm font-bold text-emerald-600">
                                {bond.yield}
                              </td>
                              <td className="px-4 py-3 text-right">
                                 <button 
                                   onClick={() => setSelectedBond(bond)}
                                   className="opacity-0 group-hover:opacity-100 px-3 py-1 bg-gray-100 text-brand-dark rounded-lg text-[10px] uppercase font-bold transition-all hover:bg-brand-dark hover:text-white"
                                 >
                                    Détails
                                 </button>
                              </td>
                            </motion.tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                  
                  {activeTab === 'actions' && filteredStocks.length === 0 && (
                    <div className="p-8 text-center text-gray-500 text-sm">Aucun titre d'action ne correspond à votre recherche.</div>
                  )}
                  {activeTab === 'obligations' && filteredBonds.length === 0 && (
                    <div className="p-8 text-center text-gray-500 text-sm">Aucune obligation ne correspond à votre recherche.</div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Graph & Curve */}
            <div className="w-full lg:w-1/3 flex flex-col gap-6">
               
               {/* Mini Chart Mockup */}
               <div className="bg-brand-dark text-white rounded-[2rem] p-6 relative overflow-hidden shadow-xl">
                  {/* Neon Glow bg */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-brand-neon/20 blur-[60px] pointer-events-none"></div>

                  <div className="relative z-10 flex justify-between items-start mb-8">
                     <div>
                       <div className="text-white/50 text-sm font-bold mb-1">Indice BVMAC ALL SHARE</div>
                       <div className="font-display font-bold text-3xl">1 135.10</div>
                     </div>
                     <div className="px-3 py-1 bg-red-500/20 text-red-400 rounded-lg text-sm font-bold flex items-center gap-1 border border-red-500/20">
                        <ArrowDownRight className="w-4 h-4" /> -1.05%
                     </div>
                  </div>

                  <div className="relative z-10 h-32 w-full flex items-end gap-1 opacity-80">
                     {/* Random bars to look like a chart */}
                     {Array(30).fill(null).map((_, i) => (
                       <div key={i} className="flex-1 bg-gradient-to-t from-brand-neon to-emerald-500 rounded-t-sm" style={{height: `${30 + Math.random() * 70}%`}}></div>
                     ))}
                  </div>
               </div>

                {/* Yield Curve CTA */}
               <div className="bg-white rounded-[2rem] border border-black/5 p-6 shadow-sm">
                 <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center mb-4 text-gray-500">
                    <LineChartIcon className="w-6 h-6" />
                 </div>
                 <h3 className="font-display font-bold text-xl text-brand-dark mb-2">Courbe des taux</h3>
                 <p className="text-gray-500 text-sm font-medium mb-6 leading-relaxed">
                   Analysez les rendements des obligations d'État CEMAC par maturité pour optimiser votre stratégie.
                 </p>
                 <button className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-brand-dark font-bold rounded-xl transition-colors text-sm">
                   Voir le graphique interactif
                 </button>
               </div>

            </div>
          </div>

        </div>
      </div>

      <AnimatePresence>
        {selectedBond && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-brand-dark/40 backdrop-blur-sm" 
              onClick={() => setSelectedBond(null)}
            ></motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh] z-10"
            >
              <div className="p-6 border-b border-black/5 flex items-start justify-between bg-gray-50/50">
                <div>
                  <div className="text-sm font-bold text-gray-400 mb-1 tracking-wider uppercase">{selectedBond.type} • {selectedBond.issuer}</div>
                  <h2 className="font-display font-bold text-2xl md:text-3xl text-brand-dark">{selectedBond.name}</h2>
                </div>
                <button onClick={() => setSelectedBond(null)} className="p-2 bg-white border border-gray-200 rounded-full hover:bg-gray-50 text-gray-500 transition-colors shrink-0">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto">
                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex flex-col justify-center">
                      <div className="text-[10px] uppercase tracking-wider text-gray-500 font-bold mb-1">Taux Facial</div>
                      <div className="text-xl font-bold text-emerald-600">{selectedBond.details.tauxFacial}</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex flex-col justify-center">
                      <div className="text-[10px] uppercase tracking-wider text-gray-500 font-bold mb-1">Prix Coté</div>
                      <div className="text-xl font-bold text-brand-dark">{selectedBond.price}%</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex flex-col justify-center mt-4 sm:mt-0">
                      <div className="text-[10px] uppercase tracking-wider text-gray-500 font-bold mb-1">Nominal</div>
                      <div className="text-lg font-bold text-brand-dark leading-tight">{selectedBond.details.nominal}</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex flex-col justify-center mt-4 sm:mt-0">
                      <div className="text-[10px] uppercase tracking-wider text-gray-500 font-bold mb-1">Échéance</div>
                      <div className="text-lg font-bold text-brand-dark leading-tight">{selectedBond.details.prochaineEcheance}</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="flex items-center gap-2 text-xs font-bold text-brand-dark uppercase tracking-wider mb-4 border-b border-black/5 pb-2">
                          <Info className="w-4 h-4 text-brand-primary" /> Identifiants
                      </h3>
                      <ul className="space-y-4">
                        <li className="flex justify-between items-center text-sm border-b border-gray-50 pb-2">
                            <span className="text-gray-500">Code ISIN</span>
                            <span className="font-mono font-bold text-brand-dark">{selectedBond.details.isin}</span>
                        </li>
                        <li className="flex justify-between items-center text-sm border-b border-gray-50 pb-2">
                            <span className="text-gray-500">Mnémonique</span>
                            <span className="font-mono font-bold text-brand-dark">{selectedBond.details.mnemo}</span>
                        </li>
                        <li className="flex justify-between items-center text-sm border-b border-gray-50 pb-2">
                            <span className="text-gray-500">Maturité Initiale</span>
                            <span className="font-bold text-brand-dark">{selectedBond.details.maturite}</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="flex items-center gap-2 text-xs font-bold text-brand-dark uppercase tracking-wider mb-4 border-b border-black/5 pb-2">
                          <FileText className="w-4 h-4 text-brand-primary" /> Émission & Encours
                      </h3>
                      <ul className="space-y-4">
                        <li className="flex justify-between items-center text-sm border-b border-gray-50 pb-2">
                            <span className="text-gray-500">Montant levé</span>
                            <span className="font-bold text-brand-dark">{selectedBond.details.montantLeve}</span>
                        </li>
                        <li className="flex justify-between items-center text-sm border-b border-gray-50 pb-2">
                            <span className="text-gray-500">Encours actuel</span>
                            <span className="font-bold text-brand-dark">{selectedBond.details.encours}</span>
                        </li>
                          <li className="flex justify-between items-center text-sm border-b border-gray-50 pb-2">
                            <span className="text-gray-500">Amortissement</span>
                            <span className="font-bold text-brand-dark">{selectedBond.details.amortissement}</span>
                        </li>
                        <li className="flex justify-between items-center text-sm border-b border-gray-50 pb-2">
                            <span className="text-gray-500">Périodicité</span>
                            <span className="font-bold text-brand-dark">{selectedBond.details.periodicite}</span>
                        </li>
                      </ul>
                    </div>
                </div>
              </div>

              <div className="p-6 bg-gray-50 border-t border-black/5 flex justify-end gap-3 rounded-b-3xl">
                <button onClick={() => setSelectedBond(null)} className="px-6 py-3 bg-white border border-gray-200 text-brand-dark rounded-xl font-bold transition-all hover:bg-gray-50 text-sm">
                  Fermer
                </button>
                <button className="px-6 py-3 bg-brand-dark text-white rounded-xl font-bold transition-all hover:bg-brand-neon hover:text-brand-dark text-sm">
                  Investir dans ce titre
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
