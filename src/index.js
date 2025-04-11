require('dotenv').config();
const morgan = require('morgan');
const express = require('express');
const httpStatus = require('http-status-codes');

const connectDB = require('./config/db');
const homeRoutes = require('./routes/home.route');
const userRoutes = require('./routes/user.route');
const mongoose = require('mongoose');

const app = express();

const port = process.env.PORT || 3000;

// const port = 3000;

app.use(morgan('dev'));

app.use(express.static('public'));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', './views');

app.use('/', homeRoutes);
app.use('/api/v1/users', userRoutes);

app.use('*', (req, res) => {
  res.status(httpStatus.NOT_FOUND).json({
    statusCode: httpStatus.NOT_FOUND,
    message: 'Tài nguyên không tồn tại.',
    data: {},
  });
});

app.listen(port, () => {
  console.log('Server is running on port 3000');
});

mongoose
  .connect('mongodb://localhost:27017/your-database', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error(error));
