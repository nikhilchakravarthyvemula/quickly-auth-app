import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Profile from './Pages/Profile';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" exact element={<Login></Login>} />
          <Route path="/login" exact element={<Login></Login>} />
          <Route path="/signup" element={<Signup></Signup>} />
          <Route path="/profile" element={<Profile></Profile>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

