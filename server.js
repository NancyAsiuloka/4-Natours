// Requiring dot env module
const mongoose = require('mongoose')

// process.on('uncaughtException', err => {
//   console.log('UNCAUGHT EXCEPTION! Shutting down...')
//   console.log(err.name, err.message)
//   process.exit(1)
// })

const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE_URL.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose
  .connect(DB).then(() => {
    console.log('DB connected successfully');
  })


// ENVIRONMENT VARIABLES
// They are variables that are used to define
// the environment in which a node app is running
// console.log(app.get('env'));
// console.log(process.env);


// 4: START SERVER
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on ${port}... `);
});

// handling a promise rejection globally
// process.on('unhandledRejection', err => {
//   console.log(err.name, err.message)
//   console.log('UNHANDLED REJECTION! Shutting down...')
//   server.close(() => {
//     process.exit(1)
//   })
// })

