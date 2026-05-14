import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';

const TITRES = [
  { code: 'SEMC', nom: 'Société des Eaux Minérales du Cameroun', prix: 12500, variation: 0 },
  { code: 'SAFACAM', nom: 'Société Africaine Forestière et Agricole', prix: 38000, variation: 0 },
  { code: 'SOCAPALM', nom: 'Société Camerounaise de Palmeraies', prix: 47500, variation: 0 },
  { code: 'BANGE', nom: 'Banque Africaine des Nations-Gabon', prix: 3200, variation: 0 },
  { code: 'REGIONALE', nom: 'La Régionale EMF', prix: 1800, variation: 0 },
  { code: 'CICAM', nom: 'Cotonnière Industrielle du Cameroun', prix: 22000, variation: 0 },
];

const randomVariation = () => (Math.random() - 0.5) * 4;

export default function SimulateurPage() {
  const [titres, setTitres] = useState(TITRES.map(t => ({ ...t })));
  const [solde, setSolde] = useState(1000000);
  const [portfolio, setPortfolio] = useState<Record<string, { qty: number; prixMoyen: number }>>({});
  const [ordres, setOrdres] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTitres(prev => prev.map(t => {
        const variation = randomVariation();
        return { ...t, prix: Math.max(100, Math.round(t.prix * (1 + variation / 100))), variation };
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const acheter = (titre: typeof TITRES[0], qty: number) => {
    const cout = titre.prix * qty;
    if (cout > solde) return;
    setSolde(s => s - cout);
    setPortfolio(p => ({
      ...p,
      [titre.code]: {
        qty: (p[titre.code]?.qty || 0) + qty,
        prixMoyen: titre.prix,
      }
    }));
    setOrdres(o => [`Achat ${qty} × ${titre.code} @ ${titre.prix.toLocaleString('fr')} FCFA`, ...o.slice(0, 9)]);
  };

  const valeurPortfolio = Object.entries(portfolio).reduce((acc, [code, pos]) => {
    const titre = titres.find(t => t.code === code);
    return acc + (titre ? titre.prix * pos.qty : 0);
  }, 0);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="font-black text-4xl tracking-tighter mb-2">Simulateur de Trading</h1>
          <p className="text-white/40">Entraînez-vous avec 1 000 000 FCFA virtuels — données actualisées toutes les 3s</p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Solde disponible', value: `${solde.toLocaleString('fr')} FCFA`, color: 'text-[#bef264]' },
            { label: 'Portfolio', value: `${valeurPortfolio.toLocaleString('fr')} FCFA`, color: 'text-white' },
            { label: 'Total', value: `${(solde + valeurPortfolio).toLocaleString('fr')} FCFA`, color: 'text-white' },
          ].map((s, i) => (
            <div key={i} className="bg-[#141517] border border-white/5 rounded-2xl p-5">
              <div className={`font-black text-xl ${s.color}`}>{s.value}</div>
              <div className="text-white/40 text-xs mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Titres */}
          <div className="lg:col-span-2 bg-[#141517] border border-white/5 rounded-2xl p-6">
            <h2 className="font-black mb-5">Titres BVMAC</h2>
            <div className="space-y-3">
              {titres.map((titre) => (
                <div key={titre.code} className="flex items-center justify-between p-4 bg-white/3 rounded-xl border border-white/5">
                  <div className="flex-1">
                    <div className="font-black text-sm">{titre.code}</div>
                    <div className="text-white/30 text-xs">{titre.nom}</div>
                  </div>
                  <div className="text-right mr-6">
                    <div className="font-black">{titre.prix.toLocaleString('fr')} F</div>
                    <div className={`text-xs flex items-center gap-1 justify-end ${titre.variation >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {titre.variation >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {titre.variation >= 0 ? '+' : ''}{titre.variation.toFixed(2)}%
                    </div>
                  </div>
                  <button onClick={() => acheter(titre, 1)}
                    className="px-4 py-2 bg-[#bef264] text-[#0a0a0a] font-black text-xs rounded-lg hover:bg-white transition-colors">
                    Acheter ×1
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Ordres */}
          <div className="bg-[#141517] border border-white/5 rounded-2xl p-6">
            <h2 className="font-black mb-5">Journal des ordres</h2>
            {ordres.length === 0 ? (
              <p className="text-white/20 text-sm">Aucun ordre passé. Cliquez sur "Acheter" pour commencer.</p>
            ) : (
              <div className="space-y-2">
                {ordres.map((o, i) => (
                  <div key={i} className="text-xs text-white/50 py-2 border-b border-white/5 flex items-center gap-2">
                    <ArrowRight className="w-3 h-3 text-[#bef264] shrink-0" /> {o}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
