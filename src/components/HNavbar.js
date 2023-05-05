import React from 'react';
import { Link } from 'react-router-dom';
import DropdownImg from '../assets/dropdown.png';

export default () => {
    const pathname = window.location.pathname;
  
    return (
        <div className="h-navbar-rt">
            <nav class="navbar">
            <div class="container-fluid">
                <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                </div>
                <div class="collapse navbar-collapse" id="myNavbar">
                <ul class="nav navbar-nav">
                <li><Link style={{ textDecoration: "none" }} to="/" > Home </Link></li>
                <li className={pathname==="/aboutus"?'active':""}><Link style={{ textDecoration: "none" }} to="/aboutus" > About Us </Link></li>
                <li className={pathname==="/contactus"?'active':""}><Link style={{ textDecoration: "none" }} to="/contactus" > Contact Us </Link></li>
                <li className={pathname==="/pricing"?'active':""}><Link style={{ textDecoration: "none" }} to="/pricing" > Pricing </Link></li>
                <li className={pathname==="/privacy"?'active':""}><Link style={{ textDecoration: "none" }} to="/privacy" > Privacy </Link></li>
                <li className={pathname==="/terms"?'active':""}><Link style={{ textDecoration: "none" }} to="/terms" > Terms of Service </Link></li>
                <li className={pathname==="/refund"?'active':""}><Link style={{ textDecoration: "none" }} to="/refund" > Refund Policy </Link></li>
                </ul>
                </div>
            </div>
        </nav>       
    </div>
    )
}

