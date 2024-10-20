import React, { useState, useEffect } from 'react';
import './CreateGroupModal.css';

const CreateGroupModal = ({ isOpen, onClose, onCreateGroup, editExpense }) => {
    const [transactionName, setTransactionName] = useState('');
    const [amount, setAmount] = useState('');
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState('');
    const [payer, setPayer] = useState('');

    useEffect(() => {
        if (editExpense) {
            setTransactionName(editExpense.transactionName);
            setAmount(editExpense.amount);
            setUsers(editExpense.users);
            setPayer(editExpense.payer);
        } else {
            setTransactionName('');
            setAmount('');
            setUsers([]);
            setPayer('');
        }
    }, [editExpense]);

    const handleAddUser = () => {
        if (newUser && !users.includes(newUser)) {
            setUsers([...users, newUser]);
            setNewUser('');
        }
    };

    const handleRemoveUser = (userToRemove) => {
        setUsers(users.filter(user => user !== userToRemove));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const expense = {
            transactionName,
            amount: parseFloat(amount),
            users,
            payer,
        };
        onCreateGroup(expense); // Pass the expense object to the Dashboard
        onClose(); // Close the modal after submission
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{editExpense ? 'Edit Expense' : 'Add Expense'}</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Transaction Name:
                        <input
                            type="text"
                            value={transactionName}
                            onChange={(e) => setTransactionName(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Amount:
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                        />
                    </label>
                    <div>
                        <h3>Users:</h3>
                        <div className="add-user-container">
                            <input
                                type="text"
                                value={newUser}
                                onChange={(e) => setNewUser(e.target.value)}
                                placeholder="Add user"
                            />
                            <button type="button" onClick={handleAddUser}>Add User</button>
                        </div>
                        <ul>
                            {users.map((user, index) => (
                                <li key={index}>
                                    {user} <button type="button" onClick={() => handleRemoveUser(user)}>Remove</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <label>
                        Who paid the bill:
                        <div className="payer-dropdown-container">
                            <select value={payer} onChange={(e) => setPayer(e.target.value)} required>
                                <option value="">Select the payer</option>
                                {users.map((user, index) => (
                                    <option key={index} value={user}>{user}</option>
                                ))}
                            </select>
                        </div>
                    </label>
                    <button type="submit">{editExpense ? 'Update Expense' : 'Create Expense'}</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default CreateGroupModal;
