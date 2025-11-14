import { Link } from 'react-router-dom';
import { ShoppingCart, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CarContext';
import { useAuth } from '../context/AuthContext';


const formatCFA = (amount: number) => {
    if (typeof amount !== 'number' || isNaN(amount)) {
      return 'Prix non spécifié'; 
    }
    return amount.toLocaleString('fr-FR', {
        style: 'currency',
        currency: 'XOF', 
        minimumFractionDigits: 0, 
        maximumFractionDigits: 0
    });
};

export function Cart() {
  const { items, updateQuantity, removeFromCart, total, clearCart } = useCart();
  const { user } = useAuth();

  const subTotal = total;
  const tvaRate = 0.18; 
  const tvaAmount = subTotal * tvaRate;
  const grandTotal = subTotal + tvaAmount;

  // --- LOGIQUE DE REDIRECTION SI NON CONNECTÉ OU PANIER VIDE ---
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <ShoppingCart className="h-16 w-16 text-blue-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Connectez-vous pour voir votre panier</h2>
            <p className="text-gray-600 mb-6">Vous devez être connecté pour accéder à votre panier d'achat.</p>
            <Link
              to="/login"
              className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <span>Se connecter</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <ShoppingCart className="h-16 w-16 text-blue-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Votre panier est vide</h2>
            <p className="text-gray-600 mb-6">Découvrez nos produits et ajoutez-les à votre panier.</p>
            <Link
              to="/products"
              className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <span>Découvrir nos produits</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // --- AFFICHAGE DU PANIER ---
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Mon Panier</h1>
          <button
            onClick={clearCart}
            className="text-red-600 hover:text-red-700 text-sm font-medium transition-colors"
          >
            Vider le panier
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              {items.map((item) => (
                <div key={`${item.product.id}-${item.size}`} className="p-6 border-b border-gray-200 last:border-b-0">
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <Link
                        to={`/products/${item.product.id}`}
                        className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-gray-600 text-sm mt-1">{item.product.category}</p>
                     
                      <p className="text-gray-600 text-sm mt-1">Taille: {item.size}</p> 

                      <div className="flex items-center justify-between mt-3">
                        <span className="text-xl font-bold text-gray-900">
                          {formatCFA(item.product.price * item.quantity)}
                        </span>
                        <div className="flex items-center space-x-3">
                          
                          <div className="flex items-center border border-gray-300 rounded-lg">
                            <button
                             
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.size)}
                              className="p-1 hover:bg-gray-100 transition-colors"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="px-3 py-1 border-x border-gray-300 min-w-[50px] text-center font-medium">
                              {item.quantity}
                            </span>
                            <button
                              
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.size)}
                              className="p-1 hover:bg-gray-100 transition-colors"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          
                          <button
                            onClick={() => removeFromCart(item.product.id, item.size)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Résumé de la commande</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Sous-total</span>
                  <span className="text-gray-900 font-medium">{formatCFA(subTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">TVA ({tvaRate * 100}%)</span> 
                  <span className="text-gray-900 font-medium">{formatCFA(tvaAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Livraison</span>
                  <span className="text-green-600 font-medium">Gratuite</span>
                </div>
                <hr className="my-2 border-gray-200" />
                <div className="flex justify-between text-xl font-bold">
                  <span className="text-gray-900">Total à payer</span>
                  <span className="text-blue-600">{formatCFA(grandTotal)}</span>
                </div>
              </div>

              <button 
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold mb-4"
              >
                Procéder au paiement
              </button>

              <Link
                to="/products"
                className="block text-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                Continuer mes achats
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}