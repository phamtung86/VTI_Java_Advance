import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import './index.css';
import Login from './page/Login';
import Register from './page/Register';
import ResetPassword from './page/ResetPassword';
import reportWebVitals from './reportWebVitals';
import ChangePassword from './page/ChangePassword';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path='/register' element={<Register/>}/>
      <Route path='/change-password' element={<ResetPassword/>}/>
      <Route path='/password' element={<ChangePassword/>}/>
    </Routes>
  </BrowserRouter>
);

reportWebVitals();
