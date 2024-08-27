const express = require('express');
const Course = require('../models/Course');
const router = express.Router();

// Route to add a new course
router.post('/', async (req, res) => {
    try {
        const { name, description } = req.body;
        const newCourse = new Course({ name, description });
        await newCourse.save();
        res.status(201).json({ message: 'Course added successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding course', error });
    }
});

// Route to get all courses
router.get('/', async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching courses', error });
    }
});

module.exports = router;
