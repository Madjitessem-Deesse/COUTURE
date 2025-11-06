import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Post, Appointment, Order, Notification } from '../types';

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

// CORRECTION FCFA : Les prix simulés doivent être en Franc CFA (XOF)
// Conversions approximatives (Ex: 50€ -> 35000 XOF, 150€ -> 100000 XOF, 500€ -> 350000 XOF)
const PRIX_MIN_FCFA = 35000;
const PRIX_MAX_FCFA = 350000;
const PRIX_POST_FCFA = 100000;

// Mock data
const mockPosts: Post[] = [
  {
    id: '1',
    couturierId: '3',
    couturier: {
      id: '3',
      name: 'Fatou Diallo',
      email: 'fatou@couture.com',
      role: 'couturier',
      avatar: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=150',
      createdAt: '2024-01-10T00:00:00Z',
      isVerified: true,
      businessName: 'Atelier Fatou Couture',
      specialties: ['Robes traditionnelles', 'Tenues de soirée'],
      experience: 8,
      rating: 4.8,
      reviewCount: 156,
      portfolio: [],
      workingHours: {},
      // PRIX EN FCFA
      priceRange: { min: PRIX_MIN_FCFA, max: PRIX_MAX_FCFA }, 
      location: { city: 'Dakar', district: 'Plateau' },
      subscription: { type: 'premium', expiresAt: '2024-12-31T23:59:59Z', isActive: true }
    },
    title: 'Nouvelle collection de robes traditionnelles',
    description: 'Découvrez ma nouvelle collection inspirée des motifs traditionnels sénégalais. Chaque pièce est unique et confectionnée avec des tissus de qualité premium.',
    images: [
      'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=500',
      'https://images.pexels.com/photos/7679721/pexels-photo-7679721.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    category: 'Robes traditionnelles',
    tags: ['wax', 'traditionnel', 'élégant'],
    // PRIX EN FCFA
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
          avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
          createdAt: '2024-01-15T00:00:00Z',
          isVerified: true
        },
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
    // This would normally fetch user data from API
    const mockUser = {
      id: userId,
      name: 'User',
      email: 'user@example.com',
      role: 'client' as const,
      createdAt: new Date().toISOString(),
      isVerified: true
    };

    const newComment = {
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
    };
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
    };
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