const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Subject', Schema({
    _id: Schema.Types.ObjectId,
    subject: String,
    description: String,
    category: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Category'       
    }
}));