const router = require('express').Router();

const { userController } = require('../controller');

router.get('/', userController.findUsers);
router.post('/', userController.createUser);
router.patch('/', userController.updateUser);
router.get('/:userId', userController.findSingleUser);
router.delete('/:userId', userController.removeUser);

module.exports = router;
