const app = require('./app');

// 4: START SERVER
const port = 3000;
app.listen(port, () => {
  console.log(`App running on ${port}... `);
});

/*
200 OK
204 NO CONTENT
201 CREATED
404 NOT FOUND
500 INTERNAL SERVER ERROR
*/