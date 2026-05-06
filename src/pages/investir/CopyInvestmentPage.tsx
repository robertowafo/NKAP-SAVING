import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Copy, TrendingUp, Star, Shield, Users, Award, ArrowUpRight } from 'lucide-react';
import { cn } from '../../lib/utils';

const MANAGERS = [
  {
    name: 'Paul Ngando',
    titre: 'Asset Manager Senior',
    societe: 'SGI Douala AM',
    perf1an: '+24.3%',
    perf3ans: '+68.5%',
    risque: 'Modéré',
    copiants: 1247,
    specialite: 'Actions BVMAC',
    allocation: { actions: 65, obligations: 25, liquidités: 10 },
    note: 4.8,
    badge: 'Top performeur',
    badgeColor: 'bg-brand-neon text-brand-dark',
    avatar: 'PN',
    avatarColor: 'bg-[#1b5e4c]',
  },
  {
    name: 'Claire Mbemba',
    titre: 'Gestionnaire de portefeuille',
    societe: 'Afriland AM',
    perf1an: '+18.7%',
    perf3ans: '+52.1%',
    risque: 'Faible-Modéré',
    copiants: 842,
    specialite: 'Obligations d\'État',
    allocation: { actions: 30, obligations: 60, liquidités: 10 },
    note: 4.6,
    badge: 'Prudent',
    badgeColor: 'bg-[#e5f0ff] text-blue-600',
    avatar: 'CM',
    avatarColor: 'bg-blue-600',
  },
  {
    name: 'Yves Fotso',
    titre: 'Directeur Investissements',
    societe: 'BDEAC Capital',
    perf1an: '+31.2%',
    perf3ans: '+85.4%',
    risque: 'Élevé',
    copiants: 623,
    specialite: 'Croissance & Tech',
    allocation: { actions: 80, obligations: 10, liquidités: 10 },
    note: 4.9,
    badge: 'Haut rendement',
    badgeColor: 'bg-orange-100 text-orange-600',
    avatar: 'YF',
    avatarColor: 'bg-orange-500',
  },
  {
    name: 'Aïcha Diallo',
    titre: 'Portfolio Manager',
    societe: 'CCA AM',
    perf1an: '+14.2%',
    perf3ans: '+43.7%',
    risque: 'Faible',
    copiants: 2103,
    specialite: 'Mixte défensif',
    allocation: { actions: 40, obligations: 50, liquidités: 10 },
    note: 4.7,
    badge: 'Plus copié',
    badgeColor: 'bg-purple-100 text-purple-600',
    avatar: 'AD',
    avatarColor: 'bg-purple-600',
  },
];

export default function CopyInvestmentPage() {
  return (
    <div className="flex flex-col min-h-screen bg-brand-gray">

      {/* HERO */}
      <section className="bg-[#0a0a0a] text-white px-4 sm:px-6 lg:px-8 pt-16 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 left-1/3 w-[300px] h-[300px] bg-brand-neon/10 rounded-full blur-[100px]"></div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <Link to="/investir" className="inline-flex items-center gap-2 text-white/50 text-sm font-bold mb-8 hover:text-white transition-colors">
            ← Retour aux investissements
          </Link>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold text-brand-neon tracking-widest uppercase mb-4 block">Copy Investment</span>
              <h1 className="font-display font-bold text-5xl md:text-6xl tracking-tighter leading-tight mb-6">
                Répliquez les meilleurs<br />
                <span className="text-brand-neon">Asset Managers</span>
              </h1>
              <p className="text-white/60 text-lg font-medium leading-relaxed mb-8">
                Chaque mouvement d'un gestionnaire expert est automatiquement reproduit dans votre portefeuille, proportionnellement à votre investissement.
              </p>
              <div className="flex flex-wrap gap-4">
                {['Idéal pour débutants', 'Réplication automatique', 'Transparence totale', 'Stoppable à tout moment'].map((tag, i) => (
                  <span key={i} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold">{tag}</span>
                ))}
              </div>
            </div>

            {/* Visual */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-[#141517] rounded-[2rem] p-8 border border-white/5 space-y-4"
            >
              <h3 className="font-display font-bold text-lg text-white mb-2">Comment ça marche</h3>
              {[
                { step: '01', text: 'Vous choisissez un AM à suivre' },
                { step: '02', text: 'Vous définissez le montant à allouer' },
                { step: '03', text: 'Chaque ordre de l\'AM est répliqué' },
                { step: '04', text: 'Vous suivez les gains en temps réel' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 bg-white/5 rounded-2xl p-4">
                  <span className="font-display font-bold text-brand-neon text-lg w-8 shrink-0">{item.step}</span>
                  <p className="text-white/80 text-sm font-medium">{item.text}</p>
                </div>
              ))}
              <div className="bg-brand-neon/10 border border-brand-neon/20 rounded-2xl p-4 flex items-center gap-3">
                <Copy className="w-5 h-5 text-brand-neon" />
                <p className="text-white/80 text-xs font-medium">Partenariat AM agréé COSUMAF. QPB agit comme intermédiaire de présentation.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* GESTIONNAIRES */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-brand-dark">Choisissez votre gestionnaire</h2>
              <p className="text-gray-500 font-medium mt-2">Classés par performance. Données vérifiées par NKAP SAVING.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MANAGERS.map((manager, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-[2rem] p-8 border border-black/5 hover:shadow-xl hover:-translate-y-1 transition-all group"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-lg", manager.avatarColor)}>
                      {manager.avatar}
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-xl text-brand-dark">{manager.name}</h3>
                      <p className="text-xs text-gray-500 font-medium">{manager.titre} · {manager.societe}</p>
                    </div>
                  </div>
                  <span className={cn("text-[10px] font-bold px-3 py-1 rounded-full", manager.badgeColor)}>{manager.badge}</span>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center bg-brand-gray rounded-2xl p-4">
                    <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Perf. 1 an</p>
                    <p className="font-bold text-emerald-600 text-lg">{manager.perf1an}</p>
                  </div>
                  <div className="text-center bg-brand-gray rounded-2xl p-4">
                    <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Perf. 3 ans</p>
                    <p className="font-bold text-emerald-600 text-lg">{manager.perf3ans}</p>
                  </div>
                  <div className="text-center bg-brand-gray rounded-2xl p-4">
                    <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Copiants</p>
                    <p className="font-bold text-brand-dark text-lg">{manager.copiants.toLocaleString()}</p>
                  </div>
                </div>

                {/* Allocation bar */}
                <div className="mb-6">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Allocation actuelle</p>
                  <div className="flex h-3 rounded-full overflow-hidden gap-0.5">
                    <div className="bg-[#1b5e4c] rounded-l-full" style={{ width: `${manager.allocation.actions}%` }}></div>
                    <div className="bg-brand-neon" style={{ width: `${manager.allocation.obligations}%` }}></div>
                    <div className="bg-gray-200 rounded-r-full flex-1"></div>
                  </div>
                  <div className="flex gap-4 mt-2 text-xs font-medium text-gray-500">
                    <span className="flex items-center gap-1"><span className="w-2 h-2 bg-[#1b5e4c] rounded-sm inline-block"></span> Actions {manager.allocation.actions}%</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 bg-brand-neon rounded-sm inline-block"></span> Oblig. {manager.allocation.obligations}%</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 bg-gray-200 rounded-sm inline-block"></span> Cash {manager.allocation.liquidités}%</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex items-center gap-1 text-yellow-500 text-sm font-bold">
                    <Star className="w-4 h-4 fill-yellow-400" /> {manager.note}
                  </div>
                  <span className="text-gray-200 text-sm">|</span>
                  <span className="text-xs font-bold text-gray-400">{manager.risque}</span>
                  <span className="text-gray-200 text-sm">|</span>
                  <span className="text-xs font-bold text-gray-400">{manager.specialite}</span>
                </div>

                <Link
                  to="/inscription"
                  className="mt-6 w-full py-3.5 bg-brand-dark text-white rounded-xl font-bold text-sm hover:bg-brand-neon hover:text-brand-dark transition-colors flex items-center justify-center gap-2 group-hover:bg-brand-neon group-hover:text-brand-dark"
                >
                  Copier cet AM <Copy className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
