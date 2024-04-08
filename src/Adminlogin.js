import React, { useState } from 'react';
import './css/AdminLogin.css'; // Import CSS file for styling
import { useNavigate } from 'react-router-dom'; // Import useHistory hook

function AdminLogin() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target.username.value.trim() === 'admin' && e.target.password.value.trim() === 'admin') {
      // Successful login
      console.log('Login successful');
      navigate('/admin/AdminOptions');
    } else {
      // Incorrect credentials
      setErrorMessage('Incorrect username or password');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} action='/admin/AdminOptions' method='post' className="login-form">
        <h1 style={{textAlign:'center'}}>Admin Login</h1>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name='username'
            className="form-control"
            placeholder="Enter username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            className="form-control"
            name='password'
            placeholder="Enter password"
          />
        </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <div className="form-group">
          <button type="submit" className="btn-submit">Login</button>
        </div>
      </form>
    </div>
  );
}

export default AdminLogin;
