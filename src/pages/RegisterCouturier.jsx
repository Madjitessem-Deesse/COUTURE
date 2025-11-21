import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Zap, Briefcase, FileText, Check, X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const RegisterCouturier = () => {
  const { user, loading: authLoading, upgradeToCouturier } = useAuth();
  
  const [specialty, setSpecialty] = useState('');
  const [experience, setExperience] = useState('');
  const [portfolioLink, setPortfolioLink] = useState('');
  const [kbisFile, setKbisFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null); // 'success' | 'error' | null

  // Vérification de l'utilisateur
  if (authLoading) return <div className="text-center py-10">Chargement...</div>;
  if (!user) return <div className="text-center py-10 text-red-500">Veuillez vous connecter pour accéder à cette page.</div>;
  if (user.isCouturier) return (
    <div className="text-center py-20 bg-gray-50 min-h-screen">
      <Zap className="w-16 h-16 text-yellow-500 fill-yellow-500 mx-auto mb-4" />
      <h1 className="text-3xl font-bold text-gray-900">Félicitations !</h1>
      <p className="text-gray-600 mt-2">Vous êtes déjà enregistré(e) en tant que Couturier(ère) Professionnel(le).</p>
      <Link to="/profile" className="mt-6 inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-all font-medium">
        <span>Voir mon Profil</span>
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmissionStatus(null);

    if (!kbisFile) {
      alert("Veuillez joindre votre document KBIS ou équivalent.");
      setLoading(false);
      return;
    }

    try {
      // Simuler la validation des documents et l'appel à une fonction d'upgrade
      // await upgradeToCouturier({ specialty, experience, portfolioLink, kbisFile });
      
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simuler le temps de chargement
      
      setSubmissionStatus('success');
      // Réinitialiser les champs après succès
      setSpecialty('');
      setExperience('');
      setPortfolioLink('');
      setKbisFile(null);

    } catch (err) {
      console.error(err);
      setSubmissionStatus('error');
    } finally {
      setLoading(false);
    }
  };

  const fileInputHandler = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 2097152) { // 2MB max
      alert("Le fichier est trop volumineux (Max 2 Mo).");
      setKbisFile(null);
    } else {
      setKbisFile(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-10 border border-gray-100">
          <div className="text-center mb-10">
            <Zap className="w-12 h-12 text-blue-600 mx-auto mb-3" />
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
              Devenir Couturier Pro
            </h1>
            <p className="text-gray-500 max-w-lg mx-auto">
              Rejoignez notre réseau de professionnels vérifiés pour proposer vos services de couture et de création.
            </p>
          </div>

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Section Informations Professionnelles */}
            <div className="p-6 bg-blue-50 border border-blue-200 rounded-xl space-y-6">
                <h2 className="text-xl font-bold text-blue-800 flex items-center space-x-2">
                    <Briefcase className="w-5 h-5" />
                    <span>Informations Professionnelles</span>
                </h2>
                
                {/* Champ Spécialité */}
                <div>
                    <label htmlFor="specialty" className="block text-sm font-medium text-gray-700 mb-1">Votre Spécialité</label>
                    <input
                        type="text"
                        id="specialty"
                        value={specialty}
                        onChange={(e) => setSpecialty(e.target.value)}
                        required
                        className="block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Ex: Robes de Mariée, Tailleur sur mesure, Retouche de luxe..."
                    />
                </div>

                {/* Champ Expérience */}
                <div>
                    <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">Années d'Expérience</label>
                    <input
                        type="number"
                        id="experience"
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                        required
                        min="1"
                        max="50"
                        className="block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Ex: 5"
                    />
                </div>

                {/* Champ Lien Portfolio */}
                <div>
                    <label htmlFor="portfolio" className="block text-sm font-medium text-gray-700 mb-1">Lien vers votre Portfolio / Site Web</label>
                    <input
                        type="url"
                        id="portfolio"
                        value={portfolioLink}
                        onChange={(e) => setPortfolioLink(e.target.value)}
                        className="block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="https://votre-portfolio.com"
                    />
                    <p className="mt-2 text-xs text-gray-500">Un portfolio est fortement recommandé pour la validation.</p>
                </div>
            </div>

            {/* Section Vérification */}
            <div className="p-6 bg-red-50 border border-red-200 rounded-xl space-y-6">
                <h2 className="text-xl font-bold text-red-800 flex items-center space-x-2">
                    <FileText className="w-5 h-5" />
                    <span>Vérification d'Identité Professionnelle (Obligatoire)</span>
                </h2>
                
                {/* Champ KBIS */}
                <div>
                    <label htmlFor="kbisFile" className="block text-sm font-medium text-gray-700 mb-1">
                        Document KBIS ou Numéro de Siret
                    </label>
                    <div className="mt-1 flex items-center space-x-4">
                      <label htmlFor="kbisFile" className="cursor-pointer bg-white py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                        {kbisFile ? 'Changer de fichier' : 'Sélectionner un fichier (Max 2Mo)'}
                        <input
                            type="file"
                            id="kbisFile"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={fileInputHandler}
                            className="sr-only"
                        />
                      </label>
                      {kbisFile && (
                          <span className="text-sm text-gray-600 truncate max-w-[200px]">{kbisFile.name}</span>
                      )}
                    </div>
                    <p className="mt-2 text-xs text-gray-500">Document obligatoire pour valider votre statut professionnel.</p>
                </div>
            </div>

            {/* Messages de Statut */}
            {submissionStatus === 'success' && (
                <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg flex items-center space-x-3">
                  <Check className="h-5 w-5" />
                  <p>Candidature envoyée ! Elle est en cours de révision et sera traitée sous 48h.</p>
                </div>
            )}
            {submissionStatus === 'error' && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg flex items-center space-x-3">
                  <X className="h-5 w-5" />
                  <p>Une erreur est survenue lors de l'envoi de votre candidature. Veuillez réessayer.</p>
                </div>
            )}

            {/* Bouton de Soumission */}
            <button
              type="submit"
              disabled={loading || submissionStatus === 'success' || !kbisFile}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-lg text-lg font-medium text-white transition-all duration-300 ${
                (loading || submissionStatus === 'success' || !kbisFile) ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:shadow-xl'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            >
              {loading ? 'Envoi de la candidature...' : 'Soumettre ma Candidature Pro'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterCouturier;