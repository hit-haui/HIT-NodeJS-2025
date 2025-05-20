const express = require('express');

const { auth } = require('../middlewares/auth.middleware');
const upload = require('../middlewares/multer.middleware');
const validate = require('../middlewares/validate.middleware');
const authController = require('../controllers/auth.controller');
const authValidation = require('../validations/auth.validation');

const router = express.Router();

router.post('/register', validate(authValidation.register), authController.register);

router.post('/login', validate(authValidation.login), authController.login);

router.get('/me', auth, authController.getMe);

router.put(
  '/update-profile',
  auth,
  upload.single('avatar'),
  validate(authValidation.updateProfile),
  authController.updateProfile,
);

module.exports = router;
