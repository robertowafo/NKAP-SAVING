import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function RegisterParticulier() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="font-black text-3xl tracking-tighter text-white">NKAP<span className="text-[#bef264]">INVEST</span></Link>
          <p className="text-white/40 mt-2 text-sm">Inscription — Particulier</p>
        </div>
        <div className="bg-[#141517] border border-white/5 rounded-[2rem] p-8 space-y-5">
          {['Prénom', 'Nom', 'Email', 'Téléphone', 'Mot de passe'].map((label) => (
            <div key={label}>
              <label className="block text-xs font-black text-white/40 uppercase tracking-widest mb-2">{label}</label>
              <input type={label === 'Mot de passe' ? 'password' : 'text'}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#bef264]/50 transition-colors"
                placeholder={label} />
            </div>
          ))}
          <Link to="/tableau-de-bord"
            className="flex items-center justify-center gap-2 w-full py-4 bg-[#bef264] text-[#0a0a0a] font-black rounded-xl hover:bg-white transition-colors">
            Créer mon compte <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
