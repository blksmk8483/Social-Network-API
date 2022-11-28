const { User, Thought } = require('../models');

module.exports = {
    // -------- GET ALL THOUGHTS --------
    getAllThoughts(req, res) {
        Thought.find()
        .then((allThoughts) => res.json(allThoughts))
        .catch((err) => res. status(500).json(err));
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

};