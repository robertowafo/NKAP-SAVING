import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  TrendingUp, TrendingDown, ShoppingCart, Banknote, Trophy, ArrowUpRight,
  ArrowDownRight, RotateCcw, Info, Medal, Star
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '../../lib/utils';

const TITRES_BASE = [
  { name: 'SEMC', fullName: 'Société des Eaux Minérales', prix: 49000, secteur: 'Agro-industrie' },
  { name: 'SAFACAM', fullName: 'Société Africaine Forestière', prix: 30000, secteur: 'Agro-industrie' },
  { name: 'SOCAPALM', fullName: 'Société Camerounaise de Palmeraie', prix: 55000, secteur: 'Agro-industrie' },
  { name: 'LA REG.', fullName: 'La Régionale Épargne Crédit', prix: 42000, secteur: 'Finance' },
  { name: 'BANGE', fullName: 'Banco Nacional de Guinea Ecuatorial', prix: 228085, secteur: 'Finance' },
  { name: 'SCG-Re', fullName: 'Soc. Commerciale Gabonaise de Réassurance', prix: 21499, secteur: 'Assurance' },
];

const LEADERBOARD = [
  { rang: 1, nom: 'JeanBaptiste K.', portefeuille: '1 847 200', gain: '+84.7%', badge: '🥇' },
  { rang: 2, nom: 'Aminata T.', portefeuille: '1 623 400', gain: '+62.3%', badge: '🥈' },
  { rang: 3, nom: 'Kevin M.', portefeuille: '1 445 100', gain: '+44.5%', badge: '🥉' },
  { rang: 4, nom: 'Laure N.', portefeuille: '1 312 800', gain: '+31.3%', badge: '4' },
  { rang: 5, nom: 'Patrick E.', portefeuille: '1 204 600', gain: '+20.5%', badge: '5' },
];

interface Position {
  name: string;
  fractions: number;
  prixAchat: number;
  prixActuel: number;
}

function useSimulatedPrices(base: typeof TITRES_BASE) {
  const [prices, setPrices] = useState(base.map(t => ({ ...t })));

  useEffect(() => {
    const interval = setInterval(() => {
      setPrices(prev =>
        prev.map(t => ({
          ...t,
          prix: Math.max(1000, t.prix * (1 + (Math.random() - 0.5) * 0.008)),
        }))
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return prices;
}

export default function SimulateurPage() {
  const CAPITAL_DEPART = 1000000;
  const [cash, setCash] = useState(CAPITAL_DEPART);
  const [positions, setPositions] = useState<Position[]>([]);
  const [selectedTitre, setSelectedTitre] = useState(TITRES_BASE[0].name);
  const [qte, setQte] = useState(1);
  const [activeTab, setActiveTab] = useState<'marche' | 'portefeuille' | 'classement'>('marche');
  const [log, setLog] = useState<string[]>([]);
  const [showReset, setShowReset] = useState(false);

  const titres = useSimulatedPrices(TITRES_BASE);
  const getTitre = (name: string) => titres.find(t => t.name === name)!;

  const valeurPortefeuille = positions.reduce((acc, pos) => {
    const titre = getTitre(pos.name);
    return acc + pos.fractions * titre.prix;
  }, 0);

  const totalActifs = cash + valeurPortefeuille;
  const gainTotal = totalActifs - CAPITAL_DEPART;
  const gainPct = (gainTotal / CAPITAL_DEPART) * 100;

  const acheter = () => {
    const titre = getTitre(selectedTitre);
    const cout = titre.prix * qte;
    if (cout > cash) {
      setLog(prev => [`❌ Fonds insuffisants. Coût: ${cout.toFixed(0)} FCFA`, ...prev.slice(0, 9)]);
      return;
    }
    setCash(prev => prev - cout);
    setPositions(prev => {
      const idx = prev.findIndex(p => p.name === selectedTitre);
      if (idx !== -1) {
        const newPos = [...prev];
        newPos[idx] = {
          ...newPos[idx],
          fractions: newPos[idx].fractions + qte,
          prixAchat: ((newPos[idx].prixAchat * newPos[idx].fractions) + cout) / (newPos[idx].fractions + qte),
          prixActuel: titre.prix,
        };
        return newPos;
      }
      return [...prev, { name: selectedTitre, fractions: qte, prixAchat: titre.prix, prixActuel: titre.prix }];
    });
    setLog(prev => [`✅ Achat ${qte}x ${selectedTitre} @ ${titre.prix.toFixed(0)} FCFA`, ...prev.slice(0, 9)]);
  };

  const vendre = (name: string) => {
    const pos = positions.find(p => p.name === name);
    if (!pos) return;
    const titre = getTitre(name);
    const gain = pos.fractions * titre.prix;
    setCash(prev => prev + gain);
    setPositions(prev => prev.filter(p => p.name !== name));
    setLog(prev => [`💰 Vente ${pos.fractions}x ${name} @ ${titre.prix.toFixed(0)} FCFA`, ...prev.slice(0, 9)]);
  };

  const reset = () => {
    setCash(CAPITAL_DEPART);
    setPositions([]);
    setLog(['🔄 Portefeuille réinitialisé. 1 000 000 FCFA virtuels rechargés.']);
    setShowReset(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-brand-gray">

      {/* HEADER */}
      <div className="bg-[#0a0a0a] text-white px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <Link to="/apprendre" className="text-white/50 text-xs font-bold hover:text-white transition-colors mb-2 block">
              ← Retour à l'apprentissage
            </Link>
            <h1 className="font-display font-bold text-2xl md:text-3xl text-white">Simulateur Bourse NKAP</h1>
            <p className="text-white/50 text-sm font-medium">Capital fictif — Vrais cours BVMAC — Aucun risque réel</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-center">
              <p className="text-white/50 text-xs font-bold uppercase mb-1">Capital total</p>
              <p className={cn("font-display font-bold text-xl", gainTotal >= 0 ? 'text-brand-neon' : 'text-red-400')}>
                {totalActifs.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} FCFA
              </p>
            </div>
            <div className={cn("bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-center")}>
              <p className="text-white/50 text-xs font-bold uppercase mb-1">Gain / Perte</p>
              <p className={cn("font-display font-bold text-xl flex items-center gap-1", gainTotal >= 0 ? 'text-emerald-400' : 'text-red-400')}>
                {gainTotal >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                {gainPct.toFixed(2)}%
              </p>
            </div>
            <button
              onClick={() => setShowReset(true)}
              className="p-3 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors"
              title="Réinitialiser"
            >
              <RotateCcw className="w-5 h-5 text-white/60" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-7xl mx-auto mt-6">
          <div className="flex gap-1 bg-white/5 rounded-2xl p-1 w-fit">
            {([
              { key: 'marche', label: 'Marché' },
              { key: 'portefeuille', label: 'Mon portefeuille' },
              { key: 'classement', label: 'Classement' },
            ] as const).map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  "px-5 py-2.5 rounded-xl text-sm font-bold transition-all",
                  activeTab === tab.key ? "bg-white text-brand-dark shadow-sm" : "text-white/60 hover:text-white"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* DISCLAIMER */}
      <div className="bg-amber-50 border-b border-amber-200 px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs font-medium text-amber-700">
          <Info className="w-4 h-4 shrink-0" />
          Simulateur éducatif. L'argent utilisé est 100% fictif. Les cours sont simulés depuis les données BVMAC. Les performances passées ne préjugent pas des résultats futurs.
        </div>
      </div>

      <div className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">

          {/* MARCHÉ */}
          {activeTab === 'marche' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Table cours */}
              <div className="lg:col-span-2 bg-white rounded-[2rem] border border-black/5 overflow-hidden">
                <div className="p-6 border-b border-black/5">
                  <h2 className="font-display font-bold text-xl text-brand-dark">Cours en temps simulé</h2>
                  <p className="text-gray-400 text-xs font-medium mt-1">Mis à jour toutes les 3 secondes</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                        <th className="px-5 py-3 text-left">Titre</th>
                        <th className="px-5 py-3 text-right">Cours (XAF)</th>
                        <th className="px-5 py-3 text-right">Qté</th>
                        <th className="px-5 py-3 text-right">Total</th>
                        <th className="px-5 py-3"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {titres.map((titre, i) => (
                        <tr
                          key={i}
                          onClick={() => setSelectedTitre(titre.name)}
                          className={cn(
                            "border-b border-gray-50 cursor-pointer transition-colors",
                            selectedTitre === titre.name ? "bg-brand-neon/5 border-brand-neon/20" : "hover:bg-gray-50"
                          )}
                        >
                          <td className="px-5 py-3">
                            <div className="font-bold text-brand-dark text-sm">{titre.name}</div>
                            <div className="text-[10px] text-gray-400">{titre.secteur}</div>
                          </td>
                          <td className="px-5 py-3 text-right font-bold text-brand-dark text-sm font-mono">
                            {titre.prix.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
                          </td>
                          <td className="px-5 py-3 text-right">
                            {selectedTitre === titre.name && (
                              <input
                                type="number"
                                value={qte}
                                min={1}
                                onClick={e => e.stopPropagation()}
                                onChange={e => setQte(Math.max(1, parseInt(e.target.value) || 1))}
                                className="w-16 text-center border border-gray-200 rounded-lg text-sm font-bold outline-none focus:border-brand-neon px-2 py-1"
                              />
                            )}
                          </td>
                          <td className="px-5 py-3 text-right text-xs font-bold text-gray-500">
                            {selectedTitre === titre.name ? `${(titre.prix * qte).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} XAF` : '—'}
                          </td>
                          <td className="px-5 py-3 text-right">
                            {selectedTitre === titre.name && (
                              <button
                                onClick={(e) => { e.stopPropagation(); acheter(); }}
                                className="px-3 py-1.5 bg-brand-dark text-white rounded-lg text-xs font-bold hover:bg-brand-neon hover:text-brand-dark transition-colors flex items-center gap-1"
                              >
                                <ShoppingCart className="w-3 h-3" /> Acheter
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Panel droite */}
              <div className="flex flex-col gap-5">
                <div className="bg-white rounded-[2rem] border border-black/5 p-6">
                  <h3 className="font-bold text-brand-dark mb-4">Liquidités disponibles</h3>
                  <div className="font-display font-bold text-3xl text-brand-dark mb-2">
                    {cash.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} <span className="text-lg text-gray-400">FCFA</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-neon rounded-full" style={{ width: `${Math.min(100, (cash / CAPITAL_DEPART) * 100)}%` }}></div>
                  </div>
                  <p className="text-xs text-gray-400 font-medium mt-2">{((cash / CAPITAL_DEPART) * 100).toFixed(1)}% de liquidités</p>
                </div>

                <div className="bg-white rounded-[2rem] border border-black/5 p-6 flex-1">
                  <h3 className="font-bold text-brand-dark mb-4 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" /> Activité récente
                  </h3>
                  <div className="space-y-2 max-h-[200px] overflow-y-auto">
                    {log.length === 0 && <p className="text-gray-400 text-xs font-medium">Aucune opération pour l'instant...</p>}
                    {log.map((entry, i) => (
                      <div key={i} className="text-xs font-medium text-gray-600 py-1.5 border-b border-gray-50 last:border-0">{entry}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PORTEFEUILLE */}
          {activeTab === 'portefeuille' && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="bg-brand-neon rounded-[2rem] p-8">
                  <Banknote className="w-7 h-7 text-brand-dark mb-4" />
                  <p className="font-display font-bold text-3xl text-brand-dark">{cash.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}</p>
                  <p className="text-brand-dark/70 text-sm font-bold mt-1">FCFA disponibles</p>
                </div>
                <div className="bg-white rounded-[2rem] p-8 border border-black/5">
                  <TrendingUp className="w-7 h-7 text-brand-dark mb-4" />
                  <p className="font-display font-bold text-3xl text-brand-dark">{valeurPortefeuille.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}</p>
                  <p className="text-gray-400 text-sm font-bold mt-1">FCFA en titres</p>
                </div>
                <div className={cn("rounded-[2rem] p-8", gainTotal >= 0 ? 'bg-emerald-50' : 'bg-red-50')}>
                  {gainTotal >= 0 ? <ArrowUpRight className="w-7 h-7 text-emerald-600 mb-4" /> : <ArrowDownRight className="w-7 h-7 text-red-500 mb-4" />}
                  <p className={cn("font-display font-bold text-3xl", gainTotal >= 0 ? 'text-emerald-600' : 'text-red-500')}>
                    {gainTotal >= 0 ? '+' : ''}{gainTotal.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
                  </p>
                  <p className={cn("text-sm font-bold mt-1", gainTotal >= 0 ? 'text-emerald-500' : 'text-red-400')}>
                    FCFA ({gainPct.toFixed(2)}%)
                  </p>
                </div>
              </div>

              {positions.length === 0 ? (
                <div className="bg-white rounded-[2rem] border border-black/5 p-16 text-center">
                  <ShoppingCart className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                  <p className="text-gray-400 font-medium">Votre portefeuille est vide. Allez dans l'onglet Marché pour acheter des titres.</p>
                  <button onClick={() => setActiveTab('marche')} className="mt-4 px-6 py-3 bg-brand-dark text-white rounded-xl font-bold text-sm hover:bg-brand-neon hover:text-brand-dark transition-colors">
                    Aller au marché
                  </button>
                </div>
              ) : (
                <div className="bg-white rounded-[2rem] border border-black/5 overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                        <th className="px-6 py-4 text-left">Titre</th>
                        <th className="px-6 py-4 text-right">Fractions</th>
                        <th className="px-6 py-4 text-right">Px achat</th>
                        <th className="px-6 py-4 text-right">Px actuel</th>
                        <th className="px-6 py-4 text-right">P&L</th>
                        <th className="px-6 py-4"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {positions.map((pos, i) => {
                        const titre = getTitre(pos.name);
                        const pl = (titre.prix - pos.prixAchat) * pos.fractions;
                        const plPct = ((titre.prix / pos.prixAchat) - 1) * 100;
                        return (
                          <tr key={i} className="border-b border-gray-50 hover:bg-gray-50">
                            <td className="px-6 py-4 font-bold text-brand-dark">{pos.name}</td>
                            <td className="px-6 py-4 text-right font-mono font-bold text-brand-dark">{pos.fractions}</td>
                            <td className="px-6 py-4 text-right text-gray-500 font-mono text-sm">{pos.prixAchat.toFixed(0)}</td>
                            <td className="px-6 py-4 text-right font-mono font-bold text-brand-dark">{titre.prix.toFixed(0)}</td>
                            <td className="px-6 py-4 text-right">
                              <span className={cn("font-bold text-sm", pl >= 0 ? 'text-emerald-600' : 'text-red-500')}>
                                {pl >= 0 ? '+' : ''}{pl.toFixed(0)} ({plPct.toFixed(2)}%)
                              </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <button
                                onClick={() => vendre(pos.name)}
                                className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-xs font-bold hover:bg-red-500 hover:text-white transition-colors"
                              >
                                Vendre tout
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* CLASSEMENT */}
          {activeTab === 'classement' && (
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-10">
                <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h2 className="font-display font-bold text-3xl text-brand-dark">Classement des simulateurs</h2>
                <p className="text-gray-500 font-medium mt-2">Top investisseurs virtuels de la semaine</p>
              </div>
              <div className="space-y-4">
                {LEADERBOARD.map((player, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={cn(
                      "flex items-center gap-4 rounded-2xl p-5 border",
                      i === 0 ? "bg-yellow-50 border-yellow-200" : "bg-white border-black/5"
                    )}
                  >
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg",
                      i === 0 ? "bg-yellow-400 text-white" : i === 1 ? "bg-gray-300 text-white" : i === 2 ? "bg-orange-400 text-white" : "bg-gray-100 text-gray-500"
                    )}>
                      {typeof player.badge === 'string' && player.badge.length > 1 ? player.badge : player.rang}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-brand-dark">{player.nom}</p>
                      <p className="text-xs text-gray-400 font-medium">{player.portefeuille} FCFA</p>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-emerald-600">{player.gain}</span>
                    </div>
                  </motion.div>
                ))}

                {/* Votre position */}
                <div className="flex items-center gap-4 rounded-2xl p-5 bg-brand-neon/10 border-2 border-brand-neon/30">
                  <div className="w-10 h-10 rounded-xl bg-brand-neon text-brand-dark flex items-center justify-center font-bold">
                    Vous
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-brand-dark">Mon portefeuille</p>
                    <p className="text-xs text-gray-500 font-medium">{totalActifs.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} FCFA</p>
                  </div>
                  <div className="text-right">
                    <span className={cn("font-bold", gainTotal >= 0 ? 'text-emerald-600' : 'text-red-500')}>
                      {gainTotal >= 0 ? '+' : ''}{gainPct.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-10 text-center">
                <Link to="/inscription" className="px-8 py-4 bg-brand-dark text-white font-bold rounded-full hover:bg-brand-neon hover:text-brand-dark transition-colors inline-flex items-center gap-2">
                  Passer à l'investissement réel <ArrowUpRight className="w-4 h-4" />
                </Link>
                <p className="text-gray-400 text-xs font-medium mt-3">Compte gratuit · Aucun frais caché</p>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Reset modal */}
      <AnimatePresence>
        {showReset && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowReset(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative bg-white rounded-3xl p-8 max-w-sm w-full z-10 text-center">
              <RotateCcw className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="font-display font-bold text-2xl text-brand-dark mb-3">Réinitialiser ?</h3>
              <p className="text-gray-500 font-medium text-sm mb-6">Toutes vos positions seront fermées et vous recommencerez avec 1 000 000 FCFA virtuels.</p>
              <div className="flex gap-3">
                <button onClick={() => setShowReset(false)} className="flex-1 py-3 bg-gray-100 text-brand-dark rounded-xl font-bold text-sm hover:bg-gray-200 transition-colors">Annuler</button>
                <button onClick={reset} className="flex-1 py-3 bg-brand-dark text-white rounded-xl font-bold text-sm hover:bg-red-500 transition-colors">Réinitialiser</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
