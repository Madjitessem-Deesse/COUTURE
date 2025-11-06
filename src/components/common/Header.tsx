import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  Bell, 
  User, 
  Menu, 
  X, 
  LogOut, 
  Settings, 
  Calendar,
  Package,
  Heart,
  Scissors
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout, isCouturier, isClient, isAdmin } = useAuth();
  const { notifications } = useApp();
  const navigate = useNavigate();

  const unreadNotifications = notifications.filter(n => !n.isRead).length;

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            {/* LOGO EN BLEU */}
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <Scissors className="h-6 w-6 text-white" />
            </div>
            {/* NOM DE MARQUE EN BLEU */}
            <span className="text-xl font-bold text-blue-600">
              CoutureConnect
            </span>
          </Link>

          {/* Search Bar - Hidden on mobile */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher des couturiers, créations..."
                // Focus Ring en BLEU
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </form>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/feed" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Fil d'actualité
            </Link>
            <Link to="/couturiers" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Couturiers
            </Link>
            {isCouturier && (
              <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Mon Atelier
              </Link>
            )}
            {isAdmin && (
              <Link to="/admin" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Administration
              </Link>
            )}
          </nav>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            {user && (
              <>
                {/* Notifications */}
                <Link to="/notifications" className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors">
                  <Bell className="h-6 w-6" />
                  {unreadNotifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {unreadNotifications > 9 ? '9+' : unreadNotifications}
                    </span>
                  )}
                </Link>

                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="h-8 w-8 rounded-full object-cover" />
                    ) : (
                      // Avatar placeholder en BLEU
                      <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-white" />
                      </div>
                    )}
                    <span className="hidden sm:block text-gray-700 font-medium">{user.name}</span>
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border py-2 z-50">
                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <User className="h-4 w-4 mr-3" />
                        Mon Profil
                      </Link>
                      
                      {isClient && (
                        <>
                          <Link
                            to="/appointments"
                            className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <Calendar className="h-4 w-4 mr-3" />
                            Mes Rendez-vous
                          </Link>
                          <Link
                            to="/orders"
                            className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <Package className="h-4 w-4 mr-3" />
                            Mes Commandes
                          </Link>
                          <Link
                            to="/favorites"
                            className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <Heart className="h-4 w-4 mr-3" />
                            Favoris
                          </Link>
                        </>
                      )}

                      {isCouturier && (
                        <>
                          <Link
                            to="/dashboard"
                            className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <Scissors className="h-4 w-4 mr-3" />
                            Mon Atelier
                          </Link>
                          <Link
                            to="/subscription"
                            className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <Settings className="h-4 w-4 mr-3" />
                            Abonnement
                          </Link>
                        </>
                      )}
                      
                      {isAdmin && (
                        <Link
                          to="/admin"
                          className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <Settings className="h-4 w-4 mr-3" />
                          Administration
                        </Link>
                      )}

                      <hr className="my-2" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-blue-50"
                      >
                        <LogOut className="h-4 w-4 mr-3" />
                        Déconnexion
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}

            {!user && (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  // Lien de connexion en BLEU
                  className="text-gray-700 hover:text-blue-600 font-medium"
                >
                  Connexion
                </Link>
                <Link
                  to="/register"
                  // Bouton S'inscrire en BLEU
                  className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-all"
                >
                  S'inscrire
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-blue-600"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </form>

            <nav className="flex flex-col space-y-2">
              <Link
                to="/feed"
                className="text-gray-700 hover:text-blue-600 py-2 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Fil d'actualité
              </Link>
              <Link
                to="/couturiers"
                className="text-gray-700 hover:text-blue-600 py-2 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Couturiers
              </Link>
              {isCouturier && (
                <Link
                  to="/dashboard"
                  className="text-gray-700 hover:text-blue-600 py-2 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Mon Atelier
                </Link>
              )}
              {isAdmin && (
                <Link
                  to="/admin"
                  className="text-gray-700 hover:text-blue-600 py-2 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Administration
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}