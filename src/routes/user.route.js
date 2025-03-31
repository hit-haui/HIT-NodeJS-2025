const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');

//get user
router.get('/', userController.getUsers);

router.get('/:id', userController.getUserById);

//create user
router.post('/', userController.createUser);

//update user
router.put('/:id', userController.updateUserById);

//delete user
router.delete('/:id', userController.deleteUserById);

//verify user
router.patch('/:id', userController.verifyUserById);
module.exports = router;
