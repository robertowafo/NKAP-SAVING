import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';

// Public pages
import Home from './pages/Home';
import Decouvrir from './pages/Decouvrir';
import Marches from './pages/Marches';
import News from './pages/News';
import ArticleDetail from './pages/ArticleDetail';
import BlankPlaceholder from './pages/BlankPlaceholder';

// Auth pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import RegisterParticulier from './pages/auth/RegisterParticulier';
import RegisterEntreprise from './pages/auth/RegisterEntreprise';
import RegisterInstitution from './pages/auth/RegisterInstitution';

// Investir pages
import InvestirHub from './pages/investir/InvestirHub';
import FractionsPage from './pages/investir/FractionsPage';
import TokenisationPage from './pages/investir/TokenisationPage';
import FondsPage from './pages/investir/FondsPage';
import CopyInvestmentPage from './pages/investir/CopyInvestmentPage';
import CoInvestissementPage from './pages/investir/CoInvestissementPage';

// Hub pages
import FinancementHub from './pages/FinancementHub';
import OpportunitesHub from './pages/OpportunitesHub';
import ApprentissageHub from './pages/ApprentissageHub';
import SimulateurPage from './pages/apprendre/SimulateurPage';

// Finance Islamique
import FinanceIslamiqueHub from './pages/financeIslamique/FinanceIslamiqueHub';
import SukukPage from './pages/financeIslamique/SukukPage';
import MourabahaPage from './pages/financeIslamique/MourabahaPage';
import MoucharakaPage from './pages/financeIslamique/MoucharakaPage';
import FCPIslamiquePage from './pages/financeIslamique/FCPIslamiquePage';
import ComiteChariaPage from './pages/financeIslamique/ComiteChariaPage';

// Dashboard pages
import DashboardParticulier from './pages/DashboardParticulier';
import EntrepriseHub from './pages/professionnel/EntrepriseHub';
import DashboardEntreprise from './pages/professionnel/DashboardEntreprise';
import DashboardInstitution from './pages/professionnel/DashboardInstitution';
import DashboardAdmin from './pages/admin/DashboardAdmin';

import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* Public */}
          <Route index element={<Home />} />
          <Route path="decouvrir" element={<Decouvrir />} />
          <Route path="marches" element={<Marches />} />
          <Route path="actualites" element={<News />} />
          <Route path="actualites/:id" element={<ArticleDetail />} />

          {/* Auth */}
          <Route path="connexion" element={<Login />} />
          <Route path="inscription" element={<Register />} />
          <Route path="inscription/particulier" element={<RegisterParticulier />} />
          <Route path="inscription/entreprise" element={<RegisterEntreprise />} />
          <Route path="inscription/institution" element={<RegisterInstitution />} />

          {/* Investir */}
          <Route path="investir" element={<InvestirHub />} />
          <Route path="investir/fractions" element={<FractionsPage />} />
          <Route path="investir/tokenisation" element={<TokenisationPage />} />
          <Route path="investir/fonds" element={<FondsPage />} />
          <Route path="investir/copy-investment" element={<CopyInvestmentPage />} />
          <Route path="investir/co-investissement" element={<CoInvestissementPage />} />

          {/* Financement */}
          <Route path="financement/*" element={<FinancementHub />} />

          {/* Opportunités */}
          <Route path="opportunites/*" element={<OpportunitesHub />} />

          {/* Apprentissage */}
          <Route path="apprendre" element={<ApprentissageHub />} />
          <Route path="apprendre/simulateur" element={<SimulateurPage />} />

          {/* Espaces connectés */}
          <Route path="tableau-de-bord" element={<DashboardParticulier />} />
          <Route path="professionnel" element={<EntrepriseHub />} />
          <Route path="professionnel/tableau-de-bord" element={<DashboardEntreprise />} />
          <Route path="professionnel/institution" element={<DashboardInstitution />} />
          <Route path="admin" element={<DashboardAdmin />} />

          {/* Finance Islamique */}
          <Route path="finance-islamique" element={<FinanceIslamiqueHub />} />
          <Route path="finance-islamique/sukuk" element={<SukukPage />} />
          <Route path="finance-islamique/mourabaha" element={<MourabahaPage />} />
          <Route path="finance-islamique/crowdfunding-halal" element={<MoucharakaPage />} />
          <Route path="finance-islamique/fcp-islamique" element={<FCPIslamiquePage />} />
          <Route path="finance-islamique/comite-charia" element={<ComiteChariaPage />} />

          {/* 404 */}
          <Route path="*" element={<BlankPlaceholder title="404 - Page non trouvée" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
