const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// 1: First middlewares
// using this middleware to handle the post request
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(express.json());
// how to serve static files from a folder & not from a route
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

// Handling 404 Errors
app.all('*', (req, res, next) => {
    // res.status(404).json({
    //     status: 'fail',
    //     message: `Can't find ${req.originalUrl} on this server!`
    // })

    const err = new Error(`Can't find ${req.originalUrl} on this server!`)
    err.status = 'fail';
    err.statusCode = 404

    next(err)
})

// Global error handler
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        status: 'err.status',
        message: err.message
    })

    next()
})

module.exports = app;