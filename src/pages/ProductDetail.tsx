import { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Truck, Shield, ArrowLeft } from 'lucide-react';
import { mockProducts } from '../data/mockData';
import { useCart } from '../context/CarContext';
import { useAuth } from '../context/AuthContext';

// --- DEVISE FCFA ---
const formatCFA = (amount:Number) => {
    if (typeof amount !== 'number' || isNaN(amount)) {
        return 'Prix non spécifié'; 
    }
    
    // Convertir l'euro mocké en un montant réaliste en FCFA (par exemple, 1€ = 655.957 FCFA)
    const cfaAmount = amount * 656; // Multiplicateur pour l'exemple
    
    try {
        return cfaAmount.toLocaleString('fr-FR', {
            style: 'currency',
            currency: 'XOF', // Franc CFA Ouest Africain
            minimumFractionDigits: 0, 
            maximumFractionDigits: 0
        });
    } catch (e) {
        return `${Math.round(cfaAmount)} F CFA`;
    }
};


export function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const product = mockProducts.find(p => p.id === id);

  if (!product) {
    return <Navigate to="/products" replace />;
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const productImages = [product.image, product.image, product.image]; 
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <button
          onClick={() => window.history.back()}
          className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 mb-6"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Retour</span>
        </button>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Product Images */}
            <div>
              <div className="aspect-square rounded-xl overflow-hidden mb-4">
                <img
                  src={productImages[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? 'border-blue-500 shadow-md' : 'border-gray-200'
                    }`}
                  >
                    <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <div className="mb-4">
                <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                  {product.category}
                </span>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-blue-400 fill-current' // Étoiles actives en BLEU
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">
                  {product.rating} ({product.reviews.length} avis)
                </span>
              </div>

              {/* Price */}
              <div className="mb-6">
                {/* AFFICHAGE EN FCFA */}
                <span className="text-4xl font-bold text-gray-900">
                  {formatCFA(product.price)}
                </span>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>

              {/* Stock */}
              <div className="mb-6">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-600">Stock disponible:</span>
                  <span className={`font-medium ${
                    product.stock > 10 ? 'text-blue-600' : 'text-red-500' 
                  }`}>
                    {product.stock} unités
                  </span>
                </div>
              </div>

              {user && (
                <div className="mb-8">
                  <div className="flex items-center space-x-4 mb-4">
                    <label className="text-gray-700 font-medium">Quantité:</label>
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3 py-1 hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="px-4 py-1 border-x border-gray-300">{quantity}</span>
                      <button
                        onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                        className="px-3 py-1 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={handleAddToCart}
                      className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 shadow-md"
                    >
                      <ShoppingCart className="h-5 w-5" />
                      <span>Ajouter au panier</span>
                    </button>
                    <button 
                      className="p-3 border border-gray-300 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      <Heart className="h-5 w-5 text-gray-600 hover:text-red-500" />
                    </button>
                  </div>
                </div>
              )}

              {!user && (
                <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-blue-800 text-center font-medium">
                    Connectez-vous pour ajouter ce produit à votre panier
                  </p>
                </div>
              )}

              {/* Features */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  <Truck className="h-5 w-5 text-blue-600" /> 
                  <span className="text-sm text-gray-600">Livraison gratuite</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <span className="text-sm text-gray-600">Garantie 2 ans</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}