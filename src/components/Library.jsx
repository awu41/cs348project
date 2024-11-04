import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Library() {
    const [books, setBooks] = useState([]);
    const [newBook, setNewBook] = useState({ name: '', author: '', rating: '' });
    const [updateBook, setUpdateBook] = useState({ book_id: '', name: '', author: '', rating: '' });
    const [deleteId, setDeleteId] = useState('');

    // Fetch all books
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4005/api/Books/');
                setBooks(response.data);
            } catch (err) {
                console.error('Error fetching books:', err);
            }
        };
        fetchData();
    }, []);

    // Insert a new book
    const handleAddBook = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:4005/api/Books/', newBook);
            setNewBook({ name: '', author: '', rating: '' });
            fetchBooks(); // Refresh book list after adding
        } catch (err) {
            console.error('Error adding book:', err);
        }
    };

    // Update a book
    const handleUpdateBook = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:4005/api/Books/${updateBook.book_id}`, updateBook);
            setUpdateBook({ book_id: '', name: '', author: '', rating: '' });
            fetchBooks(); // Refresh book list after updating
        } catch (err) {
            console.error('Error updating book:', err);
        }
    };

    // Delete a book
    const handleDeleteBook = async (e) => {
        e.preventDefault();
        try {
            await axios.delete(`http://localhost:4005/api/Books/${deleteId}`);
            setDeleteId('');
            fetchBooks(); // Refresh book list after deleting
        } catch (err) {
            console.error('Error deleting book:', err);
        }
    };

    // Generate a report
    const handleGenerateReport = async () => {
        try {
            const response = await axios.get('http://localhost:4005/api/Books/report');
            console.log('Generated Report:', response.data);
            alert('Check console for the report');
        } catch (err) {
            console.error('Error generating report:', err);
        }
    };

    // Reusable fetchBooks method
    const fetchBooks = async () => {
        try {
            const response = await axios.get('http://localhost:4005/api/Books/');
            setBooks(response.data);
        } catch (err) {
            console.error('Error fetching books:', err);
        }
    };

    return (
        <div>
            <h1>Library</h1>

            {/* Display Books */}
            <h2>Books List</h2>
            <ul>
                {books.map((book, index) => (
                    <li key={index} style={{ paddingBottom: '25px' }}>
                        <div>ID: {book.book_id}</div>
                        <div>Name: {book.name}</div>
                        <div>Author: {book.author}</div>
                        <div>Rating: {book.rating}</div>
                    </li>
                ))}
            </ul>

            {/* Add Book Form */}
            <h2>Add New Book</h2>
            <form onSubmit={handleAddBook}>
                <input
                    type="text"
                    placeholder="Name"
                    value={newBook.name}
                    onChange={(e) => setNewBook({ ...newBook, name: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Author"
                    value={newBook.author}
                    onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Rating"
                    value={newBook.rating}
                    onChange={(e) => setNewBook({ ...newBook, rating: e.target.value })}
                    required
                />
                <button type="submit">Add Book</button>
            </form>

            {/* Update Book Form */}
            <h2>Update Book</h2>
            <form onSubmit={handleUpdateBook}>
                <input
                    type="number"
                    placeholder="Book ID"
                    value={updateBook.book_id}
                    onChange={(e) => setUpdateBook({ ...updateBook, book_id: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Name"
                    value={updateBook.name}
                    onChange={(e) => setUpdateBook({ ...updateBook, name: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Author"
                    value={updateBook.author}
                    onChange={(e) => setUpdateBook({ ...updateBook, author: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Rating"
                    value={updateBook.rating}
                    onChange={(e) => setUpdateBook({ ...updateBook, rating: e.target.value })}
                    required
                />
                <button type="submit">Update Book</button>
            </form>

            {/* Delete Book Form */}
            <h2>Delete Book</h2>
            <form onSubmit={handleDeleteBook}>
                <input
                    type="number"
                    placeholder="Book ID"
                    value={deleteId}
                    onChange={(e) => setDeleteId(e.target.value)}
                    required
                />
                <button type="submit">Delete Book</button>
            </form>

            {/* Generate Report */}
            {/* <h2>Generate Report</h2>
            <button onClick={handleGenerateReport}>Generate Report</button> */}
        </div>
    );
}
