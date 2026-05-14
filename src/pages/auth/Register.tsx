import { Link } from 'react-router-dom';
import { Building2, User, Landmark, ArrowRight } from 'lucide-react';

const ROLES = [
  { label: 'Particulier', desc: 'Investissez et gérez votre patrimoine personnel', icon: User, href: '/inscription/particulier', color: 'bg-[#bef264] text-[#0a0a0a]' },
  { label: 'Entreprise', desc: 'Accédez au financement et aux services B2B', icon: Building2, href: '/inscription/entreprise', color: 'bg-white/5 text-white' },
  { label: 'Institution', desc: 'Banques, EMF et gestionnaires d\'actifs', icon: Landmark, href: '/inscription/institution', color: 'bg-white/5 text-white' },
];

export default function Register() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-10">
          <Link to="/" className="font-black text-3xl tracking-tighter text-white">
            NKAP<span className="text-[#bef264]">INVEST</span>
          </Link>
          <p className="text-white/40 mt-3 text-sm">Choisissez votre profil</p>
        </div>
        <div className="space-y-4">
          {ROLES.map((role) => (
            <Link key={role.label} to={role.href}
              className="flex items-center gap-5 p-6 bg-[#141517] border border-white/5 rounded-2xl hover:border-[#bef264]/30 transition-all duration-300 group">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${role.color}`}>
                <role.icon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-black text-white text-lg">{role.label}</h3>
                <p className="text-white/40 text-sm mt-0.5">{role.desc}</p>
              </div>
              <ArrowRight className="w-5 h-5 text-white/20 group-hover:text-[#bef264] transition-colors" />
            </Link>
          ))}
        </div>
        <p className="text-center text-white/30 text-sm mt-8">
          Déjà un compte ?{' '}
          <Link to="/connexion" className="text-[#bef264] font-bold hover:underline">Se connecter</Link>
        </p>
      </div>
    </div>
  );
}
