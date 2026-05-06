import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Linkedin, Youtube } from 'lucide-react';
import { cn } from '../../lib/utils';

export function Footer() {
  return (
    <div className="px-4 pb-4 sm:px-6 lg:px-8 mt-24">
      <footer className="relative bg-[#0b2820] text-white pt-20 pb-8 px-8 md:px-16 rounded-[2rem] overflow-hidden">
        {/* Background abstract gradients */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          {/* Top right blob */}
          <div className="absolute -top-[20%] -right-[10%] w-[60%] h-[150%] bg-[#1b5e4c] blur-[120px] opacity-60 transform rotate-[30deg] rounded-full"></div>
          {/* Bottom left blob */}
          <div className="absolute top-[30%] -left-[20%] w-[50%] h-[80%] bg-[#081c16] blur-[100px] opacity-80 transform -rotate-12 rounded-full"></div>
          {/* Center highlight */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[100%] bg-gradient-to-t from-transparent via-[#2a876e]/10 to-transparent transform rotate-45 pointer-events-none mix-blend-overlay blur-[20px]"></div>
          
          {/* Glass panels / folds simulation */}
          <div className="absolute -top-[10%] right-[15%] w-[30%] h-[120%] bg-gradient-to-r from-white/5 to-transparent skew-x-[-15deg] transform origin-top-left border-l border-white/5 blur-[1px]"></div>
          <div className="absolute top-[20%] -left-[10%] w-[40%] h-[120%] bg-gradient-to-r from-transparent to-white/5 skew-x-[15deg] transform origin-bottom-right border-r border-white/5 blur-[1px]"></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16 w-full">
            {/* Newsletter section */}
            <div className="lg:col-span-5 xl:col-span-6 flex flex-col">
              <div className="flex items-center gap-3 mb-12">
                <div className="w-14 h-14 bg-gradient-to-br from-white/20 to-white/5 rounded-full flex items-center justify-center backdrop-blur-md shadow-inner shadow-white/20">
                  <span className="font-display font-black text-2xl text-white tracking-tighter shadow-sm">N</span>
                </div>
              </div>
              
              <h3 className="text-xl md:text-2xl font-medium mb-8 max-w-md text-white/90">
                Rejoignez notre newsletter pour rester informé des fonctionnalités et nouveautés.
              </h3>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-4 max-w-lg">
                <input 
                  type="email" 
                  placeholder="Entrez votre email" 
                  className="flex-1 bg-transparent border border-white/30 rounded-full px-6 py-3.5 text-white placeholder:text-white/40 focus:outline-none focus:border-white/70 transition-colors"
                />
                <button className="bg-transparent border border-white/80 rounded-full px-8 py-3.5 font-medium hover:bg-white hover:text-[#0b2820] transition-colors whitespace-nowrap">
                  S'abonner
                </button>
              </div>
              
              <p className="text-xs text-white/50 max-w-lg leading-relaxed mt-2">
                En vous abonnant, vous acceptez notre politique de confidentialité et consentez à recevoir des mises à jour de notre entreprise.
              </p>
            </div>

            {/* Links - Finance Islamique */}
            <div className="lg:col-span-2 lg:col-start-7">
              <h4 className="font-bold text-base mb-8 text-[#4ade80]">Finance Halal</h4>
              <ul className="space-y-4">
                {[
                  { label: 'Sukuk Tokenises', path: '/finance-islamique/sukuk' },
                  { label: 'Mourabaha / Ijara', path: '/finance-islamique/mourabaha' },
                  { label: 'Crowdfunding Halal', path: '/finance-islamique/crowdfunding-halal' },
                  { label: 'FCP Islamique', path: '/finance-islamique/fcp-islamique' },
                  { label: 'Comite Charia', path: '/finance-islamique/comite-charia' },
                ].map((item) => (
                  <li key={item.label}>
                    <Link to={item.path} className="text-sm font-medium text-white/80 hover:text-[#4ade80] transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Links - Pages */}
            <div className="lg:col-span-2 lg:col-start-9">
              <h4 className="font-bold text-base mb-8">Pages</h4>
              <ul className="space-y-4">
                {[
                  { label: 'A propos', path: '#' },
                  { label: 'Integrations', path: '#' },
                  { label: 'Tarification', path: '#' },
                  { label: 'Blog', path: '/actualites' },
                  { label: 'Nous contacter', path: '#' },
                ].map((item) => (
                  <li key={item.label}>
                    <Link to={item.path} className="text-sm font-medium text-white/80 hover:text-white transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Links - Social */}
            <div className="lg:col-span-2">
              <h4 className="font-bold text-base mb-8">Suivez-nous</h4>
              <ul className="space-y-4">
                <li>
                  <a href="#" className="text-sm font-medium text-white/80 hover:text-white transition-colors flex items-center gap-3">
                    <Facebook className="w-5 h-5 opacity-90" /> Facebook
                  </a>
                </li>
                <li>
                   <a href="#" className="text-sm font-medium text-white/80 hover:text-white transition-colors flex items-center gap-3">
                    <Instagram className="w-5 h-5 opacity-90" /> Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm font-medium text-white/80 hover:text-white transition-colors flex items-center gap-3">
                    {/* Simplified X icon */}
                    <svg viewBox="0 0 24 24" className="w-5 h-5 opacity-90" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> 
                    X
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm font-medium text-white/80 hover:text-white transition-colors flex items-center gap-3">
                    <Linkedin className="w-5 h-5 opacity-90" /> LinkedIn
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm font-medium text-white/80 hover:text-white transition-colors flex items-center gap-3">
                    <Youtube className="w-5 h-5 opacity-90" /> Youtube
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Giant Text */}
          <div className="w-full flex justify-center mt-8 mb-8 pb-4">
            <h1 className="font-sans font-bold text-[22vw] md:text-[18rem] lg:text-[24rem] leading-[0.8] tracking-tighter text-white overflow-hidden whitespace-nowrap">
              NKAP
            </h1>
          </div>

          {/* Bottom Bar */}
          <div className="w-full pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-6 mt-12">
            <p className="text-white/70 text-sm font-medium">
              © 2026 NKAP INVEST. Fait par NKAP.
            </p>
            <div className="flex flex-wrap gap-6 justify-center">
              <Link to="#" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Page 404</Link>
              <Link to="#" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Guide de style</Link>
              <Link to="#" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Licences</Link>
              <Link to="#" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Journal des modifications</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
