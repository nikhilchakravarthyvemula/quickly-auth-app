import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; import { useNavigate } from 'react-router-dom';


function Signup() {
  
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');

  const [company, setCompany] = useState({
    activity: {
      early_pay_intent: true,
      expected_activity: '"Get my invoices paid early'
    },
    early_pay_intent: true,
    industry: {
      value: 'Apps',
      label: 'Apps'
    },
    business_type: {
      label: 'Digital products',
      value: 'Digital products'
    },
    website: '',
    business_registration: 'corporation',
    phone: '4035551988',
    business_number: '654087322',
    has_trade_name: false,
    legal_name: '',
    expected_activity: 'Get my invoices paid early'
  });

  const handleFormDataChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
  };

  const handleCompanyChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setCompany(prevCompany => ({
        ...prevCompany,
        [name]: checked
      }));
    } else {
      setCompany(prevCompany => ({
        ...prevCompany,
        [name]: type === 'select-one' ? { label: value, value } : value
      }));
    }
  };

  const navigate = useNavigate(); // Use the useNavigate hook for navigation

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if the email and password confirmation matches
    if (formData.email !== formData.confirmEmail) {
      alert("Emails do not match!");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const user = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      password: formData.password,
    };
    try {
      const response = await axios.post('https://api-dev.quicklyinc.com/auth/signup', { user, company });
      navigate('/Login');
      // Handle the successful response (e.g., redirect to login or display a success message)
    } catch (signupError) {
      setError(signupError.response?.data?.message || "An error occurred during signup.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-header">Sign Up</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            className="login-input"
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleFormDataChange}
            placeholder="First Name"
            required
          />
          <input
            className="login-input"
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleFormDataChange}
            placeholder="Last Name"
            required
          />
           <input
            className="login-input"
            type="text"
            name="legal_name"
            value={company.legal_name}
            onChange={handleCompanyChange}
            placeholder="Legal Name"
            required
          />
          <input
            className="login-input"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleFormDataChange}
            placeholder="Email"
            required
          />
          <input
            className="login-input"
            type="email"
            name="confirmEmail"
            value={formData.confirmEmail}
            onChange={handleFormDataChange}
            placeholder="Confirm Email"
            required
          />
          <input
            className="login-input"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleFormDataChange}
            placeholder="Password"
            required
          />
          <input
            className="login-input"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleFormDataChange}
            placeholder="Confirm Password"
            required
          />
          <button
            className="button"
            type="submit"
          >
            SIGN UP
          </button>
          <p className="inline-block text-gray-700">
            Already have an account?
          </p>
          <div className="new-User">
            <Link to="/login">
              Login
            </Link>
          </div>
        </form>
        {error && <p className="login-error">{error}</p>}
      </div>
    </div>
  );
}

export default Signup;
