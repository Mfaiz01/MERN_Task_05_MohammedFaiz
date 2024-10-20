// Group.js
import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import './Group.css'; 

const Group = () => {
    const [groupName, setGroupName] = useState('');
    const [members, setMembers] = useState(['']);
    const [transaction, setTransaction] = useState('');

    const handleMemberChange = (index, value) => {
        const newMembers = [...members];
        newMembers[index] = value;
        setMembers(newMembers);
    };

    const addMemberField = () => {
        setMembers([...members, '']);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const groupData = {
            groupName,
            members,
            transaction,
        };
        console.log(groupData); // Submit group data
    };

    return (
        <div className="group">
            <Header /> {/* Including Header */}

            <main className="group-content">
                <h1>Create a Group</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Group Name"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        required 
                    />
                    <input
                        type="text"
                        placeholder="Transaction Name"
                        value={transaction}
                        onChange={(e) => setTransaction(e.target.value)}
                        required 
                    />
                    {members.map((member, index) => (
                        <input
                            key={index}
                            type="text"
                            placeholder={`Member ${index + 1}`}
                            value={member}
                            onChange={(e) => handleMemberChange(index, e.target.value)}
                            required 
                        />
                    ))}
                    <button type="button" onClick={addMemberField}>
                        Add Another Member
                    </button>
                    <button type="submit">Create Group</button>
                </form>
            </main>

            <Footer /> {/* Including Footer */}
        </div>
    );
};

export default Group;
