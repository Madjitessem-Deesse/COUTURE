import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Eye } from 'lucide-react';
import { Product} from '../../types';
import { useCart } from '../../context/CarContext';
import { useAuth } from '../../context/AuthContext';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { user } = useAuth();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
        
        {/* Quick Actions */}
        <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Link
            to={`/products/${product.id}`}
            className="p-2 bg-white rounded-full shadow-md hover:bg-blue-50 transition-colors"
          >
            <Eye className="h-4 w-4 text-gray-600" />
          </Link>
          {user && (
            <button
              onClick={handleAddToCart}
              className="p-2 bg-white rounded-full shadow-md hover:bg-green-50 transition-colors"
            >
              <ShoppingCart className="h-4 w-4 text-gray-600" />
            </button>
          )}
        </div>

        {/* Stock Badge */}
        {product.stock < 10 && (
          <div className="absolute top-3 left-3">
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              Stock limité
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="mb-2">
          <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
            {product.category}
          </span>
        </div>
        
        <Link to={`/products/${product.id}`} className="block">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center space-x-1 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">
            {product.rating} ({product.reviews.length})
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-gray-900">
              {product.price.toFixed(2)} €
            </span>
            <span className="text-sm text-gray-500">
              Stock: {product.stock}
            </span>
          </div>
          
          {user && (
            <button
              onClick={handleAddToCart}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden sm:inline">Ajouter</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}