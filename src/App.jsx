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
              <Route path="couturiers" element={<Couturiers />} />
              <Route path="couturier/:id" element={<CouturierProfile />} />
              <Route path="admin" element={<AdminDashboard />} />
            </Route>
          </Routes>
        </Router>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;