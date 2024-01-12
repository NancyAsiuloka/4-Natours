const fs =  require('fs');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const mongoose = require('mongoose');
const Tour = require('./../../models/tourModel')

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

  // READ JSON FILE
  const tours = fs.readFileSync('tours-simple.json', 'utf-8')

  // IMPORT DATA INTO DB
  const importData = async () => {
    try{

    }catch (err){
      console.log(err);
    }
  }