import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../../lib/utils';

const ISLAMIC_SUBITEMS = [
  { label: 'Sukuk Tokenises', path: '/finance-islamique/sukuk', desc: 'Obligations Charia sur blockchain' },
  { label: 'Mourabaha / Ijara', path: '/finance-islamique/mourabaha', desc: 'Financement PME sans interets' },
  { label: 'Crowdfunding Halal', path: '/finance-islamique/crowdfunding-halal', desc: 'Moucharaka & Qard Hassan' },
  { label: 'FCP Islamique', path: '/finance-islamique/fcp-islamique', desc: 'Fonds Moudharaba Charia-compatible' },
  { label: 'Comite Charia', path: '/finance-islamique/comite-charia', desc: 'Gouvernance & certification' },
];

const islamicMenu = {
  name: 'Finance Halal',
  path: '/finance-islamique',
  dropdown: true,
  islamic: true,
  subItems: ISLAMIC_SUBITEMS,
};

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === '/';
  const isParticulier = location.pathname.startsWith('/tableau-de-bord') || location.pathname.startsWith('/investir');
  const isProfessionnel = location.pathname.startsWith('/professionnel');
  const isAdmin = location.pathname.startsWith('/admin');

  const devMenu = {
    name: 'Espaces (Dev)',
    path: '#',
    dropdown: true,
    subItems: [
      { label: 'Accueil / Public', path: '/', desc: 'Retour site public' },
      { label: 'Particulier', path: '/tableau-de-bord', desc: 'Tableau de bord' },
      { label: 'Entreprise', path: '/professionnel/tableau-de-bord', desc: 'Espace Entreprise' },
      { label: 'Institution', path: '/professionnel/institution', desc: 'Espace Institution' },
      { label: 'Admin', path: '/admin', desc: 'Back-office admin' },
    ],
  };

  let navLinks: any[] = [];

  if (isAdmin) {
    navLinks = [
      { name: 'Tableau de bord', path: '/admin', dropdown: false },
      { name: 'Comptes', path: '#', dropdown: false },
      { name: 'Moderation', path: '#', dropdown: false },
      devMenu,
    ];
  } else if (isProfessionnel) {
    navLinks = [
      { name: "Vue d'ensemble", path: '/professionnel/tableau-de-bord', dropdown: false },
      {
        name: 'Financement', path: '/professionnel/tableau-de-bord', dropdown: true,
        subItems: [
          { label: 'Mes demandes', path: '/professionnel/tableau-de-bord', desc: 'Suivre mes dossiers de financement' },
          { label: 'Offres recues', path: '/professionnel/tableau-de-bord', desc: 'Comparer et accepter les offres' },
          { label: 'Rating', path: '/professionnel/tableau-de-bord', desc: 'Demander ma notation de solvabilite' },
          { label: 'Crowdfunding', path: '/professionnel/tableau-de-bord', desc: 'Gerer mes campagnes participatives' },
        ],
      },
      { name: 'Documents', path: '/professionnel/tableau-de-bord', dropdown: false },
      { name: 'Mon profil', path: '/professionnel/tableau-de-bord', dropdown: false },
      islamicMenu,
      devMenu,
    ];
  } else if (isParticulier) {
    navLinks = [
      { name: 'Decouvrir', path: '/decouvrir', dropdown: false },
      {
        name: 'Investir', path: '/investir', dropdown: true,
        subItems: [
          { label: 'Fractions de titres', path: '/investir/fractions', desc: 'Actions et obligations BVMAC' },
          { label: 'Tokenisation', path: '/investir/tokenisation', desc: 'Actifs immobiliers blockchain' },
          { label: 'Fonds FCP', path: '/investir/fonds', desc: 'Fonds Communs de Placement' },
          { label: 'Copy Investment', path: '/investir/copy-investment', desc: 'Repliquez les meilleurs AM' },
          { label: 'Co-investissement', path: '/investir/co-investissement', desc: 'Investir en groupe' },
        ],
      },
      { name: 'Se financer', path: '/financement', dropdown: false },
      {
        name: 'Apprendre', path: '/apprendre', dropdown: true,
        subItems: [
          { label: 'Simulateur', path: '/apprendre/simulateur', desc: "Entrainez-vous sans risque reel" },
          { label: 'Formations', path: '/apprendre', desc: 'Cours et webinaires' },
          { label: 'Quiz & Certificats', path: '/apprendre', desc: 'Testez et validez vos acquis' },
        ],
      },
      islamicMenu,
      devMenu,
    ];
  } else {
    // Public
    navLinks = [
      {
        name: 'Decouvrir', path: '/decouvrir', dropdown: true,
        subItems: [
          { label: 'Institutions & Acteurs', path: '/decouvrir', desc: 'Annuaire des institutions CEMAC' },
          { label: 'Actualites', path: '/actualites', desc: "L'information financiere CEMAC" },
          { label: 'Marches', path: '/marches', desc: 'Cours et courbes en temps reel' },
          { label: 'Regulateurs CEMAC', path: '/decouvrir#regulateurs', desc: 'COSUMAF, COBAC, BVMAC, BEAC' },
        ],
      },
      {
        name: 'Investir', path: '/investir', dropdown: true,
        subItems: [
          { label: 'Fractions de titres', path: '/investir/fractions', desc: 'Actions et obligations BVMAC' },
          { label: 'Tokenisation', path: '/investir/tokenisation', desc: 'Actifs immobiliers blockchain' },
          { label: 'Fonds FCP', path: '/investir/fonds', desc: 'Fonds Communs de Placement' },
          { label: 'Copy Investment', path: '/investir/copy-investment', desc: 'Repliquez les meilleurs AM' },
          { label: 'Co-investissement', path: '/investir/co-investissement', desc: 'Investir en groupe' },
        ],
      },
      {
        name: 'Se financer', path: '/financement', dropdown: true,
        subItems: [
          { label: 'Espace Entreprise', path: '/professionnel', desc: 'Financement, rating, crowdfunding' },
          { label: 'Crowdfunding public', path: '/financement/campagnes', desc: 'Financement participatif' },
          { label: 'Mise en relation', path: '/financement', desc: 'EC, EMF, SDB disponibles' },
        ],
      },
      {
        name: 'Apprendre', path: '/apprendre', dropdown: true,
        subItems: [
          { label: 'Simulateur', path: '/apprendre/simulateur', desc: "Entrainez-vous sans risque reel" },
          { label: 'Formations', path: '/apprendre', desc: 'Cours et webinaires' },
          { label: 'Quiz & Certificats', path: '/apprendre', desc: 'Testez et validez vos acquis' },
        ],
      },
      islamicMenu,
      devMenu,
    ];
  }

  return (
    <nav className={cn(
      "fixed top-4 left-4 right-4 lg:left-1/2 lg:right-auto lg:-translate-x-1/2 lg:w-full lg:max-w-7xl z-50 backdrop-blur-md transition-all duration-300 rounded-3xl border shadow-2xl",
      isHome ? "bg-[#141517]/80 border-white/10 text-white" : "bg-white/90 border-black/5 text-brand-dark"
    )}>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex flex-col items-start leading-tight">
            <span className="font-display font-bold text-2xl tracking-tighter text-brand-neon">NKAP</span>
            <span className={cn("font-sans font-semibold text-xs tracking-widest uppercase", isHome ? "text-white/70" : "text-brand-dark/70")}>Invest</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6 h-full">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group/nav h-full flex items-center">
                <Link
                  to={link.path}
                  className={cn(
                    "text-sm font-bold transition-colors inline-flex items-center gap-1.5",
                    link.islamic
                      ? "text-[#1A7A4A] hover:text-[#C8972B]"
                      : isHome
                      ? "text-white hover:text-brand-neon"
                      : "text-brand-dark hover:text-brand-green"
                  )}
                >
                  {link.islamic && (
                    <span className="w-4 h-4 rounded-full bg-[#1A7A4A] text-white text-[8px] flex items-center justify-center font-bold shrink-0">H</span>
                  )}
                  {link.name}
                  {link.dropdown && <span className="text-[9px] opacity-70 transition-transform group-hover/nav:rotate-180">&#9660;</span>}
                </Link>
                {link.dropdown && link.subItems && (
                  <div className={cn(
                    "absolute top-[calc(100%+0.5rem)] left-1/2 -translate-x-1/2 w-72 rounded-2xl shadow-xl border opacity-0 invisible group-hover/nav:opacity-100 group-hover/nav:visible group-hover/nav:translate-y-0 translate-y-2 transition-all duration-300 p-2",
                    link.islamic
                      ? "bg-[#f0faf5] border-[#1A7A4A]/20"
                      : isHome
                      ? "bg-[#1a1a1a] border-white/10"
                      : "bg-white border-black/5"
                  )}>
                    {link.islamic && (
                      <div className="px-3 py-2 mb-1 border-b border-[#1A7A4A]/20">
                        <span className="text-[10px] font-bold text-[#1A7A4A] uppercase tracking-wider">Finance Charia-compatible</span>
                      </div>
                    )}
                    {link.subItems.map((subItem: any) => (
                      <Link
                        key={subItem.label}
                        to={subItem.path}
                        className={cn(
                          "block p-3 rounded-xl transition-all",
                          link.islamic
                            ? "hover:bg-[#1A7A4A]/10"
                            : isHome
                            ? "hover:bg-white/10"
                            : "hover:bg-brand-gray"
                        )}
                      >
                        <div className={cn(
                          "text-sm font-bold mb-0.5",
                          link.islamic ? "text-[#1A7A4A]" : isHome ? "text-white" : "text-brand-dark"
                        )}>
                          {subItem.label}
                        </div>
                        <div className={cn(
                          "text-xs font-medium",
                          link.islamic ? "text-[#1A7A4A]/70" : isHome ? "text-white/50" : "text-gray-500"
                        )}>
                          {subItem.desc}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {(!isParticulier && !isProfessionnel && !isAdmin) ? (
              <>
                <Link
                  to="/connexion"
                  className={cn(
                    "text-sm font-medium px-4 py-2 transition-colors",
                    isHome ? "text-white hover:text-brand-neon" : "text-brand-dark hover:text-brand-green"
                  )}
                >
                  Se connecter
                </Link>
                <Link
                  to="/inscription"
                  className="group relative inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-brand-dark bg-brand-neon rounded-full overflow-hidden transition-all hover:scale-105"
                >
                  <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></span>
                  <span className="relative flex items-center gap-2">
                    Creer un compte
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <button className="relative p-2 rounded-full hover:bg-black/5 transition-colors">
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={isHome ? "text-white" : "text-brand-dark"}><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>
                </button>
                <button className="w-8 h-8 rounded-full bg-brand-neon text-brand-dark font-bold text-sm flex items-center justify-center">
                  {isAdmin ? 'A' : (isProfessionnel ? 'E' : 'P')}
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-full hover:bg-black/5 transition-colors">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden absolute top-[calc(100%+1rem)] left-0 right-0 bg-white rounded-3xl border border-black/5 shadow-2xl overflow-hidden"
        >
          <div className="px-4 py-6 space-y-1 flex flex-col max-h-[80vh] overflow-y-auto">
            {navLinks.map((link) => (
              <div key={link.name} className={cn("flex flex-col border-b last:border-0", link.islamic ? "border-[#1A7A4A]/20" : "border-black/5")}>
                <div className={cn("px-3 py-4 text-base font-bold", link.islamic ? "text-[#1A7A4A]" : "text-brand-dark")}>
                  {link.name}
                </div>
                {link.subItems && (
                  <div className={cn("flex flex-col pl-6 pb-4 gap-3", link.islamic ? "bg-[#f0faf5]/50" : "bg-gray-50/50")}>
                    {link.subItems.map((sub: any) => (
                      <Link
                        key={sub.label}
                        to={sub.path}
                        className={cn("text-sm font-bold", link.islamic ? "text-[#1A7A4A] hover:text-[#C8972B]" : "text-gray-600 hover:text-brand-green")}
                        onClick={() => setIsOpen(false)}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-6 flex flex-col gap-3 px-3">
              {(!isParticulier && !isProfessionnel && !isAdmin) ? (
                <>
                  <Link to="/connexion" className="w-full text-center px-4 py-3 text-sm font-bold rounded-xl bg-gray-100 text-brand-dark" onClick={() => setIsOpen(false)}>
                    Se connecter
                  </Link>
                  <Link to="/inscription" className="w-full text-center px-4 py-3 text-sm font-bold rounded-xl bg-brand-neon text-brand-dark" onClick={() => setIsOpen(false)}>
                    Creer un compte
                  </Link>
                </>
              ) : (
                <div className="flex gap-4 items-center px-2">
                  <button className="flex items-center gap-2 text-sm font-bold text-gray-600">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>
                    Notifications
                  </button>
                  <button className="flex items-center gap-2 text-sm font-bold text-gray-600">
                    <div className="w-8 h-8 rounded-full bg-brand-neon text-brand-dark font-bold flex items-center justify-center">
                      {isAdmin ? 'A' : (isProfessionnel ? 'E' : 'P')}
                    </div>
                    Mon profil
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
