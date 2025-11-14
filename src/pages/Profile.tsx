import React from 'react';
import { useAuth } from '../context/AuthContext'; 
import { Link } from 'react-router-dom';
import { User, Mail, Phone, MapPin, Briefcase, Award } from 'lucide-react';

export function Profile() {
  const { user } = useAuth(); 

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Accès non autorisé</h2>
          <p className="text-gray-600 mb-6">Veuillez vous connecter pour voir votre profil.</p>
          <Link to="/login" className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors">
            Se connecter
          </Link>
        </div>
      </div>
    );
  }

  const isCouturier = user.role === 'couturier';
  const couturierDetails = isCouturier ? {
    businessName: (user as any).businessName || 'N/A',
    specialties: (user as any).specialties || [],
    experience: (user as any).experience || 'N/A',
    description: (user as any).description || 'Aucune description fournie.'
  } : null;

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <div className="flex items-center space-x-6 mb-8">
          <img
            src={user.avatar || 'https://via.placeholder.com/150/4299E1/FFFFFF?text=USER'}
            alt={user.name}
            className="w-24 h-24 rounded-full object-cover border-4 border-blue-500"
          />
          <div>
            <h1 className="text-4xl font-bold text-gray-900">{user.name}</h1>
            <p className="text-xl text-gray-600">{user.role === 'couturier' ? 'Couturier' : 'Client'}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Informations Générales</h2>
            <div className="space-y-3">
              <p className="flex items-center text-gray-700">
                <Mail className="h-5 w-5 text-blue-500 mr-3" /> {user.email}
              </p>
              {user.phone && (
                <p className="flex items-center text-gray-700">
                  <Phone className="h-5 w-5 text-blue-500 mr-3" /> {user.phone}
                </p>
              )}
              {user.address && (
                <p className="flex items-center text-gray-700">
                  <MapPin className="h-5 w-5 text-blue-500 mr-3" /> {user.address}
                </p>
              )}
            </div>
          </div>

          {isCouturier && couturierDetails && (
            <div className="bg-blue-50 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">Détails Couturier</h2>
              <div className="space-y-3">
                <p className="flex items-center text-gray-700">
                  <Briefcase className="h-5 w-5 text-blue-600 mr-3" />
                  <span className="font-medium">Entreprise:</span> {couturierDetails.businessName}
                </p>
                <p className="flex items-center text-gray-700">
                  <Award className="h-5 w-5 text-blue-600 mr-3" />
                  <span className="font-medium">Expérience:</span> {couturierDetails.experience} ans
                </p>
                {couturierDetails.specialties.length > 0 && (
                  <p className="flex items-start text-gray-700">
                    <span className="font-medium mr-3">Spécialités:</span>
                    <span className="flex flex-wrap gap-2">
                      {couturierDetails.specialties.map((s: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined, idx: React.Key | null | undefined) => (
                        <span key={idx} className="bg-blue-200 text-blue-800 text-xs px-2 py-1 rounded-full">
                          {s}
                        </span>
                      ))}
                    </span>
                  </p>
                )}
                <p className="text-gray-700">
                  <span className="font-medium">Description:</span> {couturierDetails.description}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="text-right mt-8">
          <Link
            to="/edit-profile" 
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            Éditer le Profil
          </Link>
        </div>
      </div>
    </div>
  );
}