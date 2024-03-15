const Review = require('./../models/reviewModel');
// const APIFeatures = require('./../utils/apiFeatures')
const catchAsync = require('./../utils/catchAsync')
// const AppError = require('./../utils/appError')

exports.createReview = catchAsync(async(req, res, next) => {
    //1) Create a new review
    const newReview = await Review.create(req.body);
    //2) Respond with the new
    res.status(201).json({
        status: 'success',
        data: {
          review: newReview,
        },
      });
});

exports.getAllReviews = catchAsync(async(req, res, next) => {
    const reviews = await Review.find()

        // Send Response
        res.status(200).json({
            status: 'success',
            requestAt: req.requestTime,
            // do this whenever u are sending multiple objects
            results: reviews.length,
            data: {
              reviews
            },
          });
});