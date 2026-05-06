import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Calendar, Clock, ChevronRight, TrendingUp, BookOpen } from 'lucide-react';
import { cn } from '../lib/utils';
import { Link, useNavigate } from 'react-router-dom';
import { Article, ARTICLES, SOURCES, NewsSource } from '../data/news';

export default function News() {
  const [activeSource, setActiveSource] = useState<NewsSource>('Toutes');
  const navigate = useNavigate();

  const filteredArticles = ARTICLES.filter(
    (article) => activeSource === 'Toutes' || article.source === activeSource
  );

  const featured = filteredArticles.find((a) => a.featured) || filteredArticles[0];
  const remaining = filteredArticles.filter((a) => a.id !== featured?.id);

  return (
    <div className="bg-brand-gray min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <header className="mb-16">
          <h1 className="font-display font-medium text-4xl md:text-6xl text-brand-dark tracking-tight mb-6">
            Actualités & <br />
            <span className="text-brand-dark/50">Insights Marchés</span>
          </h1>
          <p className="text-xl text-brand-dark/70 max-w-2xl">
            Restez informé sur l'actualité financière d'Afrique Centrale, les évolutions de la réglementation et les opportunités d'investissement.
          </p>
        </header>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-12">
          {SOURCES.map((source) => (
            <button
              key={source}
              onClick={() => setActiveSource(source)}
              className={cn(
                "px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300",
                activeSource === source
                  ? "bg-brand-dark text-white shadow-md scale-105"
                  : "bg-white text-brand-dark/70 hover:bg-gray-100 hover:text-brand-dark border border-black/5"
              )}
            >
              {source}
            </button>
          ))}
        </div>

        <div className="space-y-12">
          {/* Featured Article */}
          {featured && (
            <motion.div 
              layoutId={`article-${featured.id}`}
              className="group relative bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-black/5"
            >
              <div className="grid md:grid-cols-2 gap-0">
                <div className="aspect-[4/3] md:aspect-auto md:h-full relative overflow-hidden bg-gray-100">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold uppercase tracking-wider text-brand-dark shadow-sm">
                      {featured.source}
                    </span>
                  </div>
                  <img 
                    src={featured.imageUrl} 
                    alt={featured.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-white relative">
                  <div className="flex items-center gap-4 text-sm text-brand-dark/60 font-medium mb-6">
                    <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {featured.date}</span>
                    <span className="w-1 h-1 rounded-full bg-black/20"></span>
                    <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {featured.readTime}</span>
                    <span className="w-1 h-1 rounded-full bg-black/20"></span>
                    <span className="text-brand-primary">{featured.category}</span>
                  </div>
                  
                  <h2 className="font-display font-medium text-3xl md:text-4xl text-brand-dark leading-[1.1] mb-6 group-hover:text-amber-700 transition-colors">
                    {featured.title}
                  </h2>
                  <p className="text-brand-dark/70 text-lg mb-8 line-clamp-3">
                    {featured.description}
                  </p>
                  
                  <Link to={`/actualites/${featured.id}`} className="inline-flex items-center gap-2 text-sm font-bold tracking-wide uppercase text-brand-dark group/link w-max">
                    <span className="pb-1 border-b-2 border-transparent group-hover/link:border-brand-dark transition-colors">
                      Lire l'article complet
                    </span>
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover/link:bg-brand-dark group-hover/link:text-white transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </div>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}

          {/* Article Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {remaining.map((article) => (
                <motion.div
                  key={article.id}
                  layout
                  layoutId={`article-${article.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => navigate(`/actualites/${article.id}`)}
                  className="group flex flex-col bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-black/5 h-full cursor-pointer"
                >
                  <div className="aspect-[16/10] relative overflow-hidden bg-gray-100 shrink-0">
                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-bold uppercase tracking-wider text-brand-dark shadow-sm">
                        {article.source}
                      </span>
                    </div>
                    <img 
                      src={article.imageUrl} 
                      alt={article.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-8 flex flex-col flex-1">
                    <div className="flex items-center gap-3 text-xs text-brand-dark/50 font-medium mb-4">
                      <span>{article.date}</span>
                      <span className="w-1 h-1 rounded-full bg-black/20"></span>
                      <span>{article.readTime}</span>
                    </div>
                    <h3 className="font-display font-medium text-xl text-brand-dark leading-snug mb-4 group-hover:text-amber-700 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-brand-dark/60 text-sm mb-8 line-clamp-3 mt-auto">
                      {article.description}
                    </p>
                    <div className="flex items-center justify-between pt-6 border-t border-black/5 mt-auto">
                       <span className="flex items-center gap-1.5 text-xs font-bold text-brand-dark/50 group-hover:text-brand-dark transition-colors">
                         <BookOpen className="w-3.5 h-3.5" />
                         {article.category}
                       </span>
                       <div className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-brand-dark group-hover:border-brand-dark group-hover:text-white transition-all text-brand-dark/50">
                          <ExternalLink className="w-3.5 h-3.5" />
                       </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          {filteredArticles.length === 0 && (
            <div className="py-24 text-center">
               <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-black/5 text-brand-dark/20">
                  <BookOpen className="w-8 h-8" />
               </div>
               <h3 className="font-display text-2xl text-brand-dark mb-2">Aucun article trouvé</h3>
               <p className="text-brand-dark/50">Il n'y a pas d'actualités récentes pour cette source.</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
