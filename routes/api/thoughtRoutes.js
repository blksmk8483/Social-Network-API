const router = require('express').Router();
const {
    getAllThoughts,
    getSingleThought,
    createNewThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thoughtController.js');

// -------- api/thoughts --------
router.route('/')
    .get(getAllThoughts)
    .post(createNewThought);

// -------- api/thoughts/:thoughtId --------
router.route('/:thougtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

// -------- api/thoughts/thoughtId/reactions --------
router.route('/thoughtId/reactions')
    .post(createReaction);

// -------- api/thoughts/thoughtsId/reactions/:reactionId --------
router.route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);

module.exports = router;