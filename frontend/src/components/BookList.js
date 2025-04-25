import React from 'react';

const BookList = ({ books, onEdit, onDelete }) => {
    return (
        <div>
            {books.map(book => (
                <div key={book.isbn} className="list-item">
                    <h3>{book.title}</h3>
                    <p>ISBN: {book.isbn}</p>
                    <p>Genre: {book.genre}</p>
                    <p>Published Year: {book.publishedYear}</p>
                    {book.image && <img src={book.image} alt={book.title} />}
                    <button onClick={() => onEdit(book)}>Edit</button>
                    <button onClick={() => onDelete(book.isbn)}>Delete</button>
                </div>
            ))}
        </div>
    );
};

export default BookList;