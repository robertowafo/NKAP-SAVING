import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Hexagon, Home, Building2, Leaf, TrendingUp, Lock, Info, Shield, Coins, ShieldCheck } from 'lucide-react';
import { cn } from '../../lib/utils';

const PROJECTS = [
  {
    name: 'Résidence Les Palmiers – Douala',
    type: 'Immobilier résidentiel',
    localisation: 'Douala, Bonabéri',
    rendement: '8.5%',
    montantTotal: '500 000 000 FCFA',
    tokens: '50 000 tokens',
    prixToken: '10 000 FCFA',
    disponibles: '12 430 tokens',
    icon: Home,
    color: 'bg-[#e5f0ff]',
    progress: 75,
    statut: 'En cours',
    halal: false,
  },
  {
    name: 'Entrepôt Commercial – Yaoundé',
    type: 'Immobilier commercial',
    localisation: 'Yaoundé, Mvan',
    rendement: '10.2%',
    montantTotal: '300 000 000 FCFA',
    tokens: '30 000 tokens',
    prixToken: '10 000 FCFA',
    disponibles: '8 200 tokens',
    icon: Building2,
    color: 'bg-[#fff4e5]',
    progress: 53,
    statut: 'En cours',
    halal: false,
  },
  {
    name: 'Plantation Agropastorale – Kribi',
    type: 'Agro-industrie',
    localisation: 'Kribi, Sud Cameroun',
    rendement: '12.0%',
    montantTotal: '200 000 000 FCFA',
    tokens: '20 000 tokens',
    prixToken: '10 000 FCFA',
    disponibles: '19 800 tokens',
    icon: Leaf,
    color: 'bg-[#e5fff4]',
    progress: 1,
    statut: 'Nouveau',
    halal: true,
  },
];

export default function TokenisationPage() {
  return (
    <div className="flex flex-col min-h-screen bg-brand-gray">

      {/* HERO */}
      <section className="bg-[#0a0a0a] text-white px-4 sm:px-6 lg:px-8 pt-16 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-brand-neon/10 rounded-full blur-[100px]"></div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <Link to="/investir" className="inline-flex items-center gap-2 text-white/50 text-sm font-bold mb-8 hover:text-white transition-colors">
            ← Retour aux investissements
          </Link>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold text-brand-neon tracking-widest uppercase mb-4 block">Tokenisation d'actifs — Blockchain Polygon</span>
              <h1 className="font-display font-bold text-5xl md:text-6xl tracking-tighter leading-tight mb-6">
                L'immobilier africain<br />
                <span className="text-brand-neon">dès 10 000 FCFA</span>
              </h1>
              <p className="text-white/60 text-lg font-medium leading-relaxed mb-8">
                Investissez dans des biens immobiliers et des projets agricoles en Afrique Centrale. Chaque token représente une fraction de propriété sécurisée sur la blockchain Polygon.
              </p>
              <div className="flex flex-wrap gap-3">
                {['Blockchain Polygon (EVM)', 'Smart contracts Solidity', 'Revenus mensuels auto', 'Tokens échangeables'].map((tag, i) => (
                  <span key={i} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold">{tag}</span>
                ))}
              </div>
            </div>

            {/* Explanation block */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-[#141517] rounded-[2rem] p-8 border border-white/5"
            >
              <div className="flex items-center gap-3 mb-6">
                <Hexagon className="w-8 h-8 text-brand-neon" />
                <h3 className="font-display font-bold text-xl text-white">Exemple concret</h3>
              </div>
              <div className="space-y-4">
                <div className="bg-white/5 rounded-2xl p-4">
                  <p className="text-white/60 text-sm mb-2">Un immeuble vaut :</p>
                  <p className="text-white font-bold text-2xl">500 000 000 FCFA</p>
                </div>
                <div className="flex gap-3">
                  <div className="bg-white/5 rounded-2xl p-4 flex-1">
                    <p className="text-white/60 text-xs mb-1">Tokens créés</p>
                    <p className="text-brand-neon font-bold text-lg">50 000</p>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-4 flex-1">
                    <p className="text-white/60 text-xs mb-1">Prix par token</p>
                    <p className="text-white font-bold text-lg">10 000 XAF</p>
                  </div>
                </div>
                <div className="bg-brand-neon/10 border border-brand-neon/20 rounded-2xl p-4">
                  <p className="text-brand-neon text-xs font-bold mb-1">Avec 50 000 FCFA (5 tokens)</p>
                  <p className="text-white font-bold">Vous percevez 0.01% des loyers</p>
                  <p className="text-white/60 text-xs mt-1">Distribués automatiquement chaque mois via smart contract</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PROJETS */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-10">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-brand-dark">Projets disponibles</h2>
            <span className="text-sm font-bold text-gray-500">{PROJECTS.length} projets actifs</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PROJECTS.map((project, i) => {
              const Icon = project.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className={cn("rounded-[2rem] p-8 border-2 border-transparent hover:border-brand-neon/30 hover:-translate-y-2 transition-all cursor-pointer group", project.color)}
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                      <Icon className="w-6 h-6 text-brand-dark" />
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className={cn(
                        "text-[10px] font-bold px-3 py-1 rounded-full",
                        project.statut === 'Nouveau' ? 'bg-brand-neon text-brand-dark' : 'bg-white text-brand-dark'
                      )}>
                        {project.statut}
                      </span>
                      {project.halal && (
                        <Link
                          to="/finance-islamique/sukuk"
                          className="inline-flex items-center gap-1 text-[9px] font-bold bg-[#1A7A4A] text-white px-2 py-0.5 rounded-full hover:bg-[#1A7A4A]/80 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ShieldCheck className="w-2.5 h-2.5" /> Sukuk Halal dispo
                        </Link>
                      )}
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-xl text-brand-dark mb-1 group-hover:text-brand-green transition-colors">{project.name}</h3>
                  <p className="text-xs text-gray-500 font-medium mb-5">{project.localisation} • {project.type}</p>

                  <div className="grid grid-cols-2 gap-3 mb-5">
                    <div className="bg-white/60 rounded-xl p-3">
                      <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">Rendement</p>
                      <p className="font-bold text-emerald-600">{project.rendement}</p>
                    </div>
                    <div className="bg-white/60 rounded-xl p-3">
                      <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">Prix / token</p>
                      <p className="font-bold text-brand-dark">{project.prixToken}</p>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="mb-5">
                    <div className="flex justify-between text-xs font-bold text-gray-500 mb-2">
                      <span>Financé à {project.progress}%</span>
                      <span>{project.disponibles} dispo.</span>
                    </div>
                    <div className="h-2 bg-white/60 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-brand-dark rounded-full transition-all"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <Link
                    to="/inscription"
                    className="w-full py-3 bg-brand-dark text-white rounded-xl font-bold text-sm hover:bg-brand-neon hover:text-brand-dark transition-colors flex items-center justify-center gap-2"
                  >
                    <Coins className="w-4 h-4" /> Investir maintenant
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINANCE ISLAMIQUE PROMO BANNER */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#0a1a0f] rounded-[2rem] p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#1A7A4A] rounded-2xl flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-white font-bold text-base">Vous cherchez des tokens conformes Charia ?</p>
                <p className="text-white/50 text-sm font-medium">Decouvrez les Sukuk tokenises QPB — meme technologie, zero interet (riba), certifie AAOIFI.</p>
              </div>
            </div>
            <Link
              to="/finance-islamique/sukuk"
              className="px-6 py-3 bg-[#1A7A4A] text-white font-bold rounded-full hover:bg-[#1A7A4A]/80 transition-colors inline-flex items-center gap-2 shrink-0"
            >
              Voir les Sukuk <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* HOW BLOCKCHAIN WORKS */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#0a0a0a] rounded-[2rem] p-10 md:p-14 text-white">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-display font-bold text-3xl md:text-4xl mb-6">
                  La blockchain Polygon : pourquoi c'est sécurisé
                </h2>
                <p className="text-white/60 text-base font-medium leading-relaxed mb-6">
                  La blockchain est un registre numérique partagé et inviolable. Chaque transaction de token est enregistrée de façon permanente et transparente, sans intermédiaire central.
                </p>
                <ul className="space-y-4">
                  {[
                    { icon: Shield, text: 'Registre immuable et transparent' },
                    { icon: Lock, text: 'Smart contracts vérifiés et audités' },
                    { icon: TrendingUp, text: 'Frais de transaction très bas (Polygon)' },
                    { icon: Hexagon, text: 'Compatible avec tous les wallets EVM' },
                  ].map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <li key={i} className="flex items-center gap-3 text-sm font-medium text-white/80">
                        <Icon className="w-4 h-4 text-brand-neon shrink-0" />
                        {item.text}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="space-y-4">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                  <p className="text-white/50 text-xs font-bold uppercase tracking-wider mb-2">Smart contract ERC-20</p>
                  <code className="text-brand-neon text-sm font-mono">0x742d35Cc...4567fA8B</code>
                  <p className="text-white/40 text-xs mt-2">Polygon Mainnet — Vérifié sur PolygonScan</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                  <p className="text-white/50 text-xs font-bold uppercase tracking-wider mb-3">Dernière distribution</p>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70 font-medium">Résidence Les Palmiers</span>
                    <span className="text-brand-neon font-bold">+425 FCFA / token</span>
                  </div>
                  <p className="text-white/40 text-xs mt-1">01/05/2026 — Distribué automatiquement</p>
                </div>
                <div className="flex items-start gap-3 text-xs text-white/40 font-medium">
                  <Info className="w-4 h-4 shrink-0 mt-0.5" />
                  Le cadre juridique de la tokenisation est en cours de validation auprès de la COSUMAF. Une convention notariée est obligatoire pour chaque actif.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
