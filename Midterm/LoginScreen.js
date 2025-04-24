import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider } from './FireBase';
import { signInWithPopup } from 'firebase/auth';
import './App.css';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const trimmedUsername = username.trim().toLowerCase();
    const trimmedPassword = password.trim();
    const correctEmail = '9cbunny@gmail.com';
    const correctPassword = '85452800';

    if (trimmedUsername === correctEmail.toLowerCase() && trimmedPassword === correctPassword) {
      console.log('Login successful');
      navigate('/jobs');
    } else {
      console.log('Login failed');
      alert('Incorrect email or password');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log('Google Sign-In successful:', result.user.email);
      navigate('/jobs');
    } catch (error) {
      console.log('Google Sign-In failed:', error.message);
      alert('Google Sign-In Failed: ' + error.message);
    }
  };

  return (
    <div className="container">
      <h2 className="title">Login</h2>
      <input
        className="input"
        type="email"
        placeholder="Username or Email"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        autoCapitalize="none"
      />
      <input
        className="input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoCapitalize="none"
      />
      <button className="button" onClick={handleLogin}>
        Login
      </button>
      <div className="google-button-container">
        <p className="google-label">Or sign in with:</p>
        <button className="google-button" onClick={handleGoogleSignIn}>
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default LoginScreen;