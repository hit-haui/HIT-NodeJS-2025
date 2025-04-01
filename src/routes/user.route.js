const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');

router.get('/', userController.getUsers);

router.get('/:id', userController.getUserById);

router.post('/', userController.createUser);

router.put('/:id', userController.updateUser);

router.delete('/:id', userController.deleteUser);

router.post('/verify/:id', userController.verifyUser);

module.exports = router;
