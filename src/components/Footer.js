// Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'; 

const Footer = () => {
    return (
        <footer className="footer">
            <p>&copy; {new Date().getFullYear()} Expense Splitter. All rights reserved.</p>
            <div className="footer-links">
                <Link to="/">Privacy Policy</Link>
                <Link to="/">Terms of Service</Link>
                <Link to="https://mfaiz01.github.io/MyPortfolio/" target="_blank" rel="noopener noreferrer">My Portfolio</Link>
            </div>
        </footer>
    );
};

export default Footer;
