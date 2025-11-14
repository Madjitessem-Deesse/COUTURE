import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Calendar, Clock, User, MapPin, Info } from 'lucide-react';

const mockAppointments = [
  {
    id: 'appt1',
    couturierName: 'Fatou Diallo',
    couturierId: '3',
    date: '2024-03-20',
    time: '14:00',
    service: 'Robe de soirée sur mesure',
    status: 'Confirmé',
    location: 'Atelier Fatou Couture, Plateau Dakar',
  },
  {
    id: 'appt2',
    couturierName: 'Ibrahima Sarr',
    couturierId: '5',
    date: '2024-03-25',
    time: '10:30',
    service: 'Mesure costume homme',
    status: 'En attente',
    location: 'Tailleur Ibrahima, Medina Dakar',
  },
  {
    id: 'appt3',
    couturierName: 'Aminata Mbaye',
    couturierId: '4',
    date: '2024-04-01',
    time: '16:00',
    service: 'Retouche pantalon',
    status: 'Annulé',
    location: 'Couture Aminata, Almadies Dakar',
  },
];

export function Appointments() {
  const { user } = useAuth(); 

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Accès non autorisé</h2>
          <p className="text-gray-600 mb-6">Veuillez vous connecter pour voir vos rendez-vous.</p>
          <Link to="/login" className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors">
            Se connecter
          </Link>
        </div>
      </div>
    );
  }

  const userAppointments = mockAppointments; 

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-10">Mes Rendez-vous</h1>
        
        {userAppointments.length === 0 ? (
          <div className="text-center p-8 bg-white rounded-lg shadow-lg">
            <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-xl text-gray-700">Vous n'avez aucun rendez-vous pour le moment.</p>
            <Link 
              to="/couturiers" 
              className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
            >
              Prendre un rendez-vous
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {userAppointments.map((appt) => (
              <div key={appt.id} className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900">{appt.service}</h2>
                    <Link 
                      to={`/couturier/${appt.couturierId}`} 
                      className="text-blue-600 hover:underline text-lg flex items-center mt-1"
                    >
                      <User className="h-5 w-5 mr-2" />
                      {appt.couturierName}
                    </Link>
                  </div>
                  <span 
                    className={`px-3 py-1 rounded-full text-sm font-medium 
                      ${appt.status === 'Confirmé' ? 'bg-green-100 text-green-800' : ''}
                      ${appt.status === 'En attente' ? 'bg-yellow-100 text-yellow-800' : ''}
                      ${appt.status === 'Annulé' ? 'bg-red-100 text-red-800' : ''}
                    `}
                  >
                    {appt.status}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 mt-4 border-t pt-4">
                  <p className="flex items-center">
                    <Calendar className="h-5 w-5 text-blue-500 mr-3" />
                    Date: <span className="font-medium ml-2">{appt.date}</span>
                  </p>
                  <p className="flex items-center">
                    <Clock className="h-5 w-5 text-blue-500 mr-3" />
                    Heure: <span className="font-medium ml-2">{appt.time}</span>
                  </p>
                  <p className="flex items-center md:col-span-2">
                    <MapPin className="h-5 w-5 text-blue-500 mr-3" />
                    Lieu: <span className="font-medium ml-2">{appt.location}</span>
                  </p>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                  <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors">
                    Modifier
                  </button>
                  <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors">
                    Annuler
                  </button>
                  <Link 
                    to={`/appointments/${appt.id}`} 
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Détails
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}