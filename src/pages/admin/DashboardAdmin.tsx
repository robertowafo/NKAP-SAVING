import { useState } from 'react';
import { Users, TrendingUp, DollarSign, Clock, Check, X, Shield } from 'lucide-react';

const STATS = [
  { label: 'Utilisateurs actifs', value: '12 450', icon: Users, color: 'text-[#bef264]' },
  { label: 'Volume investi', value: '4,2 Mds XAF', icon: TrendingUp, color: 'text-blue-400' },
  { label: 'Commissions (mois)', value: '15,8M FCFA', icon: DollarSign, color: 'text-green-400' },
  { label: 'Comptes en attente', value: '4', icon: Clock, color: 'text-orange-400' },
];

const PENDING = [
  { nom: 'SARL AGRITEC Cameroun', type: 'Entreprise', date: '12 mai 2026', rc: 'RC/DLA/2026/B/4521' },
  { nom: 'Ecobank Gabon SA', type: 'Institution', date: '11 mai 2026', rc: 'AGR-COBAC-2024-0178' },
  { nom: 'Ibrahim Moussa', type: 'Particulier', date: '10 mai 2026', rc: 'CNI: 123456789' },
  { nom: 'SAS LOGISTRANS', type: 'Entreprise', date: '9 mai 2026', rc: 'RC/YDE/2025/B/1092' },
];

export default function DashboardAdmin() {
  const [statuses, setStatuses] = useState<Record<number, string>>({});

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-10">
          <Shield className="w-8 h-8 text-[#bef264]" />
          <div>
            <h1 className="font-black text-3xl tracking-tighter">Dashboard Admin</h1>
            <p className="text-white/40 text-sm">NKAP INVEST — Back-office</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {STATS.map((s, i) => (
            <div key={i} className="bg-[#141517] border border-white/5 rounded-2xl p-6">
              <s.icon className={`w-6 h-6 mb-4 ${s.color}`} />
              <div className="font-black text-2xl tracking-tighter">{s.value}</div>
              <div className="text-white/40 text-xs mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Pending accounts */}
        <div className="bg-[#141517] border border-white/5 rounded-2xl p-6">
          <h2 className="font-black text-lg mb-6">Comptes en attente de validation</h2>
          <div className="space-y-4">
            {PENDING.map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-white/3 rounded-xl border border-white/5">
                <div>
                  <div className="font-black text-sm">{item.nom}</div>
                  <div className="text-white/40 text-xs mt-1">{item.type} · {item.rc} · {item.date}</div>
                </div>
                {statuses[i] ? (
                  <span className={`text-xs font-black px-3 py-1 rounded-full ${statuses[i] === 'validé' ? 'bg-green-500/15 text-green-400' : 'bg-red-500/15 text-red-400'}`}>
                    {statuses[i]}
                  </span>
                ) : (
                  <div className="flex gap-2">
                    <button onClick={() => setStatuses(s => ({ ...s, [i]: 'validé' }))}
                      className="flex items-center gap-1 px-3 py-1.5 bg-green-500/15 text-green-400 rounded-lg text-xs font-black hover:bg-green-500/25 transition-colors">
                      <Check className="w-3 h-3" /> Valider
                    </button>
                    <button onClick={() => setStatuses(s => ({ ...s, [i]: 'rejeté' }))}
                      className="flex items-center gap-1 px-3 py-1.5 bg-red-500/15 text-red-400 rounded-lg text-xs font-black hover:bg-red-500/25 transition-colors">
                      <X className="w-3 h-3" /> Rejeter
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
