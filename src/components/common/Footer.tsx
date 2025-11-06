import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Scissors } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              {/* CORRECTION DU LOGO : Remplacement du dégradé orange par un fond bleu */}
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Scissors className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">CoutureConnect</span>
            </div>
            <p className="text-gray-400 mb-4">
              La plateforme qui connecte les passionnés de couture avec les meilleurs artisans. 
              Découvrez, créez et partagez votre passion pour la mode.
            </p>
            <div className="flex space-x-4">
              {/* Liens réseaux sociaux (maintenus en blanc/gris pour le fond sombre) */}
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* For Clients */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Pour les Clients</h3>
            <ul className="space-y-2">
              <li><Link to="/couturiers" className="text-gray-400 hover:text-white transition-colors">Trouver un Couturier</Link></li>
              <li><Link to="/feed" className="text-gray-400 hover:text-white transition-colors">Inspirations</Link></li>
              <li><Link to="/how-it-works" className="text-gray-400 hover:text-white transition-colors">Comment ça marche</Link></li>
              <li><Link to="/pricing" className="text-gray-400 hover:text-white transition-colors">Tarifs</Link></li>
            </ul>
          </div>

          {/* For Couturiers */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Pour les Couturiers</h3>
            <ul className="space-y-2">
              <li><Link to="/register-couturier" className="text-gray-400 hover:text-white transition-colors">Devenir Couturier</Link></li>
              <li><Link to="/subscription-plans" className="text-gray-400 hover:text-white transition-colors">Plans d'abonnement</Link></li>
              <li><Link to="/success-stories" className="text-gray-400 hover:text-white transition-colors">Témoignages</Link></li>
              <li><Link to="/resources" className="text-gray-400 hover:text-white transition-colors">Ressources</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-gray-400">support@coutureconnect.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-gray-400" />
                <span className="text-gray-400">+235 65 97 18 63/68 98 33 87</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span className="text-gray-400">Tchad, N'djaména</span>
              </div>
            </div>
            <div className="mt-4">
              <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Centre d'aide</Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 CoutureConnect. Tous droits réservés. | 
            <Link to="/privacy" className="hover:text-white transition-colors ml-2">Politique de confidentialité</Link> | 
            <Link to="/terms" className="hover:text-white transition-colors ml-2">Conditions d'utilisation</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}