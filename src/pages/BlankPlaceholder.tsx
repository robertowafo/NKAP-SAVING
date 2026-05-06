import { Link } from 'react-router-dom';

export default function BlankPlaceholder({ title }: { title: string }) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 bg-brand-gray text-center">
      <h1 className="font-display font-bold text-4xl text-brand-dark mb-4">{title}</h1>
      <p className="text-gray-500 font-medium mb-8 max-w-lg">
        Cette page existe dans l'architecture du projet, mais la preview se concentre sur l'accueil et les flux principaux pour démontrer le design demandé.
      </p>
      <Link to="/" className="px-6 py-3 bg-brand-dark text-white rounded-full font-bold text-sm hover:bg-black transition-colors">
        Retour à l'accueil
      </Link>
    </div>
  );
}
