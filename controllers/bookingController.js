const Tour = require('./../models/tourModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');

exports.getCheckoutSession = catchAsync(async(req, res, next) => {
  // 1) Get the currently booked tour
    const tour = await Tour.findById(req.params.tourId)

  // 2) Create the checkout session


  // 3) Create session as response
});
