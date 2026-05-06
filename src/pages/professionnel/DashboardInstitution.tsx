import { Building2, Search, Filter, MessageSquare, PieChart, Star } from 'lucide-react';

export default function DashboardInstitution() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header & Status */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-brand-dark p-8 rounded-3xl shadow-xl text-white">
          <div className="flex items-center gap-4">
             <div className="w-16 h-16 bg-white rounded-2xl p-2 flex items-center justify-center">
                {/* Placeholder logo */}
                <span className="font-display font-bold text-brand-dark text-xl">B</span>
             </div>
             <div>
               <h1 className="text-2xl font-display font-bold">Banque Atlantique</h1>
               <p className="text-gray-400 text-sm">Etablissement de Crédit • Agrément COBAC</p>
             </div>
          </div>
          <div className="flex gap-3">
             <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-bold transition-colors">
                 Modifier profil
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
                {/* Demandes disponibles */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-brand-dark">Feed des demandes</h2>
                        <div className="flex gap-2">
                             <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-500">
                                <Search className="w-4 h-4" />
                            </button>
                            <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-500 flex items-center gap-2 text-xs font-bold">
                                <Filter className="w-4 h-4" /> Filtres
                            </button>
                        </div>
                    </div>
                    
                    <div className="space-y-4">
                        <div className="p-5 border border-gray-100 rounded-xl hover:border-brand-neon hover:shadow-md transition-all cursor-pointer group">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <div className="font-bold text-brand-dark mb-1 group-hover:text-brand-green">Financement achat équipements de production</div>
                                    <div className="text-xs text-gray-500 flex items-center gap-2">
                                        <span className="px-2 py-0.5 bg-gray-100 rounded">Industrie</span>
                                        <span>•</span>
                                        <span>Cameroun</span>
                                        <span>•</span>
                                        <span className="text-orange-500 font-bold flex items-center gap-1"><Star className="w-3 h-3"/> Rating BBB</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                     <div className="font-bold text-xl text-brand-dark">120 000 000 <span className="text-sm">FCFA</span></div>
                                     <div className="text-xs text-gray-400">Crédit moyen terme</div>
                                </div>
                            </div>
                            <div className="flex gap-3 mt-4 pt-4 border-t border-gray-50">
                                <button className="px-4 py-1.5 bg-brand-dark text-white rounded-lg text-xs font-bold hover:bg-brand-neon hover:text-brand-dark transition-colors">
                                    Voir dossier
                                </button>
                                <button className="px-4 py-1.5 bg-white border border-gray-200 text-brand-dark rounded-lg text-xs font-bold hover:bg-gray-50 transition-colors">
                                    Faire une offre
                                </button>
                            </div>
                        </div>

                         <div className="p-5 border border-gray-100 rounded-xl hover:border-brand-neon hover:shadow-md transition-all cursor-pointer group">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <div className="font-bold text-brand-dark mb-1 group-hover:text-brand-green">Ligne de trésorerie BFR</div>
                                    <div className="text-xs text-gray-500 flex items-center gap-2">
                                        <span className="px-2 py-0.5 bg-gray-100 rounded">Commerce</span>
                                        <span>•</span>
                                        <span>Gabon</span>
                                        <span>•</span>
                                        <span className="text-emerald-500 font-bold flex items-center gap-1"><Star className="w-3 h-3"/> Rating A-</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                     <div className="font-bold text-xl text-brand-dark">50 000 000 <span className="text-sm">FCFA</span></div>
                                     <div className="text-xs text-gray-400">Crédit court terme</div>
                                </div>
                            </div>
                            <div className="flex gap-3 mt-4 pt-4 border-t border-gray-50">
                                <button className="px-4 py-1.5 bg-brand-dark text-white rounded-lg text-xs font-bold hover:bg-brand-neon hover:text-brand-dark transition-colors">
                                    Voir dossier
                                </button>
                                <button className="px-4 py-1.5 bg-white border border-gray-200 text-brand-dark rounded-lg text-xs font-bold hover:bg-gray-50 transition-colors">
                                    Faire une offre
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-8">
                 {/* Offres soumises & Stats */}
                 <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
                     <h3 className="text-sm font-bold text-brand-dark mb-4 border-b border-gray-100 pb-3">Statistiques</h3>
                     <div className="grid grid-cols-2 gap-4">
                        <div>
                             <div className="text-2xl font-bold text-brand-dark">12</div>
                             <div className="text-xs text-gray-500">Offres soumises</div>
                        </div>
                        <div>
                             <div className="text-2xl font-bold text-emerald-600">3</div>
                             <div className="text-xs text-gray-500">Offres acceptées</div>
                        </div>
                     </div>
                 </div>

                 <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-bold text-brand-dark">Mes offres soumises</h3>
                        <button className="text-xs font-bold text-brand-dark hover:underline">Voir tout</button>
                    </div>
                    <div className="space-y-3">
                         <div className="p-3 bg-gray-50 rounded-xl text-sm">
                             <div className="font-bold text-brand-dark mb-1">Agro Industries SA</div>
                             <div className="flex justify-between items-center">
                                 <span className="text-gray-500 text-xs">75M FCFA à 8.5%</span>
                                 <span className="text-[10px] uppercase font-bold text-orange-500 bg-orange-100 px-2 py-0.5 rounded">En attente</span>
                             </div>
                         </div>
                         <div className="p-3 bg-gray-50 rounded-xl text-sm">
                             <div className="font-bold text-brand-dark mb-1">Tech Africa SARL</div>
                             <div className="flex justify-between items-center">
                                 <span className="text-gray-500 text-xs">50M FCFA à 8.5%</span>
                                 <span className="text-[10px] uppercase font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded">Acceptée</span>
                             </div>
                         </div>
                    </div>
                 </div>

                 {/* Mes produits publiés (Asset Managers) */}
                 <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-bold text-brand-dark flex items-center gap-2">
                           <PieChart className="w-4 h-4"/> Produits publiés (FCP)
                        </h3>
                        <button className="text-xs font-bold text-brand-dark hover:underline">Ajouter</button>
                    </div>
                    <div className="space-y-3">
                         <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                             <div className="font-bold text-brand-dark text-sm mb-1">FCP Atlantique Actions</div>
                             <div className="flex justify-between items-center">
                                 <span className="text-gray-500 text-xs">Encours: 1.2B FCFA</span>
                                 <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded">Actif</span>
                             </div>
                         </div>
                    </div>
                 </div>

                 {/* Messagerie */}
                 <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-sm font-bold text-brand-dark mb-4 flex items-center gap-2">
                        <MessageSquare className="w-4 h-4"/> Messages récents
                    </h3>
                    <div className="text-center p-4">
                        <p className="text-xs text-gray-500">Aucune conversation active pour le moment.</p>
                    </div>
                 </div>
            </div>
        </div>
      </div>
    </div>
  );
}
