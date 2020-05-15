const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Tutor Schema
const tutorSchema = mongoose.Schema({
    _id: Schema.Types.ObjectId,
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
        default: 'tutor',
        enum: ["student", "tutor"]
    },
  }, {timestamps: true});
  
  module.exports = mongoose.model('Tutor', tutorSchema);