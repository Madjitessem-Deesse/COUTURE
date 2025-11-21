// src/pages/Favorites.tsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Heart, Star, MapPin, Award } from 'lucide-react';
import djibrilImg from '../assets/djibril.jpg';
import brahimImg from '../assets/brahim.jpg';


const mockFavoriteCouturiers = [
  {
    id: '3',
    name:' djibril',
    businessName: 'Atelier djibril',
    avatar: djibrilImg,
    specialties: ['Robes traditionnelles', 'Tenues de soirée et autres'],
    experience: 8,
    rating: 4.8,
    reviewCount: 156,
    location: { city: 'Dakar', district: 'Plateau' },
  },
  {
    id: '5',
    name: 'Sadou bouhari ousmane',
    businessName: ' ousmane',
    avatar:brahimImg,
    specialties: ['Costumes masculins', 'Vêtements boubou'],
    experience: 12,
    rating: 4.9,
    reviewCount: 203,
    location: { city: 'Dakar', district: 'Medina' },
  },
];

export function Favorites() {
  const { user } = useAuth(); 

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Accès non autorisé</h2>
          <p className="text-gray-600 mb-6">Veuillez vous connecter pour voir vos favoris.</p>
          <Link to="/login" className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors">
            Se connecter
          </Link>
        </div>
      </div>
    );
  }

  const favoriteCouturiers = mockFavoriteCouturiers; 

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-10">Mes Favoris</h1>
        
        {favoriteCouturiers.length === 0 ? (
          <div className="text-center p-8 bg-white rounded-lg shadow-lg">
            <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-xl text-gray-700">Vous n'avez pas encore ajouté de couturier à vos favoris.</p>
            <Link 
              to="/couturiers" 
              className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
            >
              Découvrir des couturiers
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteCouturiers.map((couturier) => (
              <div key={couturier.id} className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 flex flex-col items-center text-center">
                <img
                  src={couturier.avatar}
                  alt={couturier.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-blue-200 mb-4"
                />
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{couturier.businessName}</h2>
                <p className="text-gray-600 mb-3">{couturier.name}</p>
                <div className="flex items-center space-x-1 text-gray-700 mb-2">
                  <Star className="h-4 w-4 text-blue-400 fill-current" />
                  <span>{couturier.rating} ({couturier.reviewCount} avis)</span>
                </div>
                <p className="flex items-center text-gray-700 mb-4">
                  <MapPin className="h-4 w-4 mr-2" />
                  {couturier.location.district}, {couturier.location.city}
                </p>
                <Link
                  to={`/couturier/${couturier.id}`}
                  className="mt-auto bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Voir le profil
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}