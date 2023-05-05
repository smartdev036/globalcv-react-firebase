import React from 'react';
import { Link } from 'react-router-dom';
import DropdownImg from '../assets/dropdown.png';

export default () => {
    return (
        <div className="navbar-rt">
            <div className="dropdown">
                <button className="dropbtn">
                    <svg viewBox='0 0 140 140' width='24' height='24' xmlns='http://www.w3.org/2000/svg'>
                        <g>
                            <path className="dro-rt" fill="#694AFF" d='m121.3,34.6c-1.6-1.6-4.2-1.6-5.8,0l-51,51.1-51.1-51.1c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2 0,5.8l53.9,53.9c0.8,0.8 1.8,1.2 2.9,1.2 1,0 2.1-0.4 2.9-1.2l53.9-53.9c1.7-1.6 1.7-4.2 0.1-5.8z'/>
                        </g>
                    </svg>
                </button>
                <div className="dropdown-content">
                    <Link style={{ textDecoration: "none" }} to="/" className="authenticationButton"> Home </Link>
                    <Link style={{ textDecoration: "none" }} to="/aboutus" className="authenticationButton"> About Us </Link>
                    <Link style={{ textDecoration: "none" }} to="/contactus" className="authenticationButton"> Contact Us </Link>
                    <Link style={{ textDecoration: "none" }} to="/pricing" className="authenticationButton"> Pricing </Link>
                    <Link style={{ textDecoration: "none" }} to="/privacy" className="authenticationButton"> Privacy </Link>
                    <Link style={{ textDecoration: "none" }} to="/terms" className="authenticationButton"> Terms of Service </Link>
                    <Link style={{ textDecoration: "none" }} to="/refund" className="authenticationButton"> Refund Policy </Link>
                </div>
            </div>
        </div>
    )
}