// Home.js
import React from 'react';
import { Link } from 'react-router-dom'; 
import Header from './Header';
import Footer from './Footer'; 
import expenseImage from '../Assets/expense.png'; 
import './Home.css'; 

const Home = () => {
    return (
        <div className="home">
            <Header /> {/* Including Header */}
            <main className="main-content">
                <h1>Welcome to Expense Splitter</h1>
                <p>
                    Easily split and track your expenses with friends, family, or colleagues.
                    Join now and simplify your financial management!
                </p>
                <img src={expenseImage} alt="Expense Management" style={{ width: '400px', height: 'auto' }} /> 
                <Link to="/register">
                    <button className="get-started-button">Get Started</button>
                </Link>
            </main>
            <Footer /> {/* Including Footer */}
        </div>
    );
};

export default Home;
