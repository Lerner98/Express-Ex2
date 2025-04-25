const fs = require('fs').promises;
const path = require('path');

// Paths to JSON files
const authorsFile = path.join(__dirname, '../data/authors.json');
const booksFile = path.join(__dirname, '../data/books.json');

// Ensure the JSON files exist
const initializeFiles = async () => {
    try {
        await fs.access(authorsFile);
    } catch (error) {
        console.error(`Failed to access authors.json: ${error.message}`);
        await fs.writeFile(authorsFile, JSON.stringify([]));
    }

    try {
        await fs.access(booksFile);
    } catch (error) {
        console.error(`Failed to access books.json: ${error.message}`);
        await fs.writeFile(booksFile, JSON.stringify([]));
    }
};

// Read data from a file
const readData = async (file) => {
    const data = await fs.readFile(file, 'utf8');
    return JSON.parse(data);
};

// Write data to a file
const writeData = async (file, data) => {
    await fs.writeFile(file, JSON.stringify(data, null, 2));
};

// CRUD for Authors
const getAuthors = async () => await readData(authorsFile);

const getAuthorByEmail = async (email) => {
    const authors = await getAuthors();
    return authors.find(author => author.email === email);
};

const createAuthor = async (author) => {
    const authors = await getAuthors();
    authors.push(author);
    await writeData(authorsFile, authors);
};

const updateAuthor = async (email, updatedAuthor) => {
    const authors = await getAuthors();
    const index = authors.findIndex(author => author.email === email);
    if (index !== -1) {
        authors[index] = { ...authors[index], ...updatedAuthor };
        await writeData(authorsFile, authors);
        return true;
    }
    return false;
};

const deleteAuthor = async (email) => {
    const authors = await getAuthors();
    const filteredAuthors = authors.filter(author => author.email !== email);
    if (filteredAuthors.length !== authors.length) {
        await writeData(authorsFile, filteredAuthors);
        return true;
    }
    return false;
};

// CRUD for Books
const getBooks = async () => await readData(booksFile);

const getBookByIsbn = async (isbn) => {
    const books = await getBooks();
    return books.find(book => book.isbn === isbn);
};

const createBook = async (book) => {
    const books = await getBooks();
    books.push(book);
    await writeData(booksFile, books);
};

const updateBook = async (isbn, updatedBook) => {
    const books = await getBooks();
    const index = books.findIndex(book => book.isbn === isbn);
    if (index !== -1) {
        books[index] = { ...books[index], ...updatedBook };
        await writeData(booksFile, books);
        return true;
    }
    return false;
};

const deleteBook = async (isbn) => {
    const books = await getBooks();
    const filteredBooks = books.filter(book => book.isbn !== isbn);
    if (filteredBooks.length !== books.length) {
        await writeData(booksFile, filteredBooks);
        return true;
    }
    return false;
};

// Initialize the JSON files when the module is loaded
initializeFiles();

module.exports = {
    getAuthors,
    getAuthorByEmail,
    createAuthor,
    updateAuthor,
    deleteAuthor,
    getBooks,
    getBookByIsbn,
    createBook,
    updateBook,
    deleteBook
};