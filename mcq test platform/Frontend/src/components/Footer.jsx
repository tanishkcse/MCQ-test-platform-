import React from 'react'
import logo from '../assets/CPlogo.png'
import facebook from '../assets/facebook.png'
import instagram from '../assets/instagram.png'
import youtube from '../assets/youtube.png'

import '../css/Footer.css'
function Footer() {
    return (
        <>
            <div className="foot-out">
                <div className="footer">
                    <div className="foot-left">
                        <div className="logo">
                            <img src={logo} alt="" />
                        </div>
                    </div>
                    <div className="foot-right">
                        <div className="foot-r1">
                            <ul>
                                <li><b>CodePilot</b></li>
                                <li>Legal</li>
                                <li>Terms & Condition</li>
                                <li>Privacy Policy</li>
                                <li>Cookies Policy</li>
                            </ul>
                        </div>
                        <div className="foot-r2">
                            <ul>
                                <li><b>Reach Us</b></li>
                                <li>(+91) 9125049539</li>
                                <li>aysuhsrivastav121@gmail.com</li>
                            </ul>
                            <div className="social-logo">
                                <img src={facebook} alt="" />
                                <img src={instagram} alt="" />
                                <img src={youtube} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer
