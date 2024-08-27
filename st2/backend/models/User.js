const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    gender: { type: String, required: true },
    qualification: { type: String, required: true },
    collegeName: { type: String, required: true },
    collegePlace: { type: String, required: true },
    collegeDistrict: { type: String, required: true },
    collegeState: { type: String, required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
