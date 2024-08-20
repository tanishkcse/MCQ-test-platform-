import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import CodePilotGif from '../assets/CodePilotGIF.gif'
import '../css/Login.css'

function Login({ setIsLoggedIn, setAvatar }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Reset errors
    setEmailError('')
    setPasswordError('')
    setError(null)

    // Check if email and password are empty
    if (!email.trim()) {
      setEmailError('Email is required')
    }

    if (!password.trim()) {
      setPasswordError('Password is required')
    }

    // Validate email if not empty
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (email && !emailRegex.test(email)) {
      setEmailError('Please enter a valid email address')
    }

    // If there are no errors, proceed with login
    if (!emailError && !passwordError) {
      try {
        const response = await axios.post('https://codepilot-9q4e.onrender.com/api/v1/users/login', { email, password });
        if (response.status === 200) {
          console.log(response.data);
          alert('Login successful!');
          setIsLoggedIn(true);
          setAvatar(response.data.avatar);
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('avatar', response.data.avatar);
          navigate('/CodePilot');
        }
      } catch (error) {
        if (error.response) {
          setError(error.response.data.message);
        } else if (error.request) {
          setError('Network error');
        } else {
          setError('Unknown error');
        }
      }
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="login">
          <div className="login-card">
            <div className="login-left">
              <img src={CodePilotGif} alt="" />
            </div>
            <div className="login-right">
              <div className="login-right-card">
                <div className="login-heading">
                  <p className="welcome">Welcome Back!</p>
                  <p className="welcome-line">Your Gateway to Collaborative Coding Excellence! </p>
                </div>
                <div className="login-input">
                  <div className="login__field">
                    <input
                      type="text"
                      
                      className={`login__input ${emailError ? 'invalid' : ''}`}
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {emailError && <div className="error-message">{emailError}</div>}
                  </div>
                  <div className="login__field">
                    <input
                      type="password"
                      className={`login__input ${passwordError ? 'invalid' : ''}`}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {passwordError && <div className="error-message">{passwordError}</div>}
                  </div>
                  <div>
                    <button className="btn"><i className="animation"></i>LogIn<i className="animation"></i> </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      <div className="error">
        {error && <p>{error}</p>}
      </div>
    </>
  )
}

export default Login