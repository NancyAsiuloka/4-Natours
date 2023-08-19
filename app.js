const express = require('express');

const app = express();
const fs = require('fs');

// using this middleware to handle the post request
app.use(express.json());

// creating our own Middleware functions
app.use((req, res, next) => {
    console.log('Hello from the middleware');
    next();
});

// creating another middleware to manipulate the request object
app.use((req, res, next) => {

});



// Starting API handling request
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// get all tours
const getAllTours = (req, res) => {
  // what to do when someone hits this route
  // we have to send back all the tours
  res.status(200).json({
    status: 'success',
    // do this whenever u are sending multiple objects
    results: tours.length,
    data: {
      tours: tours,
    },
  });
};


// getting data by its id
// how to specify params in the URL
const getTour = (req, res) => {
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
const createTour = (req, res) => {
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
const updateTour = (req, res) => {
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
const deleteTour = (req, res) => {
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

// get to get all the tours
// app.get('/api/v1/tours', getAllTours);

// post to create a new tours
// app.post('/api/v1/tours', createTour);

// get Tour
// app.get('/api/v1/tours/:id', getTour);

// update Tours
// app.patch('/api/v1/tours/:id', updateTour);

// Handling the delete request
// app.delete('/api/v1/tours/:id', deleteTour);

app.route('/api/v1/tours')
.get(getAllTours)
.post(createTour);

app.route('/api/v1/tours/:id')
.get(getTour)
.patch(updateTour)
.delete(deleteTour);

// starting up a server
const port = 3000;
app.listen(port, () => {
  console.log(`App running on ${port}... `);
});

/*
200 OK
204 NO CONTENT
201 CREATED
404 NOT FOUND
*/
