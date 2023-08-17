const express = require('express');

const app = express();
const fs = require('fs');

// using this middleware to handle the post request
app.use(express.json());

// Define Route in express
// routing means determining how an applicaton responds to a certain client request to a certain URL
/*
app.get('/', (req, res) => {
    res.status(200)
    .json({message: 'Hello from the server side!', app: 'Natours'});
});

app.post('/', (req, res) => {
    res.send('You can post to this endpoint...')
});
*/

// Starting API handling request
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// get to get all the tours
app.get('/api/v1/tours', (req, res) => {
  // what to do when someone hits this route
  // we have to send back all the tours
  res.status(200).json({
    status: 'success',
    // do this whenever u are sending multiple objects
    results: tours.length,
    data: {
        tours: tours
    }
  });
});

// post to create a new tours
app.post('/api/v1/tours', (req,res)=> {
    console.log(req.body);
});

// starting up a server
const port = 3000;
app.listen(port, () => {
  console.log(`App running on ${port}... `);
});
