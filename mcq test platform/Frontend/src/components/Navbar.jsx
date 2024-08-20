import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logout from './Logout';
import '../css/Navbar.css'
import logo from '../assets/CPlogo.png'

function Navbar({ isLoggedIn, setIsLoggedIn, avatar }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMediumScreen, setIsMediumScreen] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMediumScreen(window.innerWidth <= 1024);
            setIsSmallScreen(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="nav-bar">
            <div className="nav-left">
                <Link to="/CodePilot"><img src={logo} alt="CodePilot Logo" /></Link>
            </div>
            <button className={`hamburger ${isMediumScreen ? 'visible' : ''}`} onClick={toggleMenu} aria-label="Toggle menu">
                <span></span>
                <span></span>
                <span></span>
            </button>
            <div className={`nav-menu ${isMenuOpen ? 'open' : ''} ${isMediumScreen ? 'collapsible' : ''}`}>
                <ul className="nav-mid">
                    <li><Link to="/CodePilot" onClick={toggleMenu}>Home</Link></li>
                    <li><Link to="/Create-test" onClick={toggleMenu}>Create Test</Link></li>
                    <li><Link to="/attempt-test" onClick={toggleMenu}>Attempt Test</Link></li>
                    <li><Link to="" onClick={toggleMenu}>About</Link></li>
                    <li><Link to="" onClick={toggleMenu}>Contact Us</Link></li>
                </ul>
                <ul className={`nav-right ${isSmallScreen ? 'mobile' : ''}`}>
                    {isLoggedIn ? (
                        <>
                            <li>
                                <Logout onLogout={handleLogout} setIsLoggedIn={setIsLoggedIn} />
                            </li>
                            {/* <li>
                                <img src={avatar} alt="avatarImage" className="avatar-image"/>
                            </li> */}
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to="/Login" onClick={toggleMenu}>Log In</Link>
                            </li>
                            <li>
                                <Link to="/Register" onClick={toggleMenu} className="sign-up-btn">Sign Up Now</Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;