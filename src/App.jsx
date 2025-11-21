import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import { Layout } from './components/common/Layout';
import { Home } from './pages/Home';
import { Feed } from './pages/Feed';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Couturiers } from './pages/Couturiers';
import { CouturierProfile } from './pages/CouturierProfile';
import { ForgotPassword } from './pages/ForgotPassword'; 
import { Profile } from './pages/Profile';                 
import { Appointments } from './pages/Appointments';       
import { Orders } from './pages/Orders';                   
import { Favorites } from './pages/Favorites';             
import { EditProfile } from './pages/EditProfile';        
import { Notifications } from './pages/Notifications';    
import { AppointmentBooking } from './pages/AppointmentBooking'; 
import { RegisterCouturier } from './pages/RegisterCouturier'; // 👈 IMPORTATION DE LA DERNIÈRE ROUTE MANQUANTE
import { AdminDashboard } from './pages/admin/AdminDashboard';


function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              
              <Route index element={<Home />} />
              <Route path="feed" element={<Feed />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="register-couturier" element={<RegisterCouturier />} /> 

              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="couturiers" element={<Couturiers />} />
              <Route path="couturier/:id" element={<CouturierProfile />} />
              <Route path="couturier/:id/appointment" element={<AppointmentBooking />} /> 
              <Route path="profile" element={<Profile />} />
              <Route path="edit-profile" element={<EditProfile />} /> 
              <Route path="notifications" element={<Notifications />} /> 
              
              <Route path="appointments" element={<Appointments />} />
              <Route path="orders" element={<Orders />} />
              <Route path="favorites" element={<Favorites />} />
              <Route path="admin" element={<AdminDashboard />} />

            </Route>
          </Routes>
        </Router>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;