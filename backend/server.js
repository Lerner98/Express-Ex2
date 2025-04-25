const express = require('express');
const authorRoutes = require('./routes/authorRoutes');
const bookRoutes = require('./routes/bookRoutes');
const errorHandler = require('./errorHandler');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/authors', authorRoutes);
app.use('/api/books', bookRoutes);

// Error handling middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 4000; // Changed from 3000 to 4000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});