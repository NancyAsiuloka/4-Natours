// Requiring dot env module
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });


const DB = process.env.DATABASE_URL.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connected successfully');
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err.message);
  });

  const tourSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
    },
    rating: {
      type: Number,
      default: 4.5,
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price'],
    },
  });
  const Tour = mongoose.model('Tour', tourSchema);

  const testTour = new Tour({
    name: 'The Forest Hiker',
  });
  testTour.save().then(doc => {
    console.log(doc);
  }).catch(err => {
    console.log('ERROR!:', err)
  })


// ENVIRONMENT VARIABLES
// They are variables that are used to define
// the environment in which a node app is running
// console.log(app.get('env'));
// console.log(process.env);


// 4: START SERVER
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on ${port}... `);
});

/*
200 OK
204 NO CONTENT
201 CREATED
404 NOT FOUND
500 INTERNAL SERVER ERROR
*/
