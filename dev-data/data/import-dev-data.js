const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const mongoose = require('mongoose')
const app = require('./app');

const DB = process.env.DATABASE_URL.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log('DB connected successfully');
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err.message);
  });