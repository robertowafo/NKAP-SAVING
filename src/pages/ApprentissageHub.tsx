import { ArrowRight, Play, BookOpen, GraduationCap, Target, Video, Trophy, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ApprentissageHub() {
  return (
    <div className="flex-1 bg-[#FAFAFA] min-h-screen px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* HERO SECTION */}
        <div className="text-center max-w-4xl mx-auto space-y-6 relative pt-8">
          <div className="inline-flex justify-center items-center gap-2 px-4 py-2 bg-purple-100 text-purple-800 rounded-full font-bold text-xs uppercase tracking-wider mb-2">
             Devenez un expert
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-extrabold text-brand-dark tracking-tight leading-tight">
            Maîtrisez les marchés <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
               Pas à pas.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-500 font-medium max-w-2xl mx-auto">
            Plongez dans nos ressources éducatives. Apprenez avec nos cours, testez-vous avec nos quiz, et passez à la pratique sans risque via notre simulateur.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-6">
            <Link to="/apprendre/simulateur" className="px-8 py-3.5 bg-brand-dark text-white font-bold rounded-full hover:bg-black transition-all hover:scale-105 shadow-xl shadow-black/10 flex items-center gap-2">
               Ouvrir le simulateur <Play className="w-4 h-4" />
            </Link>
            <Link to="#" className="px-8 py-3.5 bg-white border border-gray-200 text-brand-dark font-bold rounded-full hover:bg-gray-50 transition-all flex items-center gap-2 shadow-sm">
               Voir les formations
            </Link>
          </div>
        </div>

        {/* FEATURED CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
           
           <div className="bg-[#E5F0FF] rounded-[2rem] p-8 border-2 border-transparent hover:border-blue-200 transition-all group hover:-translate-y-2 cursor-pointer flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform">
                  <Video className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="font-display font-bold text-2xl text-brand-dark mb-2">Formations</h3>
                <p className="text-gray-600 font-medium text-sm">Vidéos et cours textuels pour comprendre les actions, obligations et OPCVM.</p>
              </div>
           </div>

           <div className="bg-[#F5E5FF] rounded-[2rem] p-8 border-2 border-transparent hover:border-purple-200 transition-all group hover:-translate-y-2 cursor-pointer flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform">
                  <Target className="w-6 h-6 text-purple-500" />
                </div>
                <h3 className="font-display font-bold text-2xl text-brand-dark mb-2">Quiz</h3>
                <p className="text-gray-600 font-medium text-sm">Plus de 50 quiz interactifs pour tester vos connaissances avant d'investir.</p>
              </div>
           </div>

           <div className="bg-[#FFE5EC] rounded-[2rem] p-8 border-2 border-transparent hover:border-pink-200 transition-all group hover:-translate-y-2 cursor-pointer flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform">
                  <GraduationCap className="w-6 h-6 text-pink-500" />
                </div>
                <h3 className="font-display font-bold text-2xl text-brand-dark mb-2">Certificats</h3>
                <p className="text-gray-600 font-medium text-sm">Obtenez un certificat de la NKAP Academy validé par les professionnels.</p>
              </div>
           </div>

           <div className="bg-[#E5FFF4] rounded-[2rem] p-8 border-2 border-brand-green/20 hover:border-brand-green transition-all group hover:-translate-y-2 cursor-pointer flex flex-col justify-between relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                   <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                     <Sparkles className="w-6 h-6 text-emerald-500" />
                   </div>
                   <span className="text-[10px] font-bold px-2 py-1 bg-emerald-500 text-white rounded uppercase">Populaire</span>
                </div>
                <h3 className="font-display font-bold text-2xl text-brand-dark mb-2">Simulateur</h3>
                <p className="text-gray-600 font-medium text-sm">Investissez avec du capital fictif avec les vrais cours du marché.</p>
              </div>
           </div>

        </div>

        {/* PROGRESS AND TOP PATHS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16">
           
           <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm flex flex-col justify-center">
              <h3 className="font-display font-bold text-2xl text-brand-dark mb-6">Votre parcours</h3>
              
              <div className="space-y-6">
                 <div>
                    <div className="flex justify-between text-sm font-bold text-brand-dark mb-2">
                       <span>Niveau : Débutant</span>
                       <span className="text-purple-600">30%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                      <div className="bg-purple-500 h-full rounded-full transition-all" style={{ width: '30%' }}></div>
                    </div>
                 </div>
                 
                 <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                    <div className="text-center">
                       <div className="text-3xl font-display font-black text-brand-dark">2</div>
                       <div className="text-xs font-bold text-gray-500 uppercase mt-1">Cours finis</div>
                    </div>
                    <div className="text-center">
                       <div className="text-3xl font-display font-black text-brand-dark">5</div>
                       <div className="text-xs font-bold text-gray-500 uppercase mt-1">Quiz faits</div>
                    </div>
                    <div className="text-center">
                       <div className="text-3xl font-display font-black text-brand-dark">0</div>
                       <div className="text-xs font-bold text-gray-500 uppercase mt-1">Certificats</div>
                    </div>
                 </div>
              </div>
           </div>

           <div className="bg-brand-dark rounded-[2rem] p-8 text-white relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-500/20 rounded-full blur-[60px]"></div>
              <h3 className="font-display font-bold text-2xl mb-6 relative z-10 flex items-center gap-3">
                 <Trophy className="w-6 h-6 text-purple-400" />
                 Modules recommandés
              </h3>
              
              <div className="relative z-10 space-y-4">
                 <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center font-bold">1</div>
                       <div>
                          <div className="font-bold text-sm">Bases du marché obligataire</div>
                          <div className="text-xs text-white/50 mt-1">15 min • Débutant</div>
                       </div>
                    </div>
                    <Play className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
                 </div>
                 <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center font-bold">2</div>
                       <div>
                          <div className="font-bold text-sm">Diversifier avec les FCP</div>
                          <div className="text-xs text-white/50 mt-1">25 min • Intermédiaire</div>
                       </div>
                    </div>
                    <Play className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
                 </div>
              </div>
           </div>

        </div>

      </div>
    </div>
  );
}
