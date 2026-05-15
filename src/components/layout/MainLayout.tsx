import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

export function MainLayout() {
  const { pathname } = useLocation();
  const noPadding = pathname === '/';

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a]">
      <Navbar />
      <main className={noPadding ? '' : 'pt-[80px] flex-1'}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
