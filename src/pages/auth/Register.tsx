import { Link } from 'react-router-dom';
import { Building2, User, Landmark } from 'lucide-react';
import { motion } from 'motion/react';

export default function Register() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-20 bg-brand-gray">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="font-display font-bold text-4xl text-brand-dark mb-4">Choisissez votre profil</h1>
          <p className="text-gray-600 font-medium text-lg max-w-2xl mx-auto">
            Pour vous offrir l'expérience la plus adaptée, dites-nous qui vous êtes avant de commencer.
          </p>
        </div>

        <div className="max-w-md mx-auto mb-12">
          <button className="w-full flex items-center justify-center gap-3 py-4 px-4 bg-white border border-gray-200 rounded-xl shadow-sm text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors">
            <svg viewBox="0 0 24 24" className="w-5 h-5">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            S'inscrire rapidement avec Google
          </button>
          
          <div className="relative my-8">
             <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
             </div>
             <div className="relative flex justify-center text-sm font-medium">
                <span className="px-4 bg-brand-gray text-gray-500">ou avec une adresse e-mail</span>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: User,
              title: 'Particulier',
              desc: 'Je veux épargner et investir sur le marché financier.',
              color: 'emerald',
              link: '/inscription/particulier'
            },
            {
              icon: Building2,
              title: 'Entreprise',
              desc: 'Je cherche des financements ou des partenaires.',
              color: 'blue',
              link: '/inscription/entreprise'
            },
            {
              icon: Landmark,
              title: 'Institution financières',
              desc: 'Je suis une banque, microfinance ou société de bourse.',
              color: 'purple',
              link: '/inscription/institution'
            }
          ].map((profile, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link 
                to={profile.link}
                className="w-full text-left bg-white p-8 rounded-[2rem] border-2 border-transparent hover:border-brand-neon hover:shadow-xl transition-all h-full flex flex-col items-start group"
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-${profile.color}-100 text-${profile.color}-600 group-hover:scale-110 transition-transform`}>
                  <profile.icon className="w-8 h-8" />
                </div>
                <h3 className="font-display font-bold text-2xl text-brand-dark mb-3">{profile.title}</h3>
                <p className="text-gray-500 font-medium leading-relaxed">{profile.desc}</p>
                <div className="mt-8 font-bold text-brand-dark group-hover:text-brand-green flex items-center gap-2">
                  Sélectionner <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform"/>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 text-center text-sm font-medium">
          <span className="text-gray-500">Vous avez déjà un compte ?</span>{' '}
          <Link to="/connexion" className="font-bold text-brand-green hover:underline">
            Se connecter
          </Link>
        </div>
      </div>
    </div>
  );
}

// Dummy icon ArrowRight locally since I forgot to import it above
import { ArrowRight } from 'lucide-react';
