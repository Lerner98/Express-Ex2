const express = require('express');
const router = express.Router();
const { getBooks, getBookByIsbn, createBook, updateBook, deleteBook } = require('../database');
const upload = require('../middleware/upload');
const cloudinary = require('../config/cloudinary');

// Get all books
router.get('/', async (req, res) => {
    try {
        const books = await getBooks();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve books', error: error.message });
    }
});

// Get a book by ISBN
router.get('/:isbn', async (req, res) => {
    try {
        const book = await getBookByIsbn(req.params.isbn);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve book', error: error.message });
    }
});

// Create a new book (with image upload, optimization, and transformation)
router.post('/', upload.single('image'), async (req, res) => {
    try {
        const { title, isbn, genre, publishedYear } = req.body;
        if (!title || !isbn || !genre || !publishedYear) {
            return res.status(400).json({ message: 'Title, ISBN, genre, and published year are required' });
        }

        // Check if book already exists
        const existingBook = await getBookByIsbn(isbn);
        if (existingBook) {
            return res.status(400).json({ message: 'Book with this ISBN already exists' });
        }

        // Upload image to Cloudinary if provided
        let imageUrl = '';
        if (req.file) {
            const result = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { 
                        resource_type: 'image',
                        public_id: `books/${isbn}`, // Use ISBN as the public_id for better organization
                    },
                    (error, result) => {
                        if (error) reject(error);
                        resolve(result);
                    }
                );
                stream.end(req.file.buffer);
            });

            // Optimize delivery: auto-format and auto-quality
            imageUrl = cloudinary.url(`books/${isbn}`, {
                fetch_format: 'auto',
                quality: 'auto'
            });

            // Transform the image: auto-crop to square aspect_ratio (500x500)
            imageUrl = cloudinary.url(`books/${isbn}`, {
                crop: 'auto',
                gravity: 'auto',
                width: 500,
                height: 500,
                fetch_format: 'auto',
                quality: 'auto'
            });
        }

        // Create new book
        const newBook = { title, isbn, genre, publishedYear: parseInt(publishedYear), image: imageUrl };
        await createBook(newBook);
        res.status(201).json({ message: 'Book created successfully', book: newBook });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create book', error: error.message });
    }
});

// Update a book (with optional image upload, optimization, and transformation)
router.put('/:isbn', upload.single('image'), async (req, res) => {
    try {
        const { title, genre, publishedYear } = req.body;
        const isbn = req.params.isbn;

        // Upload new image to Cloudinary if provided
        let imageUrl;
        if (req.file) {
            const result = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { 
                        resource_type: 'image',
                        public_id: `books/${isbn}`, // Use ISBN as the public_id for better organization
                    },
                    (error, result) => {
                        if (error) reject(error);
                        resolve(result);
                    }
                );
                stream.end(req.file.buffer);
            });

            // Optimize delivery: auto-format and auto-quality
            imageUrl = cloudinary.url(`books/${isbn}`, {
                fetch_format: 'auto',
                quality: 'auto'
            });

            // Transform the image: auto-crop to square aspect_ratio (500x500)
            imageUrl = cloudinary.url(`books/${isbn}`, {
                crop: 'auto',
                gravity: 'auto',
                width: 500,
                height: 500,
                fetch_format: 'auto',
                quality: 'auto'
            });
        }

        // Update book data
        const updatedData = { title, genre, publishedYear: parseInt(publishedYear) };
        if (imageUrl) updatedData.image = imageUrl;

        const updated = await updateBook(isbn, updatedData);
        if (!updated) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json({ message: 'Book updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update book', error: error.message });
    }
});

// Delete a book
router.delete('/:isbn', async (req, res) => {
    try {
        const deleted = await deleteBook(req.params.isbn);
        if (!deleted) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete book', error: error.message });
    }
});

module.exports = router;