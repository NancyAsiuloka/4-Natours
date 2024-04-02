const Review = require('./../models/reviewModel');
// const APIFeatures = require('./../utils/apiFeatures')
const catchAsync = require('./../utils/catchAsync')
const factory = require('./handlerFactory')

exports.createReview = catchAsync(async(req, res, next) => {
     // Allow nested routes
     if(!req.body.tour) req.body.tour = req.params.tourId;
     if(!req.body.user) req.body.user = req.user.id;


  //1) Create a new review
    const newReview = await Review.create(req.body);
    //2) Respond with the new
    res.status(201).json({
        status: 'Success',
        data: {
          review: newReview,
        },
      });
});


exports.getAllReviews = catchAsync(async(req, res, next) => {
  let filter = {};
  if(req.params.tourId) filter = {tour: req.params.tourId}

  const reviews = await Review.find(filter)

        // Send Response
        res.status(200).json({
            status: 'Success',
            requestAt: req.requestTime,
            results: reviews.length,
            data: {
              reviews
            },
          });
});