import React, { useState } from 'react';
import axios from 'axios';

const SignupForm = ({ onUserAdded }) => { // Receive the onUserAdded callback as a prop
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post('http://localhost:5000/signup', {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        });
        setSuccessMessage(response.data.message);
        setFormData({ username: '', email: '', password: '', confirmPassword: '' });

        // Call the callback function to update the user list in the table
        if (onUserAdded) {
          onUserAdded();
        }
      } catch (error) {
        setErrors({ api: error.response.data.message });
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = () => {
    let validationErrors = {};

    if (!formData.username) {
      validationErrors.username = 'Username is required';
    }
    if (!formData.email) {
      validationErrors.email = 'Email is required';
    }
    if (!formData.password) {
      validationErrors.password = 'Password is required';
    } else if (formData.password !== formData.confirmPassword) {
      validationErrors.confirmPassword = 'Passwords do not match';
    }

    return validationErrors;
  };

  return (
    <form onSubmit={handleSubmit}>
      {successMessage && <p>{successMessage}</p>}
      {errors.api && <p>{errors.api}</p>}

      <div>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        {errors.username && <span>{errors.username}</span>}
      </div>

      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <span>{errors.email}</span>}
      </div>

      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <span>{errors.password}</span>}
      </div>

      <div>
        <label>Confirm Password:</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && <span>{errors.confirmPassword}</span>}
      </div>

      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignupForm;
