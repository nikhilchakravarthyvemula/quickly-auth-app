import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Profile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jwtToken = localStorage.getItem('jwtToken');
        if (!jwtToken) {
          throw new Error('No token found'); // If there's no token, throw an error to be caught below
        }
        const response = await axios.get('https://api-dev.quicklyinc.com/auth/user', {
          headers: { Authorization: `Bearer ${jwtToken}` }
        });
        setUser(response.data.user);
      } catch (error) {
        setError('Error 401: Unauthorized'); // Set the error state if there is a problem
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    navigate('/login');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {user ? (
          <>
            <p>Name: {user.first_name} {user.last_name}</p>
            <p>Email: {user.email}</p>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </>
        ) : (
          <>
            <p className="login-header">{error}</p>
            <p className="inline-block text-gray-700"> Please login</p>
            <Link to="/login" className="login-link">
              Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Profile;
