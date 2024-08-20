import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/Navbar.css'
function Logout({ setIsLoggedIn }) {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await axios.post('https://codepilot-9q4e.onrender.com/api/v1/users/logout', null, {
                withCredentials: true,
            });
            if (response.status === 200) {
                setIsLoggedIn(false);
                console.log(response)
                alert('Logout successful!');
                console.log('User Logged out');
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('avatar');
                navigate('/login');
            }
        } catch (error) {
            console.error('Error during logout:', error);
            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
                console.error('Response headers:', error.response.headers);
            } else if (error.request) {
                console.error('No response received:', error.request);
            } else {
                console.error('Error setting up request:', error.message);
            }
        }
    };
    return (
        <>
            <div className="nav-right">
                <ul>
                    <li onClick={handleLogout}><Link to="/Login">Logout</Link></li>
                </ul>
            </div>
        </>
    )
}

export default Logout
