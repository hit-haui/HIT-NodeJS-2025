const express = require('express');

const validate = require('../middlewares/validate.middleware');
const authController = require('../controllers/auth.controller');
const authValidation = require('../validations/auth.validation');

const router = express.Router();

router.post('/register', validate(authValidation.register), authController.register);

router.post('/login', validate(authValidation.login), authController.login);

module.exports = router;
