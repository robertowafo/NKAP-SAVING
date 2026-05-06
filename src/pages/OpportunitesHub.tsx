import { ArrowRight, Play, LayoutGrid, Target, Users, BookOpen, Handshake, Briefcase, GraduationCap, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function OpportunitesHub() {
  return (
    <div className="flex-1 bg-[#FAFAFA] min-h-screen px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* HERO SECTION */}
        <div className="text-center max-w-4xl mx-auto space-y-6 relative pt-8">
          <div className="inline-flex justify-center items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-800 rounded-full font-bold text-xs uppercase tracking-wider mb-2">
             Propulsez votre carrière
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-extrabold text-brand-dark tracking-tight leading-tight">
            Des opportunités taillées <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">
               pour votre ambition
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-500 font-medium max-w-2xl mx-auto">
            Accédez aux emplois, stages, et missions freelances exclusives publiées par les institutions et entreprises clés de la zone CEMAC.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-6">
            <Link to="#" className="px-8 py-3.5 bg-brand-dark text-white font-bold rounded-full hover:bg-black transition-all hover:scale-105 shadow-xl shadow-black/10">
               Explorer les Opportuntés
            </Link>
            <Link to="#" className="px-8 py-3.5 bg-white border border-gray-200 text-brand-dark font-bold rounded-full hover:bg-gray-50 transition-all flex items-center gap-2 shadow-sm">
               Proposer un service <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* FEATURED CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
           <div className="bg-[#E5EEFF] rounded-[2rem] p-10 flex flex-col justify-between border-2 border-transparent hover:border-blue-200 transition-colors group cursor-pointer h-[400px]">
              <div>
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform">
                  <Briefcase className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-display font-bold text-3xl text-brand-dark mb-4">Emplois & Stages</h3>
                <p className="text-gray-600 font-medium text-lg leading-relaxed max-w-md">
                   Rejoignez les institutions financières, les startups fintech, et les entreprises en pleine croissance. Filtrez par secteur, expérience et pays.
                </p>
              </div>
              <div className="flex justify-between items-end">
                <span className="text-blue-600 font-bold block mt-8 flex items-center gap-2">
                   Voir les 342 offres <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="w-32 h-32 bg-blue-200/50 rounded-full blur-[40px] absolute bottom-10 right-10"></div>
              </div>
           </div>

           <div className="bg-[#FFF4E5] rounded-[2rem] p-10 flex flex-col justify-between border-2 border-transparent hover:border-orange-200 transition-colors group cursor-pointer h-[400px]">
              <div>
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform">
                  <Handshake className="w-8 h-8 text-orange-500" />
                </div>
                <h3 className="font-display font-bold text-3xl text-brand-dark mb-4">Offrir des services</h3>
                <p className="text-gray-600 font-medium text-lg leading-relaxed max-w-md">
                   Consultants, juristes, auditeurs ? Proposez directement votre expertise aux entreprises en phase de levée de fonds ou de structuration.
                </p>
              </div>
              <div className="flex justify-between items-end">
                <span className="text-orange-600 font-bold block mt-8 flex items-center gap-2">
                   Publier mon profil <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="w-32 h-32 bg-orange-200/50 rounded-full blur-[40px] absolute bottom-10 right-10"></div>
              </div>
           </div>
        </div>

        {/* LATEST OFFERS LITE VIEWER */}
        <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm mt-16">
            <div className="flex justify-between items-center mb-8">
               <h3 className="font-display font-bold text-2xl text-brand-dark">Nouvelles offres</h3>
               <button className="text-sm font-bold text-brand-dark hover:underline flex items-center gap-2">Voir plus <ArrowRight className="w-4 h-4"/></button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {[
                 { title: "Analyste Financier Senior", company: "Afriland First Bank", loc: "Douala, CM", tags: ["CDI", "Finance"], type: "Emploi" },
                 { title: "Stagiaire Compliance & Risque", company: "COBAC", loc: "Libreville, GA", tags: ["Stage", "Légal"], type: "Stage" },
                 { title: "Consultant Structuration FCP", company: "Financia Asset Management", loc: "Yaoundé, CM", tags: ["Mission", "Freelance"], type: "Service" },
               ].map((offer, idx) => (
                  <div key={idx} className="border border-gray-100 p-6 rounded-2xl hover:border-brand-neon hover:shadow-lg transition-all group cursor-pointer flex flex-col justify-between">
                     <div>
                       <div className="flex justify-between items-start mb-4">
                         <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center font-bold text-xl text-gray-500">
                           {offer.company[0]}
                         </div>
                         <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                           {offer.type}
                         </span>
                       </div>
                       <h4 className="font-bold text-lg text-brand-dark mb-1 group-hover:text-brand-green transition-colors leading-tight">{offer.title}</h4>
                       <p className="text-sm text-gray-500 font-medium mb-4">{offer.company} • {offer.loc}</p>
                     </div>
                     <div className="flex flex-wrap gap-2">
                        {offer.tags.map(tag => (
                           <span key={tag} className="text-[10px] font-bold text-gray-600 bg-gray-100 px-2 py-1 rounded">
                             {tag}
                           </span>
                        ))}
                     </div>
                  </div>
               ))}
            </div>
        </div>

      </div>
    </div>
  );
}
