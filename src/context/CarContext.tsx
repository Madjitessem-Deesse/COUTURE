import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product, CartItem } from '../types';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number, size?: string) => void;
  removeFromCart: (productId: string, size: string) => void; 
  updateQuantity: (productId: string, quantity: number, size: string) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product, quantity = 1, size = "Unique") => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === product.id && item.size === size);

      if (existingItem) {
        return prevItems.map(item =>
          (item.product.id === product.id && item.size === size)
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      
      return [...prevItems, { product, quantity, size }];
    });
  };
  const removeFromCart = (productId: string, size: string) => {
    setItems(prevItems => prevItems.filter(item => !(item.product.id === productId && item.size === size)));
  };


  const updateQuantity = (productId: string, quantity: number, size: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }
    setItems(prevItems =>
      prevItems.map(item =>
        (item.product.id === productId && item.size === size)
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  // Le calcul du total utilise `item.product.price`, qui est censé être en FCFA.
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const itemCount = items.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      total,
      itemCount
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};