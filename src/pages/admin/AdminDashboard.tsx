import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { Users, Scissors, TrendingUp, DollarSign, ShoppingBag, Calendar, AlertCircle, Eye, CreditCard as Edit, Trash2, Plus, Search, Filter, BarChart3, PieChart, Activity } from 'lucide-react';

// Mock data for admin dashboard
const mockStats = {
  totalUsers: 1250,
  totalCouturiers: 89,
  totalRevenue: 45680,
  totalOrders: 234,
  monthlyGrowth: 12.5,
  activeSubscriptions: 67
};

const mockRecentUsers = [
  { id: '1', name: 'Marie Dubois', email: 'marie@example.com', role: 'client', joinDate: '2024-01-20', status: 'active' },
  { id: '2', name: 'Fatou Diallo', email: 'fatou@couture.com', role: 'couturier', joinDate: '2024-01-18', status: 'active' },
  { id: '3', name: 'Aminata Ba', email: 'aminata@example.com', role: 'client', joinDate: '2024-01-15', status: 'pending' },
  { id: '4', name: 'Ibrahima Sarr', email: 'ibrahima@couture.com', role: 'couturier', joinDate: '2024-01-12', status: 'active' }
];

const mockRecentOrders = [
  { id: 'ORD-001', customer: 'Marie Dubois', couturier: 'Fatou Diallo', amount: 150, status: 'completed', date: '2024-01-20' },
  { id: 'ORD-002', customer: 'Aminata Ba', couturier: 'Ibrahima Sarr', amount: 280, status: 'in_progress', date: '2024-01-19' },
  { id: 'ORD-003', customer: 'Khady Ndiaye', couturier: 'Fatou Diallo', amount: 95, status: 'pending', date: '2024-01-18' },
  { id: 'ORD-004', customer: 'Moussa Diop', couturier: 'Aminata Mbaye', amount: 320, status: 'completed', date: '2024-01-17' }
];

const mockCouturiers = [
  { id: '1', name: 'Fatou Diallo', business: 'Atelier Fatou', subscription: 'premium', revenue: 12500, orders: 45, rating: 4.8, status: 'active' },
  { id: '2', name: 'Ibrahima Sarr', business: 'Tailleur Ibrahima', subscription: 'basic', revenue: 8900, orders: 32, rating: 4.6, status: 'active' },
  { id: '3', name: 'Aminata Mbaye', business: 'Couture Aminata', subscription: 'premium', revenue: 15600, orders: 58, rating: 4.9, status: 'active' },
  { id: '4', name: 'Aissatou Ba', business: 'Atelier Aissatou', subscription: 'basic', revenue: 6700, orders: 28, rating: 4.5, status: 'pending' }
];

export function AdminDashboard() {
  const { user, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  if (!user || !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Administrateur</h1>
          <p className="text-gray-600">Bienvenue, {user.name} - Gérez votre plateforme CoutureConnect</p>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 mb-8">
          <div className="flex space-x-8 px-6 overflow-x-auto">
            {[
              { id: 'overview', label: 'Vue d\'ensemble', icon: BarChart3 },
              { id: 'users', label: 'Utilisateurs', icon: Users },
              { id: 'couturiers', label: 'Couturiers', icon: Scissors },
              { id: 'orders', label: 'Commandes', icon: ShoppingBag },
              { id: 'analytics', label: 'Analytiques', icon: TrendingUp }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center space-x-2 py-4 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === id
                    ? 'border-orange-500 text-orange-600'
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
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Total Utilisateurs</p>
                    <p className="text-3xl font-bold text-gray-900">{mockStats.totalUsers.toLocaleString()}</p>
                    <p className="text-sm text-green-600 mt-1">+{mockStats.monthlyGrowth}% ce mois</p>
                  </div>
                  <div className="bg-orange-100 p-3 rounded-full">
                    <Users className="h-8 w-8 text-orange-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Couturiers Actifs</p>
                    <p className="text-3xl font-bold text-gray-900">{mockStats.totalCouturiers}</p>
                    <p className="text-sm text-blue-600 mt-1">{mockStats.activeSubscriptions} abonnés</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Scissors className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Chiffre d'Affaires</p>
                    <p className="text-3xl font-bold text-gray-900">{mockStats.totalRevenue.toLocaleString()}€</p>
                    <p className="text-sm text-green-600 mt-1">+15.3% ce mois</p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-full">
                    <DollarSign className="h-8 w-8 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Commandes</p>
                    <p className="text-3xl font-bold text-gray-900">{mockStats.totalOrders}</p>
                    <p className="text-sm text-orange-600 mt-1">12 en attente</p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-full">
                    <ShoppingBag className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Users */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">Nouveaux Utilisateurs</h2>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {mockRecentUsers.map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                            <Users className="h-5 w-5 text-orange-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{user.name}</p>
                            <p className="text-sm text-gray-600">{user.email}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                            {user.role}
                          </span>
                          <p className="text-xs text-gray-500 mt-1">{new Date(user.joinDate).toLocaleDateString('fr-FR')}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Orders */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">Commandes Récentes</h2>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {mockRecentOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">#{order.id}</p>
                          <p className="text-sm text-gray-600">{order.customer} → {order.couturier}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{order.amount}€</p>
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Gestion des Utilisateurs</h2>
                <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors flex items-center space-x-2">
                  <Plus className="h-4 w-4" />
                  <span>Ajouter</span>
                </button>
              </div>
              <div className="mt-4 flex items-center space-x-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Rechercher un utilisateur..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Filter className="h-4 w-4" />
                  <span>Filtres</span>
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Utilisateur</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rôle</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date d'inscription</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockRecentUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                            <Users className="h-5 w-5 text-orange-600" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          user.role === 'couturier' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(user.joinDate).toLocaleDateString('fr-FR')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-orange-600 hover:text-orange-900">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="text-blue-600 hover:text-blue-900">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'couturiers' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Gestion des Couturiers</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Couturier</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Abonnement</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenus</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commandes</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Note</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockCouturiers.map((couturier) => (
                    <tr key={couturier.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                            <Scissors className="h-5 w-5 text-orange-600" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{couturier.name}</div>
                            <div className="text-sm text-gray-500">{couturier.business}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          couturier.subscription === 'premium' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {couturier.subscription}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {couturier.revenue.toLocaleString()}€
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {couturier.orders}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-sm text-gray-900 mr-1">{couturier.rating}</span>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <div
                                key={i}
                                className={`h-3 w-3 rounded-full mr-1 ${
                                  i < Math.floor(couturier.rating) ? 'bg-yellow-400' : 'bg-gray-200'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-orange-600 hover:text-orange-900">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="text-blue-600 hover:text-blue-900">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Revenue Chart Placeholder */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Évolution du Chiffre d'Affaires</h3>
                <div className="h-64 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 text-orange-400 mx-auto mb-2" />
                    <p className="text-gray-600">Graphique des revenus</p>
                  </div>
                </div>
              </div>

              {/* User Growth Chart Placeholder */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Croissance des Utilisateurs</h3>
                <div className="h-64 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <TrendingUp className="h-12 w-12 text-blue-400 mx-auto mb-2" />
                    <p className="text-gray-600">Graphique de croissance</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Activity Feed */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Activité Récente</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <Activity className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Nouveau couturier inscrit</p>
                      <p className="text-xs text-gray-600">Aminata Mbaye a rejoint la plateforme</p>
                    </div>
                    <span className="text-xs text-gray-500">Il y a 2h</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <ShoppingBag className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Commande terminée</p>
                      <p className="text-xs text-gray-600">Commande #ORD-001 livrée avec succès</p>
                    </div>
                    <span className="text-xs text-gray-500">Il y a 4h</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-yellow-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Abonnement expiré</p>
                      <p className="text-xs text-gray-600">L'abonnement de Moussa Diop expire dans 3 jours</p>
                    </div>
                    <span className="text-xs text-gray-500">Il y a 6h</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}