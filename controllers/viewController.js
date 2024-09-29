const Tour = require('../models/tourModel');
const catchAsync = require('../utils/catchAsync');
const dayjs = require('dayjs');

exports.getOverview = catchAsync(async (req, res) => {
  // 1) Get tour data from collection
  const tours = await Tour.find();

  // 2) Format the tour start dates using Day.js
  const formattedTours = tours.map((tour) => ({
    ...tour._doc,
    formattedStartDate: dayjs(tour.startDates[0]).format('MMM YYYY'),
  }));

  // 2) Build template

  // 3) Render that template using the tour data from 1)

  res.status(200).render('overview', {
    title: 'All Tours',
    tours: formattedTours,
  });
});

exports.getTour = catchAsync(async (req, res) => {
  res.status(200).render('tour', {
    title: 'The Forest Hiker Tour',
  });
});
