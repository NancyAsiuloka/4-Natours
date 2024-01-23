module.exports = (err, req, res, next) => {
    // console.log(err.stack)

    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if(process.env.NODE_ENV === 'development'){
        res.status(err.statusCode).json({
            status: 'fail',
            error: err,
            message: err.message,
            stack: err.stack
        })

    } else if(process.env.NODE_ENV === 'production'){
        res.status(err.statusCode).json({
            status: 'fail',
            message: err.message
        })
    }
    next()
}