import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, TrendingUp, ArrowUpRight, ArrowDownRight,
  ShoppingCart, PieChart, Shield, Info
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '../../lib/utils';

const TITRES = [
  { name: 'SEMC', fullName: 'Soc. des Eaux Minérales du Cameroun', prix: 49000, variation: -2.0, rendement: '3.2%', minFraction: 5000, secteur: 'Agro-industrie' },
  { name: 'SAFACAM', fullName: 'Soc. Africaine Forestière et Agricole', prix: 30000, variation: -9.09, rendement: '4.5%', minFraction: 5000, secteur: 'Agro-industrie' },
  { name: 'SOCAPALM', fullName: 'Soc. Camerounaise de Palmeraie', prix: 55000, variation: 0.0, rendement: '5.1%', minFraction: 5000, secteur: 'Agro-industrie' },
  { name: 'BANGE', fullName: 'Banco Nacional de Guinea Ecuatorial', prix: 228085, variation: 0.0, rendement: '2.8%', minFraction: 10000, secteur: 'Finance' },
  { name: 'LA REGIONALE', fullName: 'La Régionale Épargne Crédit', prix: 42000, variation: 0.0, rendement: '3.9%', minFraction: 5000, secteur: 'Finance' },
];

export default function FractionsPage() {
  const [selected, setSelected] = useState(TITRES[0]);
  const [montant, setMontant] = useState(10000);

  const fraction = montant / selected.prix;

  return (
    <div className="flex flex-col min-h-screen bg-brand-gray">

      {/* HERO */}
      <section className="bg-[#0a0a0a] text-white px-4 sm:px-6 lg:px-8 pt-16 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/3 w-[400px] h-[400px] bg-brand-neon/10 rounded-full blur-[120px]"></div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <Link to="/investir" className="inline-flex items-center gap-2 text-white/50 text-sm font-bold mb-8 hover:text-white transition-colors">
            ← Retour aux investissements
          </Link>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold text-brand-neon tracking-widest uppercase mb-4 block">Fractionnement de titres</span>
              <h1 className="font-display font-bold text-5xl md:text-6xl tracking-tighter leading-tight mb-6">
                Actions & Obligations<br />
                <span className="text-brand-neon">à votre portée</span>
              </h1>
              <p className="text-white/60 text-lg font-medium leading-relaxed mb-8">
                Achetez des fractions d'actions ou d'obligations cotées à la BVMAC et au DSX. Investissez à votre rythme, même avec un petit budget.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm font-bold">Dès 5 000 FCFA</div>
                <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm font-bold">Dividendes proportionnels</div>
                <div className="px-4 py-2 bg-brand-neon text-brand-dark rounded-xl text-sm font-bold">COSUMAF agréé</div>
              </div>
            </div>

            {/* Mini simulateur */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-[#141517] rounded-[2rem] p-8 border border-white/5"
            >
              <h3 className="font-display font-bold text-xl text-white mb-6">Simuler un achat</h3>

              <div className="mb-5">
                <label className="text-xs font-bold text-white/50 uppercase tracking-wider mb-2 block">Choisir un titre</label>
                <div className="grid grid-cols-2 gap-2">
                  {TITRES.slice(0, 4).map((t, i) => (
                    <button
                      key={i}
                      onClick={() => setSelected(t)}
                      className={cn(
                        "px-3 py-2 rounded-xl text-xs font-bold transition-all text-left",
                        selected.name === t.name ? "bg-brand-neon text-brand-dark" : "bg-white/5 text-white/70 hover:bg-white/10"
                      )}
                    >
                      {t.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="text-xs font-bold text-white/50 uppercase tracking-wider mb-2 block">Montant à investir (FCFA)</label>
                <input
                  type="number"
                  value={montant}
                  onChange={e => setMontant(Math.max(5000, parseInt(e.target.value) || 5000))}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-bold outline-none focus:border-brand-neon transition-colors"
                />
              </div>

              <div className="bg-white/5 rounded-2xl p-5 mb-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-white/50 text-sm">Titre sélectionné</span>
                  <span className="text-white font-bold">{selected.name}</span>
                </div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-white/50 text-sm">Prix unitaire</span>
                  <span className="text-white font-bold">{selected.prix.toLocaleString()} XAF</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/50 text-sm">Fraction obtenue</span>
                  <span className="text-brand-neon font-bold text-lg">{fraction.toFixed(4)} titre(s)</span>
                </div>
              </div>

              <Link
                to="/inscription"
                className="w-full py-3.5 bg-brand-neon text-brand-dark font-bold rounded-xl hover:bg-white transition-colors flex items-center justify-center gap-2 text-sm"
              >
                Acheter maintenant <ShoppingCart className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* LISTE DES TITRES */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display font-bold text-3xl text-brand-dark mb-8">Titres disponibles</h2>

          <div className="bg-white rounded-[2rem] border border-black/5 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-black/5">
                  <tr className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    <th className="px-6 py-4 text-left">Titre</th>
                    <th className="px-6 py-4 text-right">Cours (XAF)</th>
                    <th className="px-6 py-4 text-right">Variation</th>
                    <th className="px-6 py-4 text-right">Rendement</th>
                    <th className="px-6 py-4 text-right">Mise min.</th>
                    <th className="px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {TITRES.map((titre, i) => {
                    const isUp = titre.variation > 0;
                    const isDown = titre.variation < 0;
                    return (
                      <motion.tr
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="border-b border-gray-50 hover:bg-gray-50 group cursor-pointer"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                              <TrendingUp className="w-4 h-4 text-gray-400" />
                            </div>
                            <div>
                              <div className="font-bold text-brand-dark text-sm">{titre.name}</div>
                              <div className="text-[10px] text-gray-400">{titre.fullName}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right font-bold text-brand-dark">{titre.prix.toLocaleString()}</td>
                        <td className="px-6 py-4 text-right">
                          <span className={cn(
                            "inline-flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg",
                            isUp ? "bg-emerald-50 text-emerald-600" : isDown ? "bg-red-50 text-red-600" : "bg-gray-50 text-gray-500"
                          )}>
                            {isUp && <ArrowUpRight className="w-3 h-3" />}
                            {isDown && <ArrowDownRight className="w-3 h-3" />}
                            {titre.variation.toFixed(2)}%
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right text-emerald-600 font-bold text-sm">{titre.rendement}</td>
                        <td className="px-6 py-4 text-right text-sm font-bold text-gray-500">{titre.minFraction.toLocaleString()} XAF</td>
                        <td className="px-6 py-4 text-right">
                          <Link
                            to="/inscription"
                            className="opacity-0 group-hover:opacity-100 inline-flex items-center gap-1.5 px-4 py-2 bg-brand-dark text-white rounded-xl text-xs font-bold hover:bg-brand-neon hover:text-brand-dark transition-all"
                          >
                            Acheter <ShoppingCart className="w-3 h-3" />
                          </Link>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* INFO */}
          <div className="mt-8 flex items-start gap-3 text-sm text-gray-500 font-medium bg-amber-50 border border-amber-200 rounded-2xl p-5">
            <Info className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <p>
              Le fractionnement de titres est exécuté via une <strong className="text-brand-dark">Société de Bourse agréée COSUMAF</strong>. Les dividendes sont versés proportionnellement à votre fraction détenue. Les performances passées ne préjugent pas des résultats futurs.
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display font-bold text-3xl text-brand-dark mb-10 text-center">Comment ça marche ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Choisissez un titre', desc: 'Parcourez le catalogue de titres disponibles sur la BVMAC et le DSX.' },
              { step: '02', title: 'Définissez votre montant', desc: 'Entrez le montant que vous souhaitez investir (dès 5 000 FCFA).' },
              { step: '03', title: 'Confirmez l\'achat', desc: 'Payez via Mobile Money ou virement. La fraction est créditée instantanément.' },
              { step: '04', title: 'Suivez votre portefeuille', desc: 'Vos fractions et dividendes sont visibles en temps réel dans votre tableau de bord.' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-[2rem] p-8 border border-black/5 text-center hover:shadow-md transition-shadow">
                <span className="font-display font-bold text-5xl text-gray-100 block mb-4">{item.step}</span>
                <h3 className="font-display font-bold text-xl text-brand-dark mb-3">{item.title}</h3>
                <p className="text-gray-500 text-sm font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
