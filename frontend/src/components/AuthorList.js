import React from 'react';

const AuthorList = ({ authors, onEdit, onDelete }) => {
    return (
        <div>
            {authors.map(author => (
                <div key={author.email} className="list-item">
                    <h3>{author.name}</h3>
                    <p>Email: {author.email}</p>
                    <p>Bio: {author.bio || 'N/A'}</p>
                    <button onClick={() => onEdit(author)}>Edit</button>
                    <button onClick={() => onDelete(author.email)}>Delete</button>
                </div>
            ))}
        </div>
    );
};

export default AuthorList;