import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Header';
import Footer from './Footer';
import CreateGroupModal from './CreateGroupModal';
import './Dashboard.css';

const Dashboard = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [expenses, setExpenses] = useState([]);
    const [editExpense, setEditExpense] = useState(null);
    const [expandedExpense, setExpandedExpense] = useState(null); // Track which expense is expanded
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem('userCredentials');
        if (user) {
            setIsLoggedIn(true);
        } else {
            navigate('/');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('userCredentials');
        setIsLoggedIn(false);
        navigate('/');
    };

    const handleCreateExpense = (expense) => {
        if (editExpense) {
            const updatedExpenses = expenses.map((e) => (e === editExpense ? expense : e));
            setExpenses(updatedExpenses);
            toast.success('Expense updated successfully!');
            setEditExpense(null);
        } else {
            setExpenses([...expenses, expense]);
            toast.success('Expense created successfully!');
        }
        setIsModalOpen(false);
    };

    const handleEditExpense = (expense) => {
        setEditExpense(expense);
        setIsModalOpen(true);
    };

    const handleExpandExpense = (expense) => {
        setExpandedExpense(expandedExpense === expense ? null : expense); // Toggle expansion
    };

    const generatePDF = () => {
        const doc = new jsPDF();

        doc.text('Expense Report', 14, 10);
        doc.autoTable({
            head: [['Transaction Name', 'Amount', 'Payer', 'Users', 'Split Amount']],
            body: expenses.map(expense => [
                expense.transactionName,
                `$${expense.amount}`,
                expense.payer,
                expense.users.join(', '),
                `$${(expense.amount / expense.users.length).toFixed(2)}`
            ])
        });

        doc.save('expense_report.pdf');
    };

    return (
        <div className="dashboard">
            <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
            <header className="dashboard-header">
                <h1>Welcome to Your Expense Sharing Dashboard</h1>
                <p>Track and manage your shared expenses efficiently.</p>
                <div>
                    <button onClick={() => {
                        setEditExpense(null);
                        setIsModalOpen(true);
                    }}>Add Expense</button>
                    <button onClick={generatePDF}>Download Expense Report</button>
                </div>
            </header>
            <main className="dashboard-content">
                <h2>Shared Expenses</h2>
                {expenses.length === 0 ? (
                    <p>No expenses shared yet.</p>
                ) : (
                    <div className="expense-list">
                        {expenses.map((expense, index) => (
                            <div key={index} className="card">
                                <h3 onClick={() => handleExpandExpense(expense)} style={{ cursor: 'pointer' }}>
                                    {expense.transactionName}
                                </h3>
                                <p>Amount: ${expense.amount}</p>
                                <p>Payer: {expense.payer}</p>
                                <p>Users: {expense.users.join(', ')}</p>
                                <p>Split Amount: ${((expense.amount / expense.users.length) || 0).toFixed(2)}</p>
                                <button onClick={() => handleEditExpense(expense)}>Edit</button>
                                {/* Optional: Add delete functionality */}
                                <button onClick={() => {
                                    setExpenses(expenses.filter((_, i) => i !== index));
                                    toast.success('Expense deleted successfully!');
                                }}>Delete</button>

                                {expandedExpense === expense && (
                                    <div className="expense-details">
                                        <h4>Details</h4>
                                        <p>Here you can include additional details, comments, or history about the expense.</p>
                                        {/* You can include more details as necessary */}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </main>
            <Footer />
            <CreateGroupModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onCreateGroup={handleCreateExpense}
                editExpense={editExpense} // Pass edit expense data
            />
            <ToastContainer />
        </div>
    );
};

export default Dashboard;
