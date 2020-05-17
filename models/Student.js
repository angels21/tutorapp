const mongoose = require('mongoose');

// User Schema
const studentSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        min: 6
    },
    lastname: {
        type: String,
        required: true,
        min: 6
    },
    email: {
    type: String,
    required: true,
    min: 6
    },
    password: {
    type: String,
    required: true,
    min: 6
    },
    isAdmin: {
    type: Boolean,
    default: false
    },

    gender: {
    type: String,
    default: 'male',
    enum: ["male", "female"]
    },
    role: {
    type: String,
    default: 'student',
    enum: ["student", "tutor"]
    },

}, {timestamps: true});

module.exports = mongoose.model('Student', studentSchema);