import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <div className="px-4 pb-4 sm:px-6 lg:px-8 mt-24">
      <footer className="relative bg-[#0b2820] text-white pt-20 pb-0 px-8 md:px-16 rounded-[2rem] overflow-hidden">

        {/* ── Background effects ───────────────────────────── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Top-right glow */}
          <div className="absolute -top-[20%] -right-[10%] w-[60%] h-[150%] bg-[#1b5e4c] blur-[120px] opacity-60 rotate-[30deg] rounded-full" />
          {/* Bottom-left shadow */}
          <div className="absolute top-[30%] -left-[20%] w-[50%] h-[80%] bg-[#081c16] blur-[100px] opacity-80 -rotate-12 rounded-full" />
          {/* Glass fold — right */}
          <div className="absolute -top-[10%] right-[15%] w-[30%] h-[120%] bg-gradient-to-r from-white/5 to-transparent -skew-x-[15deg] origin-top-left border-l border-white/5 blur-[1px]" />
          {/* Glass fold — left */}
          <div className="absolute top-[20%] -left-[10%] w-[40%] h-[120%] bg-gradient-to-r from-transparent to-white/5 skew-x-[15deg] origin-bottom-right border-r border-white/5 blur-[1px]" />
        </div>

        {/* ── Content ─────────────────────────────────────── */}
        <div className="relative z-10 max-w-7xl mx-auto">

          {/* Link columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">

            {/* Finance Halal */}
            <div>
              <h4 className="font-bold text-base mb-8 text-[#4ade80]">Finance Halal</h4>
              <ul className="space-y-4">
                {[
                  { label: 'Sukuk Tokenisés', path: '/finance-islamique/sukuk' },
                  { label: 'Mourabaha / Ijara', path: '/finance-islamique/mourabaha' },
                  { label: 'Crowdfunding Halal', path: '/finance-islamique/crowdfunding-halal' },
                  { label: 'FCP Islamique', path: '/finance-islamique/fcp-islamique' },
                  { label: 'Comité Charia', path: '/finance-islamique/comite-charia' },
                ].map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.path}
                      className="text-sm font-medium text-white/70 hover:text-[#4ade80] transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pages */}
            <div>
              <h4 className="font-bold text-base mb-8 text-white">Pages</h4>
              <ul className="space-y-4">
                {[
                  { label: 'À propos', path: '#' },
                  { label: 'Investissements', path: '/investir' },
                  { label: 'Opportunités', path: '/opportunites' },
                  { label: 'Actualités', path: '/actualites' },
                  { label: 'Nous contacter', path: '#' },
                ].map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.path}
                      className="text-sm font-medium text-white/70 hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Suivez-nous */}
            <div>
              <h4 className="font-bold text-base mb-8 text-white">Suivez-nous</h4>
              <ul className="space-y-4">
                <li>
                  <a href="#" className="flex items-center gap-3 text-sm font-medium text-white/70 hover:text-white transition-colors">
                    <Facebook className="w-5 h-5" /> Facebook
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-3 text-sm font-medium text-white/70 hover:text-white transition-colors">
                    <Instagram className="w-5 h-5" /> Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-3 text-sm font-medium text-white/70 hover:text-white transition-colors">
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    X
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-3 text-sm font-medium text-white/70 hover:text-white transition-colors">
                    <Linkedin className="w-5 h-5" /> LinkedIn
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-3 text-sm font-medium text-white/70 hover:text-white transition-colors">
                    <Youtube className="w-5 h-5" /> Youtube
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* ── Giant NKAP ──────────────────────────────────── */}
          <div className="flex justify-center overflow-hidden -mx-8 md:-mx-16">
            <h2
              className="font-bold text-white leading-[0.82] tracking-tighter select-none whitespace-nowrap"
              style={{ fontSize: 'clamp(80px, 22vw, 320px)' }}
            >
              NKAP
            </h2>
          </div>

          {/* ── Bottom bar ──────────────────────────────────── */}
          <div className="border-t border-white/15 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-sm font-medium">
              © 2026 NKAP INVEST. Fait par NKAP.
            </p>
            <div className="flex flex-wrap gap-6 justify-center">
              {['Page 404', 'Guide de style', 'Licences', 'Journal des modifications'].map((label) => (
                <Link key={label} to="#"
                  className="text-sm font-medium text-white/60 hover:text-white transition-colors">
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
