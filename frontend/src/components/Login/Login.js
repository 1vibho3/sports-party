import React, { useState } from 'react';
import authService from '../../services/authService';
import { useNavigate } from 'react-router-dom'; 

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
    <div>
      <h2>Login</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
