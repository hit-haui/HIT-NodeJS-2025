require('dotenv').config();
const morgan = require('morgan');
const express = require('express');
const httpStatus = require('http-status-codes');

const connectDB = require('./config/db');
const homeRoutes = require('./routes/home.route');
const userRoutes = require('./routes/user.route');
const errorHandler = require('./middlewares/error.middleware')
const app = express();

const port = process.env.PORT || 3000;

app.use(morgan('dev'));

app.use(express.static('public'));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', './views');

const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

app.use(logger); // Sử dụng middleware logger cho tất cả các route

app.use('/', homeRoutes);
app.use('/api/v1/users', userRoutes);

app.use('*', (req, res) => {
  res.status(httpStatus.NOT_FOUND).json({
    statusCode: httpStatus.NOT_FOUND,
    message: 'Tài nguyên không tồn tại.',
    data: {},
  });
});

app.use(errorHandler);

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to the database:', err);
  });
