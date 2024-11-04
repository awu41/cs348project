const books = require('express').Router()
const db =  require('../models')
const { Book } = db

// GET ALL BOOKS
books.get('/', async (req, res) => {
    try {
        const foundBooks = await Book.findAll()
        res.status(200).json(foundBooks)
        console.log('request success')
    } catch (err) {
        res.status(500).send("Server Error")
        console.log(err)
    }
})

// CREATE A NEW BOOK
books.post('/', async (req, res) => {
    const { name, author, rating } = req.body;

    try {
        if (!name || !author || !rating) {
            return res.status(400).json({ error: 'Please provide name, author, and rating for the book.' });
        }
        const newBook = await Book.create({
            name,
            author,
            rating
        });
        res.status(201).json(newBook);
        console.log('Book added successfully');
    } catch (err) {
        res.status(500).send("Server Error");
        console.log(err);
    }
})
// UPDATE A BOOK
books.put('/:book_id', async (req, res) => {
    const { book_id } = req.params;
    const { name, author, rating } = req.body;
    console.log('Updating Book ID:', book_id);
    try {
        if (!book_id) {
            return res.status(400).json({ error: 'Book ID is required' });
        }

        const updatedBook = await Book.update({
            name,
            author,
            rating
        }, {
            where: { book_id }
        });

        if (updatedBook[0] > 0) {
            res.status(200).json({ message: 'Book updated successfully' });
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (err) {
        res.status(500).send("Server Error");
        console.log(err);
    }
})

// DELETE A BOOK
books.delete('/:book_id', async (req, res) => {
    const { book_id } = req.params;

    try {
        const deleted = await Book.destroy({
            where: { book_id }
        });

        if (deleted) {
            res.status(200).json({ message: 'Book deleted successfully' });
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (err) {
        res.status(500).send("Server Error");
        console.log(err);
    }
})

// GENERATE REPORT
books.get('/report', async (req, res) => {
    try {
        const report = await db.sequelize.query('SELECT * FROM generate_books_report()', {
            type: db.Sequelize.QueryTypes.SELECT
        });
        res.status(200).json(report);
        console.log('Report generated successfully');
    } catch (err) {
        res.status(500).send("Server Error");
        console.log(err);
    }
})

module.exports = books