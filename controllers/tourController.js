const Tour = require('./../models/tourModel');
const APIFeatures = require('./../utils/apiFeatures')
const catchAsync = require('./../utils/catchAsync')
const AppError = require('./../utils/appError')
const factory = require('./handlerFactory')

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};


// get all tours
exports.getAllTours = catchAsync(async (req, res, next) => {
    // Execute Query
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const tours = await features.query;

    // Send Response
    res.status(200).json({
      status: 'success',
      requestAt: req.requestTime,
      // do this whenever u are sending multiple objects
      results: tours.length,
      data: {
        tours: tours,
      },
    });
});

exports.getTour = factory.getOne(Tour, { path: 'reviews' })
// creating a new tour
exports.createTour = factory.createOne(Tour)

exports.updateTour = factory.updateOne(Tour)

// Handling the delete request
exports.deleteTour = factory.deleteOne(Tour)

exports.getTourStats = catchAsync(async (req, res, next) => {
    const stats = await Tour.aggregate([
      {
        $match: { ratingsAverage: { $gte: 4.5}}
      },
      {
        $group: {
          _id: {$toUpper: '$difficulty'},
          numTours: { $sum: 1},
          numRatings: {$sum: '$ratingsQuantity'},
          averageRating: {$avg : '$ratingsAverage'},
          averagePrice: {$avg: '$price'},
          minPrice: {$min: '$price'},
          maxPrice: {$max: '$price'},
        }
      },
      {
        $sort: { averagePrice: 1}
      },
      // {
      //   $match: {_id: { $ne: 'EASY'}}
      // }
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        stats,
      },
    });
});

exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
    const year = req.params.year * 1; // 2021

    const plan = await Tour.aggregate([
      {
        $unwind: '$startDates'
      },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          }
        }
      },
      {
        $group: {
          _id: {$month: '$startDates'},
          numTourStart: { $sum: 1},
          tours: { $push: '$name'}
        }
      },
      {
        $addFields: { month: '$_id'}
      },
      {
        $project: {
          _id: 0
        }
      },
      {
        $sort: {numTourStarts: -1}
      },
      {
        $limit: 12
      }
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        plan,
      },
    });
});