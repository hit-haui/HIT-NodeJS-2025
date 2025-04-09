const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');

router.put('/', userController.createUser);

router.get('/', userController.getUser);

router.get('/search', userController.searchUserByName);

router.get('/:id', userController.getUserById);

router.put('/:id', userController.updateUser);

router.delete('/:id', userController.deleteUser);

// router.get('/:id', userController.getUserById);

// router.post('/', userController.createUser);

// router.put('/:id', userController.updateUser);

// router.delete('/:id', userController.deleteUser);

// router.patch('/:id/verify', userController.verifyUser);

module.exports = router;
