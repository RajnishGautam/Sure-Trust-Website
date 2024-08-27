const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const User = require('../models/User');
const Course = require('../models/Course');

// Get user details and courses
router.get('/dashboard', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('course');
        if (!user) return res.status(404).json({ message: 'User not found' });
        // Fetch all courses
        const courses = await Course.find({}).lean();

        // Calculate the number of enrolled students for each course
        const enrichedCourses = await Promise.all(
            courses.map(async (course) => {
                // Count the number of users enrolled in the current course
                const enrolledStudentsCount = await User.countDocuments({ course: course._id });
                return {
                    ...course,
                    enrolledStudents: enrolledStudentsCount
                };
            })
        );
        // Find the user's enrolled course with updated enrollment count
        const userCourseWithEnrollment = enrichedCourses.find(
            (course) => course._id.toString() === user.course?._id.toString()
        );

        

        if (!userCourseWithEnrollment) {
            return res.status(404).json({ message: 'Course details not found for the user' });
        }

        // Respond with user details and enriched course details
        res.json({
            user: {
                ...user._doc,
                course: userCourseWithEnrollment // Ensure enrolledStudents is included
            }
        });
    } catch (error) {
        console.error('Error fetching user and courses:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
