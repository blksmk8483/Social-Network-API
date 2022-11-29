const { User, Thought } = require('../models');

module.exports = {
    // -------- GET ALL THOUGHTS --------
    getAllThoughts(req, res) {
        Thought.find()
            .then((allThoughts) => res.json(allThoughts))
            .catch((err) => res.status(500).json(err));
    },

    // -------- GET SINGLE THOUGHT --------
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .then((singleThought) =>
                !singleThought
                    ? res.status(404).json({ message: 'No thought to be found!' })
                    : res.json(singleThought)
            )
            .catch((err) => res.status(500).json(err));
    },

    // -------- CREATE NEW THOUGHT --------
    createNewThought(req, res) {
        Thought.create(req.body)
            .then((newThought) => res.json(newThought))
            .catch((err) => res.status(500).json(err));

    },

    // -------- UPDATE THOUGHT --------
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { new: true }
        )
            .then((updatedThought) =>
                !updatedThought
                    ? res.status(404).json({ message: 'No thought to be found!' })
                    : res.json(updatedThought)
            )
            .catch((err) => res.status(500).json(err));
    },

    // -------- DELETE THOUGHT --------
    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
            .then((deletedThought) =>
                !deletedThought
                    ? res.status(404).json({ message: 'Oh no!, No thought with that id was found.' })
                    : User.findOneAndUpdate(
                        { thoughts: req.params.thoughtId },
                        { $pull: { thoughts: req.params.thoughtId } },
                        { new: true }
                    )
            )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'Thought was deleted but could not find User' })
                    : res.json({ message: 'Thought was successfully deleted.' })
            )
            .catch((err) => {
                res.status(500).json(err);
            });
    },
    // -------- CREATE REACTION --------
    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { new: true }
        )
            .then((reaction) =>
                !reaction
                    ? res
                        .status(404)
                        .json({ message: 'No reaction found with that ID.' })
                    : res.json(reaction)
            )
            .catch((err) => res.status(500).json(err));
    },

    // -------- DELETE REACTION --------
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true }
        )
            .then((reaction) =>
                !reaction
                    ? res
                        .status(404)
                        .json({ message: 'No reaction found with that ID.' })
                    : res.json(reaction)
            )
            .catch((err) => res.status(500).json(err));
    },
};