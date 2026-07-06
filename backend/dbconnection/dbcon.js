const path = require('path');
const dotenv = require('dotenv');

for (const envPath of [path.resolve(__dirname, '..', 'Express-Backend', '.env'), path.resolve(__dirname, '..', '.env')]) {
    dotenv.config({ path: envPath });
}

const mongoose = require('mongoose');

const mongoURL = process.env.MONGO_URL || 'mongodb://localhost:27017/contact_db';
console.log('🔌 Connecting to MongoDB:', mongoURL);

mongoose.set('strictQuery', false);

mongoose.connect(mongoURL)
    .then(() => console.log('✓ MongoDB Connected Successfully'))
    .catch(err => console.error('✗ MongoDB Connection Error:', err.message));

const connection = mongoose.connection;

connection.on('error', (err) => {
    console.error('✗ MongoDB Error:', err.message);
});

connection.on('disconnected', () => {
    console.warn('⚠️ MongoDB Disconnected');
});

module.exports = mongoose;