import { useState, useEffect } from 'react';
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
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Close mobile menu on route change */
  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <>
      {/* Floating header bar */}
      <header className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            'max-w-7xl mx-auto flex items-center justify-between h-[60px] px-4 sm:px-6 rounded-2xl border transition-all duration-300',
            scrolled
              ? 'bg-[#0a0a0a]/90 backdrop-blur-2xl border-white/10 shadow-2xl shadow-black/40'
              : 'bg-[#0a0a0a]/70 backdrop-blur-xl border-white/8 shadow-lg shadow-black/20'
          )}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-1 font-black text-xl tracking-tighter text-white shrink-0">
            NKAP<span className="text-[#bef264]">INVEST</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {NAV.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={item.href}
                  className={cn(
                    'flex items-center gap-1 px-3.5 py-2 rounded-xl text-sm font-bold transition-colors duration-200',
                    pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
                      ? 'text-[#bef264]'
                      : 'text-white/55 hover:text-white hover:bg-white/5'
                  )}
                >
                  {item.label}
                  {item.children && <ChevronDown className="w-3 h-3 opacity-60" />}
                </Link>

                {item.children && activeDropdown === item.label && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-[#0f1011] border border-white/10 rounded-2xl shadow-2xl shadow-black/60 overflow-hidden">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        to={child.href}
                        className="block px-5 py-3 text-sm text-white/55 hover:text-white hover:bg-white/5 transition-colors font-medium"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTAs */}
          <div className="hidden lg:flex items-center gap-2">
            <Link
              to="/professionnel"
              className="px-3.5 py-2 text-sm font-bold text-white/55 hover:text-white transition-colors"
            >
              Espace Pro
            </Link>
            <Link
              to="/connexion"
              className="px-4 py-2 bg-white/8 border border-white/10 text-white text-sm font-bold rounded-xl hover:bg-white/15 transition-colors"
            >
              Connexion
            </Link>
            <Link
              to="/inscription"
              className="px-4 py-2 bg-[#bef264] text-[#0a0a0a] text-sm font-black rounded-xl hover:bg-white transition-colors"
            >
              Commencer
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden text-white p-2 -mr-1"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu — drops below the floating bar */}
        {open && (
          <div className="lg:hidden max-w-7xl mx-auto mt-2 bg-[#0f1011]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex flex-col py-3">
              {NAV.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="px-6 py-3.5 text-white/70 font-bold hover:text-white hover:bg-white/5 transition-colors text-sm"
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex gap-3 px-6 pt-3 pb-4 border-t border-white/8 mt-2">
                <Link to="/connexion"
                  className="flex-1 py-2.5 text-center bg-white/8 text-white font-bold rounded-xl text-sm border border-white/10">
                  Connexion
                </Link>
                <Link to="/inscription"
                  className="flex-1 py-2.5 text-center bg-[#bef264] text-[#0a0a0a] font-black rounded-xl text-sm">
                  Commencer
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
