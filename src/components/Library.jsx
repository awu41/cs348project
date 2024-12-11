import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Library() {
    const [books, setBooks] = useState([]);
    const [newBook, setNewBook] = useState({ name: '', author: '', rating: '' });
    const [updateBook, setUpdateBook] = useState({ book_id: '', name: '', author: '', rating: '' });
    const [deleteId, setDeleteId] = useState('');
    const [sortCriteria, setSortCriteria] = useState('dateAsc');

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

    const handleSortChange = (e) => {
        setSortCriteria(e.target.value);
    };

    const sortedBooks = [...books].sort((a, b) => {
        switch (sortCriteria) {
            case 'dateAsc':
                return new Date(a.book_id) - new Date(b.book_id); // Oldest to newest
            case 'dateDesc':
                return new Date(b.book_id) - new Date(a.book_id); // Newest to oldest
            case 'titleAsc':
                return a.name.localeCompare(b.name); // A-Z by title
            case 'titleDesc':
                return b.name.localeCompare(a.name); // Z-A by title
            case 'ratingAsc':
                return new Date(b.rating) - new Date(a.rating); // Rating by high to low
            case 'ratingDesc':
                return  new Date(a.rating) - new Date(b.rating); // Rating by low to high
            case 'authorAsc':
                return a.author.localeCompare(b.author); // A-Z by author
            case 'authorDesc':
                return b.author.localeCompare(a.author); // Z-A by author        
            default:
                return 0;
        }
    });

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

            {/* Sort Order Toggle */}
            <label htmlFor="sort">Sort by:</label>
            <select id="sort" value={sortCriteria} onChange={handleSortChange}>
                <option value="dateAsc">Date (Oldest to Newest)</option>
                <option value="dateDesc">Date (Newest to Oldest)</option>
                <option value="titleAsc">Title (A-Z)</option>
                <option value="titleDesc">Title (Z-A)</option>
                <option value="ratingAsc">Rating (Highest to Lowest)</option>
                <option value="ratingDesc">Rating (Lowest to Highest)</option>
                <option value="authorAsc">Author (A-Z)</option>
                <option value="authorDesc">Author (Z-A)</option>
            </select>

            {/* Display Books */}
            <h2>Books List</h2>
            <ul>
                {sortedBooks.map((book, index) => (
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
