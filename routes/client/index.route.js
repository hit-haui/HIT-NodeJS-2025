const router = require('express').Router();
const homeRoutes = require('./home.route');
const userRoutes = require('./user.route');

router.use('/', homeRoutes);
router.use('/api/v1/users', userRoutes);

router.get('*', (req, res) => {
  res.status(404).json({
    statusCode: 404,
    message: 'Tài nguyên không tồn tại.',
    data: {},
  });
});

module.exports = router;
