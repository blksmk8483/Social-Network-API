const router = require('express').Router();
const {
    getAllUsers,
    getSingleUser,
    createNewUser,
    updateSingleUser,
    deleteUser,
    createUserFriend,
    deleteUserFriend,

} = require('../../controllers/userController.js');

// -------- api/users --------
router.route('/')
    .get(getAllUsers)
    .post(createNewUser);

// -------- api/users/:userID --------
router.route('/:userId')
    .get(getSingleUser)
    .put(updateSingleUser)
    .delete(deleteUser);

// -------- api/users/:userId/friends/:friendId --------
router.route('/:userId/friends/:friendId')
    .post(createUserFriend)
    .delete(deleteUserFriend);

module.exports = router;