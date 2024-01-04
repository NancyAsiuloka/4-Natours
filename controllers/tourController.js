const Tour = require('./../models/tourModel')

// get all tours
exports.getAllTours = async (req, res) => {
  try{
    const tours = await Tour.find()

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

  }
};


exports.getTour = (req, res) => {
  // req.params is an object that automatically assign the value to our parameter that we define
  // how to read parameters from the url by using req.params
  console.log(req.params);
  // we used the id(parameter) to find a tour with the exact id
  const id = req.params.id * 1; //converting strings to number
  // const tour = tours.find((el) => el.id === id);
  // console.log(tour);

  // // if(id > tours.length) {
  // if (!tour) {
  //   return res.status(404).json({
  //     status: 'fail',
  //     message: 'Invalid id',
  //   });
  // }

  // res.status(200).json({
  //   status: 'success',
  //   data: {
  //     tour,
  //   },
  // });
};


// creating a new tour
exports.createTour = async (req, res) => {
  try{
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
      status:'fail',
      message: err,
    })
  }
};

exports.updateTour = (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
          tour: '<Updated tour here...>',
        },
      });
};

// Handling the delete request
exports.deleteTour = (req, res) => {
// respond status code
      res.status(204).json({
        status: 'success',
        data: null,
      });
};
