const express = require('express');
const router = express.Router();

const validate = require('../middlewares/validate.middleware');
const userController = require('../controllers/user.controller');
const userValidation = require('../validations/user.validation');

router.post('/', validate(userValidation.createUser), userController.createUser);

router.get('/', userController.getUsers);

router.get('/search', userController.searchUserByName);

router.get('/:id', validate(userValidation.getUser), userController.getUser);

router.put('/:id', userController.updateUser);

router.delete('/:id', userController.deleteUser);

module.exports = router;
