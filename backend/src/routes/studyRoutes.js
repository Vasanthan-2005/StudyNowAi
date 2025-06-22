const express = require('express');
const router = express.Router();
const { getStudySchedule } = require('../controllers/studyController');
const { protect } = require('../middleware/authMiddleware');

// @route   GET /api/study/schedule
// @desc    Get AI-generated study schedule
// @access  Private
router.route('/schedule').get(protect, getStudySchedule);

module.exports = router;
