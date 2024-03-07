const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const AppError = require('./utils/appError')
const globalErrorHandler = require('./controllers/errorController')
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// 1) GLOBAL: First middlewares
// using this middleware to handle the post request
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Limiting requests from same IP
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many request from this IP, please try again in an hour!'
})
app.use('/api', limiter);


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
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
})

// Global error handler
app.use(globalErrorHandler);

module.exports = app;