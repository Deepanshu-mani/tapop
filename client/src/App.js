import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import HomePage from './pages/Homepage';  
import Dashboard from './pages/Dashboard';  
import UpdateProfile from './pages/UpdateProfile';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/profile" element={<UpdateProfile />} />
      </Routes>
    </Router>
  );
}

export default App;