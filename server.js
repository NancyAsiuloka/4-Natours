// Requiring dot env module
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD) ;
mongoose.connect();

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
