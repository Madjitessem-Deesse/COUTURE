import React, { createContext, useContext, useState, } from 'react';
import type { ReactNode } from 'react';
import type { Post, Appointment, Order, Notification } from '../pages';
import djibrilAvatar from '../assets/djibril.jpg'; 
import brahimAvatar from '../assets/brahim.jpg';
import dibrilImg from '../assets/dibril.jpg';
import brahimImg from '../assets/brahim.jpg';

interface UserMock {
  id: string;
  name: string | null | undefined;
  email: string;
  role: 'client' | 'couturier';
  avatar?: string | null | undefined;
  createdAt: string;
  isVerified: boolean;
}

interface CouturierMock extends UserMock {
  businessName?: string;
  specialties: string[];
  experience: number;
  rating: number;
  reviewCount: number;
  portfolio: any[];
  workingHours: {};
  priceRange: { min: number; max: number };
  location: { city: string; district: string };
  subscription?: { type: string; expiresAt: string; isActive: boolean };
}

interface CommentMock {
  id: string;
  userId: string;
  user: UserMock;
  content: string | null | undefined;
  createdAt: string;
  likes: string[];
}

interface Post {
    id: string;
    couturierId: string;
    couturier: CouturierMock;
    title: string;
    description: string;
    images: string[];
    category: string;
    tags: string[];
    price: number;
    likes: string[];
    comments: CommentMock[];
    createdAt: string;
    isPromoted: boolean;
}

interface Appointment {
  id: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

interface Order {
  id: string;
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
}

interface Notification {
  id: string;
  isRead: boolean;
}


interface AppContextType {
  posts: Post[];
  appointments: Appointment[];
  orders: Order[];
  notifications: Notification[];
  likePost: (postId: string, userId: string) => void;
  addComment: (postId: string, userId: string, content: string) => void;
  createAppointment: (appointment: Omit<Appointment, 'id' | 'createdAt'>) => void;
  updateAppointmentStatus: (appointmentId: string, status: Appointment['status']) => void;
  createOrder: (order: Omit<Order, 'id' | 'createdAt'>) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  markNotificationAsRead: (notificationId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);
const PRIX_MIN_FCFA = 35000;
const PRIX_MAX_FCFA = 350000;
const PRIX_POST_FCFA = 100000;


const mockPosts: Post[] = [
  {
    id: '1',
    couturierId: '3',
    couturier: {
      id: '3',
      name: 'djibril brahim',
      email: 'djibril@couture.com',
      role: 'couturier',
      avatar: djibrilAvatar,
      createdAt: '2024-01-10T00:00:00Z',
      isVerified: true,
      businessName: 'Atelier bouba Couture',
      specialties: ['Robes traditionnelles', 'Tenues de soirée'],
      experience: 8,
      rating: 4.8,
      reviewCount: 156,
      portfolio: [],
      workingHours: {},
      priceRange: { min: PRIX_MIN_FCFA, max: PRIX_MAX_FCFA }, 
      location: { city: 'tchad', district: 'Plateau' },
      subscription: { type: 'premium', expiresAt: '2024-12-31T23:59:59Z', isActive: true }
    } as CouturierMock, 
    title: 'Nouvelle collection de robes traditionnelles',
    description: 'Découvrez ma nouvelle collection inspirée des motifs traditionnels sénégalais. Chaque pièce est unique et confectionnée avec des tissus de qualité premium.',
    images: [
      dibrilImg,
      brahimImg,
    ],
    category: 'Robes traditionnelles',
    tags: ['wax', 'traditionnel', 'élégant'],
    price: PRIX_POST_FCFA, 
    likes: ['2'],
    comments: [
      {
        id: '1',
        userId: '2',
        user: {
          id: '2',
          name: 'Marie Dubois',
          email: 'marie@example.com',
          role: 'client',
          avatar: brahimAvatar,
          createdAt: '2024-01-15T00:00:00Z',
          isVerified: true
        } as UserMock, 
        content: 'Magnifique travail ! J\'aimerais prendre rendez-vous.',
        createdAt: '2024-01-20T10:30:00Z',
        likes: []
      }
    ],
    createdAt: '2024-01-20T08:00:00Z',
    isPromoted: false
  }
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  

  const likePost = (postId: string, userId: string) => {
    setPosts(prevPosts =>
      prevPosts.map(post => {
        if (post.id === postId) {
          const likes = post.likes.includes(userId)
            ? post.likes.filter(id => id !== userId)
            : [...post.likes, userId];
          return { ...post, likes };
        }
        return post;
      })
    );
  };

  const addComment = (postId: string, userId: string, content: string) => {
    const mockUser: UserMock = {
      id: userId,
      name: 'User',
      email: 'user@example.com',
      role: 'client',
      createdAt: new Date().toISOString(),
      isVerified: true,
      avatar: djibrilAvatar 
    };

    const newComment: CommentMock = {
      id: Date.now().toString(),
      userId,
      user: mockUser,
      content,
      createdAt: new Date().toISOString(),
      likes: []
    };

    setPosts(prevPosts =>
      prevPosts.map(post => {
        if (post.id === postId) {
          return { ...post, comments: [...post.comments, newComment] };
        }
        return post;
      })
    );
  };

  const createAppointment = (appointmentData: Omit<Appointment, 'id' | 'createdAt'>) => {
    const newAppointment: Appointment = {
      ...appointmentData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    } as Appointment;
    setAppointments(prev => [...prev, newAppointment]);
  };

  const updateAppointmentStatus = (appointmentId: string, status: Appointment['status']) => {
    setAppointments(prev =>
      prev.map(appointment =>
        appointment.id === appointmentId ? { ...appointment, status } : appointment
      )
    );
  };

  const createOrder = (orderData: Omit<Order, 'id' | 'createdAt'>) => {
    const newOrder: Order = {
      ...orderData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    } as Order; 
    setOrders(prev => [...prev, newOrder]);
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId ? { ...order, status } : order
      )
    );
  };

  const markNotificationAsRead = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === notificationId ? { ...notification, isRead: true } : notification
      )
    );
  };

  return (
    <AppContext.Provider value={{
      posts,
      appointments,
      orders,
      notifications,
      likePost,
      addComment,
      createAppointment,
      updateAppointmentStatus,
      createOrder,
      updateOrderStatus,
      markNotificationAsRead
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};