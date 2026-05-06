import { useState } from 'react';
import { motion } from 'motion/react';

export default function RegisterEntreprise() {
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-20 bg-brand-gray">
      <div className="w-full max-w-2xl bg-white p-8 md:p-12 rounded-[2rem] shadow-xl">
        <div className="text-center mb-10">
          <h1 className="font-display font-bold text-3xl text-brand-dark mb-2">Compte Entreprise</h1>
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
                <label className="text-sm font-bold text-brand-dark">Prénom</label>
                <input type="text" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-green/20 outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-brand-dark">Nom</label>
                <input type="text" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-green/20 outline-none" />
              </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-bold text-brand-dark">Fonction dans l'entreprise</label>
                <input type="text" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-green/20 outline-none" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-brand-dark">Email professionnel</label>
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
                <label className="text-sm font-bold text-brand-dark">Forme juridique</label>
                <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-green/20 outline-none">
                  <option>SARL</option>
                  <option>SA</option>
                  <option>GIE</option>
                  <option>SNC</option>
                  <option>SAS</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-brand-dark">Numéro RCCM</label>
                <input type="text" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-green/20 outline-none" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-brand-dark">Secteur d'activité</label>
                 <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-green/20 outline-none">
                  <option>Agriculture</option>
                  <option>Industrie</option>
                  <option>Technologie</option>
                  <option>Commerce</option>
                  <option>Services</option>
                  <option>Énergie</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-brand-dark">Pays de domiciliation</label>
                <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-green/20 outline-none">
                  <option>Cameroun</option>
                  <option>Gabon</option>
                  <option>Tchad</option>
                  <option>Congo</option>
                  <option>République Centrafricaine</option>
                  <option>Guinée Équatoriale</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-2">
                <label className="text-sm font-bold text-brand-dark">Adresse complète</label>
                <input type="text" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-green/20 outline-none" />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-bold text-brand-dark">Site web (optionnel)</label>
                <input type="url" placeholder="https://" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-green/20 outline-none" />
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
                <input type="file" className="hidden" accept=".jpg,.jpeg,.png,.pdf" onChange={(e) => {
                  const el = e.target.parentElement?.querySelector('.file-name');
                  if (el && e.target.files?.[0]) el.textContent = e.target.files[0].name;
                }} />
                <div className="text-sm font-bold text-brand-dark mb-1">Registre de Commerce (RCCM)</div>
                <div className="text-xs text-gray-500 file-name">PDF ou Image (Max 5Mo)</div>
              </label>

               <label className="block border-2 border-dashed border-gray-200 rounded-xl p-8 text-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                <input type="file" className="hidden" accept=".pdf" onChange={(e) => {
                  const el = e.target.parentElement?.querySelector('.file-name');
                  if (el && e.target.files?.[0]) el.textContent = e.target.files[0].name;
                }} />
                <div className="text-sm font-bold text-brand-dark mb-1">Statuts de l'entreprise</div>
                <div className="text-xs text-gray-500 file-name">PDF (Max 5Mo)</div>
              </label>

              <label className="block border-2 border-dashed border-gray-200 rounded-xl p-8 text-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                <input type="file" className="hidden" accept=".jpg,.jpeg,.png,.pdf" onChange={(e) => {
                  const el = e.target.parentElement?.querySelector('.file-name');
                  if (el && e.target.files?.[0]) el.textContent = e.target.files[0].name;
                }} />
                <div className="text-sm font-bold text-brand-dark mb-1">Pièce d'identité du représentant légal</div>
                <div className="text-xs text-gray-500 file-name">PDF ou Image (Max 5Mo)</div>
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
             <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <h3 className="font-bold text-brand-dark mb-4 text-lg">Résumé de vos informations</h3>
                <ul className="space-y-3 text-sm">
                    <li className="flex justify-between border-b border-gray-200 pb-2">
                        <span className="text-gray-500">Représentant</span>
                        <span className="font-bold text-brand-dark">Jean Dupont</span>
                    </li>
                    <li className="flex justify-between border-b border-gray-200 pb-2">
                        <span className="text-gray-500">Entreprise</span>
                        <span className="font-bold text-brand-dark">Tech Africa SARL</span>
                    </li>
                    <li className="flex justify-between border-b border-gray-200 pb-2">
                        <span className="text-gray-500">RCCM</span>
                        <span className="font-bold text-brand-dark">CM-DLA-2023-B-1234</span>
                    </li>
                    <li className="flex justify-between border-b border-gray-200 pb-2">
                        <span className="text-gray-500">Pays</span>
                        <span className="font-bold text-brand-dark">Cameroun</span>
                    </li>
                    <li className="flex justify-between pt-1">
                        <span className="text-gray-500">Documents joints</span>
                        <span className="font-bold text-brand-dark">3 documents</span>
                    </li>
                </ul>
             </div>

             <div className="flex items-start gap-3">
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
