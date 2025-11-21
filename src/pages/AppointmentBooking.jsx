import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User, Check, Zap } from 'lucide-react';

// Fonction utilitaire pour simuler les créneaux disponibles
const getAvailableSlots = (date) => {
  // Simule des créneaux de 9h à 17h, sauf le week-end
  if (date.getDay() === 0 || date.getDay() === 6) return [];
  
  const slots = [];
  for (let h = 9; h <= 17; h++) {
    slots.push(`${h.toString().padStart(2, '0')}:00`);
    if (h < 17) slots.push(`${h.toString().padStart(2, '0')}:30`);
  }
  return slots;
};

const AppointmentBooking = () => {
  // Simuler le couturier sélectionné (passé via props ou URL)
  const couturier = {
    id: 'couturier-1',
    name: 'Léa Couture',
    specialty: 'Robes de Mariée et Soirée',
    rate: '50€ / heure de consultation',
    location: 'Paris 16ème',
    avatarUrl: 'https://placehold.co/60x60/3B82F6/FFFFFF?text=LC'
  };

  const [step, setStep] = useState(1); // 1: Sélection date/heure, 2: Détails, 3: Confirmation
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [service, setService] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [confirmationId, setConfirmationId] = useState(null);

  const availableSlots = getAvailableSlots(selectedDate);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simuler l'envoi de la demande de RDV à l'API
    await new Promise(resolve => setTimeout(resolve, 1500)); 
    
    // Simuler la confirmation
    setConfirmationId(Math.floor(Math.random() * 100000));
    setLoading(false);
    setStep(3);
  };

  // Composant d'étape de progression
  const StepIndicator = ({ number, title, active }) => (
    <div className={`flex flex-col items-center ${active ? 'text-blue-600' : 'text-gray-400'}`}>
      <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold ${active ? 'border-blue-600 bg-blue-50' : 'border-gray-300 bg-white'}`}>
        {number}
      </div>
      <p className="text-xs mt-1 text-center hidden sm:block">{title}</p>
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Choisissez une date et heure</h2>
      
      {/* Sélecteur de Date (Simplifié) */}
      <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg border">
        <Calendar className="w-6 h-6 text-blue-600" />
        <input 
          type="date" 
          value={selectedDate.toISOString().split('T')[0]} 
          onChange={(e) => handleDateChange(new Date(e.target.value))}
          min={new Date().toISOString().split('T')[0]}
          className="p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Sélecteur de Créneau Horaire */}
      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-3 flex items-center space-x-2">
          <Clock className="w-5 h-5 text-gray-500" />
          <span>Créneaux disponibles ({selectedDate.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'short' })})</span>
        </h3>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 max-h-60 overflow-y-auto p-2 border rounded-lg bg-white">
          {availableSlots.length > 0 ? (
            availableSlots.map(time => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`px-3 py-2 text-sm rounded-full transition-colors duration-150 ${
                  selectedTime === time 
                    ? 'bg-blue-600 text-white font-semibold shadow-md' 
                    : 'bg-gray-100 text-gray-800 hover:bg-blue-200'
                }`}
              >
                {time}
              </button>
            ))
          ) : (
            <p className="col-span-full text-center py-4 text-gray-500">Pas de créneaux disponibles ce jour.</p>
          )}
        </div>
      </div>
      
      <button 
        onClick={() => setStep(2)} 
        disabled={!selectedTime}
        className={`w-full py-3 px-4 rounded-full text-white font-semibold transition-all duration-300 ${!selectedTime ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-lg'}`}
      >
        Continuer (Étape 2)
      </button>
    </div>
  );

  const renderStep2 = () => (
    <form onSubmit={handleBooking} className="space-y-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Détails de la consultation</h2>

      {/* Résumé de la sélection */}
      <div className="p-4 bg-blue-50 rounded-xl border border-blue-200 text-blue-800">
          <p className="font-semibold text-lg flex items-center space-x-2"><Calendar /><span>Date: {selectedDate.toLocaleDateString('fr-FR')}</span></p>
          <p className="font-semibold text-lg flex items-center space-x-2"><Clock /><span>Heure: {selectedTime}</span></p>
          <p className="text-sm mt-2 text-blue-700">Vous pouvez revenir en arrière pour changer la sélection.</p>
      </div>

      {/* Type de Service */}
      <div>
        <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">Type de service souhaité</label>
        <select
          id="service"
          value={service}
          onChange={(e) => setService(e.target.value)}
          required
          className="block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Sélectionner un service</option>
          <option value="mariage">Consultation Robe de Mariée</option>
          <option value="soirée">Création de Vêtement de Soirée</option>
          <option value="retouche">Retouche ou Réparation Spécifique</option>
          <option value="general">Conseil Général / Devis</option>
        </select>
      </div>

      {/* Notes / Description */}
      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">Vos notes et attentes (détails du projet)</label>
        <textarea
          id="notes"
          rows="4"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="Décrivez brièvement le vêtement ou la nature de votre demande."
        />
      </div>

      <div className="flex justify-between space-x-4">
        <button
          type="button"
          onClick={() => setStep(1)}
          className="w-1/2 py-3 px-4 border border-gray-300 rounded-full text-gray-700 font-semibold hover:bg-gray-100 transition-colors"
        >
          Retour (Date)
        </button>
        <button
          type="submit"
          disabled={loading || !service}
          className={`w-1/2 py-3 px-4 rounded-full text-white font-semibold transition-all duration-300 ${
            loading ? 'bg-blue-400 cursor-wait' : 'bg-blue-600 hover:bg-blue-700 shadow-lg'
          }`}
        >
          {loading ? 'Envoi...' : 'Confirmer le Rendez-vous'}
        </button>
      </div>
    </form>
  );

  const renderConfirmation = () => (
    <div className="text-center py-10">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <Check className="h-10 w-10 text-green-600" />
      </div>
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Rendez-vous Confirmé !</h2>
      <p className="text-lg text-gray-600 mb-2">Votre demande a été envoyée à {couturier.name}.</p>
      <p className="text-sm text-gray-500 mb-8">
        ID de confirmation: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{confirmationId}</span>
      </p>

      <div className="space-y-3 max-w-sm mx-auto p-4 bg-blue-50 rounded-xl border border-blue-200 text-left">
          <p className="font-medium text-blue-800 flex items-center space-x-2"><Calendar /> {selectedDate.toLocaleDateString('fr-FR')} à {selectedTime}</p>
          <p className="font-medium text-blue-800 flex items-center space-x-2"><User /> Pour le service: {service}</p>
          <p className="text-xs text-blue-700 pt-2">Vous recevrez une confirmation finale par email après validation de {couturier.name}.</p>
      </div>
      
      <a href="/feed" className="mt-8 inline-block py-3 px-6 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-all">
        Retour à l'accueil
      </a>
    </div>
  );
  
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-10 border border-gray-100">
          
          {/* Header Couturier */}
          <div className="flex items-center space-x-4 mb-8 pb-4 border-b">
            <img src={couturier.avatarUrl} alt={couturier.name} className="w-12 h-12 rounded-full border-2 border-blue-500" />
            <div>
              <h1 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                <span>Rendez-vous avec {couturier.name}</span>
                <Zap className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              </h1>
              <p className="text-sm text-gray-500 flex items-center space-x-1">
                <MapPin className="w-3 h-3" />
                <span>{couturier.location}</span>
              </p>
            </div>
          </div>
          
          {/* Indicateur d'étapes */}
          <div className="flex justify-around items-center mb-8 border-b pb-4">
            <StepIndicator number={1} title="Date & Heure" active={step >= 1} />
            <div className={`h-0.5 w-1/4 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-300'} transition-colors duration-300`}></div>
            <StepIndicator number={2} title="Détails" active={step >= 2} />
            <div className={`h-0.5 w-1/4 ${step >= 3 ? 'bg-blue-600' : 'bg-gray-300'} transition-colors duration-300`}></div>
            <StepIndicator number={3} title="Confirmation" active={step >= 3} />
          </div>

          {/* Rendu des étapes */}
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderConfirmation()}
        </div>
      </div>
    </div>
  );
};

export default AppointmentBooking;