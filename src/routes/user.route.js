const express = require('express');

const validate = require('../middlewares/validate.middleware');
const userController = require('../controllers/user.controller');
const userValidation = require('../validations/user.validation');
const { auth, adminRoute } = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/', auth, adminRoute, validate(userValidation.createUser), userController.createUser);

router.get('/', auth, adminRoute, userController.getUsers);

router.get('/search', validate(userValidation.searchUserByName), userController.searchUserByName);

router.get('/:id', validate(userValidation.getUser), userController.getUser);

router.put('/:id', auth, adminRoute, validate(userValidation.updateUser), userController.updateUser);

router.delete('/:id', auth, adminRoute, validate(userValidation.deleteUser), userController.deleteUser);

module.exports = router;
