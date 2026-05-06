import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { cn } from '../../lib/utils';

export function MainLayout() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      <main className={cn("flex-grow", isHome ? "" : "pt-28")}>
        <Outlet />
      </main>
      {/* We only render Footer if not home, or we let Home render its own customized footer logic. Wait, let's keep Footer but style it. */}
      {/* Scalient has a black footer. Our Footer is already dark. We'll leave it but let Home handle the marquee right before it. */}
      <Footer />
    </div>
  );
}
