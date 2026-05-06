import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users2, CheckCircle2, MapPin, Calendar, TrendingUp, Shield } from 'lucide-react';
import { cn } from '../../lib/utils';

const PROJETS = [
  {
    titre: 'Parc Solaire – Maroua',
    secteur: 'Énergie renouvelable',
    localisation: 'Maroua, Cameroun',
    objectif: '800 000 000 FCFA',
    leve: '620 000 000 FCFA',
    coInvestisseurs: 34,
    rendement: '14%',
    duree: '7 ans',
    progress: 77,
    cloture: '30 juin 2026',
    color: 'bg-[#fff4e5]',
    statut: 'En cours',
    minInvestissement: '1 000 000 FCFA',
  },
  {
    titre: 'Hôtel Boutique – Kribi Plage',
    secteur: 'Hôtellerie & Tourisme',
    localisation: 'Kribi, Cameroun',
    objectif: '1 200 000 000 FCFA',
    leve: '480 000 000 FCFA',
    coInvestisseurs: 21,
    rendement: '12%',
    duree: '10 ans',
    progress: 40,
    cloture: '15 août 2026',
    color: 'bg-[#e5f0ff]',
    statut: 'En cours',
    minInvestissement: '2 000 000 FCFA',
  },
  {
    titre: 'Unité Agro-industrielle – Bertoua',
    secteur: 'Agro-industrie',
    localisation: 'Bertoua, Est Cameroun',
    objectif: '500 000 000 FCFA',
    leve: '495 000 000 FCFA',
    coInvestisseurs: 58,
    rendement: '18%',
    duree: '5 ans',
    progress: 99,
    cloture: '05 mai 2026',
    color: 'bg-[#e5fff4]',
    statut: 'Presque complet',
    minInvestissement: '500 000 FCFA',
  },
];

export default function CoInvestissementPage() {
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold text-brand-neon tracking-widest uppercase mb-4 block">Co-investissement</span>
              <h1 className="font-display font-bold text-5xl md:text-6xl tracking-tighter leading-tight mb-6">
                Plus forts ensemble<br />
                <span className="text-brand-neon">pour investir grand</span>
              </h1>
              <p className="text-white/60 text-lg font-medium leading-relaxed mb-8">
                Regroupez-vous avec d'autres investisseurs pour financer de grands projets africains. Partagez les rendements, réduisez les risques, maximisez l'impact.
              </p>
              <div className="flex flex-wrap gap-3">
                {['Projets vérifiés', 'Gouvernance collective', 'Partage des risques', 'Impact réel en Afrique Centrale'].map((tag, i) => (
                  <span key={i} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold">{tag}</span>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { label: 'Projets actifs', value: '12', icon: TrendingUp, color: 'bg-brand-neon', textColor: 'text-brand-dark' },
                { label: 'Co-investisseurs', value: '340+', icon: Users2, color: 'bg-white/5', textColor: 'text-white' },
                { label: 'Fonds levés', value: '4.2 Mds XAF', icon: Shield, color: 'bg-white/5', textColor: 'text-white' },
                { label: 'Rendement moyen', value: '14.5%', icon: TrendingUp, color: 'bg-[#1b5e4c]', textColor: 'text-white' },
              ].map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div key={i} className={cn("rounded-[2rem] p-6 border border-white/5", stat.color)}>
                    <Icon className={cn("w-6 h-6 mb-3 opacity-60", stat.textColor)} />
                    <p className={cn("font-display font-bold text-2xl md:text-3xl", stat.textColor)}>{stat.value}</p>
                    <p className={cn("text-xs font-medium mt-1 opacity-60", stat.textColor)}>{stat.label}</p>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* PROJETS */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-brand-dark mb-10">Projets ouverts</h2>

          <div className="space-y-6">
            {PROJETS.map((projet, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className={cn("rounded-[2rem] p-8 md:p-10 flex flex-col md:flex-row gap-8 hover:shadow-lg transition-all group", projet.color)}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className={cn(
                      "text-[10px] font-bold px-3 py-1 rounded-full",
                      projet.statut === 'Presque complet' ? 'bg-red-100 text-red-600' : 'bg-white text-brand-dark'
                    )}>
                      {projet.statut}
                    </span>
                    <span className="text-xs font-medium text-gray-500">{projet.secteur}</span>
                  </div>
                  <h3 className="font-display font-bold text-2xl md:text-3xl text-brand-dark mb-2 group-hover:text-brand-green transition-colors">{projet.titre}</h3>

                  <div className="flex items-center gap-2 text-gray-500 text-sm font-medium mb-6">
                    <MapPin className="w-4 h-4" /> {projet.localisation}
                    <span className="text-gray-200">•</span>
                    <Calendar className="w-4 h-4" /> Clôture : {projet.cloture}
                  </div>

                  {/* Progress */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs font-bold text-gray-500 mb-2">
                      <span>{projet.leve} levés</span>
                      <span>{projet.progress}% de {projet.objectif}</span>
                    </div>
                    <div className="h-3 bg-white/60 rounded-full overflow-hidden">
                      <div
                        className={cn("h-full rounded-full transition-all", projet.progress >= 90 ? 'bg-red-400' : 'bg-brand-dark')}
                        style={{ width: `${projet.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                    <Users2 className="w-3.5 h-3.5" /> {projet.coInvestisseurs} co-investisseurs
                  </div>
                </div>

                <div className="flex flex-col justify-between gap-6 md:w-64 shrink-0">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/60 rounded-2xl p-4">
                      <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Rendement</p>
                      <p className="font-bold text-emerald-600 text-lg">{projet.rendement}/an</p>
                    </div>
                    <div className="bg-white/60 rounded-2xl p-4">
                      <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Durée</p>
                      <p className="font-bold text-brand-dark text-lg">{projet.duree}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium mb-3 text-center">Investissement min : <strong className="text-brand-dark">{projet.minInvestissement}</strong></p>
                    <Link
                      to="/inscription"
                      className="w-full py-3.5 bg-brand-dark text-white rounded-xl font-bold text-sm hover:bg-brand-neon hover:text-brand-dark transition-colors flex items-center justify-center gap-2"
                    >
                      Co-investir <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display font-bold text-3xl text-brand-dark mb-10 text-center">Le processus en 4 étapes</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Sélectionnez un projet', desc: 'Parcourez les projets vérifiés, consultez les rendements et la durée d\'engagement.' },
              { step: '02', title: 'Rejoignez le pool', desc: 'Choisissez votre montant d\'investissement (minimum défini par projet).' },
              { step: '03', title: 'Suivi collectif', desc: 'Accédez aux rapports trimestriels et aux décisions de gouvernance collective.' },
              { step: '04', title: 'Percevez vos revenus', desc: 'Les revenus sont distribués selon votre quote-part. Retrait possible à l\'échéance.' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-[2rem] p-8 border border-black/5 text-center hover:shadow-md transition-shadow group">
                <span className="font-display font-bold text-6xl text-gray-100 group-hover:text-brand-neon block mb-4 transition-colors">{item.step}</span>
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
