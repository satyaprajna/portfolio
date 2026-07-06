const test = require('node:test');
const assert = require('node:assert/strict');

const { buildMongoCandidateUris, resolveMongoUri } = require('../dbconnection/dbcon');

test('uses the local MongoDB URL when no remote URI is configured in development', () => {
  const env = {
    NODE_ENV: 'development',
    MONGO_URI: '',
    MONGODB_URI: '',
    MONGO_URL: ''
  };

  assert.equal(resolveMongoUri(env), 'mongodb://localhost:27017/contact_db');
});

test('prefers an explicitly configured remote URI when present', () => {
  const env = {
    NODE_ENV: 'development',
    MONGO_URI: 'mongodb+srv://example.com/test',
    MONGODB_URI: '',
    MONGO_URL: ''
  };

  assert.equal(resolveMongoUri(env), 'mongodb+srv://example.com/test');
});

test('does not fall back to local MongoDB when a remote URI is configured', () => {
  const env = {
    NODE_ENV: 'development',
    MONGO_URI: 'mongodb+srv://example.com/test',
    MONGODB_URI: '',
    MONGO_URL: ''
  };

  assert.deepEqual(buildMongoCandidateUris(env), ['mongodb+srv://example.com/test']);
});

test('does not fall back to local MongoDB in production when a remote URI is missing', () => {
  const env = {
    NODE_ENV: 'production',
    MONGO_URI: '',
    MONGODB_URI: '',
    MONGO_URL: ''
  };

  assert.throws(() => resolveMongoUri(env), /No MongoDB connection string found/);
});
