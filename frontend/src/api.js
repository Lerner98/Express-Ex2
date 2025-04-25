import axios from 'axios';

const API_URL = '';

// Authors API
export const getAuthors = async () => {
    const response = await axios.get(`${API_URL}/api/authors`);
    return response.data;
};

export const getAuthor = async (email) => {
    const response = await axios.get(`${API_URL}/api/authors/${email}`);
    return response.data;
};

export const createAuthor = async (author) => {
    const response = await axios.post(`${API_URL}/api/authors`, author);
    return response.data;
};

export const updateAuthor = async (email, author) => {
    const response = await axios.put(`${API_URL}/api/authors/${email}`, author);
    return response.data;
};

export const deleteAuthor = async (email) => {
    const response = await axios.delete(`${API_URL}/api/authors/${email}`);
    return response.data;
};

// Books API
export const getBooks = async () => {
    const response = await axios.get(`${API_URL}/api/books`);
    return response.data;
};

export const getBook = async (isbn) => {
    const response = await axios.get(`${API_URL}/api/books/${isbn}`);
    return response.data;
};

export const createBook = async (bookData, imageFile) => {
    const formData = new FormData();
    formData.append('title', bookData.title);
    formData.append('isbn', bookData.isbn);
    formData.append('genre', bookData.genre);
    formData.append('publishedYear', bookData.publishedYear);
    if (imageFile) {
        formData.append('image', imageFile);
    }
    const response = await axios.post(`${API_URL}/api/books`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
};

export const updateBook = async (isbn, bookData, imageFile) => {
    const formData = new FormData();
    formData.append('title', bookData.title);
    formData.append('genre', bookData.genre);
    formData.append('publishedYear', bookData.publishedYear);
    if (imageFile) {
        formData.append('image', imageFile);
    }
    const response = await axios.put(`${API_URL}/api/books/${isbn}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
};

export const deleteBook = async (isbn) => {
    const response = await axios.delete(`${API_URL}/api/books/${isbn}`);
    return response.data;
};