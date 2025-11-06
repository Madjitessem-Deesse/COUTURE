import React from 'react';
import { Filter, X } from 'lucide-react';

interface ProductFiltersProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

// Fonction utilitaire pour formater le prix en FCFA
const formatCFA = (amount: number) => {
    try {
        return amount.toLocaleString('fr-FR', {
            style: 'currency',
            currency: 'XOF', // Franc CFA Ouest Africain
            minimumFractionDigits: 0, 
            maximumFractionDigits: 0
        });
    } catch (e) {
        return `${amount} F CFA`;
    }
};

// Plage max pour le slider (ajusté pour FCFA, ex: 0 - 500 000)
const MAX_PRICE_FCFA = 500000;
const STEP_FCFA = 10000; // Pas de 10 000 F CFA

export function ProductFilters({
  categories,
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  sortBy,
  onSortChange,
  isOpen,
  onToggle
}: ProductFiltersProps) {
  
  // Définit la plage de réinitialisation en FCFA
  const handleResetFilters = () => {
    onCategoryChange('');
    onPriceRangeChange([0, MAX_PRICE_FCFA]);
    onSortChange('name');
  }

  return (
    <>
      {/* Filter Toggle Button (Mobile) */}
      <button
        onClick={onToggle}
        // Bouton de toggle : utilise des couleurs neutres avec un accent de survol bleu
        className="lg:hidden flex items-center space-x-2 bg-white border border-gray-300 rounded-lg px-4 py-2 mb-4 hover:border-blue-500 hover:text-blue-600 transition-colors"
      >
        <Filter className="h-4 w-4" />
        <span>Filtres</span>
      </button>

      {/* Filter Panel */}
      <div className={`${isOpen ? 'block' : 'hidden'} lg:block bg-white rounded-lg border border-gray-200 p-6 shadow-sm`}>
        <div className="flex items-center justify-between mb-4 lg:hidden">
          <h2 className="text-lg font-semibold">Filtres</h2>
          <button onClick={onToggle} className="p-1 text-gray-600 hover:text-blue-600">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Categories */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Catégories</h3>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="category"
                  value=""
                  checked={selectedCategory === ''}
                  onChange={(e) => onCategoryChange(e.target.value)}
                  // Accent bleu pour le radio button
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300" 
                />
                <span className="ml-2 text-sm text-gray-700">Toutes</span>
              </label>
              {categories.map(category => (
                <label key={category} className="flex items-center">
                  <input
                    type="radio"
                    name="category"
                    value={category}
                    checked={selectedCategory === category}
                    onChange={(e) => onCategoryChange(e.target.value)}
                    // Accent bleu pour le radio button
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">{category}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Prix (FCFA)</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Prix minimum</label>
                <input
                  type="range"
                  min="0"
                  max={MAX_PRICE_FCFA.toString()} // Max en FCFA
                  step={STEP_FCFA.toString()} // Pas en FCFA
                  value={priceRange[0]}
                  onChange={(e) => onPriceRangeChange([Number(e.target.value), priceRange[1]])}
                  // Curseur avec accent bleu
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg focus:ring-2 focus:ring-blue-500" 
                  style={{ accentColor: '#3B82F6' }}
                />
                {/* Affichage en FCFA */}
                <span className="text-sm font-medium text-gray-700">{formatCFA(priceRange[0])}</span>
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Prix maximum</label>
                <input
                  type="range"
                  min="0"
                  max={MAX_PRICE_FCFA.toString()} // Max en FCFA
                  step={STEP_FCFA.toString()} // Pas en FCFA
                  value={priceRange[1]}
                  onChange={(e) => onPriceRangeChange([priceRange[0], Number(e.target.value)])}
                  // Curseur avec accent bleu
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg focus:ring-2 focus:ring-blue-500"
                  style={{ accentColor: '#3B82F6' }}
                />
                {/* Affichage en FCFA */}
                <span className="text-sm font-medium text-gray-700">{formatCFA(priceRange[1])}</span>
              </div>
            </div>
          </div>

          {/* Sort By */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Trier par</h3>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              // Focus ring bleu
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500 transition-colors"
            >
              <option value="name">Nom</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
              <option value="rating">Note</option>
              <option value="reviews">Nombre d'avis</option>
            </select>
          </div>

          {/* Reset Filters */}
          <button
            onClick={handleResetFilters}
            // Bouton réinitialiser avec un fond neutre et survol bleu
            className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colors text-sm font-medium border border-transparent hover:border-blue-300"
          >
            Réinitialiser les filtres
          </button>
        </div>
      </div>
    </>
  );
}