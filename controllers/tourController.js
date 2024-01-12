const Tour = require('./../models/tourModel');

// get all tours
exports.getAllTours = async (req, res) => {
  try {
    console.log(req.query);

    // const tours = await Tour.find({
    //   duration: 5,
    //   difficulty: 'easy'
    // });

    // written using special mongoose method
    const tours = await Tour.find()
      .where('duration')
      .equals(5)
      .where('difficulty')
      .equals('easy');

    res.status(200).json({
      status: 'success',
      requestAt: req.requestTime,
      // do this whenever u are sending multiple objects
      results: tours.length,
      data: {
        tours: tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    // Tour.findOne({ _id: req.params.id})

    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

// creating a new tour
exports.createTour = async (req, res) => {
  try {
    // const newTour =  new Tour({})
    // newTour.save()

    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

// Handling the delete request
exports.deleteTour = async (req, res) => {
  try {
    const tour = await Tour.deleteOne(req.params.id, req.body);
    // respond status code
    res.status(204).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
