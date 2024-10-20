// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import './Login.css'; 

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(''); // State for error messages

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedCredentials = JSON.parse(localStorage.getItem('userCredentials'));
    
    if (storedCredentials) {
      if (formData.email === storedCredentials.email && formData.password === storedCredentials.password) {
        // Successful login logic here
        console.log('Login successful:', formData);
        // Redirect to dashboard or home page
        navigate('/dashboard'); // Adjust the redirect as needed
      } else {
        setError('Invalid email or password.');
      }
    } else {
      setError('No registered users found.');
    }
  };

  return (
    <div className="login">
      <Header /> {/* Including Header */}

      <main className="login-content">
        <h1>Login</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error messages */}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required // Ensure this field is filled
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required // Ensure this field is filled
          />
          <button type="submit">Login</button>
        </form>
      </main>

      <Footer /> {/* Include Footer */}
    </div>
  );
};

export default Login;
