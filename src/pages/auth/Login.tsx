import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Eye, EyeOff } from 'lucide-react';

const DEMO_ACCOUNTS = [
  { email: 'particulier@demo.cm', password: 'demo1234', role: 'particulier', redirect: '/tableau-de-bord' },
  { email: 'entreprise@demo.cm', password: 'demo1234', role: 'entreprise', redirect: '/professionnel/tableau-de-bord' },
  { email: 'admin@nkap.cm', password: 'admin1234', role: 'admin', redirect: '/admin' },
];

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const account = DEMO_ACCOUNTS.find(a => a.email === email && a.password === password);
    if (account) {
      localStorage.setItem('nkap_user', JSON.stringify({ email: account.email, role: account.role }));
      navigate(account.redirect);
    } else {
      setError('Identifiants incorrects. Utilisez un compte démo.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Link to="/" className="font-black text-3xl tracking-tighter text-white">
            NKAP<span className="text-[#bef264]">INVEST</span>
          </Link>
          <p className="text-white/40 mt-3 text-sm">Connectez-vous à votre espace</p>
        </div>

        <div className="bg-[#141517] border border-white/5 rounded-[2rem] p-8">
          <h1 className="font-black text-2xl tracking-tighter text-white mb-8">Connexion</h1>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
              {error}
            </div>
          )}

          <div className="mb-6 p-4 bg-[#bef264]/5 border border-[#bef264]/20 rounded-xl text-xs text-white/50 space-y-1">
            <p className="font-black text-[#bef264] mb-2">Comptes démo :</p>
            <p>particulier@demo.cm / demo1234</p>
            <p>entreprise@demo.cm / demo1234</p>
            <p>admin@nkap.cm / admin1234</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-black text-white/40 uppercase tracking-widest mb-2">Email</label>
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)} required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#bef264]/50 transition-colors"
                placeholder="votre@email.com"
              />
            </div>
            <div>
              <label className="block text-xs font-black text-white/40 uppercase tracking-widest mb-2">Mot de passe</label>
              <div className="relative">
                <input
                  type={showPwd ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#bef264]/50 transition-colors pr-12"
                  placeholder="••••••••"
                />
                <button type="button" onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
                  {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <button type="submit"
              className="w-full py-4 bg-[#bef264] text-[#0a0a0a] font-black rounded-xl flex items-center justify-center gap-2 hover:bg-white transition-colors">
              Se connecter <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <p className="text-center text-white/30 text-sm mt-6">
            Pas encore de compte ?{' '}
            <Link to="/inscription" className="text-[#bef264] font-bold hover:underline">S'inscrire</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
