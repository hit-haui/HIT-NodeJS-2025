require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const homeRoutes = require('./routes/home.route');
const userRoutes = require('./routes/user.route');
const port = process.env.PORT || 3000;





app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

app.use('/', homeRoutes);
app.use('/api/v1/users', userRoutes);


//mongodb connection
async function connectDB() {
  try {
    await mongoose.connect(process.env.DB_CONNECTION);
    console.log('MongoDB connected...');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
}


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

connectDB();
