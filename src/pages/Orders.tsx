import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Package, User, ShoppingCart, DollarSign, Calendar, CheckCircle, XCircle } from 'lucide-react';

const mockOrders = [
  {
    id: 'order1',
    couturierName: 'Fatou Diallo',
    couturierId: '3',
    date: '2024-02-10',
    item: 'Robe de mariée',
    amount: 250000, 
    status: 'Terminé',
    dueDate: '2024-03-01',
  },
  {
    id: 'order2',
    couturierName: 'Ibrahima Sarr',
    couturierId: '5',
    date: '2024-03-05',
    item: 'Costume 3 pièces',
    amount: 180000, 
    status: 'En cours',
    dueDate: '2024-03-30',
  },
  {
    id: 'order3',
    couturierName: 'Aminata Mbaye',
    couturierId: '4',
    date: '2024-01-20',
    item: 'Ensemble jupe-blouse',
    amount: 75000, 
    status: 'Annulé',
    dueDate: '2024-02-15',
  },
];

const formatCFA = (amount: number) => {
    return amount.toLocaleString('fr-FR', {
        style: 'currency',
        currency: 'XOF', 
        minimumFractionDigits: 0, 
        maximumFractionDigits: 0
    });
};

export function Orders() {
  const { user } = useAuth(); 

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Accès non autorisé</h2>
          <p className="text-gray-600 mb-6">Veuillez vous connecter pour voir vos commandes.</p>
          <Link to="/login" className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors">
            Se connecter
          </Link>
        </div>
      </div>
    );
  }

  const userOrders = mockOrders; 

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-10">Mes Commandes</h1>
        
        {userOrders.length === 0 ? (
          <div className="text-center p-8 bg-white rounded-lg shadow-lg">
            <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-xl text-gray-700">Vous n'avez pas encore passé de commande.</p>
            <Link 
              to="/couturiers" 
              className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
            >
              Explorer les couturiers
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {userOrders.map((order) => (
              <div key={order.id} className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900">{order.item}</h2>
                    <Link 
                      to={`/couturier/${order.couturierId}`} 
                      className="text-blue-600 hover:underline text-lg flex items-center mt-1"
                    >
                      <User className="h-5 w-5 mr-2" />
                      {order.couturierName}
                    </Link>
                  </div>
                  <div className="text-right">
                    <span 
                      className={`px-3 py-1 rounded-full text-sm font-medium 
                        ${order.status === 'Terminé' ? 'bg-green-100 text-green-800' : ''}
                        ${order.status === 'En cours' ? 'bg-yellow-100 text-yellow-800' : ''}
                        ${order.status === 'Annulé' ? 'bg-red-100 text-red-800' : ''}
                      `}
                    >
                      {order.status}
                    </span>
                    <p className="flex items-center text-gray-700 mt-2 text-xl font-bold">
                        <DollarSign className="h-6 w-6 text-green-600 mr-2" />
                        {formatCFA(order.amount)}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 mt-4 border-t pt-4">
                  <p className="flex items-center">
                    <Calendar className="h-5 w-5 text-blue-500 mr-3" />
                    Date de commande: <span className="font-medium ml-2">{order.date}</span>
                  </p>
                  <p className="flex items-center">
                    <Calendar className="h-5 w-5 text-blue-500 mr-3" />
                    Date de livraison estimée: <span className="font-medium ml-2">{order.dueDate}</span>
                  </p>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                  <Link 
                    to={`/orders/${order.id}`} 
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Détails de la commande
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