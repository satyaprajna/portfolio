const path = require('path');
const dotenv = require('dotenv');

for (const envPath of [path.resolve(__dirname, 'Express-Backend', '.env'), path.resolve(__dirname, '.env')]) {
    dotenv.config({ path: envPath });
}

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
require('./dbconnection/dbcon');

// Route files
const bookRoutes = require('./routes/book_routes');
const contactRoutes = require('./routes/web');

app.get('/', (req, res) => {
    res.json({ message: 'Express Backend is Running' });
});

app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        dbState: ['disconnected', 'connected', 'connecting', 'disconnecting'][mongoose.connection.readyState]
    });
});

// Namespaced API routes
app.use('/api/books', bookRoutes);
app.use('/api/contacts', contactRoutes);

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ success: false, message: err.message || 'Server error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

process.on('unhandledRejection', err => {
    console.error('Unhandled Rejection:', err.message || err);
});