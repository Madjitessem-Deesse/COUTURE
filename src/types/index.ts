
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'client' | 'couturier' | 'admin';
  phone?: string;
  address?: string; // L'adresse est importante pour la localisation
  createdAt: string;
  isVerified: boolean; // Statut de vérification
  subscription?: {
    type: 'basic' | 'premium';
    expiresAt: string;
    isActive: boolean;
  };
}

// --- COUTURIER ---
export interface Couturier extends User {
  role: 'couturier';
  businessName: string;
  specialties: string[];
  experience: number; // en années
  rating: number; // 0.0 à 5.0
  reviewCount: number;
  portfolio: string[];
  workingHours: {
    [key: string]: { start: string; end: string; isOpen: boolean };
  };
  // Prix min et max des services en FCFA (number pour les filtres/calculs)
  priceRange: { min: number; max: number }; 
  location: {
    city: string;
    district: string;
    coordinates?: { lat: number; lng: number };
  };
  subscription: {
    type: 'basic' | 'premium';
    expiresAt: string;
    isActive: boolean;
  };
}

// --- PUBLICATION (FEED) ---
export interface Post {
  id: string;
  couturierId: string;
  couturier: Couturier;
  title: string;
  description: string;
  images: string[];
  category: string;
  tags: string[];
  price?: number; // Prix suggéré en FCFA
  likes: string[]; // user IDs who liked
  comments: Comment[];
  createdAt: string;
  isPromoted: boolean;
}

export interface Comment {
  id: string;
  userId: string;
  user: User;
  content: string;
  createdAt: string;
  likes: string[];
}

// --- RENDEZ-VOUS ---
export interface Appointment {
  id: string;
  clientId: string;
  client: User;
  couturierId: string;
  couturier: Couturier;
  date: string;
  time: string;
  duration: number; // en minutes
  service: string;
  description: string;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  price: number; // Coût estimé du service en FCFA
  createdAt: string;
}

// --- COMMANDE ---
export interface Order {
  id: string;
  clientId: string;
  client: User;
  couturierId: string;
  couturier: Couturier;
  appointmentId?: string;
  items: OrderItem[];
  total: number; // Montant total final en FCFA
  status: 'pending_payment' | 'paid' | 'in_progress' | 'ready' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  deliveryDate: string;
  createdAt: string;
  trackingInfo?: {
    stage: string;
    description: string;
    updatedAt: string;
  }[];
}

export interface OrderItem {
  id: string;
  name: string;
  description: string;
  price: number; // Prix unitaire en FCFA
  quantity: number;
  specifications?: string;
}

// --- AVIS ---
export interface Review {
  id: string;
  clientId: string;
  client: User;
  couturierId: string;
  orderId: string;
  rating: number; // 1 à 5
  comment: string;
  images?: string[];
  createdAt: string;
}

// --- NOTIFICATION ---
export interface Notification {
  id: string;
  userId: string;
  type: 'like' | 'comment' | 'appointment' | 'order' | 'payment' | 'review';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  actionUrl?: string;
}

// --- PAIEMENT ---
export interface Payment {
  id: string;
  orderId: string;
  amount: number; // Montant payé en FCFA
  // Méthodes de paiement adaptées au contexte africain
  method: 'card' | 'mobile_money' | 'bank_transfer' | 'cash'; 
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  transactionId?: string;
  createdAt: string;
}
