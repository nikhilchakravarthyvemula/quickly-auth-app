import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      setError('All fields are required');
      return;
    }
    try {
      const response = await axios.post('https://api-dev.quicklyinc.com/auth/login', {
        email: email,
        password: password
      });
      console.log("API Response:", response.data);
      console.log("token:", response.data.token);
      if (response.data.token) {
        localStorage.setItem('jwtToken', response.data.token);
        navigate('/profile');
      } else {
        setError('Authentication failed, no token received');
        console.error('JWT Token is undefined:', response.data);
      }
    } catch (loginError) {
      setError('Failed to login');
      console.error('Login Error:', loginError.response || loginError.message);
    }
  };
  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-header">SIGN IN TO YOUR ACCOUNT</h2>
        <form className="login-form" onSubmit={handleLogin}>
          <input
            className="login-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="login-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="button" type="submit">SIGN IN</button>
          <a>Don't have an account?</a>
          <div className="New-User">
            <Link to="/signup" className="text-sm mt-3 text-right block">
              <span>Sign up</span>
            </Link>
          </div>
        </form>
        {error && <p className="login-error">{error}</p>}
      </div>
    </div>
  );
}

export default Login;
