const express = require('express');
const app = express();
const path = require('path');

// dotenv
require('dotenv').config();

// db
require('./configs/database');

// static file
app.use(express.static(path.join(__dirname, 'public')));

// json -> js
app.use(express.json());

const PORT = process.env.PORT || 3000;
const clientPage = require('./routes/client/index.route');

// view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// route
app.use('/', clientPage);

app.listen(PORT, () => {
  console.log(`The website is running at ${PORT}`);
});
