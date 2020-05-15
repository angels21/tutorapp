const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Lesson', Schema({
    _id: Schema.Types.ObjectId,
    time: String,
    lessonnumber: String,
    
    registersubject: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Registersubject'       
    },
}));