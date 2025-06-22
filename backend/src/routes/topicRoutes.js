const express = require('express');
const router = express.Router();
const {
    getTopics,
    getTopic,
    createTopic,
    updateTopic,
    deleteTopic,
    reviewTopic,
} = require('../controllers/topicController');
const { protect } = require('../middleware/authMiddleware');

// @route   GET/POST /api/topics
// @desc    Get all topics or create a new one
// @access  Private
router.route('/')
    .get(protect, getTopics)
    .post(protect, createTopic);

// @route   GET/PUT/DELETE /api/topics/:id
// @desc    Get, update, or delete a specific topic
// @access  Private
router.route('/:id')
    .get(protect, getTopic)
    .put(protect, updateTopic)
    .delete(protect, deleteTopic);

// @route   PUT /api/topics/:id/review
// @desc    Mark a topic as reviewed
// @access  Private
router.route('/:id/review').put(protect, reviewTopic);

module.exports = router;
