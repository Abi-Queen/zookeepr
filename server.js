const fs = require('fs');
const path = require('path');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = ('./routes/htmlRoutes');

//install express
const express = require('express');

//create route the front end can use to get data from
const { animals } = require('./data/animals');

//set port to environmental variable
const PORT = process.env.PORT || 3001;
const app = express();

//parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
//parse incoming JSON data
app.use(express.json());
//tells server to use api routes
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// middleware to tell server to make certain files vailable rather than route them in a specific endpoint
app.use(express.static('public'));



//instantiate: make the server listen on a port
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
