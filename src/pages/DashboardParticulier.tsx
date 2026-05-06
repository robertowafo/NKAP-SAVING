import { Link } from 'react-router-dom';
import { 
  Wallet, TrendingUp, Sparkles, AlertCircle, PieChart, Info,
  Briefcase, Activity, CheckCircle2,
  ArrowRight, Handshake, Mail, GraduationCap, Newspaper, Play, Star
} from 'lucide-react';

export default function DashboardParticulier() {
  return (
    <div className="flex-1 bg-[#FAFAFA] min-h-screen px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* HERO SECTION */}
        <div className="text-center max-w-4xl mx-auto space-y-6 relative">
          <div className="inline-flex justify-center items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full font-bold text-xs uppercase tracking-wider mb-2">
            <CheckCircle2 className="w-4 h-4" /> Compte Vérifié
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-extrabold text-brand-dark tracking-tight leading-tight">
            Boostez vos finances <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-emerald-400">
               En quelques clics !
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-500 font-medium max-w-2xl mx-auto">
            Gérez votre portefeuille, accédez aux opportunités du marché CEMAC et développez vos compétences avec NKAP INVEST.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-6">
            <Link to="/tableau-de-bord/portefeuille" className="px-8 py-3.5 bg-brand-dark text-white font-bold rounded-full hover:bg-black transition-all hover:scale-105 shadow-xl shadow-black/10">
               Voir mon portefeuille
            </Link>
            <Link to="/marches" className="px-8 py-3.5 bg-white border border-gray-200 text-brand-dark font-bold rounded-full hover:bg-gray-50 transition-all flex items-center gap-2 shadow-sm">
               Explorer les marchés <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* TICKER BANNER */}
        <div className="w-full bg-brand-neon text-brand-dark py-4 overflow-hidden flex whitespace-nowrap -rotate-1 scale-105 border-y-2 border-brand-dark">
           <div className="animate-[marquee_20s_linear_infinite] flex gap-8 items-center font-bold text-xl uppercase tracking-wider">
              <span>🚀 Investissez aujourd'hui</span>
              <span>•</span>
              <span>📖 Apprenez la finance</span>
              <span>•</span>
              <span>📈 Maximisez vos rendements</span>
              <span>•</span>
              <span>🚀 Investissez aujourd'hui</span>
              <span>•</span>
              <span>📖 Apprenez la finance</span>
              <span>•</span>
              <span>📈 Maximisez vos rendements</span>
              <span>•</span>
              <span>🚀 Investissez aujourd'hui</span>
              <span>•</span>
              <span>📖 Apprenez la finance</span>
              <span>•</span>
              <span>📈 Maximisez vos rendements</span>
              <span>•</span>
           </div>
        </div>

        {/* PORTFOLIO SNAPSHOT (ACADEMIX CARD STYLE) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="col-span-1 md:col-span-2 bg-[#FFF4E5] rounded-[2rem] p-8 border-2 border-black/5 flex flex-col justify-between relative overflow-hidden group hover:border-orange-200 transition-colors">
               <div className="relative z-10">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
                     <Wallet className="w-6 h-6 text-orange-500" />
                  </div>
                  <h3 className="text-gray-600 font-bold mb-1">Valeur totale</h3>
                  <div className="font-display font-black text-5xl md:text-6xl text-brand-dark tracking-tight mb-4 break-words">
                     2 450 000 <span className="text-2xl text-gray-500 font-bold">FCFA</span>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white rounded-full font-bold text-sm text-emerald-600 shadow-sm">
                     <TrendingUp className="w-4 h-4" /> +12.5% cette semaine
                  </div>
               </div>
               {/* Decorative shape */}
               <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-orange-200/50 rounded-full blur-3xl group-hover:scale-110 transition-transform"></div>
            </div>

            <div className="bg-[#E5F0FF] rounded-[2rem] p-8 border-2 border-black/5 flex flex-col justify-between relative overflow-hidden group hover:border-blue-200 transition-colors">
               <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                     <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                        <Sparkles className="w-6 h-6 text-blue-500" />
                     </div>
                     <span className="px-3 py-1 bg-white text-blue-600 rounded-full text-xs font-bold shadow-sm">Top 15%</span>
                  </div>
                  <h3 className="font-display font-bold text-2xl text-brand-dark mb-2">Simulateur</h3>
                  <div className="font-bold text-xl text-gray-600 mb-4">1 045 200 FCFA</div>
                  <Link to="/apprendre/simulateur" className="inline-flex items-center gap-2 px-4 py-2 bg-brand-dark text-white rounded-full text-sm font-bold hover:bg-black transition-colors w-max">
                     S'entraîner <Play className="w-4 h-4" />
                  </Link>
               </div>
               <div className="absolute -right-5 -bottom-5 w-40 h-40 bg-blue-200/50 rounded-full blur-2xl group-hover:scale-110 transition-transform"></div>
            </div>
        </div>

        {/* EXPLORE CATEGORIES */}
        <div className="text-center space-y-4 pt-8">
           <h2 className="font-display font-extrabold text-4xl text-brand-dark">Vos espaces d'opportunités</h2>
           <p className="text-gray-500 font-medium">Découvrez les outils conçus pour votre croissance financière et professionnelle.</p>
           
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-8 text-left">
              
              <Link to="/investir/fonds" className="bg-[#FFE5EC] p-6 rounded-[2rem] hover:-translate-y-1 transition-transform border border-black/5 group">
                 <h4 className="font-bold text-xl text-brand-dark mb-2">Fonds (FCP)</h4>
                 <p className="text-sm text-gray-600 font-medium mb-6">Investissez dans des portefeuilles gérés par des experts.</p>
                 <div className="bg-white/60 w-max px-3 py-1 rounded-full text-xs font-bold text-brand-dark group-hover:bg-white transition-colors">
                    12 Fonds disponibles
                 </div>
              </Link>
              
              <Link to="/investir/fractions" className="bg-[#E5FFF4] p-6 rounded-[2rem] hover:-translate-y-1 transition-transform border border-black/5 group">
                 <h4 className="font-bold text-xl text-brand-dark mb-2">Titres BVMAC</h4>
                 <p className="text-sm text-gray-600 font-medium mb-6">Achetez des fractions d'actions des plus grandes entreprises.</p>
                 <div className="bg-white/60 w-max px-3 py-1 rounded-full text-xs font-bold text-brand-dark group-hover:bg-white transition-colors">
                    8 Nouvelles émissions
                 </div>
              </Link>
              
              <Link to="/apprendre" className="bg-[#F5E5FF] p-6 rounded-[2rem] hover:-translate-y-1 transition-transform border border-black/5 group">
                 <h4 className="font-bold text-xl text-brand-dark mb-2">Apprentissage</h4>
                 <p className="text-sm text-gray-600 font-medium mb-6">Formations, quiz, et certificats pour exceller.</p>
                 <div className="bg-white/60 w-max px-3 py-1 rounded-full text-xs font-bold text-brand-dark group-hover:bg-white transition-colors">
                    Nouveaux Quiz
                 </div>
              </Link>
              
              <Link to="#" className="bg-[#FFF0E5] p-6 rounded-[2rem] hover:-translate-y-1 transition-transform border border-black/5 group">
                 <h4 className="font-bold text-xl text-brand-dark mb-2">Opportunités</h4>
                 <p className="text-sm text-gray-600 font-medium mb-6">Emplois, stages et offres de services aux professionnels.</p>
                 <div className="bg-white/60 w-max px-3 py-1 rounded-full text-xs font-bold text-brand-dark group-hover:bg-white transition-colors">
                    24 Offres récentes
                 </div>
              </Link>

           </div>
        </div>

        {/* BOTTOM SECTION: ACTIVITIES & RESOURCES */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-8">
           
           {/* Activités */}
           <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                 <h3 className="font-display font-bold text-2xl text-brand-dark">Activités récentes</h3>
                 <button className="text-sm font-bold text-brand-dark hover:underline">Voir tout</button>
              </div>
              <div className="space-y-4">
                 <div className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 bg-[#E5FFF4] text-emerald-600 rounded-full flex items-center justify-center shadow-sm shrink-0">
                          <Activity className="w-5 h-5" />
                       </div>
                       <div>
                          <div className="font-bold text-brand-dark text-sm sm:text-base">Achat Titres SOCAPALM</div>
                          <div className="text-xs text-gray-500 font-medium mt-0.5">Aujourd'hui, 10:24</div>
                       </div>
                    </div>
                    <div className="text-right shrink-0">
                       <div className="font-bold text-brand-dark">- 150 000</div>
                       <div className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded mt-1 inline-block">COMPLÉTÉ</div>
                    </div>
                 </div>

                 <div className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 bg-[#E5F0FF] text-blue-600 rounded-full flex items-center justify-center shadow-sm shrink-0">
                          <Wallet className="w-5 h-5" />
                       </div>
                       <div>
                          <div className="font-bold text-brand-dark text-sm sm:text-base">Dépôt Compte</div>
                          <div className="text-xs text-gray-500 font-medium mt-0.5">Hier, 14:10</div>
                       </div>
                    </div>
                    <div className="text-right shrink-0">
                       <div className="font-bold text-brand-dark">+ 500 000</div>
                       <div className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded mt-1 inline-block">COMPLÉTÉ</div>
                    </div>
                 </div>
                 
                 <div className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 bg-[#F5E5FF] text-purple-600 rounded-full flex items-center justify-center shadow-sm shrink-0">
                          <GraduationCap className="w-5 h-5" />
                       </div>
                       <div>
                          <div className="font-bold text-brand-dark text-sm sm:text-base">Quiz Validé</div>
                          <div className="text-xs text-gray-500 font-medium mt-0.5">Lun 14 Mai</div>
                       </div>
                    </div>
                    <div className="text-right shrink-0">
                       <div className="font-bold text-purple-600">+ 50 pts</div>
                       <div className="text-[10px] font-bold text-purple-600 bg-purple-100 px-2 py-0.5 rounded mt-1 inline-block text-center max-w-[80px]">BADGE OBTENU</div>
                    </div>
                 </div>
              </div>
           </div>

           {/* Recommandations & Newsletter */}
           <div className="space-y-6">
               <div className="bg-brand-dark rounded-[2rem] p-8 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-brand-neon/10 rounded-full blur-[60px]"></div>
                  <div className="relative z-10 flex items-start gap-4 mb-6">
                     <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                        <Star className="w-6 h-6 text-brand-neon" />
                     </div>
                     <div>
                        <h3 className="font-display font-bold text-2xl mb-1">Pour vous</h3>
                        <p className="text-white/60 text-sm font-medium border-l">Des opportunités basées sur votre profil prudent.</p>
                     </div>
                  </div>
                  <div className="relative z-10 space-y-3">
                     <div className="bg-white/5 border border-white/10 p-4 rounded-2xl hover:bg-white/10 transition-colors cursor-pointer">
                        <div className="flex justify-between items-center mb-2">
                           <h4 className="font-bold">BTA Gabon 2027</h4>
                           <span className="text-xs font-bold bg-white/10 px-2 py-1 rounded text-white">Risque Faible</span>
                        </div>
                        <p className="text-sm text-brand-neon font-bold">Rendement: 6.5%/an</p>
                     </div>
                     <div className="bg-white/5 border border-white/10 p-4 rounded-2xl hover:bg-white/10 transition-colors cursor-pointer">
                        <div className="flex justify-between items-center mb-2">
                           <h4 className="font-bold">Projet Solaire Maroua</h4>
                           <span className="text-xs font-bold bg-white/10 px-2 py-1 rounded text-white">Risque Moyen</span>
                        </div>
                        <p className="text-sm text-brand-neon font-bold">Rendement estimé: 14%/an</p>
                     </div>
                  </div>
               </div>

               <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
                  <div className="w-16 h-16 bg-[#FFE5EC] text-pink-600 rounded-full flex items-center justify-center shrink-0 shadow-sm">
                     <Mail className="w-8 h-8" />
                  </div>
                  <div>
                     <h3 className="font-bold text-lg text-brand-dark mb-1">Restez informé</h3>
                     <p className="text-sm text-gray-500 font-medium mb-3">Blog, articles et newsletter. Recevez chaque semaine les meilleures opportunités et analyses.</p>
                     <Link to="#" className="text-sm font-bold text-brand-dark underline hover:bg-gray-50 px-3 py-1 sm:-ml-3 rounded-lg transition-colors">
                        Gérer mon abonnement
                     </Link>
                  </div>
               </div>
           </div>

        </div>

      </div>
    </div>
  );
}
