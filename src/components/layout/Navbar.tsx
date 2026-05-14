import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

const NAV = [
  {
    label: 'Découvrir',
    href: '/decouvrir',
    children: [
      { label: 'Marchés BVMAC', href: '/marches' },
      { label: 'Actualités', href: '/actualites' },
      { label: 'Institutions', href: '/decouvrir' },
    ],
  },
  {
    label: 'Investir',
    href: '/investir',
    children: [
      { label: 'Fractions de titres', href: '/investir/fractions' },
      { label: 'Tokenisation', href: '/investir/tokenisation' },
      { label: 'Fonds FCP', href: '/investir/fonds' },
      { label: 'Copy Investment', href: '/investir/copy-investment' },
      { label: 'Co-Investissement', href: '/investir/co-investissement' },
    ],
  },
  {
    label: 'Finance Islamique',
    href: '/finance-islamique',
    children: [
      { label: 'Hub Finance Islamique', href: '/finance-islamique' },
      { label: 'Sukuk', href: '/finance-islamique/sukuk' },
      { label: 'Mourabaha', href: '/finance-islamique/mourabaha' },
      { label: 'Crowdfunding Halal', href: '/finance-islamique/crowdfunding-halal' },
      { label: 'FCP Islamique', href: '/finance-islamique/fcp-islamique' },
      { label: 'Comité Charia', href: '/finance-islamique/comite-charia' },
    ],
  },
  { label: 'Financement', href: '/financement' },
  { label: 'Opportunités', href: '/opportunites' },
  { label: 'Apprendre', href: '/apprendre' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { pathname } = useLocation();

  const isDark = true;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-[72px] bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-black text-xl tracking-tighter text-white">
          NKAP<span className="text-[#bef264]">INVEST</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((item) => (
            <div key={item.label} className="relative"
              onMouseEnter={() => setActiveDropdown(item.label)}
              onMouseLeave={() => setActiveDropdown(null)}>
              <Link
                to={item.href}
                className={cn(
                  'flex items-center gap-1 px-4 py-2 rounded-full text-sm font-bold transition-colors duration-200',
                  pathname.startsWith(item.href) && item.href !== '/'
                    ? 'text-[#bef264]'
                    : 'text-white/60 hover:text-white'
                )}>
                {item.label}
                {item.children && <ChevronDown className="w-3 h-3" />}
              </Link>

              {item.children && activeDropdown === item.label && (
                <div className="absolute top-full left-0 mt-2 w-52 bg-[#141517] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
                  {item.children.map((child) => (
                    <Link key={child.href} to={child.href}
                      className="block px-5 py-3 text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors font-medium">
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Link to="/professionnel"
            className="px-4 py-2 text-sm font-bold text-white/60 hover:text-white transition-colors">
            Espace Pro
          </Link>
          <Link to="/connexion"
            className="px-5 py-2 bg-white/10 text-white text-sm font-bold rounded-full hover:bg-white/20 transition-colors">
            Connexion
          </Link>
          <Link to="/inscription"
            className="px-5 py-2 bg-[#bef264] text-[#0a0a0a] text-sm font-black rounded-full hover:bg-white transition-colors">
            Commencer
          </Link>
        </div>

        {/* Mobile toggle */}
        <button className="lg:hidden text-white p-2" onClick={() => setOpen(!open)}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden absolute top-[72px] left-0 right-0 bg-[#141517] border-b border-white/10 py-4 px-6 flex flex-col gap-2">
          {NAV.map((item) => (
            <Link key={item.label} to={item.href}
              onClick={() => setOpen(false)}
              className="py-3 text-white/70 font-bold border-b border-white/5 hover:text-white transition-colors">
              {item.label}
            </Link>
          ))}
          <div className="flex gap-3 pt-4">
            <Link to="/connexion" onClick={() => setOpen(false)}
              className="flex-1 py-3 text-center bg-white/10 text-white font-bold rounded-full text-sm">
              Connexion
            </Link>
            <Link to="/inscription" onClick={() => setOpen(false)}
              className="flex-1 py-3 text-center bg-[#bef264] text-[#0a0a0a] font-black rounded-full text-sm">
              Commencer
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
