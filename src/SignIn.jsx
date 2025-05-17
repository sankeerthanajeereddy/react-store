import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from './store';
import './SignIn.css'; // Import external CSS

function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username.trim() && password.trim()) {
      dispatch(loginUser({ username }));
      setMessage('Login successful! Redirecting...');
      setTimeout(() => {
        navigate('/veg');
      }, 1500);
    } else {
      setMessage('Login failed. Invalid credentials.');
    }
  };

  return (
    <div className="signin-container">
      <h2 className="signin-heading">Sign In</h2>
      <form onSubmit={handleSubmit} className="signin-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="signin-input"
        /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="signin-input"
        /><br />
        <button type="submit" className="signin-button">Sign In</button>
      </form>
      {message && (
        <p className={`signin-message ${message.startsWith('Login successful') ? 'success' : 'error'}`}>
          {message}
        </p>
      )}
      <p className="signin-footer">New user? <a href="/signup">Sign Up</a></p>
    </div>
  );
}

export default SignIn;
