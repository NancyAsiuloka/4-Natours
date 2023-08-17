const express = require('express');

const app = express();

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



// starting up a server
const port = 3000;
app.listen(port, () => {
    console.log(`App running on ${port}... `);
});


