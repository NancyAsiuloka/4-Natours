const fs = require('fs');

// Starting API handling request
const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
  );

//2: ROUTE HANDLERS FOR TOURS

// Check id
exports.checkId = (req, res, next, val) => {
  console.log(`Tour id is: ${val}`);
}


// get all tours
exports.getAllTours = (req, res) => {
  // what to do when someone hits this route
  // we have to send back all the tours
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestAt: req.requestTime,
    // do this whenever u are sending multiple objects
    results: tours.length,
    data: {
      tours: tours,
    },
  });
};


// getting data by its id
// how to specify params in the URL
exports.getTour = (req, res) => {
  // req.params is an object that automatically assign the value to our parameter that we define
  // how to read parameters from the url by using req.params
  console.log(req.params);
  // we used the id(parameter) to find a tour with the exact id
  const id = req.params.id * 1; //converting strings to number
  const tour = tours.find((el) => el.id === id);

  // if(id > tours.length) {
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid id',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};


// creating a new tour
exports.createTour = (req, res) => {
      // console.log(req.body);
  // figure out the id of the new object
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

// Handling Patch requests to update data
// we have 2 http methods to update data(put $ patch)
// with put, we expect our application receives the entire new updated object
// with patch, we expect the properties that should be updated on the object
exports.updateTour = (req, res) => {
    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
          status: 'fail',
          message: 'Invalid id',
        });
      }

      res.status(200).json({
        status: 'success',
        data: {
          tour: '<Updated tour here...>',
        },
      });
};

// Handling the delete request
exports.deleteTour = (req, res) => {
    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
          status: 'fail',
          message: 'Invalid id',
        });
      }

      res.status(204).json({
        status: 'success',
        data: null,
      });
};
