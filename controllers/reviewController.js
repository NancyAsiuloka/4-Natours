const Review = require('./../models/reviewModel');
// const APIFeatures = require('./../utils/apiFeatures')
const catchAsync = require('./../utils/catchAsync')
const factory = require('./handlerFactory')

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

exports.setTourUserIds = (req, res, next) => {
  // Allow nested routes
  if(!req.body.tour) req.body.tour = req.params.tourId;
  if(!req.body.user) req.body.user = req.user.id;
  next();
}

exports.getReview = factory.getOne(Review)

exports.createReview = factory.createOne(Review)

exports.updateReview = factory.updateOne(Review)

exports.deleteReview = factory.deleteOne(Review)