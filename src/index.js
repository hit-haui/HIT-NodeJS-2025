require('dotenv').config();
const express = require('express');

const homeRoutes = require('./routes/home.route');
const userRoutes = require('./routes/user.route');

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

app.use('/', homeRoutes);
app.use('/api/v1/users', userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
