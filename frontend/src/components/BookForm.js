import React, { useState } from 'react';

const BookForm = ({ onSubmit, initialData = {} }) => {
    const [title, setTitle] = useState(initialData.title || '');
    const [isbn, setIsbn] = useState(initialData.isbn || '');
    const [genre, setGenre] = useState(initialData.genre || '');
    const [publishedYear, setPublishedYear] = useState(initialData.publishedYear || '');
    const [image, setImage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ title, isbn, genre, publishedYear }, image);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Title</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div className="form-group">
                <label>ISBN</label>
                <input type="text" value={isbn} onChange={(e) => setIsbn(e.target.value)} required />
            </div>
            <div className="form-group">
                <label>Genre</label>
                <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} required />
            </div>
            <div className="form-group">
                <label>Published Year</label>
                <input type="number" value={publishedYear} onChange={(e) => setPublishedYear(e.target.value)} required />
            </div>
            <div className="form-group">
                <label>Image (leave blank to keep unchanged)</label>
                <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default BookForm;