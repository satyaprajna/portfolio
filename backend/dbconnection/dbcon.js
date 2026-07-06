const path = require('path');
const dotenv = require('dotenv');

for (const envPath of [path.resolve(__dirname, '..', 'Express-Backend', '.env'), path.resolve(__dirname, '..', '.env')]) {
    dotenv.config({ path: envPath });
}

const mongoose = require('mongoose');

const LOCAL_MONGO_URI = 'mongodb://localhost:27017/contact_db';

function redactMongoUri(uri) {
    return uri.replace(/\/\/([^:@/]+)(?::([^@/]*))?@/, '//***:***@');
}

function resolveMongoUri(env = process.env) {
    const configuredUri = env.MONGO_URI || env.MONGODB_URI || env.MONGO_URL;

    if (configuredUri) {
        return configuredUri;
    }

    if (env.NODE_ENV === 'production') {
        throw new Error('No MongoDB connection string found. Set MONGO_URI, MONGODB_URI, or MONGO_URL in your environment.');
    }

    return LOCAL_MONGO_URI;
}

function buildMongoCandidateUris(env = process.env) {
    return [resolveMongoUri(env)];
}

const mongoURL = resolveMongoUri();

console.log('🔌 Connecting to MongoDB:', redactMongoUri(mongoURL));

mongoose.set('strictQuery', false);
mongoose.set('bufferCommands', false);

const connectToDatabase = async () => {
    const candidateUris = buildMongoCandidateUris();

    let lastError;

    for (const uri of candidateUris) {
        try {
            await mongoose.connect(uri, {
                serverSelectionTimeoutMS: 30000,
                connectTimeoutMS: 30000,
                socketTimeoutMS: 60000,
                family: 4,
                retryWrites: true,
                w: 'majority'
            });

            console.log('✓ MongoDB Connected Successfully');
            return mongoose;
        } catch (err) {
            lastError = err;
            console.warn(`⚠️ Unable to connect to ${redactMongoUri(uri)}: ${err.message}`);
        }
    }

    console.error('✗ MongoDB Connection Error:', lastError?.message || 'Unknown connection error');
    throw lastError;
};

const connection = mongoose.connection;

connection.on('error', (err) => {
    console.error('✗ MongoDB Error:', err.message);
});

connection.on('disconnected', () => {
    console.warn('⚠️ MongoDB Disconnected');
});

module.exports = { mongoose, connectToDatabase, resolveMongoUri, buildMongoCandidateUris, LOCAL_MONGO_URI };
