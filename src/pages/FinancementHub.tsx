import { ArrowRight, Play, Rocket, PieChart, Users, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FinancementHub() {
  return (
    <div className="flex-1 bg-[#FAFAFA] min-h-screen px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* HERO SECTION */}
        <div className="text-center max-w-4xl mx-auto space-y-6 relative pt-8">
          <div className="inline-flex justify-center items-center gap-2 px-4 py-2 bg-brand-neon/20 text-brand-dark rounded-full font-bold text-xs uppercase tracking-wider mb-2 border border-brand-neon">
             Osez réaliser vos projets
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-extrabold text-brand-dark tracking-tight leading-tight">
            Trouvez les financements <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500">
               Qui font la différence
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-500 font-medium max-w-2xl mx-auto">
            Participez au développement de projets porteurs en Afrique Centrale, ou levez les fonds dont vous avez besoin auprès de notre communauté d'investisseurs.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-6">
            <Link to="/financement/campagnes" className="px-8 py-3.5 bg-brand-dark text-white font-bold rounded-full hover:bg-black transition-all hover:scale-105 shadow-xl shadow-black/10">
               Voir les projets
            </Link>
            <Link to="/financement/lancer" className="px-8 py-3.5 bg-white border border-gray-200 text-brand-dark font-bold rounded-full hover:bg-gray-50 transition-all flex items-center gap-2 shadow-sm">
               Lancer une campagne <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* FEATURED CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
           <div className="bg-[#E5FFF4] rounded-[2rem] p-10 flex flex-col justify-between border-2 border-transparent hover:border-emerald-200 transition-colors group cursor-pointer h-[400px]">
              <div>
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform">
                  <PieChart className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="font-display font-bold text-3xl text-brand-dark mb-4">Crowdfunding</h3>
                <p className="text-gray-600 font-medium text-lg leading-relaxed max-w-md">
                   Soutenez les porteurs de projets locaux via des dons avec contrepartie ou du crowdlending. Un impact direct sur l'économie réelle.
                </p>
              </div>
              <div className="flex justify-between items-end">
                <span className="text-emerald-600 font-bold block mt-8 flex items-center gap-2">
                   Explorer les campagnes <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="w-32 h-32 bg-emerald-200/50 rounded-full blur-[40px] absolute bottom-10 right-10"></div>
              </div>
           </div>

           <div className="bg-[#E5F6FF] rounded-[2rem] p-10 flex flex-col justify-between border-2 border-transparent hover:border-cyan-200 transition-colors group cursor-pointer h-[400px]">
              <div>
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform">
                  <Rocket className="w-8 h-8 text-cyan-500" />
                </div>
                <h3 className="font-display font-bold text-3xl text-brand-dark mb-4">Lancer mon projet</h3>
                <p className="text-gray-600 font-medium text-lg leading-relaxed max-w-md">
                   Vous avez un projet innovant ? Préparez votre dossier, définissez vos objectifs et levez des fonds auprès de milliers d'investisseurs motivés.
                </p>
              </div>
              <div className="flex justify-between items-end">
                <span className="text-cyan-600 font-bold block mt-8 flex items-center gap-2">
                   Créer une compagne <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="w-32 h-32 bg-cyan-200/50 rounded-full blur-[40px] absolute bottom-10 right-10"></div>
              </div>
           </div>
        </div>

        {/* LATEST PROJECTS VIEWER */}
        <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm mt-16">
            <div className="flex justify-between items-center mb-8">
               <h3 className="font-display font-bold text-2xl text-brand-dark">Campagnes en vedette</h3>
               <button className="text-sm font-bold text-brand-dark hover:underline flex items-center gap-2">Tout voir <ArrowRight className="w-4 h-4"/></button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {[
                 { title: "Agrotech: Ferme Solidaire Kribi", type: "Donation", raised: 65, days: 12 },
                 { title: "Développement Appli FinTech", type: "Prêt (8%)", raised: 85, days: 5 },
                 { title: "Réseau Logistique Vert", type: "Prêt (6.5%)", raised: 40, days: 28 },
               ].map((camp, idx) => (
                  <div key={idx} className="border border-gray-100 p-6 rounded-2xl hover:border-emerald-500 hover:shadow-lg transition-all group cursor-pointer flex flex-col justify-between">
                     <div>
                       <div className="flex justify-between items-center mb-4">
                         <span className="text-xs font-bold text-brand-dark bg-gray-100 px-2 py-1 rounded">
                           {camp.type}
                         </span>
                         <span className="text-xs font-bold text-orange-500 bg-orange-50 px-2 py-1 rounded">
                           {camp.days} Jours restants
                         </span>
                       </div>
                       <h4 className="font-bold text-lg text-brand-dark mb-4 group-hover:text-emerald-600 transition-colors leading-tight">{camp.title}</h4>
                       
                       <div className="space-y-2 mb-4">
                         <div className="flex justify-between text-sm font-bold text-brand-dark">
                            <span>{camp.raised}% collecté</span>
                         </div>
                         <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                           <div className="bg-emerald-500 h-full rounded-full transition-all" style={{ width: `${camp.raised}%` }}></div>
                         </div>
                       </div>
                     </div>
                  </div>
               ))}
            </div>
        </div>

      </div>
    </div>
  );
}
