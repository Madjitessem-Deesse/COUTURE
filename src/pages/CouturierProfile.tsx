import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { 
  Star, 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  Calendar,
  Heart,
  MessageCircle,
  Share2,
  Camera,
  Award,
  Users,
  Scissors,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import djibrilImg from '../assets/djibril.jpg'; 
import dibrilImg from '../assets/dibril.jpg';
import portfolio1 from '../assets/portfolio_1.jpg';
import portfolio2 from '../assets/portfolio_2.jpg';
import portfolio3 from '../assets/portfolio_3.jpg';
import portfolio4 from '../assets/portfolio_4.jpg';
import portfolio5 from '../assets/portfolio_5.jpg';
import portfolio6 from '../assets/portfolio_6.jpg';
import postImage1 from '../assets/post_1.jpg';
import postImage2 from '../assets/post_2.jpg';



const MOCK_USER_ID_LOGGED_IN = '3'; 

const mockCouturier = {
  id: '3', 
  name: 'djibril brahim',
  businessName: 'Atelier Douba Couture',
  avatar: djibrilImg, 
  coverImage: dibrilImg, 
  
  specialties: ['Robes traditionnelles', 'Tenues de soirée', 'Costumes sur mesure'],
  experience: 8,
  rating: 4.8,
  reviewCount: 156,
  location: { city: 'tchad', district: 'Plateau' },
  phone: '+235 00 00 00 00',
  email: 'fatou@couture.com',
  description: 'Passionnée de couture depuis plus de 8 ans, je crée des pièces uniques qui allient tradition et modernité. Mon atelier situé au Plateau vous accueille pour donner vie à vos projets les plus ambitieux.',
  workingHours: {
    monday: { start: '09:00', end: '18:00', isOpen: true },
    tuesday: { start: '09:00', end: '18:00', isOpen: true },
    wednesday: { start: '09:00', end: '18:00', isOpen: true },
    thursday: { start: '09:00', end: '18:00', isOpen: true },
    friday: { start: '09:00', end: '18:00', isOpen: true },
    saturday: { start: '10:00', end: '16:00', isOpen: true },
    sunday: { start: '00:00', end: '00:00', isOpen: false }
  },
  priceRange: { min: 50, max: 500 },
  
  // Portfolio mis à jour avec les imports locaux
  portfolio: [
    portfolio1,
    portfolio2,
    portfolio3,
    portfolio4,
    portfolio5,
    portfolio6
  ],
  posts: [
    {
      id: '1',
      content: 'Nouvelle collection de robes traditionnelles disponible ! Chaque pièce raconte une histoire unique.',
      images: [postImage1], 
      likes: 45,
      comments: 12,
      createdAt: '2024-01-20T10:30:00Z'
    },
    {
      id: '2',
      content: 'Merci à ma cliente Marie pour sa confiance ! Une robe de soirée sur mesure qui lui va à merveille ✨',
      images: [postImage2], 
      likes: 67,
      comments: 8,
      createdAt: '2024-01-18T15:45:00Z'
    }
  ],
  followers: 1250,
  following: 89,
  isVerified: true,
  subscription: { type: 'premium', isActive: true }
};

export function CouturierProfile() {
  const { id } = useParams();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('posts');
  const [isFollowing, setIsFollowing] = useState(false);

  // Utilisez l'ID de l'utilisateur mocké pour la démonstration
  const currentUserId = user ? user.id : MOCK_USER_ID_LOGGED_IN; 
  // Dans votre application, utilisez simplement 'user ? user.id : null'
  
  // In real app, fetch couturier data based on id
  const couturier = mockCouturier;

  if (!couturier) {
    return <Navigate to="/couturiers" replace />;
  }

  // Logique pour vérifier si l'utilisateur connecté est le propriétaire du profil
  const isOwner = currentUserId === couturier.id;

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const DayOfWeek = ({ day, hours }: { day: string, hours: { start: string, end: string, isOpen: boolean } }) => (
    <div className="flex justify-between items-center text-sm">
      <span className="font-medium text-gray-700">{day}</span>
      {hours.isOpen ? (
        <span className="text-gray-600">{hours.start} - {hours.end}</span>
      ) : (
        <span className="text-red-500 font-medium">Fermé</span>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cover Photo - Changement de couleur au BLEU */}
      <div className="relative h-80 bg-gradient-to-r from-blue-700 to-blue-900">
        <img
          src={couturier.coverImage}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        
        {/* Cover Actions - Affiché UNIQUEMENT si isOwner est vrai */}
        {isOwner && (
          <div className="absolute bottom-4 right-4 flex space-x-2">
            <button className="bg-white bg-opacity-90 text-gray-800 px-4 py-2 rounded-lg hover:bg-opacity-100 transition-all flex items-center space-x-2">
              <Camera className="h-4 w-4" />
              <span>Modifier la couverture</span>
            </button>
          </div>
        )}
      </div>

      {/* Profile Header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative -mt-20 bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
          <div className="flex flex-col md:flex-row items-start md:items-end space-y-4 md:space-y-0 md:space-x-6">
            {/* Profile Picture */}
            <div className="relative">
              <img
                src={couturier.avatar}
                alt={couturier.name}
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
              />
              {/* Pastille de vérification en BLEU */}
              {couturier.isVerified && (
                <div className="absolute -bottom-2 -right-2 bg-blue-500 rounded-full p-2">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
              )}
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-1">
                    {couturier.businessName}
                  </h1>
                  <p className="text-xl text-gray-600 mb-2">{couturier.name}</p>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span>{couturier.rating} ({couturier.reviewCount} avis)</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{couturier.location.city}, {couturier.location.district}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Award className="h-4 w-4" />
                      <span>{couturier.experience} ans d'expérience</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6 text-sm">
                    <span><strong>{couturier.followers}</strong> abonnés</span>
                    <span><strong>{couturier.following}</strong> abonnements</span>
                    <span><strong>{couturier.posts.length}</strong> publications</span>
                  </div>
                </div>

                {/* Action Buttons - Affiche les boutons d'action (Abonner, Message, RDV) uniquement si l'utilisateur n'est PAS le propriétaire */}
                {!isOwner && (
                  <div className="flex space-x-3 mt-4 md:mt-0">
                    <button
                      onClick={handleFollow}
                      className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                        isFollowing
                          ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                          : 'bg-blue-500 text-white hover:bg-blue-600' // Changé au BLEU
                      }`}
                    >
                      {isFollowing ? 'Abonné' : 'S\'abonner'}
                    </button>
                    <button className="px-6 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors">
                      Message
                    </button>
                    <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"> {/* Changé au BLEU */}
                      <Calendar className="h-4 w-4" />
                      <span>Prendre RDV</span>
                    </button>
                  </div>
                )}
                {/* Bouton(s) d'édition de profil pour le propriétaire */}
                {isOwner && (
                    <div className="flex space-x-3 mt-4 md:mt-0">
                      <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                        Éditer le Profil
                      </button>
                    </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-200">
          <div className="flex space-x-8 px-6">
            {[
              { id: 'posts', label: 'Publications', icon: MessageCircle },
              { id: 'about', label: 'À propos', icon: Users },
              { id: 'portfolio', label: 'Portfolio', icon: Camera },
              { id: 'reviews', label: 'Avis', icon: Star }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center space-x-2 py-4 border-b-2 transition-colors ${
                  activeTab === id
                    ? 'border-blue-500 text-blue-600' // Changé au BLEU
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === 'posts' && (
              <div className="space-y-6">
                {/* Bouton pour ajouter une publication affiché UNIQUEMENT pour le propriétaire */}
                {isOwner && (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 text-center">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center w-full space-x-2">
                            <MessageCircle className="h-5 w-5" />
                            <span>Créer une nouvelle publication</span>
                        </button>
                    </div>
                )}
                {couturier.posts.map((post) => (
                  <div key={post.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                          <img
                            src={couturier.avatar}
                            alt={couturier.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div>
                            <h3 className="font-semibold text-gray-900">{couturier.businessName}</h3>
                            <p className="text-sm text-gray-600">
                              {new Date(post.createdAt).toLocaleDateString('fr-FR')}
                            </p>
                          </div>
                      </div>
                      {/* Bouton de modification/suppression de post affiché UNIQUEMENT pour le propriétaire */}
                      {isOwner && (
                         <button className="text-gray-400 hover:text-gray-700">...</button>
                      )}
                    </div>
                    
                    <p className="text-gray-800 mb-4">{post.content}</p>
                    
                    {post.images.length > 0 && (
                      <div className="mb-4">
                        <img
                          src={post.images[0]}
                          alt="Post"
                          className="w-full h-80 object-cover rounded-xl"
                        />
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex items-center space-x-6">
                        <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"> {/* Changé au BLEU */}
                          <Heart className="h-5 w-5" />
                          <span>{post.likes}</span>
                        </button>
                        <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"> {/* Changé au BLEU */}
                          <MessageCircle className="h-5 w-5" />
                          <span>{post.comments}</span>
                        </button>
                        <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"> {/* Changé au BLEU */}
                          <Share2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'about' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">À propos</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                    <p className="text-gray-700 leading-relaxed">{couturier.description}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Spécialités</h3>
                    <div className="flex flex-wrap gap-2">
                      {couturier.specialties.map((specialty, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm" // Changé au BLEU
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Informations de contact</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Phone className="h-5 w-5 text-gray-400" />
                        <span className="text-gray-700">{couturier.phone}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Mail className="h-5 w-5 text-gray-400" />
                        <span className="text-gray-700">{couturier.email}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-5 w-5 text-gray-400" />
                        <span className="text-gray-700">{couturier.location.city}, {couturier.location.district}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Horaires</h3>
                    <div className="space-y-1">
                      <DayOfWeek day="Lundi" hours={couturier.workingHours.monday} />
                      <DayOfWeek day="Mardi" hours={couturier.workingHours.tuesday} />
                      <DayOfWeek day="Mercredi" hours={couturier.workingHours.wednesday} />
                      <DayOfWeek day="Jeudi" hours={couturier.workingHours.thursday} />
                      <DayOfWeek day="Vendredi" hours={couturier.workingHours.friday} />
                      <DayOfWeek day="Samedi" hours={couturier.workingHours.saturday} />
                      <DayOfWeek day="Dimanche" hours={couturier.workingHours.sunday} />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Tarifs</h3>
                    <p className="text-gray-700">
                      De {couturier.priceRange.min}€ à {couturier.priceRange.max}€
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'portfolio' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Portfolio</h2>
                {isOwner && (
                     <button className="mb-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2">
                        <Camera className="h-4 w-4" />
                        <span>Ajouter des créations</span>
                     </button>
                )}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {couturier.portfolio.map((image, index) => (
                    <div key={index} className="aspect-square relative rounded-xl overflow-hidden">
                      <img
                        src={image} 
                        alt={`Portfolio ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                      {isOwner && (
                          <button className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-1 rounded-full hover:bg-opacity-70">
                            X
                          </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeTab === 'reviews' && (
                 <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                     <h2 className="text-2xl font-bold text-gray-900 mb-6">Avis Clients</h2>
                     <p className="text-gray-700">Contenu pour la section Avis (à implémenter).</p>
                 </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Informations</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Horaires</p>
                    <p className="text-sm text-gray-600">Lun-Ven: 9h-18h</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Scissors className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Expérience</p>
                    <p className="text-sm text-gray-600">{couturier.experience} années</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Horaires Détaillés */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Horaires d'ouverture</h3>
              <div className="space-y-2">
                <DayOfWeek day="Lundi" hours={couturier.workingHours.monday} />
                <DayOfWeek day="Mardi" hours={couturier.workingHours.tuesday} />
                <DayOfWeek day="Mercredi" hours={couturier.workingHours.wednesday} />
                <DayOfWeek day="Jeudi" hours={couturier.workingHours.thursday} />
                <DayOfWeek day="Vendredi" hours={couturier.workingHours.friday} />
                <DayOfWeek day="Samedi" hours={couturier.workingHours.saturday} />
                <DayOfWeek day="Dimanche" hours={couturier.workingHours.sunday} />
              </div>
            </div>

            {/* Recent Reviews */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Avis récents</h3>
              <div className="space-y-4">
                <div className="border-b border-gray-200 pb-4 last:border-b-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">Marie D.</span>
                  </div>
                  <p className="text-sm text-gray-700">
                    "Excellent travail ! Ma robe était parfaite et livrée dans les temps."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const DayOfWeek = ({ day, hours }: { day: string, hours: { start: string, end: string, isOpen: boolean } }) => (
  <div className="flex justify-between items-center text-sm">
    <span className="font-medium text-gray-700">{day}</span>
    {hours.isOpen ? (
      <span className="text-gray-600">{hours.start} - {hours.end}</span>
    ) : (
      <span className="text-red-500 font-medium">Fermé</span>
    )}
  </div>
);