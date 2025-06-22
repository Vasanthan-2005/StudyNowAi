const { getStudySchedule: getSchedule } = require('../services/studyService');

// @desc    Get AI-generated study schedule for logged-in user
// @route   GET /api/study
// @access  Private
const getStudySchedule = async (req, res) => {
    try {
        const schedule = await getSchedule(req.user.id);

        if (!schedule || schedule.length === 0) {
            return res.status(200).json([]);
        }

        res.status(200).json(schedule);
    } catch (error) {
        console.error('Error fetching study schedule:', error.message);
        res.status(500).json({ message: 'Failed to fetch study schedule' });
    }
};

module.exports = {
    getStudySchedule,
};
