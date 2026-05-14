import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Twitter, Youtube, Facebook } from 'lucide-react';

const LINKS = {
  'Investir': [
    { label: 'Fractions de titres', href: '/investir/fractions' },
    { label: 'Tokenisation', href: '/investir/tokenisation' },
    { label: 'Copy Investment', href: '/investir/copy-investment' },
    { label: 'Co-Investissement', href: '/investir/co-investissement' },
  ],
  'Finance Islamique': [
    { label: 'Sukuk', href: '/finance-islamique/sukuk' },
    { label: 'Mourabaha', href: '/finance-islamique/mourabaha' },
    { label: 'Crowdfunding Halal', href: '/finance-islamique/crowdfunding-halal' },
    { label: 'FCP Islamique', href: '/finance-islamique/fcp-islamique' },
    { label: 'Comité Charia', href: '/finance-islamique/comite-charia' },
  ],
  'Plateforme': [
    { label: 'Découvrir', href: '/decouvrir' },
    { label: 'Marchés', href: '/marches' },
    { label: 'Actualités', href: '/actualites' },
    { label: 'Apprendre', href: '/apprendre' },
    { label: 'Opportunités', href: '/opportunites' },
  ],
  'Compte': [
    { label: 'Connexion', href: '/connexion' },
    { label: 'Inscription', href: '/inscription' },
    { label: 'Espace Professionnel', href: '/professionnel' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/5 pt-16 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="font-black text-2xl tracking-tighter text-white">
              NKAP<span className="text-[#bef264]">INVEST</span>
            </Link>
            <p className="text-white/30 text-sm mt-4 leading-relaxed">
              La plateforme d'investissement et de financement de l'Afrique Centrale.
            </p>
            <div className="flex gap-3 mt-6">
              {[Facebook, Instagram, Twitter, Linkedin, Youtube].map((Icon, i) => (
                <a key={i} href="#"
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-[#bef264] hover:border-[#bef264]/30 transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(LINKS).map(([section, items]) => (
            <div key={section}>
              <h4 className="text-xs font-black text-white/40 uppercase tracking-widest mb-5">{section}</h4>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.href}>
                    <Link to={item.href}
                      className="text-sm text-white/50 hover:text-white transition-colors font-medium">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/20 text-xs">
            © 2026 NKAP INVEST. Tous droits réservés. Régulé COSUMAF · COBAC · BEAC.
          </p>
          <div className="flex gap-6">
            {['Confidentialité', 'CGU', 'Mentions légales'].map((label) => (
              <a key={label} href="#" className="text-xs text-white/20 hover:text-white/50 transition-colors">
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
