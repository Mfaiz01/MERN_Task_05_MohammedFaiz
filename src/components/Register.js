// Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import Header from './Header'
import Footer from './Footer';
import './Register.css'; 

const Register = () => {
  const navigate = useNavigate(); // Hook for navigation
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState(''); // State for error messages

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validatePassword = (password) => {
    const minLength = 6; // Minimum length
    const hasUpperCase = /[A-Z]/.test(password); // At least one uppercase letter
    const hasLowerCase = /[a-z]/.test(password); // At least one lowercase letter
    const hasNumber = /[0-9]/.test(password); // At least one number
    return (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumber
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if user already exists
    const existingUser = localStorage.getItem('userCredentials');
    if (existingUser) {
      const { email } = JSON.parse(existingUser);
      if (email === formData.email) {
        toast.error('User already exists. Please log in.'); // Notify user
        return;
      }
    }

    // Validate password
    if (!validatePassword(formData.password)) {
      setError('Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, and one number.');
      return;
    }

    // Store credentials in local storage
    localStorage.setItem('userCredentials', JSON.stringify({
      email: formData.email,
      password: formData.password,
    }));

    // Display success notification
    toast.success('Registration successful! Redirecting to login...', {
      position: "top-center",
      autoClose: 3000, // Automatically close after 3 seconds
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    // Redirect to login page after a short delay to allow the toast to display
    setTimeout(() => {
      navigate('/login'); 
    }, 3000); 

    console.log(formData); 
  };

  return (
    <div className="register">
      <Header /> {/* Including Header */}

      <main className="register-content">
        <h1>Register</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error messages */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required // Ensure this field is filled
          />
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
          <button type="submit">Register</button>
        </form>
      </main>

      <Footer /> {/* Including Footer */}

      {/* Add ToastContainer to the component */}
      <ToastContainer />
    </div>
  );
};

export default Register;
