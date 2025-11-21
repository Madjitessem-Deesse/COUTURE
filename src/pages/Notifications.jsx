import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { Bell, Heart, MessageSquare, Tag, UserPlus, Clock } from 'lucide-react';

const Notifications = () => {
  const { user } = useAuth();
  const { notifications: rawNotifications } = useApp();


  const simulatedNotifications = [
    { id: 1, type: 'like', text: 'Alex a aimé votre dernière publication "Robe de soirée".', time: '10m', read: false, link: '/post/123' },
    { id: 2, type: 'comment', text: 'Marie a commenté: "Super travail, les finitions sont parfaites !"', time: '35m', read: false, link: '/post/123' },
    { id: 3, type: 'follow', text: 'Léa Couture vous suit désormais.', time: '1h', read: true, link: '/profile/lea_couture' },
    { id: 4, type: 'appointment', text: 'Nouveau rendez-vous de consultation confirmé avec Client A.', time: '3h', read: true, link: '/appointments/456' },
    { id: 5, type: 'tag', text: 'Vous avez été tagué dans la publication de Jean.', time: 'Hier', read: true, link: '/post/789' },
    { id: 6, type: 'like', text: 'Un autre utilisateur a aimé votre publication.', time: '2j', read: true, link: '/post/123' },
  ];

  const getIcon = (type) => {
    switch (type) {
      case 'like': return { icon: Heart, color: 'text-red-500', bg: 'bg-red-100' };
      case 'comment': return { icon: MessageSquare, color: 'text-blue-500', bg: 'bg-blue-100' };
      case 'follow': return { icon: UserPlus, color: 'text-green-500', bg: 'bg-green-100' };
      case 'appointment': return { icon: Clock, color: 'text-purple-500', bg: 'bg-purple-100' };
      case 'tag': return { icon: Tag, color: 'text-orange-500', bg: 'bg-orange-100' };
      default: return { icon: Bell, color: 'text-gray-500', bg: 'bg-gray-100' };
    }
  };

  const NotificationItem = ({ notification }) => {
    const { icon: Icon, color, bg } = getIcon(notification.type);
    
    return (
      <a 
        href={notification.link}
        className={`flex items-start p-4 rounded-xl transition-all duration-200 cursor-pointer ${
          notification.read 
            ? 'bg-white hover:bg-gray-50 border border-gray-100' 
            : 'bg-blue-50 hover:bg-blue-100 border border-blue-200'
        }`}
      >
        {/* Icône de notification */}
        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mr-4 ${bg}`}>
          <Icon className={`w-5 h-5 ${color}`} />
        </div>
        
        {/* Contenu */}
        <div className="flex-grow">
          <p className="text-gray-800 text-sm font-medium leading-snug">{notification.text}</p>
          <p className="text-gray-500 text-xs mt-1 flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>{notification.time}</span>
          </p>
        </div>

        {/* Marqueur "Non lu" */}
        {!notification.read && (
          <div className="flex-shrink-0 w-2 h-2 ml-4 mt-2 bg-blue-600 rounded-full animate-pulse" title="Non lu"></div>
        )}
      </a>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-10 border border-gray-100">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <Bell className="w-8 h-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
            </div>
            <button 
              className="text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors"
              onClick={() => alert("Simuler le marquage de tout comme lu")} // Utiliser modal en production
            >
              Marquer tout comme lu
            </button>
          </div>

          <div className="space-y-4">
            {simulatedNotifications.length > 0 ? (
              simulatedNotifications.map(n => (
                <NotificationItem key={n.id} notification={n} />
              ))
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Bell className="w-10 h-10 mx-auto mb-4" />
                <p className="text-lg">Vous êtes à jour ! Aucune nouvelle notification.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;