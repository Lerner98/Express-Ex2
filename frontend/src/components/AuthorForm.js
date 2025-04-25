import React, { useState } from 'react';

const AuthorForm = ({ onSubmit, initialData = {} }) => {
    const [name, setName] = useState(initialData.name || '');
    const [email, setEmail] = useState(initialData.email || '');
    const [password, setPassword] = useState('');
    const [bio, setBio] = useState(initialData.bio || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('AuthorForm handleSubmit called'); // Debugging
        onSubmit({ name, email, password: password || undefined, bio });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="form-group">
                <label>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="form-group">
                <label>Password (leave blank to keep unchanged)</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="form-group">
                <label>Bio</label>
                <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default AuthorForm;