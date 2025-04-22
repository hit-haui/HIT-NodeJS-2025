const express = require('express');
const router = express.Router();

const validate = require('../middlewares/validate.middleware');
const userController = require('../controllers/user.controller');
const userValidation = require('../validations/user.validation');

router.get('/', userController.getUsers);

router.post('/', validate(userValidation.createUser), userController.createUser);

router.get('/:id', validate(userValidation.getUser), userController.getUser);

router.put('/:id', validate(userValidation.updateUser), userController.updateUser);

router.delete('/:id', validate(userValidation.deleteUser), userController.deleteUser);

router.get('/search', validate(userValidation.searchUserByName), userController.searchUserByName);

module.exports = router;
