const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// 1: First middlewares
// using this middleware to handle the post request
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(`${__dirname}/public`));


// creating our own Middleware functions
app.use((req, res, next) => {
    console.log('Hello from the middleware');
    next();
});

// creating another middleware to manipulate the request object
app.use((req, res, next) => {
    //adding the current time to the request
    req.requestTime = new Date().toISOString();
    next();
});

// Routes Mounting
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;