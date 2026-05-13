import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  LayoutDashboard, TrendingUp, Star, Users, FileText, User,
  Bell, Plus, Check, Upload, X, Building2, BarChart2, Shield,
  Zap, AlertCircle, Clock, CheckCircle, Send, ArrowRight,
  ChevronDown, Eye, Download, Trash2, Edit3, LogOut,
  DollarSign, Target, MessageSquare, Info
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';

type Tab = 'overview' | 'financement' | 'rating' | 'crowdfunding' | 'documents' | 'profil';

interface Demande {
  id: number;
  titre: string;
  montant: number;
  type: string;
  statut: 'brouillon' | 'publiee' | 'en-cours' | 'finalisee';
  offres: number;
  date: string;
  description: string;
}

interface Offre {
  id: number;
  banque: string;
  montant: string;
  taux: string;
  duree: string;
  note: string;
  statut: 'en-attente' | 'acceptee' | 'refusee';
  demandeId: number;
}

interface Document {
  nom: string;
  type: string;
  taille: string;
  statut: 'valide' | 'en-attente' | 'manquant';
  date?: string;
}

const DEMANDES: Demande[] = [
  { id: 1, titre: 'Achat équipements industriels', montant: 50000000, type: 'Crédit moyen terme', statut: 'en-cours', offres: 2, date: '12 Avr. 2026', description: "Acquisition de machines de production pour augmenter notre capacité de 40%." },
  { id: 2, titre: 'Extension entrepôt logistique', montant: 120000000, type: 'Co-financement', statut: 'publiee', offres: 0, date: '28 Avr. 2026', description: "Construction d'un entrepôt de 2000m² à Douala port." },
  { id: 3, titre: 'Fonds de roulement Q2 2026', montant: 25000000, type: 'Crédit court terme', statut: 'finalisee', offres: 3, date: '2 Mar. 2026', description: "Besoins de trésorerie pour le cycle d'exploitation." },
];

const OFFRES: Offre[] = [
  { id: 1, banque: 'Ecobank Cameroun', montant: '50 000 000 FCFA', taux: '8,5%', duree: '36 mois', note: 'AA', statut: 'en-attente', demandeId: 1 },
  { id: 2, banque: 'Afriland First Bank', montant: '50 000 000 FCFA', taux: '9,2%', duree: '48 mois', note: 'AA', statut: 'en-attente', demandeId: 1 },
  { id: 3, banque: 'Société Générale Cameroun', montant: '25 000 000 FCFA', taux: '7,8%', duree: '12 mois', note: 'A+', statut: 'acceptee', demandeId: 3 },
];

const DOCUMENTS: Document[] = [
  { nom: 'Bilan 2023', type: 'Bilan comptable', taille: '1.2 Mo', statut: 'valide', date: '10 Jan. 2026' },
  { nom: 'Bilan 2024', type: 'Bilan comptable', taille: '1.4 Mo', statut: 'valide', date: '15 Jan. 2026' },
  { nom: 'Registre de Commerce', type: 'Document légal', taille: '0.8 Mo', statut: 'valide', date: '5 Jan. 2026' },
  { nom: 'Statuts de la société', type: 'Document légal', taille: '0.6 Mo', statut: 'en-attente', date: '18 Jan. 2026' },
  { nom: 'Bilan 2022', type: 'Bilan comptable', taille: '', statut: 'manquant' },
  { nom: "Plan d'affaires 2025-2027", type: 'Business plan', taille: '', statut: 'manquant' },
];

const CROWDFUNDING_ACTIVE = {
  titre: 'NKAP Boulangers — Pack machines boulangerie',
  type: 'Don avec récompense',
  objectif: 8500000,
  collecte: 5230000,
  contributeurs: 87,
  joursRestants: 12,
  description: "Aidez 15 boulangers artisanaux de Yaoundé à s'équiper de pétrins modernes.",
};

const NAV_ITEMS = [
  { id: 'overview', label: "Vue d'ensemble", icon: LayoutDashboard, badge: null },
  { id: 'financement', label: 'Financement', icon: TrendingUp, badge: '2' },
  { id: 'rating', label: 'Rating', icon: Star, badge: null },
  { id: 'crowdfunding', label: 'Crowdfunding', icon: Users, badge: null },
  { id: 'documents', label: 'Documents', icon: FileText, badge: '2' },
  { id: 'profil', label: 'Mon profil', icon: User, badge: null },
];

const CHECKLIST = [
  { label: 'Profil entreprise créé', done: true },
  { label: 'Documents KYC déposés', done: true },
  { label: 'Première demande publiée', done: true },
  { label: 'Rating demandé', done: false },
];

const RATING_SCALE = [
  { note: 'AAA', label: 'Excellente', color: 'bg-emerald-500', desc: "Capacité de remboursement exceptionnelle. Risque quasi nul." },
  { note: 'AA', label: 'Très bonne', color: 'bg-green-500', desc: "Très faible risque. Accès facile au crédit aux meilleurs taux." },
  { note: 'A', label: 'Bonne', color: 'bg-lime-500', desc: "Risque faible. Bonne capacité de remboursement." },
  { note: 'BBB', label: 'Satisfaisante', color: 'bg-yellow-400', desc: "Risque modéré. Accès au crédit avec garanties standard." },
  { note: 'BB', label: 'Spéculative', color: 'bg-orange-400', desc: "Risque élevé. Conditions de crédit plus strictes." },
  { note: 'B / CCC', label: 'Risquée', color: 'bg-red-500', desc: "Risque très élevé. Accès limité au financement." },
];

function StatusBadge({ statut }: { statut: Demande['statut'] }) {
  const cfg = {
    brouillon: 'bg-gray-100 text-gray-600',
    publiee: 'bg-blue-50 text-blue-700',
    'en-cours': 'bg-amber-50 text-amber-700',
    finalisee: 'bg-emerald-50 text-emerald-700',
  }[statut];
  const labels = { brouillon: 'Brouillon', publiee: 'Publiée', 'en-cours': 'En cours', finalisee: 'Finalisée' };
  return <span className={cn('px-2.5 py-1 rounded-full text-[10px] font-bold', cfg)}>{labels[statut]}</span>;
}

function OffreBadge({ statut }: { statut: Offre['statut'] }) {
  const cfg = {
    'en-attente': 'bg-amber-50 text-amber-700',
    acceptee: 'bg-emerald-50 text-emerald-700',
    refusee: 'bg-red-50 text-red-600',
  }[statut];
  const labels = { 'en-attente': 'En attente', acceptee: 'Acceptée', refusee: 'Refusée' };
  return <span className={cn('px-2.5 py-1 rounded-full text-[10px] font-bold', cfg)}>{labels[statut]}</span>;
}

export default function DashboardEntreprise() {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [showDemandeModal, setShowDemandeModal] = useState(false);
  const [formStep, setFormStep] = useState(1);
  const [selectedDemande, setSelectedDemande] = useState<Demande | null>(null);
  const [showRatingForm, setShowRatingForm] = useState(false);
  const [ratingStep, setRatingStep] = useState(1);
  const [showCrowdForm, setShowCrowdForm] = useState(false);
  const [crowdStep, setCrowdStep] = useState(1);
  const [crowdType, setCrowdType] = useState<'don' | 'pret'>('don');
  const [notifications, setNotifications] = useState(3);

  const formDemandeDefault = { titre: '', type: '', montant: '', duree: '', description: '', garanties: '', documents: [] as string[] };
  const [formDemande, setFormDemande] = useState(formDemandeDefault);

  const pct = Math.round((CROWDFUNDING_ACTIVE.collecte / CROWDFUNDING_ACTIVE.objectif) * 100);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  return (
    <div className="flex min-h-screen bg-[#f4f4f0]">

      {/* SIDEBAR */}
      <aside 
        className={cn(
          "fixed top-6 left-6 h-[calc(100vh-3rem)] bg-[#0a0a0a] flex flex-col z-50 rounded-[2rem] transition-all duration-300 ease-in-out shadow-2xl overflow-hidden",
          isSidebarOpen ? "w-72" : "w-24"
        )}
        onMouseEnter={() => setIsSidebarOpen(true)}
        onMouseLeave={() => setIsSidebarOpen(false)}
        onClick={() => setIsSidebarOpen(true)}
      >
        {/* Company profile */}
        <div className={cn("py-6 border-b border-white/5 flex flex-col transition-all", isSidebarOpen ? "px-6" : "px-0 items-center")}>
          <div className={cn("flex items-center", isSidebarOpen ? "gap-3" : "justify-center")}>
            <div className="w-12 h-12 bg-brand-neon rounded-2xl flex items-center justify-center font-display font-bold text-brand-dark text-xl shrink-0">
              T
            </div>
            {isSidebarOpen && (
              <div className="min-w-0">
                <div className="font-bold text-white text-sm truncate">Tech Africa SARL</div>
                <div className="text-[10px] text-white/40 font-medium">Technologie • Douala</div>
              </div>
            )}
          </div>
          {isSidebarOpen && (
            <div className="mt-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-amber-400 rounded-full" />
              <span className="text-[10px] text-white/50 font-medium whitespace-nowrap">KYC en cours de vérification</span>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className={cn("flex-1 py-6 space-y-2 overflow-y-auto", isSidebarOpen ? "px-4" : "px-3")}>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as Tab)}
                className={cn(
                  'w-full flex items-center rounded-2xl text-sm font-bold transition-all group',
                  active
                    ? 'bg-brand-neon text-brand-dark'
                    : 'text-white/50 hover:bg-white/5 hover:text-white',
                  isSidebarOpen ? 'justify-between px-4 py-3' : 'justify-center p-3'
                )}
                title={!isSidebarOpen ? item.label : undefined}
              >
                <div className="flex items-center gap-3">
                  <Icon className={cn("shrink-0", isSidebarOpen ? "w-4 h-4" : "w-6 h-6")} />
                  {isSidebarOpen && <span className="whitespace-nowrap">{item.label}</span>}
                </div>
                {item.badge && isSidebarOpen && (
                  <span className={cn(
                    'px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0',
                    active ? 'bg-brand-dark text-brand-neon' : 'bg-brand-neon/20 text-brand-neon'
                  )}>
                    {item.badge}
                  </span>
                )}
                {item.badge && !isSidebarOpen && (
                  <span className="absolute right-3 top-3 w-2.5 h-2.5 rounded-full bg-brand-neon" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className={cn("py-6 border-t border-white/5 space-y-2", isSidebarOpen ? "px-4" : "px-3")}>
          <button className={cn(
            "w-full flex items-center text-white/40 hover:text-white text-xs font-bold rounded-xl hover:bg-white/5 transition-all",
            isSidebarOpen ? "gap-3 px-4 py-3" : "justify-center p-3"
          )}
          title={!isSidebarOpen ? "Support" : undefined}>
            <MessageSquare className={cn("shrink-0", isSidebarOpen ? "w-4 h-4" : "w-6 h-6")} /> 
            {isSidebarOpen && <span>Support</span>}
          </button>
          <Link to="/professionnel" className={cn(
            "w-full flex items-center text-white/40 hover:text-white text-xs font-bold rounded-xl hover:bg-white/5 transition-all",
            isSidebarOpen ? "gap-3 px-4 py-3" : "justify-center p-3"
          )}
          title={!isSidebarOpen ? "Quitter l'espace pro" : undefined}>
            <LogOut className={cn("shrink-0", isSidebarOpen ? "w-4 h-4" : "w-6 h-6")} /> 
            {isSidebarOpen && <span className="whitespace-nowrap">Quitter l'espace pro</span>}
          </Link>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="ml-32 md:ml-36 lg:ml-[7.5rem] flex-1 min-h-screen transition-all duration-300">

        {/* Top bar */}
        <div className="sticky top-0 z-30 bg-[#f4f4f0]/80 backdrop-blur-md border-b border-black/5 px-8 py-4 flex items-center justify-between">
          <div>
            <div className="text-xs text-gray-400 font-medium mb-0.5">Espace Entreprise</div>
            <div className="font-display font-bold text-lg text-brand-dark capitalize">
              {NAV_ITEMS.find(n => n.id === activeTab)?.label}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2.5 bg-white rounded-xl border border-black/5 hover:shadow-sm transition-all">
              <Bell className="w-4 h-4 text-gray-600" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-neon rounded-full text-[9px] font-bold text-brand-dark flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </button>
            <button className="px-4 py-2 bg-brand-dark text-white text-sm font-bold rounded-xl hover:bg-brand-neon hover:text-brand-dark transition-all">
              + Action rapide
            </button>
          </div>
        </div>

        <div className="p-8">
          <AnimatePresence mode="wait">

            {/* ─── VUE D'ENSEMBLE ─── */}
            {activeTab === 'overview' && (
              <motion.div key="overview" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-8">

                {/* Welcome banner */}
                <div className="bg-[#0a0a0a] rounded-[2rem] p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[300px] h-[200px] bg-brand-neon/5 blur-[80px]" />
                  </div>
                  <div className="relative z-10">
                    <div className="text-xs text-brand-neon font-bold mb-2 tracking-widest uppercase">Bienvenue</div>
                    <h2 className="font-display font-bold text-2xl md:text-3xl text-white mb-2">Bonjour, Tech Africa 👋</h2>
                    <p className="text-white/50 font-medium text-sm max-w-md">
                      Vous avez <span className="text-brand-neon font-bold">2 offres de financement</span> en attente de votre décision et 2 documents manquants pour compléter votre dossier.
                    </p>
                  </div>
                  <div className="flex gap-3 relative z-10">
                    <button
                      onClick={() => setActiveTab('financement')}
                      className="px-5 py-3 bg-brand-neon text-brand-dark font-bold rounded-xl text-sm hover:bg-white transition-colors flex items-center gap-2"
                    >
                      Voir les offres <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setActiveTab('documents')}
                      className="px-5 py-3 border border-white/20 text-white font-bold rounded-xl text-sm hover:bg-white/10 transition-colors"
                    >
                      Compléter docs
                    </button>
                  </div>
                </div>

                {/* KPIs */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                  {[
                    { label: 'Montant demandé', value: '195 M FCFA', sub: '3 dossiers actifs', icon: DollarSign, color: 'text-brand-green' },
                    { label: 'Offres reçues', value: '5', sub: '2 en attente de réponse', icon: Building2, color: 'text-blue-600' },
                    { label: 'Rating actuel', value: '—', sub: 'Non noté pour le moment', icon: Star, color: 'text-amber-500' },
                    { label: 'Crowdfunding', value: '61%', sub: '5,23M / 8,5M FCFA collectés', icon: Users, color: 'text-brand-neon' },
                  ].map((kpi, i) => {
                    const Icon = kpi.icon;
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.06 }}
                        className="bg-white rounded-[1.5rem] p-6 border border-black/5"
                      >
                        <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center mb-4 bg-gray-50')}>
                          <Icon className={cn('w-5 h-5', kpi.color)} />
                        </div>
                        <div className="font-display font-bold text-2xl text-brand-dark mb-1">{kpi.value}</div>
                        <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">{kpi.label}</div>
                        <div className="text-xs text-gray-400 font-medium">{kpi.sub}</div>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Setup checklist */}
                  <div className="bg-white rounded-[2rem] p-6 border border-black/5">
                    <div className="flex items-center gap-2 mb-6">
                      <Target className="w-4 h-4 text-brand-green" />
                      <h3 className="font-bold text-brand-dark">Configuration du compte</h3>
                    </div>
                    <div className="space-y-3">
                      {CHECKLIST.map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className={cn(
                            'w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0',
                            item.done ? 'bg-brand-neon' : 'bg-gray-100 border-2 border-dashed border-gray-200'
                          )}>
                            {item.done && <Check className="w-3.5 h-3.5 text-brand-dark" />}
                          </div>
                          <span className={cn('text-sm font-medium', item.done ? 'text-gray-600 line-through' : 'text-brand-dark font-bold')}>
                            {item.label}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 p-3 bg-amber-50 rounded-xl border border-amber-100">
                      <p className="text-xs text-amber-700 font-medium">
                        <span className="font-bold">3/4 complétés.</span> Demandez votre rating pour maximiser vos chances d'obtenir un financement.
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveTab('rating')}
                      className="mt-4 w-full py-2.5 bg-brand-dark text-white text-xs font-bold rounded-xl hover:bg-brand-neon hover:text-brand-dark transition-all"
                    >
                      Demander mon rating →
                    </button>
                  </div>

                  {/* Activité récente */}
                  <div className="lg:col-span-2 bg-white rounded-[2rem] p-6 border border-black/5">
                    <h3 className="font-bold text-brand-dark mb-6">Activité récente</h3>
                    <div className="space-y-4">
                      {[
                        { icon: Building2, color: 'bg-blue-50 text-blue-600', text: 'Ecobank Cameroun a soumis une offre pour "Achat équipements"', time: 'Il y a 2h', type: 'offre' },
                        { icon: CheckCircle, color: 'bg-emerald-50 text-emerald-600', text: 'Demande "Fonds de roulement Q2" finalisée avec Société Générale', time: 'Il y a 3 jours', type: 'finalise' },
                        { icon: Users, color: 'bg-brand-neon/20 text-brand-dark', text: '87 contributeurs ont rejoint votre campagne crowdfunding', time: 'Il y a 5 jours', type: 'crowd' },
                        { icon: FileText, color: 'bg-amber-50 text-amber-600', text: 'Statuts de la société en cours de vérification par notre équipe', time: 'Il y a 7 jours', type: 'doc' },
                      ].map((item, i) => {
                        const Icon = item.icon;
                        return (
                          <div key={i} className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                            <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0', item.color)}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-brand-dark leading-snug">{item.text}</p>
                              <span className="text-xs text-gray-400 font-medium">{item.time}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* IA Orientation */}
                <div className="bg-gradient-to-r from-[#0a0a0a] to-[#1b5e4c] rounded-[2rem] p-8 flex flex-col md:flex-row items-start md:items-center gap-6">
                  <div className="w-14 h-14 bg-brand-neon/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Zap className="w-7 h-7 text-brand-neon" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-brand-neon font-bold mb-2 tracking-widest uppercase">Orientation IA</div>
                    <h3 className="font-display font-bold text-xl text-white mb-2">Recommandations personnalisées pour Tech Africa</h3>
                    <p className="text-white/60 font-medium text-sm">
                      Basé sur votre profil (Technologie, PME, Douala), nous recommandons : <span className="text-white font-bold">Crédit investissement Ecobank (8,5%)</span>, <span className="text-white font-bold">FCP Harvest Obligataire</span> pour votre trésorerie, et un <span className="text-white font-bold">rating NKAP</span> pour renforcer votre crédibilité.
                    </p>
                  </div>
                  <button className="px-6 py-3 bg-brand-neon text-brand-dark font-bold rounded-xl text-sm hover:bg-white transition-colors flex items-center gap-2 whitespace-nowrap">
                    Voir mes recommandations <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ─── FINANCEMENT ─── */}
            {activeTab === 'financement' && (
              <motion.div key="financement" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-8">

                {/* Explainer */}
                <div className="bg-[#0a0a0a] rounded-[2rem] p-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-brand-neon/5 blur-[60px] pointer-events-none" />
                  <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
                    <div className="flex-1">
                      <div className="text-xs text-brand-neon font-bold mb-2 tracking-widest uppercase">MODULE 2 — Mise en relation</div>
                      <h2 className="font-display font-bold text-2xl text-white mb-2">Comment fonctionne l'accès au financement ?</h2>
                      <p className="text-white/50 font-medium text-sm max-w-xl">
                        Publiez votre besoin de financement (montant, durée, objet). Les banques, EMF et SDB partenaires consultent votre dossier et vous envoient des offres concrètes sous 48h.
                        Vous comparez, négociez et choisissez la meilleure offre — sans vous déplacer.
                      </p>
                    </div>
                    <button
                      onClick={() => { setShowDemandeModal(true); setFormStep(1); }}
                      className="px-6 py-3 bg-brand-neon text-brand-dark font-bold rounded-xl text-sm hover:bg-white transition-colors flex items-center gap-2 whitespace-nowrap"
                    >
                      <Plus className="w-4 h-4" /> Nouvelle demande
                    </button>
                  </div>
                </div>

                {/* KPIs financement */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {[
                    { label: 'Total demandé', value: '195 M FCFA', icon: TrendingUp },
                    { label: 'Offres reçues', value: '5', icon: Building2 },
                    { label: 'Montant financé', value: '25 M FCFA', icon: CheckCircle },
                  ].map((kpi, i) => {
                    const Icon = kpi.icon;
                    return (
                      <div key={i} className="bg-white rounded-2xl p-5 border border-black/5 flex items-center gap-4">
                        <div className="w-10 h-10 bg-brand-gray rounded-xl flex items-center justify-center">
                          <Icon className="w-5 h-5 text-brand-green" />
                        </div>
                        <div>
                          <div className="font-display font-bold text-xl text-brand-dark">{kpi.value}</div>
                          <div className="text-xs text-gray-400 font-medium">{kpi.label}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Mes demandes */}
                <div className="bg-white rounded-[2rem] border border-black/5">
                  <div className="p-6 border-b border-gray-50 flex items-center justify-between">
                    <h3 className="font-bold text-brand-dark">Mes demandes de financement</h3>
                    <span className="text-xs text-gray-400 font-medium">{DEMANDES.length} dossiers</span>
                  </div>
                  <div className="divide-y divide-gray-50">
                    {DEMANDES.map((d) => (
                      <div
                        key={d.id}
                        className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-gray-50/50 transition-colors cursor-pointer"
                        onClick={() => setSelectedDemande(selectedDemande?.id === d.id ? null : d)}
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <StatusBadge statut={d.statut} />
                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wide">{d.type}</span>
                            <span className="text-[10px] text-gray-400 font-medium">{d.date}</span>
                          </div>
                          <h4 className="font-bold text-brand-dark text-sm mb-1">{d.titre}</h4>
                          <p className="text-xs text-gray-500 font-medium line-clamp-1">{d.description}</p>
                        </div>
                        <div className="flex items-center gap-6 shrink-0">
                          <div className="text-right">
                            <div className="font-display font-bold text-lg text-brand-dark">{(d.montant / 1000000).toFixed(0)}M</div>
                            <div className="text-[10px] text-gray-400">FCFA</div>
                          </div>
                          <div className="text-center">
                            <div className="font-bold text-brand-dark">{d.offres}</div>
                            <div className="text-[10px] text-gray-400">offre{d.offres !== 1 ? 's' : ''}</div>
                          </div>
                          <ChevronDown className={cn('w-4 h-4 text-gray-400 transition-transform', selectedDemande?.id === d.id && 'rotate-180')} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Offres pour la demande sélectionnée */}
                {selectedDemande && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-[2rem] border border-black/5 p-6"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-bold text-brand-dark">Offres reçues — {selectedDemande.titre}</h3>
                      <button onClick={() => setSelectedDemande(null)}><X className="w-4 h-4 text-gray-400" /></button>
                    </div>

                    {OFFRES.filter(o => o.demandeId === selectedDemande.id).length === 0 ? (
                      <div className="text-center py-10">
                        <Clock className="w-10 h-10 text-gray-200 mx-auto mb-3" />
                        <p className="text-sm text-gray-400 font-medium">Aucune offre reçue pour le moment.</p>
                        <p className="text-xs text-gray-300 font-medium mt-1">Les institutions financières examinent votre dossier. Vous serez notifié dès qu'une offre arrive.</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {OFFRES.filter(o => o.demandeId === selectedDemande.id).map((offre) => (
                          <div key={offre.id} className="border border-black/5 rounded-2xl p-5">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center">
                                  <Building2 className="w-5 h-5 text-gray-400" />
                                </div>
                                <div>
                                  <div className="font-bold text-brand-dark text-sm">{offre.banque}</div>
                                  <div className="text-[10px] text-gray-400 font-bold">Note {offre.note}</div>
                                </div>
                              </div>
                              <OffreBadge statut={offre.statut} />
                            </div>
                            <div className="grid grid-cols-3 gap-3 mb-5">
                              <div className="bg-gray-50 rounded-xl p-3 text-center">
                                <div className="font-bold text-brand-dark text-sm">{offre.taux}</div>
                                <div className="text-[10px] text-gray-400">Taux / an</div>
                              </div>
                              <div className="bg-gray-50 rounded-xl p-3 text-center">
                                <div className="font-bold text-brand-dark text-sm">{offre.duree}</div>
                                <div className="text-[10px] text-gray-400">Durée</div>
                              </div>
                              <div className="bg-gray-50 rounded-xl p-3 text-center">
                                <div className="font-bold text-brand-dark text-sm">Std</div>
                                <div className="text-[10px] text-gray-400">Garanties</div>
                              </div>
                            </div>
                            {offre.statut === 'en-attente' && (
                              <div className="flex gap-2">
                                <button className="flex-1 py-2 bg-brand-neon text-brand-dark text-xs font-bold rounded-xl hover:bg-brand-dark hover:text-white transition-all">
                                  Accepter l'offre
                                </button>
                                <button className="flex-1 py-2 border border-gray-200 text-gray-600 text-xs font-bold rounded-xl hover:bg-gray-50 transition-all">
                                  Refuser
                                </button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* ─── RATING ─── */}
            {activeTab === 'rating' && (
              <motion.div key="rating" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-8">

                {/* Explainer */}
                <div className="bg-[#0a0a0a] rounded-[2rem] p-8 relative overflow-hidden">
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[300px] h-[200px] bg-brand-neon/5 blur-[80px]" />
                  </div>
                  <div className="relative z-10">
                    <div className="text-xs text-brand-neon font-bold mb-3 tracking-widest uppercase">MODULE 2 — Notation</div>
                    <h2 className="font-display font-bold text-2xl text-white mb-3">Qu'est-ce que le Rating d'entreprise ?</h2>
                    <p className="text-white/50 font-medium text-sm max-w-2xl leading-relaxed">
                      Le rating est une <span className="text-white font-bold">note de solvabilité</span> attribuée à votre entreprise après analyse de vos bilans,
                      de votre flux de trésorerie et de votre position sur le marché. Elle va de <span className="text-brand-neon font-bold">AAA</span> (excellente) à <span className="text-red-400 font-bold">D</span> (défaut).
                      Une bonne note vous permet d'accéder au crédit aux meilleurs taux et de rassurer vos partenaires.
                    </p>
                  </div>
                </div>

                {/* Scale */}
                <div className="bg-white rounded-[2rem] p-8 border border-black/5">
                  <h3 className="font-bold text-brand-dark mb-6">L'échelle de notation NKAP</h3>
                  <div className="space-y-3">
                    {RATING_SCALE.map((r, i) => (
                      <div key={i} className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                        <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center text-white font-display font-bold text-sm flex-shrink-0', r.color)}>
                          {r.note}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <span className="font-bold text-brand-dark text-sm">{r.label}</span>
                            <div className={cn('h-1.5 rounded-full flex-1 max-w-32', r.color, 'opacity-30')} />
                          </div>
                          <p className="text-xs text-gray-500 font-medium">{r.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Current rating / CTA */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-[2rem] p-8 border border-black/5 border-dashed text-center">
                    <div className="w-20 h-20 rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center mx-auto mb-6">
                      <Star className="w-8 h-8 text-gray-300" />
                    </div>
                    <h3 className="font-bold text-brand-dark mb-2">Aucun rating pour le moment</h3>
                    <p className="text-sm text-gray-400 font-medium mb-6">
                      Demandez votre rating NKAP pour renforcer votre crédibilité auprès des institutions financières et accéder à de meilleures conditions de crédit.
                    </p>
                    <button
                      onClick={() => { setShowRatingForm(true); setRatingStep(1); }}
                      className="px-6 py-3 bg-brand-dark text-white font-bold rounded-xl text-sm hover:bg-brand-neon hover:text-brand-dark transition-all flex items-center gap-2 mx-auto"
                    >
                      <Star className="w-4 h-4" /> Demander mon rating — 150 000 FCFA
                    </button>
                  </div>

                  <div className="bg-brand-neon rounded-[2rem] p-8">
                    <h3 className="font-bold text-brand-dark mb-4">Pourquoi obtenir un rating ?</h3>
                    <div className="space-y-3">
                      {[
                        "Accédez aux crédits aux meilleurs taux du marché",
                        "Rassurer vos partenaires et fournisseurs",
                        "Visible sur votre profil public NKAP",
                        "Renouvelable chaque année (tarif réduit)",
                        "Rapport détaillé de 15 pages fourni",
                      ].map((item, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="w-5 h-5 bg-brand-dark rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-brand-neon" />
                          </div>
                          <span className="text-sm font-medium text-brand-dark">{item}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 p-4 bg-brand-dark/10 rounded-xl">
                      <div className="text-xs font-bold text-brand-dark/70 mb-1">Délai de traitement</div>
                      <div className="font-bold text-brand-dark">5 jours ouvrés</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ─── CROWDFUNDING ─── */}
            {activeTab === 'crowdfunding' && (
              <motion.div key="crowdfunding" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-8">

                {/* Explainer */}
                <div className="bg-[#0a0a0a] rounded-[2rem] p-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-brand-neon/5 blur-[60px] pointer-events-none" />
                  <div className="relative z-10">
                    <div className="text-xs text-brand-neon font-bold mb-3 tracking-widest uppercase">MODULE 2 — Financement participatif</div>
                    <h2 className="font-display font-bold text-2xl text-white mb-4">Crowdfunding : deux modèles à votre disposition</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                        <div className="text-brand-neon font-bold text-sm mb-2">Don avec récompense (Reward)</div>
                        <p className="text-white/50 text-sm font-medium leading-relaxed">
                          Le public finance votre projet en échange d'une contrepartie (le produit fini, un bon d'achat, une expérience exclusive).
                          Idéal pour les projets commerciaux, artisanaux ou culturels.
                        </p>
                        <div className="mt-3 text-[10px] text-brand-neon font-bold">Commission NKAP : 3% si objectif atteint</div>
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                        <div className="text-brand-neon font-bold text-sm mb-2">Prêt participatif (Crowdlending)</div>
                        <p className="text-white/50 text-sm font-medium leading-relaxed">
                          Des particuliers vous prêtent de l'argent. Vous remboursez le capital avec des intérêts selon un calendrier défini.
                          Idéal pour les besoins de trésorerie ou d'investissement structurés.
                        </p>
                        <div className="mt-3 text-[10px] text-brand-neon font-bold">Commission NKAP : 3% si objectif atteint</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Campagne active */}
                <div className="bg-white rounded-[2rem] p-8 border border-black/5">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-brand-dark">Campagne active</h3>
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-full flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                      En cours
                    </span>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">{CROWDFUNDING_ACTIVE.type}</span>
                      <h4 className="font-display font-bold text-xl text-brand-dark mt-1 mb-3">{CROWDFUNDING_ACTIVE.titre}</h4>
                      <p className="text-sm text-gray-500 font-medium mb-6">{CROWDFUNDING_ACTIVE.description}</p>
                      <div className="mb-3 flex items-center justify-between">
                        <span className="font-display font-bold text-2xl text-brand-dark">
                          {(CROWDFUNDING_ACTIVE.collecte / 1000000).toFixed(2)}M FCFA
                        </span>
                        <span className="text-sm font-bold text-brand-neon">{pct}%</span>
                      </div>
                      <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden mb-3">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 1, ease: 'easeOut' }}
                          className="h-full bg-brand-neon rounded-full"
                        />
                      </div>
                      <div className="text-xs text-gray-400 font-medium">
                        sur {(CROWDFUNDING_ACTIVE.objectif / 1000000).toFixed(1)}M FCFA objectif
                      </div>
                    </div>
                    <div className="space-y-4">
                      {[
                        { label: 'Contributeurs', value: CROWDFUNDING_ACTIVE.contributeurs, suffix: '' },
                        { label: 'Jours restants', value: CROWDFUNDING_ACTIVE.joursRestants, suffix: 'j' },
                        { label: 'Reste à collecter', value: Math.round((CROWDFUNDING_ACTIVE.objectif - CROWDFUNDING_ACTIVE.collecte) / 1000), suffix: ' k FCFA' },
                      ].map((s, i) => (
                        <div key={i} className="bg-brand-gray rounded-2xl p-4">
                          <div className="font-display font-bold text-2xl text-brand-dark">{s.value}{s.suffix}</div>
                          <div className="text-xs text-gray-400 font-medium">{s.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3 mt-6">
                    <button className="px-5 py-2.5 bg-brand-dark text-white text-xs font-bold rounded-xl hover:bg-brand-neon hover:text-brand-dark transition-all flex items-center gap-2">
                      <BarChart2 className="w-3.5 h-3.5" /> Voir les statistiques
                    </button>
                    <button className="px-5 py-2.5 border border-gray-200 text-gray-600 text-xs font-bold rounded-xl hover:bg-gray-50 transition-all">
                      Partager la campagne
                    </button>
                    <button className="px-5 py-2.5 border border-gray-200 text-gray-600 text-xs font-bold rounded-xl hover:bg-gray-50 transition-all flex items-center gap-2">
                      <Edit3 className="w-3.5 h-3.5" /> Modifier
                    </button>
                  </div>
                </div>

                {/* Nouvelle campagne */}
                <div className="bg-white rounded-[2rem] p-8 border border-black/5">
                  <h3 className="font-bold text-brand-dark mb-2">Lancer une nouvelle campagne</h3>
                  <p className="text-sm text-gray-400 font-medium mb-6">Choisissez d'abord le type de financement participatif qui correspond à votre projet.</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {[
                      { id: 'don', label: 'Don avec récompense', desc: "Je propose une contrepartie (produit, service, expérience) en échange des dons.", icon: Users },
                      { id: 'pret', label: 'Prêt participatif', desc: "Je m'engage à rembourser les prêteurs avec des intérêts selon un calendrier.", icon: TrendingUp },
                    ].map((t) => {
                      const Icon = t.icon;
                      return (
                        <button
                          key={t.id}
                          onClick={() => setCrowdType(t.id as 'don' | 'pret')}
                          className={cn(
                            'text-left p-5 rounded-2xl border-2 transition-all',
                            crowdType === t.id
                              ? 'border-brand-neon bg-brand-neon/5'
                              : 'border-gray-100 hover:border-gray-200'
                          )}
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <Icon className={cn('w-5 h-5', crowdType === t.id ? 'text-brand-green' : 'text-gray-400')} />
                            <span className="font-bold text-brand-dark text-sm">{t.label}</span>
                            {crowdType === t.id && <Check className="w-4 h-4 text-brand-neon ml-auto" />}
                          </div>
                          <p className="text-xs text-gray-500 font-medium">{t.desc}</p>
                        </button>
                      );
                    })}
                  </div>
                  <button
                    onClick={() => { setShowCrowdForm(true); setCrowdStep(1); }}
                    className="px-6 py-3 bg-brand-dark text-white font-bold rounded-xl text-sm hover:bg-brand-neon hover:text-brand-dark transition-all flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" /> Créer ma campagne — {crowdType === 'don' ? 'Don/Récompense' : 'Prêt participatif'}
                  </button>
                </div>
              </motion.div>
            )}

            {/* ─── DOCUMENTS ─── */}
            {activeTab === 'documents' && (
              <motion.div key="documents" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-8">

                <div className="bg-[#0a0a0a] rounded-[2rem] p-8">
                  <div className="text-xs text-brand-neon font-bold mb-3 tracking-widest uppercase">Documents & KYC</div>
                  <h2 className="font-display font-bold text-2xl text-white mb-2">Coffre-fort documentaire sécurisé</h2>
                  <p className="text-white/50 font-medium text-sm max-w-2xl">
                    Centralisez vos documents financiers et légaux. Ils sont chiffrés (AES-256), accessibles uniquement par vous
                    et partagés avec les institutions uniquement avec votre accord explicite.
                  </p>
                </div>

                {/* Progress */}
                <div className="bg-white rounded-[2rem] p-6 border border-black/5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-brand-dark">Complétude du dossier</h3>
                    <span className="font-bold text-brand-dark">4/6 documents</span>
                  </div>
                  <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden mb-2">
                    <div className="h-full bg-brand-neon rounded-full" style={{ width: '66%' }} />
                  </div>
                  <p className="text-xs text-gray-400 font-medium">2 documents manquants. Un dossier complet augmente vos chances d'obtenir un financement.</p>
                </div>

                {/* Upload zone */}
                <div className="bg-white rounded-[2rem] p-8 border border-black/5 border-dashed">
                  <div className="text-center">
                    <div className="w-14 h-14 bg-brand-gray rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Upload className="w-7 h-7 text-gray-400" />
                    </div>
                    <h3 className="font-bold text-brand-dark mb-2">Déposer un nouveau document</h3>
                    <p className="text-sm text-gray-400 font-medium mb-4">PDF, JPG, PNG — max 10 Mo par fichier</p>
                    <button className="px-6 py-3 bg-brand-dark text-white font-bold rounded-xl text-sm hover:bg-brand-neon hover:text-brand-dark transition-all">
                      Sélectionner un fichier
                    </button>
                  </div>
                </div>

                {/* Documents list */}
                <div className="bg-white rounded-[2rem] border border-black/5">
                  <div className="p-6 border-b border-gray-50">
                    <h3 className="font-bold text-brand-dark">Mes documents</h3>
                  </div>
                  <div className="divide-y divide-gray-50">
                    {DOCUMENTS.map((doc, i) => (
                      <div key={i} className="p-5 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4 min-w-0">
                          <div className={cn(
                            'w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0',
                            doc.statut === 'valide' ? 'bg-emerald-50' : doc.statut === 'en-attente' ? 'bg-amber-50' : 'bg-red-50'
                          )}>
                            <FileText className={cn(
                              'w-5 h-5',
                              doc.statut === 'valide' ? 'text-emerald-600' : doc.statut === 'en-attente' ? 'text-amber-600' : 'text-red-400'
                            )} />
                          </div>
                          <div className="min-w-0">
                            <div className="font-bold text-brand-dark text-sm truncate">{doc.nom}</div>
                            <div className="text-xs text-gray-400 font-medium">{doc.type}{doc.taille && ` • ${doc.taille}`}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          {doc.statut === 'valide' && (
                            <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-full flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" /> Validé
                            </span>
                          )}
                          {doc.statut === 'en-attente' && (
                            <span className="px-2.5 py-1 bg-amber-50 text-amber-700 text-[10px] font-bold rounded-full flex items-center gap-1">
                              <Clock className="w-3 h-3" /> En vérification
                            </span>
                          )}
                          {doc.statut === 'manquant' && (
                            <button className="px-2.5 py-1 bg-brand-dark text-white text-[10px] font-bold rounded-full flex items-center gap-1 hover:bg-brand-neon hover:text-brand-dark transition-all">
                              <Upload className="w-3 h-3" /> Déposer
                            </button>
                          )}
                          {doc.statut !== 'manquant' && (
                            <>
                              <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                                <Download className="w-3.5 h-3.5 text-gray-400" />
                              </button>
                              <button className="p-1.5 hover:bg-red-50 rounded-lg transition-colors">
                                <Trash2 className="w-3.5 h-3.5 text-gray-300 hover:text-red-400" />
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ─── PROFIL ─── */}
            {activeTab === 'profil' && (
              <motion.div key="profil" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-8">
                <div className="bg-[#0a0a0a] rounded-[2rem] p-8">
                  <div className="text-xs text-brand-neon font-bold mb-3 tracking-widest uppercase">Profil entreprise</div>
                  <h2 className="font-display font-bold text-2xl text-white mb-2">Votre profil public NKAP</h2>
                  <p className="text-white/50 font-medium text-sm max-w-xl">
                    Ce profil est visible par les institutions financières partenaires lorsqu'elles examinent vos demandes de financement. Complétez-le pour maximiser vos chances.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Form */}
                  <div className="lg:col-span-2 bg-white rounded-[2rem] p-8 border border-black/5">
                    <h3 className="font-bold text-brand-dark mb-6">Informations de l'entreprise</h3>
                    <div className="space-y-5">
                      {[
                        { label: 'Dénomination sociale', placeholder: 'Tech Africa SARL', value: 'Tech Africa SARL' },
                        { label: 'Secteur d\'activité', placeholder: 'Technologie & Digital', value: 'Technologie & Digital' },
                        { label: 'Forme juridique', placeholder: 'SARL', value: 'SARL' },
                        { label: 'Capital social (FCFA)', placeholder: '10 000 000', value: '10 000 000' },
                        { label: 'Numéro RC (Registre de Commerce)', placeholder: 'RC/DLA/2020/B/12345', value: 'RC/DLA/2020/B/12345' },
                        { label: 'Ville du siège social', placeholder: 'Douala', value: 'Douala' },
                      ].map((field, i) => (
                        <div key={i}>
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">{field.label}</label>
                          <input
                            type="text"
                            defaultValue={field.value}
                            placeholder={field.placeholder}
                            className="w-full px-4 py-3 bg-brand-gray border border-transparent rounded-xl text-sm font-medium text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-neon/30 focus:border-brand-neon/50 transition-all"
                          />
                        </div>
                      ))}
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Description de l'activité</label>
                        <textarea
                          rows={4}
                          defaultValue="Nous développons des solutions logicielles pour les PME camerounaises : ERP, applications mobiles et outils de gestion financière."
                          className="w-full px-4 py-3 bg-brand-gray border border-transparent rounded-xl text-sm font-medium text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-neon/30 focus:border-brand-neon/50 transition-all resize-none"
                        />
                      </div>
                      <button className="px-6 py-3 bg-brand-dark text-white font-bold rounded-xl text-sm hover:bg-brand-neon hover:text-brand-dark transition-all flex items-center gap-2">
                        <Check className="w-4 h-4" /> Sauvegarder les modifications
                      </button>
                    </div>
                  </div>

                  {/* Profile preview */}
                  <div className="space-y-5">
                    <div className="bg-white rounded-[2rem] p-6 border border-black/5">
                      <h4 className="font-bold text-brand-dark text-sm mb-4">Aperçu profil public</h4>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-14 h-14 bg-brand-dark rounded-2xl flex items-center justify-center font-display font-bold text-brand-neon text-2xl">
                          T
                        </div>
                        <div>
                          <div className="font-bold text-brand-dark">Tech Africa SARL</div>
                          <div className="text-xs text-gray-500 font-medium">Technologie • Douala</div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400 font-medium">Forme juridique</span>
                          <span className="font-bold text-brand-dark">SARL</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400 font-medium">Capital</span>
                          <span className="font-bold text-brand-dark">10M FCFA</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400 font-medium">Statut KYC</span>
                          <span className="font-bold text-amber-600">En cours</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400 font-medium">Rating</span>
                          <span className="font-bold text-gray-400">—</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4">
                      <div className="flex items-start gap-3">
                        <Info className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-amber-700 font-medium leading-relaxed">
                          Votre KYC est en cours de vérification. Une fois validé, votre profil sera visible par les institutions partenaires.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* ─── MODAL : NOUVELLE DEMANDE DE FINANCEMENT ─── */}
      <AnimatePresence>
        {showDemandeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={(e) => e.target === e.currentTarget && setShowDemandeModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-[2rem] w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              {/* Modal header */}
              <div className="p-8 border-b border-gray-50 flex items-center justify-between">
                <div>
                  <div className="text-xs text-brand-green font-bold uppercase tracking-widest mb-1">Étape {formStep}/3</div>
                  <h2 className="font-display font-bold text-xl text-brand-dark">
                    {formStep === 1 && 'Décrivez votre besoin'}
                    {formStep === 2 && 'Conditions souhaitées'}
                    {formStep === 3 && 'Documents & Validation'}
                  </h2>
                </div>
                <button onClick={() => setShowDemandeModal(false)} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* Progress bar */}
              <div className="px-8 py-4">
                <div className="flex gap-2 mb-6">
                  {[1, 2, 3].map((s) => (
                    <div
                      key={s}
                      className={cn(
                        'flex-1 h-1.5 rounded-full transition-all',
                        s <= formStep ? 'bg-brand-neon' : 'bg-gray-100'
                      )}
                    />
                  ))}
                </div>

                {/* Step 1 */}
                {formStep === 1 && (
                  <div className="space-y-5">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Titre de la demande *</label>
                      <input
                        type="text"
                        value={formDemande.titre}
                        onChange={e => setFormDemande(f => ({ ...f, titre: e.target.value }))}
                        placeholder="Ex: Acquisition de matériel de production"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-neon/30 focus:border-brand-neon/50 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Type de financement *</label>
                      <div className="grid grid-cols-2 gap-3">
                        {['Crédit court terme', 'Crédit moyen terme', 'Co-financement', 'Appel d\'offres'].map((t) => (
                          <button
                            key={t}
                            onClick={() => setFormDemande(f => ({ ...f, type: t }))}
                            className={cn(
                              'p-3 rounded-xl border-2 text-sm font-bold text-left transition-all',
                              formDemande.type === t ? 'border-brand-neon bg-brand-neon/5 text-brand-dark' : 'border-gray-100 text-gray-500 hover:border-gray-200'
                            )}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Description détaillée *</label>
                      <textarea
                        rows={4}
                        value={formDemande.description}
                        onChange={e => setFormDemande(f => ({ ...f, description: e.target.value }))}
                        placeholder="Expliquez l'objet du financement, l'impact attendu sur votre activité..."
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-neon/30 resize-none transition-all"
                      />
                    </div>
                  </div>
                )}

                {/* Step 2 */}
                {formStep === 2 && (
                  <div className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Montant souhaité (FCFA) *</label>
                        <input
                          type="number"
                          value={formDemande.montant}
                          onChange={e => setFormDemande(f => ({ ...f, montant: e.target.value }))}
                          placeholder="50000000"
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-neon/30 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Durée souhaitée</label>
                        <select
                          value={formDemande.duree}
                          onChange={e => setFormDemande(f => ({ ...f, duree: e.target.value }))}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-neon/30 transition-all bg-white"
                        >
                          <option value="">Sélectionner</option>
                          <option>3 à 12 mois</option>
                          <option>12 à 36 mois</option>
                          <option>36 à 60 mois</option>
                          <option>Plus de 5 ans</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Garanties disponibles</label>
                      <div className="grid grid-cols-2 gap-2">
                        {['Hypothèque immobilière', 'Nantissement équipements', 'Caution personnelle', 'Aucune garantie'].map((g) => (
                          <button
                            key={g}
                            onClick={() => setFormDemande(f => ({ ...f, garanties: g }))}
                            className={cn(
                              'p-3 rounded-xl border-2 text-xs font-bold text-left transition-all',
                              formDemande.garanties === g ? 'border-brand-neon bg-brand-neon/5 text-brand-dark' : 'border-gray-100 text-gray-500 hover:border-gray-200'
                            )}
                          >
                            {g}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl">
                      <div className="flex items-start gap-3">
                        <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-blue-700 font-medium">
                          Plus votre description est précise, plus les institutions pourront vous faire des offres adaptées et compétitives.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3 */}
                {formStep === 3 && (
                  <div className="space-y-5">
                    <div className="p-5 bg-brand-gray rounded-2xl">
                      <h4 className="font-bold text-brand-dark text-sm mb-3">Récapitulatif de la demande</h4>
                      <div className="space-y-2">
                        {[
                          { label: 'Titre', value: formDemande.titre || '—' },
                          { label: 'Type', value: formDemande.type || '—' },
                          { label: 'Montant', value: formDemande.montant ? `${parseInt(formDemande.montant).toLocaleString()} FCFA` : '—' },
                          { label: 'Durée', value: formDemande.duree || '—' },
                          { label: 'Garanties', value: formDemande.garanties || '—' },
                        ].map((item, i) => (
                          <div key={i} className="flex justify-between text-sm">
                            <span className="text-gray-400 font-medium">{item.label}</span>
                            <span className="font-bold text-brand-dark">{item.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-amber-700 font-medium">
                          En publiant cette demande, vous acceptez que les institutions financières partenaires de NKAP puissent consulter votre dossier et vous contacter avec des offres de financement.
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setShowDemandeModal(false);
                        setFormDemande(formDemandeDefault);
                        setFormStep(1);
                      }}
                      className="w-full py-4 bg-brand-neon text-brand-dark font-bold rounded-xl hover:bg-brand-dark hover:text-white transition-all flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" /> Publier ma demande de financement
                    </button>
                  </div>
                )}
              </div>

              {/* Modal footer */}
              <div className="p-8 pt-4 flex justify-between">
                <button
                  onClick={() => formStep > 1 ? setFormStep(s => s - 1) : setShowDemandeModal(false)}
                  className="px-5 py-2.5 border border-gray-200 text-gray-600 font-bold rounded-xl text-sm hover:bg-gray-50 transition-all"
                >
                  {formStep > 1 ? '← Retour' : 'Annuler'}
                </button>
                {formStep < 3 && (
                  <button
                    onClick={() => setFormStep(s => s + 1)}
                    disabled={formStep === 1 && (!formDemande.titre || !formDemande.type)}
                    className="px-5 py-2.5 bg-brand-dark text-white font-bold rounded-xl text-sm hover:bg-brand-neon hover:text-brand-dark transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Continuer →
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── MODAL : DEMANDE DE RATING ─── */}
      <AnimatePresence>
        {showRatingForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={(e) => e.target === e.currentTarget && setShowRatingForm(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-[2rem] w-full max-w-lg"
            >
              <div className="p-8 border-b border-gray-50 flex items-center justify-between">
                <div>
                  <div className="text-xs text-brand-green font-bold uppercase tracking-widest mb-1">Étape {ratingStep}/2</div>
                  <h2 className="font-display font-bold text-xl text-brand-dark">
                    {ratingStep === 1 ? 'Données financières' : 'Confirmation & Paiement'}
                  </h2>
                </div>
                <button onClick={() => setShowRatingForm(false)} className="p-2 hover:bg-gray-100 rounded-xl">
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              <div className="p-8 space-y-5">
                {ratingStep === 1 ? (
                  <>
                    <p className="text-sm text-gray-500 font-medium">Renseignez vos indicateurs financiers des 3 dernières années. Ces données sont confidentielles et utilisées uniquement pour le calcul de votre note.</p>
                    {[
                      { label: "Chiffre d'affaires 2024 (FCFA)", placeholder: "Ex: 350 000 000" },
                      { label: "Résultat net 2024 (FCFA)", placeholder: "Ex: 28 000 000" },
                      { label: "Total bilan 2024 (FCFA)", placeholder: "Ex: 180 000 000" },
                      { label: "Dettes financières 2024 (FCFA)", placeholder: "Ex: 45 000 000" },
                    ].map((f, i) => (
                      <div key={i}>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">{f.label}</label>
                        <input
                          type="number"
                          placeholder={f.placeholder}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-neon/30 transition-all"
                        />
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    <div className="p-5 bg-brand-gray rounded-2xl">
                      <h4 className="font-bold text-brand-dark text-sm mb-3">Détail des frais</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Frais de dossier rating</span>
                          <span className="font-bold">150 000 FCFA</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Délai de traitement</span>
                          <span className="font-bold">5 jours ouvrés</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Rapport inclus</span>
                          <span className="font-bold text-emerald-600">15 pages</span>
                        </div>
                        <div className="border-t border-gray-200 mt-3 pt-3 flex justify-between">
                          <span className="font-bold text-brand-dark">Total à payer</span>
                          <span className="font-display font-bold text-lg text-brand-dark">150 000 FCFA</span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <button className="p-4 border-2 border-gray-200 rounded-xl hover:border-brand-neon text-sm font-bold transition-all">
                        📱 Mobile Money
                      </button>
                      <button className="p-4 border-2 border-gray-200 rounded-xl hover:border-brand-neon text-sm font-bold transition-all">
                        💳 Carte bancaire
                      </button>
                    </div>
                    <button
                      onClick={() => setShowRatingForm(false)}
                      className="w-full py-4 bg-brand-neon text-brand-dark font-bold rounded-xl hover:bg-brand-dark hover:text-white transition-all"
                    >
                      Payer & Soumettre mon dossier
                    </button>
                  </>
                )}
              </div>

              {ratingStep === 1 && (
                <div className="px-8 pb-8 flex justify-between">
                  <button onClick={() => setShowRatingForm(false)} className="px-5 py-2.5 border border-gray-200 text-gray-600 font-bold rounded-xl text-sm">Annuler</button>
                  <button onClick={() => setRatingStep(2)} className="px-5 py-2.5 bg-brand-dark text-white font-bold rounded-xl text-sm hover:bg-brand-neon hover:text-brand-dark transition-all">
                    Continuer →
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── MODAL : NOUVELLE CAMPAGNE CROWDFUNDING ─── */}
      <AnimatePresence>
        {showCrowdForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={(e) => e.target === e.currentTarget && setShowCrowdForm(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-[2rem] w-full max-w-xl max-h-[90vh] overflow-y-auto"
            >
              <div className="p-8 border-b border-gray-50 flex items-center justify-between">
                <div>
                  <div className="text-xs text-brand-green font-bold uppercase tracking-widest mb-1">Étape {crowdStep}/3</div>
                  <h2 className="font-display font-bold text-xl text-brand-dark">
                    {crowdStep === 1 && 'Présentation du projet'}
                    {crowdStep === 2 && 'Objectif & Durée'}
                    {crowdStep === 3 && 'Contreparties & Lancement'}
                  </h2>
                </div>
                <button onClick={() => setShowCrowdForm(false)} className="p-2 hover:bg-gray-100 rounded-xl">
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              <div className="p-8 space-y-5">
                {crowdStep === 1 && (
                  <>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Titre de la campagne *</label>
                      <input type="text" placeholder="Ex: NKAP Boulangers — Pack machines boulangerie" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-neon/30 transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Description du projet *</label>
                      <textarea rows={4} placeholder="Racontez votre projet, son impact, pourquoi vous avez besoin de financement..." className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-neon/30 resize-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Catégorie</label>
                      <div className="grid grid-cols-3 gap-2">
                        {['Agriculture', 'Commerce', 'Technologie', 'Artisanat', 'Services', 'Industrie'].map((c) => (
                          <button key={c} className="p-2.5 border border-gray-100 rounded-xl text-xs font-bold text-gray-500 hover:border-brand-neon hover:text-brand-dark transition-all">{c}</button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
                {crowdStep === 2 && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Objectif (FCFA) *</label>
                        <input type="number" placeholder="Ex: 5 000 000" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-neon/30 transition-all" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Durée de la campagne</label>
                        <select className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-medium bg-white focus:outline-none focus:ring-2 focus:ring-brand-neon/30 transition-all">
                          <option>15 jours</option>
                          <option>30 jours</option>
                          <option>45 jours</option>
                          <option>60 jours</option>
                        </select>
                      </div>
                    </div>
                    {crowdType === 'pret' && (
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Taux d'intérêt annuel (%)</label>
                          <input type="number" placeholder="Ex: 8" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-neon/30 transition-all" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Durée de remboursement</label>
                          <select className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-medium bg-white focus:outline-none focus:ring-2 focus:ring-brand-neon/30 transition-all">
                            <option>12 mois</option>
                            <option>24 mois</option>
                            <option>36 mois</option>
                          </select>
                        </div>
                      </div>
                    )}
                    <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl">
                      <p className="text-xs text-amber-700 font-medium">
                        <span className="font-bold">Modèle tout-ou-rien :</span> Les fonds ne sont débloqués que si l'objectif est atteint à 100% à la fin de la campagne.
                      </p>
                    </div>
                  </>
                )}
                {crowdStep === 3 && (
                  <>
                    {crowdType === 'don' && (
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Contreparties proposées</label>
                        <div className="space-y-3">
                          {[
                            { montant: '2 000 FCFA', label: 'Merci personnalisé + badge "Bienfaiteur"' },
                            { montant: '10 000 FCFA', label: 'Bon de réduction de 15% sur vos produits/services' },
                            { montant: '50 000 FCFA', label: 'Produit/service offert + mention sur notre communication' },
                          ].map((c, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 border border-gray-100 rounded-xl">
                              <div className="w-8 h-8 bg-brand-neon/20 rounded-lg flex items-center justify-center text-xs font-bold text-brand-dark flex-shrink-0">{i + 1}</div>
                              <div>
                                <div className="text-xs font-bold text-brand-dark">À partir de {c.montant}</div>
                                <div className="text-xs text-gray-500 font-medium">{c.label}</div>
                              </div>
                              <Edit3 className="w-3.5 h-3.5 text-gray-300 ml-auto cursor-pointer" />
                            </div>
                          ))}
                          <button className="w-full p-3 border border-dashed border-gray-200 rounded-xl text-xs font-bold text-gray-400 hover:border-gray-300 transition-all">
                            + Ajouter une contrepartie
                          </button>
                        </div>
                      </div>
                    )}
                    <div className="p-5 bg-brand-neon/10 border border-brand-neon/20 rounded-2xl">
                      <div className="text-xs font-bold text-brand-dark uppercase tracking-wide mb-3">Commission NKAP</div>
                      <p className="text-sm text-brand-dark/70 font-medium">
                        NKAP prélève <span className="font-bold text-brand-dark">3%</span> du montant total collecté, uniquement si votre objectif est atteint.
                        Aucun frais si la campagne échoue.
                      </p>
                    </div>
                    <button
                      onClick={() => setShowCrowdForm(false)}
                      className="w-full py-4 bg-brand-neon text-brand-dark font-bold rounded-xl hover:bg-brand-dark hover:text-white transition-all flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" /> Lancer ma campagne
                    </button>
                  </>
                )}
              </div>

              {crowdStep < 3 && (
                <div className="px-8 pb-8 flex justify-between">
                  <button onClick={() => crowdStep > 1 ? setCrowdStep(s => s - 1) : setShowCrowdForm(false)} className="px-5 py-2.5 border border-gray-200 text-gray-600 font-bold rounded-xl text-sm">
                    {crowdStep > 1 ? '← Retour' : 'Annuler'}
                  </button>
                  <button onClick={() => setCrowdStep(s => s + 1)} className="px-5 py-2.5 bg-brand-dark text-white font-bold rounded-xl text-sm hover:bg-brand-neon hover:text-brand-dark transition-all">
                    Continuer →
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
