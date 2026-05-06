import { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export default function RegisterParticulier() {
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-20 bg-brand-gray">
      <div className="w-full max-w-2xl bg-white p-8 md:p-12 rounded-[2rem] shadow-xl">
        <div className="text-center mb-10">
          <h1 className="font-display font-bold text-3xl text-brand-dark mb-2">Compte Particulier</h1>
          <p className="text-gray-500">Étape {step} sur 3</p>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-100 h-2 rounded-full mb-10 overflow-hidden">
          <motion.div 
            className="bg-brand-neon h-full"
            initial={{ width: 0 }}
            animate={{ width: `${(step / 3) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {step === 1 && (
          <motion.form 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
            onSubmit={(e) => { e.preventDefault(); setStep(2); }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-brand-dark">Prénom</label>
                <input type="text" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-green/20 outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-brand-dark">Nom</label>
                <input type="text" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-green/20 outline-none" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-brand-dark">Date de naissance</label>
                <input type="date" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-green/20 outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-brand-dark">Nationalité</label>
                <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-green/20 outline-none">
                  <option>Camerounaise</option>
                  <option>Gabonaise</option>
                  <option>Tchadienne</option>
                  <option>Congolaise</option>
                  <option>Centrafricaine</option>
                  <option>Équato-guinéenne</option>
                  <option>Autre</option>
                </select>
              </div>
            </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-brand-dark">Adresse email</label>
                <input type="email" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-green/20 outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-brand-dark">Téléphone</label>
                <input type="tel" required placeholder="+237 ..." className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-green/20 outline-none" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-brand-dark">Mot de passe</label>
                <input type="password" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-green/20 outline-none" />
                <p className="text-xs text-gray-400">Min 8 catactères, 1 majuscule, 1 chiffre, 1 caractère spécial.</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-brand-dark">Confirmer le mot de passe</label>
                <input type="password" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-green/20 outline-none" />
              </div>
            </div>

            <div className="pt-6">
              <button type="submit" className="w-full py-4 bg-brand-dark text-white rounded-xl font-bold transition-all hover:bg-brand-neon hover:text-brand-dark">
                Continuer
              </button>
            </div>
          </motion.form>
        )}

        {step === 2 && (
          <motion.form 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
            onSubmit={(e) => { e.preventDefault(); setStep(3); }}
          >
            <div className="space-y-2">
              <label className="text-sm font-bold text-brand-dark">Type de document</label>
              <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-green/20 outline-none">
                <option>Carte Nationale d'Identité</option>
                <option>Passeport</option>
                <option>Carte de résident</option>
              </select>
            </div>

            <div className="space-y-4">
              <label className="block border-2 border-dashed border-gray-200 rounded-xl p-8 text-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                <input type="file" className="hidden" accept=".jpg,.jpeg,.png,.pdf" onChange={(e) => {
                  const el = e.target.parentElement?.querySelector('.file-name');
                  if (el && e.target.files?.[0]) el.textContent = e.target.files[0].name;
                }} />
                <div className="text-sm font-bold text-brand-dark mb-1">Photo recto du document</div>
                <div className="text-xs text-gray-500 file-name">JPG, PNG, PDF (Max 5Mo)</div>
              </label>

               <label className="block border-2 border-dashed border-gray-200 rounded-xl p-8 text-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                <input type="file" className="hidden" accept=".jpg,.jpeg,.png,.pdf" onChange={(e) => {
                  const el = e.target.parentElement?.querySelector('.file-name');
                  if (el && e.target.files?.[0]) el.textContent = e.target.files[0].name;
                }} />
                <div className="text-sm font-bold text-brand-dark mb-1">Photo verso du document</div>
                <div className="text-xs text-gray-500 file-name">JPG, PNG, PDF (Max 5Mo)</div>
              </label>

              <label className="block border-2 border-dashed border-gray-200 rounded-xl p-8 text-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                <input type="file" className="hidden" accept="image/*" capture="user" onChange={(e) => {
                  const el = e.target.parentElement?.querySelector('.file-name');
                  if (el && e.target.files?.[0]) el.textContent = e.target.files[0].name;
                }} />
                <div className="text-sm font-bold text-brand-dark mb-1">Selfie avec le document</div>
                <div className="text-xs text-gray-500 file-name">Prenez une photo de votre visage tenant le document</div>
              </label>
            </div>

            <div className="pt-6 flex gap-4">
              <button type="button" onClick={() => setStep(1)} className="px-6 py-4 bg-gray-100 text-brand-dark rounded-xl font-bold transition-all hover:bg-gray-200">
                Retour
              </button>
              <button type="submit" className="flex-1 py-4 bg-brand-dark text-white rounded-xl font-bold transition-all hover:bg-brand-neon hover:text-brand-dark">
                Continuer
              </button>
            </div>
          </motion.form>
        )}

        {step === 3 && (
          <motion.form 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
            onSubmit={(e) => { e.preventDefault(); window.location.href = '/tableau-de-bord'; }}
          >
             <div className="space-y-3">
                <label className="text-sm font-bold text-brand-dark">Quel est votre objectif principal ?</label>
                <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-green/20 outline-none">
                  <option>Faire fructifier mon épargne</option>
                  <option>Préparer ma retraite</option>
                  <option>Financer un projet</option>
                  <option>Apprendre à investir</option>
                </select>
             </div>

             <div className="space-y-3">
                <label className="text-sm font-bold text-brand-dark">Sur combien de temps souhaitez-vous investir ?</label>
                <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-green/20 outline-none">
                  <option>Moins de 1 an</option>
                  <option>1 à 3 ans</option>
                  <option>3 à 5 ans</option>
                  <option>Plus de 5 ans</option>
                </select>
             </div>

             <div className="space-y-3">
                <label className="text-sm font-bold text-brand-dark">Comment réagissez-vous si votre investissement perd 10% ?</label>
                <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-green/20 outline-none">
                  <option>Je retire tout immédiatement</option>
                  <option>J'attends</option>
                  <option>J'investis encore plus</option>
                  <option>Je ne sais pas</option>
                </select>
             </div>

             <div className="space-y-3">
                <label className="text-sm font-bold text-brand-dark">Quel montant souhaitez-vous investir au départ ?</label>
                <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-green/20 outline-none">
                  <option>Moins de 10 000 FCFA</option>
                  <option>10 000 – 100 000 FCFA</option>
                  <option>100 000 – 500 000 FCFA</option>
                  <option>Plus de 500 000 FCFA</option>
                </select>
             </div>

            <div className="pt-6 flex gap-4">
              <button type="button" onClick={() => setStep(2)} className="px-6 py-4 bg-gray-100 text-brand-dark rounded-xl font-bold transition-all hover:bg-gray-200">
                Retour
              </button>
              <button type="submit" className="flex-1 py-4 bg-brand-dark text-white rounded-xl font-bold transition-all hover:bg-brand-neon hover:text-brand-dark">
                Terminer l'inscription
              </button>
            </div>
          </motion.form>
        )}
      </div>
    </div>
  );
}
