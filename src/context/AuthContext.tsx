import { createContext, useContext, useState, useEffect} from 'react';
import type { ReactNode } from 'react';
import type { User, Couturier } from '../types';
import adminImg from '../assets/admin.jpg';
import marieImg from '../assets/marie.jpg';
import fatouImg from '../assets/fatou.jpg';
import brahimImg from '../assets/brahim.jpg';
import djibrilImg from '../assets/djibril.jpg';

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

const defaultAuthContextValue: AuthContextType = {
  user: null,

  login: async () => { throw new Error('AuthContext used outside Provider'); },
  logout: () => { throw new Error('AuthContext used outside Provider'); },
  register: async () => { throw new Error('AuthContext used outside Provider'); },
  registerCouturier: async () => { throw new Error('AuthContext used outside Provider'); },
  isCouturier: false,
  isClient: false,
  isAdmin: false,
};

const AuthContext = createContext<AuthContextType>(defaultAuthContextValue);

const mockUsers: (User & { password: string })[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@gmail.com',
    password: 'admin123',
    role: 'admin',
    avatar: adminImg, 
    createdAt: '2024-01-01T00:00:00Z',
    isVerified: true
  },
  {
    id: '2',
    name: 'Marie Dubois',
    email: 'marie@gmail.com',
    password: 'client123',
    role: 'client',
    avatar: marieImg, 
    phone: '+235 00 00 00 00',
    address: '123 Rue de la Mode, Paris',
    createdAt: '2024-01-15T00:00:00Z',
    isVerified: true
  },
  {
    id: '3',
    name: 'Fatou Diallo',
    email: 'fatou@gmail.com',
    password: 'couturier123',
    role: 'couturier',
    avatar: fatouImg, 
    phone: '+235 00 00 00 00',
    createdAt: '2024-01-10T00:00:00Z',
    isVerified: true,
    businessName: 'Atelier Fatou Couture',
    specialties: ['Robes traditionnelles', 'Tenues de soirée', 'Costumes sur mesure'],
    experience: 8,
    rating: 4.8,
    reviewCount: 156,
    portfolio: [brahimImg, djibrilImg], 
    workingHours: {
      monday: { start: '09:00', end: '18:00', isOpen: true },
      tuesday: { start: '09:00', end: '18:00', isOpen: true },
      wednesday: { start: '09:00', end: '18:00', isOpen: true },
      thursday: { start: '09:00', end: '18:00', isOpen: true },
      friday: { start: '09:00', end: '18:00', isOpen: true },
      saturday: { start: '10:00', end: '16:00', isOpen: true },
      sunday: { start: '00:00', end: '00:00', isOpen: false }
    },
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
  if (context.login === defaultAuthContextValue.login) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};