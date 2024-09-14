const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const AppError = require('./utils/appError')
const globalErrorHandler = require('./controllers/errorController')
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');

const app = express();

// 1) GLOBAL: First middlewares
    // Set security HTTP headers
    app.use(helmet())

// using this middleware to handle the post request
// Development Loggin
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Limiting requests from same API
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many request from this IP, please try again in an hour!'
})
app.use('/api', limiter);

// Body-parser, reading data from the body into req.body
app.use(express.json({ limit: '10kb'}));

// Data Sanitization agains NoSQL query injection
app.use(mongoSanitize());

// Data Sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(hpp({
    whitelist: [
        'duration',
        'ratingsQuantity',
        'ratingsAverage',
        'maxGroupSize',
        'difficulty',
        'price'
    ]
}));


// Serving static files from a folder & not from a route
app.use(express.static(`${__dirname}/public`));

// creating our own Middleware functions
app.use((req, res, next) => {
    console.log('Hello from the middleware');
    next();
});

// Test Middleware
// creating another middleware to manipulate the request object
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

// Routes Mounting
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);

// Handling 404 Errors
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
})

// Global error handler
app.use(globalErrorHandler);

module.exports = app;