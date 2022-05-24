const mongoose = require('mongoose');
const app = require("./app")

mongoose.connection.on('error', (err) => {
  console.log('mongo connection error: %s', err.message || err);
});

mongoose.connection.on('open', () => {
  console.log('mongo connection opened');
});

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

const port = process.env.PORT

app.listen(port)
console.info(`Server running on port ${port}`)