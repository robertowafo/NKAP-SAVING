import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, ExternalLink, Share2, BookOpen } from 'lucide-react';
import { ARTICLES } from '../data/news';
import { useEffect } from 'react';

export default function ArticleDetail() {
  const { id } = useParams<{ id: string }>();
  const article = ARTICLES.find(a => a.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!article) {
    return (
      <div className="bg-brand-gray min-h-screen pt-40 pb-24 flex flex-col items-center justify-center text-center px-4">
        <h1 className="font-display text-4xl text-brand-dark mb-4">Article introuvable</h1>
        <p className="text-brand-dark/60 mb-8">L'article que vous recherchez n'existe pas ou a été déplacé.</p>
        <Link to="/actualites" className="px-6 py-3 bg-brand-dark text-white rounded-full font-medium">
          Retour aux actualités
        </Link>
      </div>
    );
  }

  const paragraphs = article.content.split('\n\n');

  return (
    <div className="bg-white min-h-screen pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/actualites" className="inline-flex items-center gap-2 text-sm font-bold text-brand-dark/50 hover:text-brand-dark transition-colors mb-12 uppercase tracking-wide">
          <ArrowLeft className="w-4 h-4" />
          Retour aux actualités
        </Link>

        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-4 text-sm text-brand-dark/60 font-medium mb-6">
            <span className="px-3 py-1 bg-brand-gray rounded-full text-brand-dark font-bold uppercase tracking-wider text-xs">
              {article.source}
            </span>
             <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {article.date}</span>
             <span className="w-1 h-1 rounded-full bg-black/20"></span>
             <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {article.readTime}</span>
             <span className="w-1 h-1 rounded-full bg-black/20"></span>
             <span className="flex items-center gap-1.5 text-brand-primary">
               <BookOpen className="w-4 h-4" />
               {article.category}
             </span>
          </div>

          <h1 className="font-display font-medium text-4xl md:text-5xl lg:text-6xl text-brand-dark leading-[1.1] mb-8 tracking-tight">
            {article.title}
          </h1>

          <p className="text-xl md:text-2xl text-brand-dark/70 font-medium leading-relaxed">
            {article.description}
          </p>
        </header>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="aspect-[21/9] w-full rounded-[2rem] overflow-hidden bg-gray-100 border border-black/5">
          <img 
            src={article.imageUrl} 
            alt={article.title} 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="prose prose-lg prose-headings:font-display prose-p:text-brand-dark/80 prose-p:leading-relaxed max-w-none mb-12">
          {paragraphs.map((para, index) => (
            <p key={index} className="mb-8 text-[1.125rem]">
              {para}
            </p>
          ))}
        </div>

        <div className="border-t border-black/10 pt-8 flex flex-col sm:flex-row gap-6 sm:items-center justify-between mt-12">
          <div className="flex items-center gap-4">
             <button className="flex items-center gap-2 px-6 py-3 bg-brand-gray text-brand-dark font-medium rounded-full hover:bg-gray-200 transition-colors">
               <Share2 className="w-4 h-4" />
               Partager l'article
             </button>
          </div>
          <a href="#" className="flex items-center gap-2 px-4 py-2 text-brand-dark/60 font-medium hover:text-brand-dark transition-colors">
             Consulter la source originale
             <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
