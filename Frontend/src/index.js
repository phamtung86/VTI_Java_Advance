import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import './index.css';
import ActiveAccount from './page/ActiveAccount';
import ChangePassword from './page/ChangePassword';
import Login from './page/Login';
import Profile from './page/Profile';
import Register from './page/Register';
import ResetPassword from './page/ResetPassword';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/change-password" element={<ResetPassword />} />
        <Route path="/password" element={<ChangePassword />} />
        <Route path="/active-account" element={<ActiveAccount />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

reportWebVitals();
