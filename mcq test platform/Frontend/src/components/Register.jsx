import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import CodePilotGif from '../assets/CodePilotGIF.gif'

import '../css/Register.css'

function Register() {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [avatar, setAvatar] = useState(null)
    const [coverImage, setCoverImage] = useState(null)
    const [error, setError] = useState(null)
    const [fullNameError, setFullNameError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [usernameError, setUsernameError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Reset errors
        // setFullNameError('')
        // setEmailError('')
        // setUsernameError('')
        // setPasswordError('')
        // setError(null)

        // Validate form fields
        if (!fullName.trim()) {
            setFullNameError('Full name is required')
        }

        if (!email.trim()) {
            setEmailError('Email is required')
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (!emailRegex.test(email)) {
                setEmailError('Please enter a valid email address')
            }
        }

        if (!username.trim()) {
            setUsernameError('Username is required')
        }

        if (!password.trim()) {
            setPasswordError('Password is required')
        }

        // If there are no errors, proceed with registration
        if (!fullNameError && !emailError && !usernameError && !passwordError) {
            const formData = new FormData()
            formData.append("fullName", fullName)
            formData.append("email", email)
            formData.append("username", username)
            formData.append("password", password)

            // Spread the contents of avatar and coverImage FormData objects
            if (avatar) {
                for (const [key, value] of avatar.entries()) {
                    formData.append(key, value)
                }
            }

            if (coverImage) {
                for (const [key, value] of coverImage.entries()) {
                    formData.append(key, value)
                }
            }

            try {
                const response = await axios.post('api/v1/users/register', formData)
                if (response.status === 201) {
                    console.log(response.data)
                    alert('Registration successful!')
                    navigate('/login')
                }
            } catch (error) {
                if (error.response) {
                    if (error.response.status === 400) {
                        setError(error.response.data.message)
                    }
                } else if (error.request) {
                    setError('Network error')
                } else {
                    setError('Unknown error')
                }
            }
        }
    }

    const handleAvatarChange = (e) => {
        const formData = new FormData()
        formData.append("avatar", e.target.files[0])
        setAvatar(formData)
    }

    const handleCoverImageChange = (e) => {
        const formData = new FormData()
        formData.append("coverImage", e.target.files[0])
        setCoverImage(formData)
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
                                    <p className="welcome">Welcome!</p>
                                    <p className="welcome-line">Your Gateway to Collaborative Coding Excellence! </p>
                                </div>
                                <div className="login-input">
                                    <div className="login__field">
                                        <input
                                            type="text"
                                            id="username"
                                            className={`login__input ${usernameError ? 'invalid' : ''}`}
                                            placeholder="Username"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                        {usernameError && <div className="error-message">{usernameError}</div>}
                                    </div>
                                    <div className="login__field">
                                        <input
                                            type="email"
                                            id="email"
                                            className={`login__input ${emailError ? 'invalid' : ''}`}
                                            placeholder="Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                        {emailError && <div className="error-message">{emailError}</div>}
                                    </div>
                                    <div className="login__field">
                                        <input
                                            type="text"
                                            id="Full Name"
                                            className={`login__input ${fullNameError ? 'invalid' : ''}`}
                                            placeholder="Full Name"
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                        />
                                        {fullNameError && <div className="error-message">{fullNameError}</div>}
                                    </div>
                                    <div className="login__field">
                                        <input
                                            type="password"
                                            id="password"
                                            className={`login__input ${passwordError ? 'invalid' : ''}`}
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        {passwordError && <div className="error-message">{passwordError}</div>}
                                    </div>
                                    <div className="login__field">
                                        <input type="file" id="avatar" accept="image/*" onChange={handleAvatarChange} />
                                    </div>
                                    <div className="login__field">
                                        <input type="file" id="coverImage" accept="image/*" onChange={handleCoverImageChange} />
                                    </div>
                                    <div>
                                        <button className="btn"><i className="animation"></i>Register<i className="animation"></i>
                                        </button>
                                    </div>
                                    {error && <p>{error}</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <p>Already have an account? <Link to="/login">Login</Link></p>
            </form>
        </>
    )
}

export default Register