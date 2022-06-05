const dotenv = require("dotenv")
const mongoose = require('mongoose');

dotenv.config()

mongoose.connection = mongoose.createConnection(process.env.MONGODB_URI, { useNewUrlParser: true })

mongoose.connection.on('error', (err) => {
  console.log('mongo connection error: %s', err.message || err);
});

mongoose.connection.on('open', () => {
  console.log('mongo connection opened');
});

module.exports = mongoose
