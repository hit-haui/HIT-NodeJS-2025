const router = require('express').Router();

const userController = require('../../controllers/client/user.controller');

const userValidate = require('../../validates/client/account.validate');

// query > param
router.get('/', userController.getUsers);
router.get('/search', userController.searchUserByName);
router.get('/:id', userController.getUserById);

router.post('/', userValidate.userCreatePost, userController.createUser);

router.put('/:id', userController.updateUser);

router.delete('/:id', userController.deleteUser);

module.exports = router;
