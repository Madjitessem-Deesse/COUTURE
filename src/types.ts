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

  status: "in_progress" | "cancelled" | "pending_payment" | "paid" | "ready" | "delivered" | "shipped"; 
  
  items: OrderItem[]; 
  totalAmount: number;
  shippingAddress: string;
  createdAt: string;
}