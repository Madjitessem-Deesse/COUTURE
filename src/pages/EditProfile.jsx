import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Zap, X, Check } from 'lucide-react';

const EditProfile = () => {
  const { user, updateUserProfile } = useAuth();

  
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [bio, setBio] = useState(user?.bio || ''); 
  const [isCouturier, setIsCouturier] = useState(user?.isCouturier || false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // S'assurer que l'utilisateur est chargé
  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <p className="text-lg text-gray-700">Chargement du profil ou accès refusé...</p>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {

      setMessage('Profil mis à jour avec succès !');

    } catch (err) {
      setError("Erreur lors de la mise à jour : " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-10 border border-gray-100">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
              Modifier votre Profil
            </h1>
            <p className="text-gray-500">Gérez vos informations personnelles et vos préférences.</p>
          </div>

          {/* Messages de feedback */}
          {message && (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg mb-6 flex items-center space-x-3">
              <Check className="h-5 w-5" />
              <p>{message}</p>
            </div>
          )}
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-6 flex items-center space-x-3">
              <X className="h-5 w-5" />
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Photo de profil (Placeholder) */}
            <div className="flex flex-col items-center space-y-4">
              <div 
                className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center border-4 border-blue-500 shadow-lg"
                style={{ backgroundImage: `url(${user.avatarUrl || 'https://placehold.co/128x128/9CA3AF/FFFFFF?text=AVATAR'})`, backgroundSize: 'cover' }}
              >
                {!user.avatarUrl && <User className="w-12 h-12 text-gray-600" />}
              </div>
              <button type="button" className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">
                Changer la photo
              </button>
            </div>

            {/* Champ Nom */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nom / Pseudo</label>
              <div className="mt-1 relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150"
                  placeholder="Votre nom complet ou pseudo"
                />
              </div>
            </div>

            {/* Champ Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Adresse Email</label>
              <div className="mt-1 relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 bg-gray-100 cursor-not-allowed"
                  placeholder="Votre email"
                  disabled
                />
                <p className="mt-2 text-xs text-gray-500">L'email ne peut pas être modifié ici.</p>
              </div>
            </div>

            {/* Champ Bio */}
            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">Biographie</label>
              <textarea
                id="bio"
                rows="3"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="block w-full p-3 border border-gray-300 rounded-lg shadow-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150"
                placeholder="Décrivez-vous en quelques mots (Max 150 caractères)"
                maxLength={150}
              />
            </div>

            {/* Statut Couturier (Toggle) */}
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center space-x-3">
                <Zap className="h-6 w-6 text-blue-600" />
                <div>
                  <label htmlFor="couturier-toggle" className="text-base font-semibold text-gray-900">
                    Statut Couturier Professionnel
                  </label>
                  <p className="text-sm text-gray-600">
                    {isCouturier ? "Votre profil est visible par les clients pour les commandes." : "Vous êtes en mode utilisateur simple. Passez au statut Couturier pour proposer des services."}
                  </p>
                </div>
              </div>
              <button
                type="button"
                id="couturier-toggle"
                onClick={() => setIsCouturier(!isCouturier)}
                className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isCouturier ? 'bg-blue-600' : 'bg-gray-200'}`}
              >
                <span
                  aria-hidden="true"
                  className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${isCouturier ? 'translate-x-5' : 'translate-x-0'}`}
                />
              </button>
            </div>
            
     
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-lg text-lg font-medium text-white transition-all duration-300 ${
                loading ? 'bg-blue-400 cursor-wait' : 'bg-blue-600 hover:bg-blue-700 hover:shadow-xl'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            >
              {loading ? 'Sauvegarde en cours...' : 'Enregistrer les Modifications'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;