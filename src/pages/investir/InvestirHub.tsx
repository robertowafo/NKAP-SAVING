import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Hexagon, Layers, Copy, Users2, Lock } from 'lucide-react';
import { cn } from '../../lib/utils';

const PRODUCTS = [
  {
    path: '/investir/fractions',
    num: '01',
    title: 'Fractions de titres',
    subtitle: 'Investissez dans des actions & obligations BVMAC à partir de 5 000 FCFA.',
    icon: TrendingUp,
    color: 'bg-brand-neon',
    textColor: 'text-brand-dark',
    tag: 'Marché secondaire',
    features: ['Actions BVMAC & DSX', 'Obligations d\'État', 'Dividendes proportionnels', 'Portefeuille en temps réel'],
  },
  {
    path: '/investir/tokenisation',
    num: '02',
    title: 'Tokenisation d\'actifs',
    subtitle: 'Investissez dans l\'immobilier et les infrastructures via des tokens blockchain.',
    icon: Hexagon,
    color: 'bg-[#0a0a0a]',
    textColor: 'text-white',
    tag: 'Blockchain Polygon',
    features: ['Immobilier fractionné', 'Loyers mensuels auto', 'Tokens échangeables', 'Smart contracts sécurisés'],
  },
  {
    path: '/investir/fonds',
    num: '03',
    title: 'Fonds FCP',
    subtitle: 'Souscrivez aux fonds communs de placement des meilleurs asset managers CEMAC.',
    icon: Layers,
    color: 'bg-[#e5f0ff]',
    textColor: 'text-brand-dark',
    tag: 'Gestion professionnelle',
    features: ['FCP agréés COSUMAF', 'VL quotidienne', 'DICI disponible', 'Souscription en ligne'],
  },
  {
    path: '/investir/copy-investment',
    num: '04',
    title: 'Copy Investment',
    subtitle: 'Répliquez automatiquement la stratégie des meilleurs gestionnaires d\'actifs.',
    icon: Copy,
    color: 'bg-[#fff4e5]',
    textColor: 'text-brand-dark',
    tag: 'Idéal pour débutants',
    features: ['Sélection des meilleurs AM', 'Réplication automatique', 'Performance historique', 'Allocation flexible'],
  },
  {
    path: '/investir/co-investissement',
    num: '05',
    title: 'Co-investissement',
    subtitle: 'Regroupez-vous avec d\'autres investisseurs pour financer de grands projets.',
    icon: Users2,
    color: 'bg-[#e5fff4]',
    textColor: 'text-brand-dark',
    tag: 'Force collective',
    features: ['Grands projets accessibles', 'Partage des risques', 'Gouvernance communautaire', 'Projets vérifiés'],
  },
];

export default function InvestirHub() {
  return (
    <div className="flex flex-col min-h-screen bg-brand-gray">

      {/* HERO */}
      <section className="bg-[#0a0a0a] text-white px-4 sm:px-6 lg:px-8 pt-16 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/3 w-[500px] h-[500px] bg-brand-neon/10 rounded-full blur-[140px]"></div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <span className="text-xs font-bold text-brand-neon tracking-widest uppercase">Module Investissement</span>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <h1 className="font-display font-bold text-5xl md:text-7xl tracking-tighter leading-tight mb-6">
                Investissez<br />
                <span className="text-brand-neon">intelligemment</span>
              </h1>
              <p className="text-white/60 text-lg md:text-xl font-medium max-w-xl leading-relaxed">
                5 solutions d'investissement adaptées à tous les profils — du débutant à l'expert — dès 5 000 FCFA.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col gap-4 lg:items-end"
            >
              <div className="flex items-center gap-3 text-white/60 text-sm font-medium">
                <Lock className="w-4 h-4 text-brand-neon" />
                Opérations via une SDB agréée COSUMAF
              </div>
              <Link to="/inscription" className="px-8 py-4 bg-brand-neon text-brand-dark font-bold rounded-full hover:bg-white transition-colors text-sm inline-flex items-center gap-2">
                Commencer à investir <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {PRODUCTS.map((product, i) => {
            const Icon = product.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
              >
                <Link
                  to={product.path}
                  className={cn(
                    "flex flex-col md:flex-row items-start md:items-center justify-between gap-8 p-8 md:p-10 rounded-[2rem] group hover:-translate-y-1 hover:shadow-xl transition-all duration-300",
                    product.color
                  )}
                >
                  <div className="flex items-start gap-6 flex-1">
                    <span className={cn("font-display font-bold text-4xl md:text-5xl opacity-20", product.textColor)}>{product.num}</span>
                    <div>
                      <div className={cn("text-[10px] font-bold px-3 py-1 rounded-full mb-3 inline-block", product.textColor === 'text-white' ? 'bg-white/10' : 'bg-black/5')}>
                        <span className={product.textColor}>{product.tag}</span>
                      </div>
                      <h3 className={cn("font-display font-bold text-2xl md:text-3xl mb-2 group-hover:underline decoration-2 underline-offset-4", product.textColor)}>
                        {product.title}
                      </h3>
                      <p className={cn("text-sm font-medium leading-relaxed opacity-70 max-w-lg", product.textColor)}>
                        {product.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 shrink-0 md:items-end">
                    <div className="grid grid-cols-2 gap-2">
                      {product.features.map((f, j) => (
                        <span key={j} className={cn("text-[10px] font-bold px-2 py-1 rounded-lg", product.textColor === 'text-white' ? 'bg-white/10 text-white' : 'bg-black/5 text-brand-dark')}>
                          {f}
                        </span>
                      ))}
                    </div>
                    <div className={cn("flex items-center gap-2 text-sm font-bold group-hover:gap-3 transition-all", product.textColor)}>
                      En savoir plus <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* INFO RÉGLEMENTAIRE */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto bg-white rounded-[2rem] p-8 md:p-12 border border-black/5 flex flex-col md:flex-row items-start gap-8">
          <div className="w-12 h-12 bg-brand-neon/10 rounded-2xl flex items-center justify-center shrink-0">
            <Lock className="w-6 h-6 text-brand-green" />
          </div>
          <div>
            <h3 className="font-display font-bold text-xl text-brand-dark mb-3">Conformité & Sécurité réglementaire</h3>
            <p className="text-gray-500 font-medium text-sm leading-relaxed max-w-2xl">
              Toutes les opérations d'investissement sur NKAP SAVING sont exécutées en partenariat avec des Sociétés de Bourse (SDB) agréées par la <strong className="text-brand-dark">COSUMAF</strong>. Les actifs tokenisés font l'objet d'une convention notariée. Notre plateforme respecte le cadre réglementaire CEMAC (COBAC, COSUMAF, BEAC) en vigueur.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
