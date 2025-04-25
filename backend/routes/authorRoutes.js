const express = require('express');
const router = express.Router();
const { getAuthors, getAuthorByEmail, createAuthor, updateAuthor, deleteAuthor } = require('../database');
const { hashPassword, comparePassword } = require('../utils/bcrypt');

// Get all authors
router.get('/', async (req, res) => {
    try {
        const authors = await getAuthors();
        res.status(200).json(authors);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve authors', error: error.message });
    }
});

// Get an author by email
router.get('/:email', async (req, res) => {
    try {
        const author = await getAuthorByEmail(req.params.email);
        if (!author) {
            return res.status(404).json({ message: 'Author not found' });
        }
        res.status(200).json(author);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve author', error: error.message });
    }
});

// Create a new author (with password hashing)
router.post('/', async (req, res) => {
    try {
        const { name, email, password, bio } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Name, email, and password are required' });
        }

        // Check if author already exists
        const existingAuthor = await getAuthorByEmail(email);
        if (existingAuthor) {
            return res.status(400).json({ message: 'Author with this email already exists' });
        }

        // Hash the password
        const hashedPassword = await hashPassword(password);

        // Create new author
        const newAuthor = { name, email, password: hashedPassword, bio: bio || '' };
        await createAuthor(newAuthor);
        res.status(201).json({ message: 'Author created successfully', author: newAuthor });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create author', error: error.message });
    }
});

// Update an author
router.put('/:email', async (req, res) => {
    try {
        const { name, password, bio } = req.body;
        const email = req.params.email;

        // If password is provided, hash it
        let updatedData = { name, bio };
        if (password) {
            updatedData.password = await hashPassword(password);
        }

        const updated = await updateAuthor(email, updatedData);
        if (!updated) {
            return res.status(404).json({ message: 'Author not found' });
        }

        res.status(200).json({ message: 'Author updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update author', error: error.message });
    }
});

// Delete an author
router.delete('/:email', async (req, res) => {
    try {
        const deleted = await deleteAuthor(req.params.email);
        if (!deleted) {
            return res.status(404).json({ message: 'Author not found' });
        }
        res.status(200).json({ message: 'Author deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete author', error: error.message });
    }
});

module.exports = router;