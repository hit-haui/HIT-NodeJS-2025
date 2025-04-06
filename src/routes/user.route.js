const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');

router.post('/', userController.createUser);

router.get('/', userController.getUsers);

router.put('/:id', userController.updateUser);

router.get('/:id', userController.getUserById);

router.delete('/:id', userController.deleteUserById);

module.exports = router;
