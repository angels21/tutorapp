const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Registersubject', Schema({
    _id: Schema.Types.ObjectId,
    duration: String,
    category: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Category'       
    },
    subject: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Subject'       
    },
    tutor: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Tutor'       
    }
}));
