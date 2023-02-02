import mongoose from "mongoose"

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('error', (err) => {
  console.log('mongo connection error: %s', err.message || err);
});

mongoose.connection.on('open', () => {
  console.log('mongo connection opened');
});

export default mongoose