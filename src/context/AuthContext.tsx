import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Couturier } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: Omit<User, 'id' | 'createdAt' | 'isVerified'> & { password: string }) => Promise<boolean>;
  registerCouturier: (userData: Omit<Couturier, 'id' | 'createdAt' | 'isVerified' | 'rating' | 'reviewCount'> & { password: string }) => Promise<boolean>;
  isCouturier: boolean;
  isClient: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users data
const mockUsers: (User & { password: string })[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@coutureconnect.com',
    password: 'admin123',
    role: 'admin',
    avatar: 'https://images.pexels.com/photos/3777931/pexels-photo-3777931.jpeg?auto=compress&cs=tinysrgb&w=150',
    createdAt: '2024-01-01T00:00:00Z',
    isVerified: true
  },
  {
    id: '2',
    name: 'Marie Dubois',
    email: 'marie@example.com',
    password: 'client123',
    role: 'client',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    phone: '+33 6 12 34 56 78',
    address: '123 Rue de la Mode, Paris',
    createdAt: '2024-01-15T00:00:00Z',
    isVerified: true
  },
  {
    id: '3',
    name: 'Fatou Diallo',
    email: 'fatou@couture.com',
    password: 'couturier123',
    role: 'couturier',
    avatar: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=150',
    phone: '+221 77 123 45 67',
    createdAt: '2024-01-10T00:00:00Z',
    isVerified: true,
    businessName: 'Atelier Fatou Couture',
    specialties: ['Robes traditionnelles', 'Tenues de soirée', 'Costumes sur mesure'],
    experience: 8,
    rating: 4.8,
    reviewCount: 156,
    portfolio: [
      'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=500',
      'https://images.pexels.com/photos/7679721/pexels-photo-7679721.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    workingHours: {
      monday: { start: '09:00', end: '18:00', isOpen: true },
      tuesday: { start: '09:00', end: '18:00', isOpen: true },
      wednesday: { start: '09:00', end: '18:00', isOpen: true },
      thursday: { start: '09:00', end: '18:00', isOpen: true },
      friday: { start: '09:00', end: '18:00', isOpen: true },
      saturday: { start: '10:00', end: '16:00', isOpen: true },
      sunday: { start: '00:00', end: '00:00', isOpen: false }
    },
    // CORRECTION: Remplacement des montants Euro par des montants en FCFA (ex: 35 000 - 350 000 FCFA)
    priceRange: { min: 35000, max: 350000 }, 
    location: {
      city: 'Dakar',
      district: 'Plateau',
      coordinates: { lat: 14.6937, lng: -17.4441 }
    },
    subscription: {
      type: 'premium',
      expiresAt: '2024-12-31T23:59:59Z',
      isActive: true
    }
  } as Couturier & { password: string }
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const foundUser = mockUsers.find(u => u.email === email && u.password === password);
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const register = async (userData: Omit<User, 'id' | 'createdAt' | 'isVerified'> & { password: string }): Promise<boolean> => {
    const existingUser = mockUsers.find(u => u.email === userData.email);
    if (existingUser) return false;

    const newUser = {
      ...userData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      isVerified: false
    };
    
    mockUsers.push(newUser);
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
    return true;
  };

  const registerCouturier = async (userData: Omit<Couturier, 'id' | 'createdAt' | 'isVerified' | 'rating' | 'reviewCount'> & { password: string }): Promise<boolean> => {
    const existingUser = mockUsers.find(u => u.email === userData.email);
    if (existingUser) return false;

    const newCouturier = {
      ...userData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      isVerified: false,
      rating: 0,
      reviewCount: 0,
      portfolio: [],
      subscription: {
        type: 'basic' as const,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days trial
        isActive: true
      }
    };
    
    mockUsers.push(newCouturier);
    const { password: _, ...userWithoutPassword } = newCouturier;
    setUser(userWithoutPassword);
    localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
    return true;
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      register,
      registerCouturier,
      isCouturier: user?.role === 'couturier',
      isClient: user?.role === 'client',
      isAdmin: user?.role === 'admin'
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};