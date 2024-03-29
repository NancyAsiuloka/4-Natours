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
  const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));

  // IMPORT DATA INTO DB
  const importData = async () => {
    try{
      await Tour.create(tours)
      console.log('Data successfully loaded!');

    }catch (err){
      console.log(err);
    }
    process.exit();
  }

  // DELETING ALL DATA FROM COLLECTION
  const deleteData = async() => {
    try{
      await Tour.deleteMany();
      console.log('Data successfully deleted!');

    }catch (err){
      console.log(err);
    }
    process.exit();
  }

  if (process.argv[2] === '--import') {
    importData()
  } else if(process.argv[2] === '--delete'){
    deleteData()
  }
