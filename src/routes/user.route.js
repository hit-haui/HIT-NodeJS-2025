const express = require('express');

const validate = require('../middlewares/validate.middleware');
const userController = require('../controllers/user.controller');
const userValidation = require('../validations/user.validation');

const router = express.Router();

router.post('/', validate(userValidation.createUser), userController.createUser);

router.get('/', userController.getUsers);

router.get('/search', validate(userValidation.searchUserByName), userController.searchUserByName);

router.get('/:id', validate(userValidation.getUser), userController.getUser);

router.put('/:id', validate(userValidation.updateUser), userController.updateUser);

router.delete('/:id', validate(userValidation.deleteUser), userController.deleteUser);

module.exports = router;
