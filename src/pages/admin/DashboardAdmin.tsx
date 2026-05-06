import { Users, FileText, CheckCircle, AlertTriangle, Activity, Briefcase } from 'lucide-react';

export default function DashboardAdmin() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Admin Sidebar */}
      <div className="w-full md:w-64 bg-brand-dark text-gray-300 flex flex-col">
          <div className="p-6 border-b border-gray-800">
              <h1 className="text-xl font-display font-bold text-white">NKAP ADMIN</h1>
              <p className="text-xs text-gray-500 mt-1">Back-office system</p>
          </div>
          <nav className="flex-1 p-4 space-y-2">
              <a href="#" className="flex items-center gap-3 px-4 py-3 bg-white/10 text-brand-neon rounded-xl text-sm font-bold transition-colors">
                  <Activity className="w-4 h-4" /> Vue d'ensemble
              </a>
              <a href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 hover:text-white rounded-xl text-sm font-medium transition-colors">
                  <Users className="w-4 h-4" /> Validations Comptes
              </a>
              <a href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 hover:text-white rounded-xl text-sm font-medium transition-colors">
                  <FileText className="w-4 h-4" /> Modération Contenus
              </a>
              <a href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 hover:text-white rounded-xl text-sm font-medium transition-colors">
                  <Briefcase className="w-4 h-4" /> Commissions & Finances
              </a>
          </nav>
      </div>

      <div className="flex-1 p-4 md:p-8 overflow-y-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Tableau de bord</h2>
        
        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200">
                <div className="text-sm font-bold text-gray-500 mb-1">Total Utilisateurs</div>
                <div className="text-3xl font-display font-bold text-brand-dark">12,450</div>
                <div className="text-xs text-emerald-500 mt-2 font-bold">+124 ce jour</div>
            </div>
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200">
                <div className="text-sm font-bold text-gray-500 mb-1">Volume Investi</div>
                <div className="text-3xl font-display font-bold text-brand-dark">4.2B <span className="text-lg text-gray-400">XAF</span></div>
            </div>
             <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200">
                <div className="text-sm font-bold text-gray-500 mb-1">Commissions (Mois)</div>
                <div className="text-3xl font-display font-bold text-brand-dark">15.8M</div>
            </div>
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-red-200 bg-red-50/50">
                <div className="text-sm font-bold text-red-600 mb-1">Alertes Système</div>
                <div className="text-3xl font-display font-bold text-red-700">3</div>
                <div className="text-xs text-red-500 mt-2 font-bold flex items-center gap-1"><AlertTriangle className="w-3 h-3"/> Voir détails</div>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Actions requises */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-5 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="font-bold text-brand-dark">Comptes en attente (4)</h3>
                </div>
                <div className="divide-y divide-gray-50">
                    <div className="p-4 flex items-center justify-between hover:bg-gray-50">
                        <div>
                            <div className="font-bold text-sm text-brand-dark mb-0.5">Global Trade SARL</div>
                            <div className="text-xs text-gray-500">Compte Entreprise • Soumis il y a 2h</div>
                        </div>
                        <button className="px-3 py-1.5 bg-gray-900 text-white text-xs font-bold rounded-lg hover:bg-brand-neon hover:text-black">
                            Traiter
                        </button>
                    </div>
                    <div className="p-4 flex items-center justify-between hover:bg-gray-50">
                        <div>
                            <div className="font-bold text-sm text-brand-dark mb-0.5">Microfinance Express</div>
                            <div className="text-xs text-gray-500">Institution • Soumis hier</div>
                        </div>
                        <button className="px-3 py-1.5 bg-gray-900 text-white text-xs font-bold rounded-lg hover:bg-brand-neon hover:text-black">
                            Traiter
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-5 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="font-bold text-brand-dark">KYC Particuliers (12)</h3>
                </div>
                 <div className="divide-y divide-gray-50">
                    <div className="p-4 flex items-center justify-between hover:bg-gray-50">
                        <div>
                            <div className="font-bold text-sm text-brand-dark mb-0.5">Paul Biya</div>
                            <div className="text-xs text-gray-500">CNI Camerounaise</div>
                        </div>
                        <button className="px-3 py-1.5 bg-gray-100 text-brand-dark text-xs font-bold rounded-lg hover:bg-gray-200">
                            Vérifier
                        </button>
                    </div>
                    <div className="p-4 flex items-center justify-between hover:bg-gray-50">
                        <div>
                            <div className="font-bold text-sm text-brand-dark mb-0.5">Ali Bongo</div>
                            <div className="text-xs text-gray-500">Passeport Gabonais</div>
                        </div>
                        <button className="px-3 py-1.5 bg-gray-100 text-brand-dark text-xs font-bold rounded-lg hover:bg-gray-200">
                            Vérifier
                        </button>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
