const router = require('express').Router();
const homeRoutes = require('./home.route');
const userRoutes = require('./user.route');

router.use('/', homeRoutes);
router.use('/api/v1/users', userRoutes);

module.exports = router;
