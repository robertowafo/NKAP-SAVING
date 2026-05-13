/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import Home from './pages/Home';
import Marches from './pages/Marches';
import News from './pages/News';
import ArticleDetail from './pages/ArticleDetail';
import OpportunitesHub from './pages/OpportunitesHub';
import FinancementHub from './pages/FinancementHub';
import ApprentissageHub from './pages/ApprentissageHub';
import DashboardParticulier from './pages/DashboardParticulier';
import BlankPlaceholder from './pages/BlankPlaceholder';

// Auth
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import RegisterParticulier from './pages/auth/RegisterParticulier';
import RegisterEntreprise from './pages/auth/RegisterEntreprise';
import RegisterInstitution from './pages/auth/RegisterInstitution';

// Professionnel
import DashboardInstitution from './pages/professionnel/DashboardInstitution';
import EntrepriseHub from './pages/professionnel/EntrepriseHub';
import DashboardEntreprise from './pages/professionnel/DashboardEntreprise';

// Admin
import DashboardAdmin from './pages/admin/DashboardAdmin';

// Investir
import InvestirHub from './pages/investir/InvestirHub';
import FractionsPage from './pages/investir/FractionsPage';
import TokenisationPage from './pages/investir/TokenisationPage';
import CopyInvestmentPage from './pages/investir/CopyInvestmentPage';
import CoInvestissementPage from './pages/investir/CoInvestissementPage';

// Apprendre
import SimulateurPage from './pages/apprendre/SimulateurPage';

// Finance Islamique
import FinanceIslamiqueHub from './pages/financeIslamique/FinanceIslamiqueHub';
import SukukPage from './pages/financeIslamique/SukukPage';
import MourabahaPage from './pages/financeIslamique/MourabahaPage';
import MoucharakaPage from './pages/financeIslamique/MoucharakaPage';
import FCPIslamiquePage from './pages/financeIslamique/FCPIslamiquePage';
import ComiteChariaPage from './pages/financeIslamique/ComiteChariaPage';

import ScrollToTop from './components/ScrollToTop';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />

          {/* Découvrir */}
          <Route path="decouvrir" element={<BlankPlaceholder title="Découvrir" />} />
          <Route path="actualites" element={<News />} />
          <Route path="actualites/:id" element={<ArticleDetail />} />
          <Route path="marches" element={<Marches />} />

          {/* Investir */}
          <Route path="investir" element={<InvestirHub />} />
          <Route path="investir/fractions" element={<FractionsPage />} />
          <Route path="investir/tokenisation" element={<TokenisationPage />} />
          <Route path="investir/fonds" element={<BlankPlaceholder title="Fonds FCP" />} />
          <Route path="investir/copy-investment" element={<CopyInvestmentPage />} />
          <Route path="investir/co-investissement" element={<CoInvestissementPage />} />

          {/* Finance Islamique */}
          <Route path="finance-islamique" element={<FinanceIslamiqueHub />} />
          <Route path="finance-islamique/sukuk" element={<SukukPage />} />
          <Route path="finance-islamique/mourabaha" element={<MourabahaPage />} />
          <Route path="finance-islamique/crowdfunding-halal" element={<MoucharakaPage />} />
          <Route path="finance-islamique/fcp-islamique" element={<FCPIslamiquePage />} />
          <Route path="finance-islamique/comite-charia" element={<ComiteChariaPage />} />

          {/* Financement */}
          <Route path="financement" element={<FinancementHub />} />
          <Route path="financement/campagnes" element={<BlankPlaceholder title="Crowdfunding" />} />

          {/* Opportunités */}
          <Route path="opportunites" element={<OpportunitesHub />} />

          {/* Apprendre */}
          <Route path="apprendre" element={<ApprentissageHub />} />
          <Route path="apprendre/simulateur" element={<SimulateurPage />} />

          {/* Dashboard particulier */}
          <Route path="tableau-de-bord" element={<DashboardParticulier />} />

          {/* Professionnel */}
          <Route path="professionnel" element={<EntrepriseHub />} />
          <Route path="professionnel/entreprise" element={<DashboardEntreprise />} />
          <Route path="professionnel/tableau-de-bord" element={<DashboardInstitution />} />
          <Route path="professionnel/institution" element={<DashboardInstitution />} />

          {/* Admin */}
          <Route path="admin" element={<DashboardAdmin />} />

          {/* Auth */}
          <Route path="connexion" element={<Login />} />
          <Route path="inscription" element={<Register />} />
          <Route path="inscription/particulier" element={<RegisterParticulier />} />
          <Route path="inscription/entreprise" element={<RegisterEntreprise />} />
          <Route path="inscription/institution" element={<RegisterInstitution />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
