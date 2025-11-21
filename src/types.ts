export interface User {
  id: string;
  name: string;
  email?: string | null;
  role?: 'admin' | 'client' | 'couturier';
  // allow nullable avatar so mocks and data can provide null
  avatar: string | null;
  phone?: string;
  address?: string;
  createdAt?: string;
  isVerified?: boolean;
}

export interface WorkingHours {
  start: string;
  end: string;
  isOpen: boolean;
}

export interface Couturier extends User {
  role: 'couturier';
  businessName: string;
  specialties: string[];
  experience: number;
  rating: number;
  reviewCount: number;
  portfolio: string[];
  workingHours: {
    monday: WorkingHours;
    tuesday: WorkingHours;
    wednesday: WorkingHours;
    thursday: WorkingHours;
    friday: WorkingHours;
    saturday: WorkingHours;
    sunday: WorkingHours;
  };
  priceRange: { min: number; max: number };
  location: {
    city: string;
    district: string;
    coordinates: { lat: number; lng: number };
  };
  subscription: {
    type: 'basic' | 'premium';
    expiresAt: string;
    isActive: boolean;
  };
}

export interface Review {
  id: string;
  userId: string;
  couturierId: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  couturierId: string;
  rating: number;
  reviews: Review[];
  stock: number;
  category: string;
  image: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
}

export interface OrderItem {
  product: Product;
  quantity: number;
  size: string;
}

export interface Order {
  id: string;
  userId: string;
  status:
    | 'in_progress'
    | 'cancelled'
    | 'pending_payment'
    | 'paid'
    | 'ready'
    | 'delivered'
    | 'shipped';
  items: OrderItem[];
  totalAmount: number;
  shippingAddress: string;
  createdAt: string;
}


export interface Comment {
  id: string | number;
  user: {
    id: string;
    name: string | null | undefined;
    // allow avatar to be nullable to match PostCard usage
    avatar: string | null | undefined;
  };
  content: string | null | undefined;
  createdAt: string;
}


export interface Post {
  id: string;
  couturierId: string;
  title: string;
  description: string;
  category: string;
  // multiple images supported
  images: string[];
  // tags and price optional
  tags: string[];
  price?: number;
  createdAt: string;
  // likes are user ids
  likes: string[];
  // comments use the shared Comment type
  comments: Comment[];
  // minimal couturier object used by PostCard
  couturier: {
    id: string;
    name: string;
    businessName?: string;
    avatar: string | null;
    location: { city: string };
    rating: number;
    subscription?: { type: string };
  };
}
