import React, { useState } from 'react';
import authService from '../../services/authService';
import { Link } from 'react-router-dom'; 
import './Register.css'

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.register(username, password, email);
      // Handle successful registration, e.g., show success message or redirect to login
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className='signup-page'>
      <div className="signup-container">
        <h2 className="signup-heading">Signup</h2>
        {error && <p className="signup-error">{error}</p>}
        <form className="signup-form" onSubmit={handleSubmit}>
          <label className="signup-label">
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="signup-input" placeholder='Username' />
          </label>
          <label className="signup-label">
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="signup-input" placeholder='Password' />
          </label>
          <label className="signup-label">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="signup-input" placeholder='Email'/>
          </label>
          <button type="submit" className="signup-button">Signup</button>
        </form>
        <div className="login-link">
          <p>Already have an account? <Link to="/">Login</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
