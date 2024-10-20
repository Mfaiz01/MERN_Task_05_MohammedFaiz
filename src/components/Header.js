import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({ isLoggedIn, onLogout }) => {
    return (
        <header className="header">
            <div className="logo">Expense Splitter</div>
            <nav className="nav">
                <Link to="/">Home</Link>
                {isLoggedIn ? (
                    <>
                        <Link to="/dashboard">Dashboard</Link>
                      
                        <button className="logout-button" onClick={onLogout}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </nav>
        </header>
    );
};

export default Header;
