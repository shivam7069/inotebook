


const mongoose = require('mongoose');

const dbUrl = 'mongodb://127.0.0.1:27017/inotebook';

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log('Connected to MongoDB database.');
});

module.exports = db;