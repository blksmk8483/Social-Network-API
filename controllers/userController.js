const { User, Thought } = require('../models');

module.exports = {
    // -------- GET ALL USERS --------    
    getAllUsers(req, res) {
        User.find()
            .then((allUsers) => res.json(allUsers))
            .catch((err) => res.status(500).json(err));
    },
    
    // -------- GET SINGLE USER --------
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .then((singleUser) =>
                !singleUser
                    ? res.status(404).json({
                        message: 'No user with that ID'
                    })
                    : res.json(singleUser)
            )
            .catch((err) => res.status(500).json(err));
    },

    // -------- CREATE NEW USER --------
    createNewUser(req, res) {
        User.create(req.body)
            .then((newUser) => res.json(newUser))
            .catch((err) => {
                return res.status(500).json(err);
            });
    },

    // -------- UPDATE SINGLE USER --------
    updateSingleUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.courseId },
            { $set: req.body },
            { new: true }
        )
            .then((updatedSingleUser) =>
                !updatedSingleUser
                    ? res.status(404).json({ message: 'No user with this id.' })
                    : res.json(updatedSingleUser)
            )
            .catch((err) => res.status(500).json(err));
    },

    // ---- example to update a single / Mini Project/courseController 
    // updateCourse(req, res) {
    //     Course.findOneAndUpdate(
    //       { _id: req.params.courseId },
    //       { $set: req.body },
    //       { runValidators: true, new: true }

    // ---------- I don't have validation on mine...should I??? ------------

    //     )
    //       .then((course) =>
    //         !course
    //           ? res.status(404).json({ message: 'No course with this id!' })
    //           : res.json(course)
    //       )
    //       .catch((err) => res.status(500).json(err));
    //   },


    // -------- DELETE USER --------
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((deleteTheUser) =>
                !deleteTheUser
                    ? res.status(404).json({ message: 'Who is this user you speak of?!?' })
                    : Thought.deleteMany({ _id: { $in: user.thoughts } })
            )
            .then(() => res.json({ message: 'User is deleted.' }))
            .catch((err) => res.status(500).json(err));
    },

    // -------- CREATE USER FRIEND --------
    createUserFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $push: { friends: req.params.friendId } },
            { new: true }
        )
            .then((userFriend) => res.status(200).json(userFriend))
            .catch((err) => res.status(500).json(err));
    },

    // -------- DELETE USER FRIEND --------
    deleteUserFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true }
        )
            .then((userFriend) => res.status(200).json(userFriend))
            .catch((err) => res.status(500).json(err));
    },
};