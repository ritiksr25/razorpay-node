const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

require('dotenv').config();
require('./config/dbconnection');

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//load Schemas
const Order = require('./models/Order');

//Routes
app.use('/', require('./routes/index'));

//Setting up server
startServer = async () => {
  try {
    await app.listen(process.env.PORT);
    console.log(`Server is up and running on Port ${process.env.PORT}`);
  }
  catch (err) {
    console.log('Error in running server.');
  }
}
startServer();
