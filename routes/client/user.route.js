const router = require('express').Router();

const userController = require('../../controllers/client/user.controller');

router.get('/', userController.getUsers);
router.post('/', userController.createUser);

router.put('/:id', userController.updateUser);
// router.get('/:id', userController.getUserById);
// router.delete('/:id', userController.deleteUser);

module.exports = router;
