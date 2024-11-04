// Dependencies
const express = require('express');
const app = express();
const { Sequelize } = require('sequelize');
const path = require('path');
const cors = require('cors');
// const port = 4005;


// Config
require('dotenv').config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, '../build')));

// Controllers
const booksController = require('./controllers/books_controller');
app.use('/api/Books', booksController);

// Listen
app.listen(4005, () => {
    console.log('Server is now running on port 4005');
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
})