
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'client' | 'couturier' | 'admin';
  phone?: string;
  address?: string; 
  createdAt: string;
  isVerified: boolean; 
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
  experience: number; 
  rating: number;
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


export interface Post {
  id: string;
  couturierId: string;
  couturier: Couturier;
  title: string;
  description: string;
  images: string[];
  category: string;
  tags: string[];
  price?: number; 
  likes: string[]; 
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
  duration: number; 
  service: string;
  description: string;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  price: number; 
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
  total: number; 
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
  price: number; 
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
  rating: number; 
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
  amount: number; 
  // Méthodes de paiement adaptées au contexte africain
  method: 'card' | 'mobile_money' | 'bank_transfer' | 'cash'; 
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  transactionId?: string;
  createdAt: string;
}
