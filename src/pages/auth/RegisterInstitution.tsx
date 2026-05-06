import { useState } from 'react';
import { motion } from 'motion/react';

export default function RegisterInstitution() {
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-20 bg-brand-gray">
      <div className="w-full max-w-2xl bg-white p-8 md:p-12 rounded-[2rem] shadow-xl">
        <div className="text-center mb-10">
          <h1 className="font-display font-bold text-3xl text-brand-dark mb-2">Compte Institution Financière</h1>
          <p className="text-gray-500">Étape {step} sur 4</p>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-100 h-2 rounded-full mb-10 overflow-hidden">
          <motion.div 
            className="bg-brand-neon h-full"
            initial={{ width: 0 }}
            animate={{ width: `${(step / 4) * 100}%` }}
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
                <label className="text-sm font-bold text-brand-dark">Prénom du responsable</label>
                <input type="text" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-green/20 outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-brand-dark">Nom du responsable</label>
                <input type="text" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-green/20 outline-none" />
              </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-bold text-brand-dark">Titre / Fonction</label>
                <input type="text" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-green/20 outline-none" />
            </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-brand-dark">Email institutionnel</label>
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
                <label className="text-sm font-bold text-brand-dark">Raison sociale</label>
                <input type="text" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-green/20 outline-none" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-brand-dark">Type d'institution</label>
                <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-green/20 outline-none">
                  <option>Etablissement de Crédit (Banque)</option>
                  <option>Etablissement de Microfinance (EMF)</option>
                  <option>Société de Bourse (SDB)</option>
                  <option>Asset Manager (SGP)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-brand-dark">Numéro d'agrément</label>
                <input type="text" required placeholder="COSUMAF ou COBAC" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-green/20 outline-none" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-brand-dark">Pays d'origine</label>
                    <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-green/20 outline-none">
                    <option>Cameroun</option>
                    <option>Gabon</option>
                    <option>Tchad</option>
                    <option>Congo</option>
                    <option>République Centrafricaine</option>
                    <option>Guinée Équatoriale</option>
                    </select>
                </div>
                 <div className="space-y-2">
                    <label className="text-sm font-bold text-brand-dark">Logo de l'institution</label>
                    <input type="file" className="w-full px-4 py-[9px] bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-green/20 outline-none text-sm" />
                 </div>
            </div>
            
            <div className="space-y-2">
                <label className="text-sm font-bold text-brand-dark">Adresse du siège social</label>
                <input type="text" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-green/20 outline-none" />
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
            className="space-y-6"
            onSubmit={(e) => { e.preventDefault(); setStep(4); }}
          >
             <div className="space-y-4">
              <label className="block border-2 border-dashed border-gray-200 rounded-xl p-8 text-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                <input type="file" className="hidden" accept=".pdf" onChange={(e) => {
                  const el = e.target.parentElement?.querySelector('.file-name');
                  if (el && e.target.files?.[0]) el.textContent = e.target.files[0].name;
                }} />
                <div className="text-sm font-bold text-brand-dark mb-1">Agrément officiel (COSUMAF ou COBAC)</div>
                <div className="text-xs text-gray-500 file-name">PDF (Max 10Mo)</div>
              </label>

               <label className="block border-2 border-dashed border-gray-200 rounded-xl p-8 text-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                <input type="file" className="hidden" accept=".pdf" onChange={(e) => {
                  const el = e.target.parentElement?.querySelector('.file-name');
                  if (el && e.target.files?.[0]) el.textContent = e.target.files[0].name;
                }} />
                <div className="text-sm font-bold text-brand-dark mb-1">Statuts de l'institution</div>
                <div className="text-xs text-gray-500 file-name">PDF (Max 10Mo)</div>
              </label>

              <label className="block border-2 border-dashed border-gray-200 rounded-xl p-8 text-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                <input type="file" className="hidden" accept=".pdf" onChange={(e) => {
                  const el = e.target.parentElement?.querySelector('.file-name');
                  if (el && e.target.files?.[0]) el.textContent = e.target.files[0].name;
                }} />
                <div className="text-sm font-bold text-brand-dark mb-1">Preuve d'existence</div>
                <div className="text-xs text-gray-500 file-name">Bilan ou rapport annuel (PDF)</div>
              </label>
            </div>

            <div className="pt-6 flex gap-4">
              <button type="button" onClick={() => setStep(2)} className="px-6 py-4 bg-gray-100 text-brand-dark rounded-xl font-bold transition-all hover:bg-gray-200">
                Retour
              </button>
              <button type="submit" className="flex-1 py-4 bg-brand-dark text-white rounded-xl font-bold transition-all hover:bg-brand-neon hover:text-brand-dark">
                Continuer
              </button>
            </div>
          </motion.form>
        )}

        {step === 4 && (
          <motion.form 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
            onSubmit={(e) => { e.preventDefault(); window.location.href = '/professionnel/tableau-de-bord'; }}
          >
             <div className="space-y-4">
                <h3 className="font-bold text-brand-dark text-lg">Quels produits/services souhaitez-vous proposer via la plateforme ?</h3>
                <p className="text-sm text-gray-500 mb-4">Sélectionnez tous les services pour lesquels vous êtes agréés.</p>
                
                <div className="space-y-3">
                    <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                        <input type="checkbox" className="w-5 h-5 text-brand-dark rounded focus:ring-brand-dark" />
                        <div>
                            <div className="font-bold text-brand-dark">Crédit aux entreprises</div>
                            <div className="text-xs text-gray-500">Financer les demandes soumises par les entreprises</div>
                        </div>
                    </label>
                    <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                        <input type="checkbox" className="w-5 h-5 text-brand-dark rounded focus:ring-brand-dark" />
                        <div>
                            <div className="font-bold text-brand-dark">Dépôts et placements</div>
                            <div className="text-xs text-gray-500">Collecter l'épargne via des produits à taux fixe</div>
                        </div>
                    </label>
                    <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                        <input type="checkbox" className="w-5 h-5 text-brand-dark rounded focus:ring-brand-dark" />
                        <div>
                            <div className="font-bold text-brand-dark">Fonds de placement (FCP)</div>
                            <div className="text-xs text-gray-500">Distribuer vos fonds de placement sur notre marketplace</div>
                        </div>
                    </label>
                    <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                        <input type="checkbox" className="w-5 h-5 text-brand-dark rounded focus:ring-brand-dark" />
                        <div>
                            <div className="font-bold text-brand-dark">Obligations / Émissions</div>
                            <div className="text-xs text-gray-500">Proposer des obligations aux particuliers</div>
                        </div>
                    </label>
                </div>
             </div>

             <div className="flex items-start gap-3 mt-8">
                <input type="checkbox" id="terms" required className="mt-1 w-4 h-4 text-brand-dark border-gray-300 rounded focus:ring-brand-dark" />
                <label htmlFor="terms" className="text-sm text-gray-600">
                    Je certifie que les informations fournies sont exactes et j'accepte les <a href="#" className="text-brand-dark font-bold hover:underline">conditions générales d'utilisation</a> de NKAP INVEST.
                </label>
             </div>

            <div className="pt-6 flex gap-4">
              <button type="button" onClick={() => setStep(3)} className="px-6 py-4 bg-gray-100 text-brand-dark rounded-xl font-bold transition-all hover:bg-gray-200">
                Retour
              </button>
              <button type="submit" className="flex-1 py-4 bg-brand-dark text-white rounded-xl font-bold transition-all hover:bg-brand-neon hover:text-brand-dark">
                Soumettre le dossier
              </button>
            </div>
          </motion.form>
        )}
      </div>
    </div>
  );
}
