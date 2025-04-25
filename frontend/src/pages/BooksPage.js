import React, { useState, useEffect } from 'react';
import BookForm from '../components/BookForm';
import BookList from '../components/BookList';
import { getBooks, createBook, updateBook, deleteBook } from '../api';

const BooksPage = () => {
    const [books, setBooks] = useState([]);
    const [editingBook, setEditingBook] = useState(null);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const data = await getBooks();
            setBooks(data);
        } catch (error) {
            console.error('Failed to fetch books:', error);
        }
    };

    const handleSubmit = async (bookData, imageFile) => {
        try {
            if (editingBook) {
                await updateBook(editingBook.isbn, bookData, imageFile);
                setEditingBook(null);
            } else {
                await createBook(bookData, imageFile);
            }
            fetchBooks();
        } catch (error) {
            console.error('Failed to save book:', error);
        }
    };

    const handleEdit = (book) => {
        setEditingBook(book);
    };

    const handleDelete = async (isbn) => {
        try {
            await deleteBook(isbn);
            fetchBooks();
        } catch (error) {
            console.error('Failed to delete book:', error);
        }
    };

    return (
        <div className="container">
            <h1>Manage Books</h1>
            <BookForm onSubmit={handleSubmit} initialData={editingBook || {}} />
            <BookList books={books} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    );
};

export default BooksPage;