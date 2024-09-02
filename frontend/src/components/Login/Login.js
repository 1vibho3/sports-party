import React, { useState } from 'react';
import authService from '../../services/authService';
import { Link, useNavigate } from 'react-router-dom'; 
import './Login.css'

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  //const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("abc");
      const token = await authService.login(username, password);
      sessionStorage.setItem('token', token);
      console.log(token);
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      const userID = tokenPayload.userId;

      sessionStorage.setItem('userID', userID);
      navigate('/getMatch');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className='login-page'>
      <div className="left-content">
        <div className="login-container">
          <h2 className="login-heading">Login</h2>
          {error && <p className="login-error">{error}</p>}
          <form className="login-form" onSubmit={handleSubmit}>
            <label className="login-label">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="login-input"
                placeholder='Username'
              />
            </label>
            <label className="login-label">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-input"
                placeholder='Password'
              />
            </label>
            <button type="submit" className="login-button">Login</button>
          </form>
          <div className="create-account-link">
            <p>Don't have an account? <Link to="/register">Create one</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
