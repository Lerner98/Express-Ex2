import React, { useState, useEffect } from 'react';
import AuthorForm from '../components/AuthorForm';
import AuthorList from '../components/AuthorList';
import { getAuthors, createAuthor, updateAuthor, deleteAuthor } from '../api';

const AuthorsPage = () => {
    const [authors, setAuthors] = useState([]);
    const [editingAuthor, setEditingAuthor] = useState(null);

    useEffect(() => {
        fetchAuthors();
    }, []);

    const fetchAuthors = async () => {
        try {
            const data = await getAuthors();
            setAuthors(data);
        } catch (error) {
            console.error('Failed to fetch authors:', error);
            alert('Failed to fetch authors: ' + error.message);
        }
    };

    const handleSubmit = async (authorData) => {
        console.log('handleSubmit called with authorData:', authorData);
        try {
            if (editingAuthor) {
                console.log('Updating author with email:', editingAuthor.email);
                await updateAuthor(editingAuthor.email, authorData);
                alert('Author updated successfully');
                setEditingAuthor(null);
            } else {
                console.log('Creating new author');
                await createAuthor(authorData);
                alert('Author created successfully');
            }
            fetchAuthors();
        } catch (error) {
            console.error('Failed to save author:', error);
            alert('Failed to save author: ' + error.message);
        }
    };

    const handleEdit = (author) => {
        setEditingAuthor(author);
    };

    const handleDelete = async (email) => {
        try {
            await deleteAuthor(email);
            alert('Author deleted successfully');
            fetchAuthors();
        } catch (error) {
            console.error('Failed to delete author:', error);
            alert('Failed to delete author: ' + error.message);
        }
    };

    return (
        <div className="container">
            <h1>Manage Authors</h1>
            <AuthorForm onSubmit={handleSubmit} initialData={editingAuthor || {}} />
            <AuthorList authors={authors} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    );
};

export default AuthorsPage;