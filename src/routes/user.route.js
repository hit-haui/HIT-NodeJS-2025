const express = require('express');
const router = express.Router();

const catchAsync = require('../utils/catchAsync');
const validate = require('../middlewares/validate.middleware');
const userController = require('../controllers/user.controller');
const userValidation = require('../validations/user.validation');

router.post('/', validate(userValidation.createUser),  catchAsync(userController.createUser));

router.get('/', catchAsync(userController.getUsers));

router.get('/search',validate(userValidation.searchUserByName), catchAsync(userController.searchUserByName));

router.get('/:id', validate(userValidation.getUser), catchAsync(userController.getUser));

router.put('/:id', validate(userValidation.updateUser), catchAsync(userController.updateUser));

router.delete('/:id', validate(userValidation.deleteUser), catchAsync(userController.deleteUser));

module.exports = router;
