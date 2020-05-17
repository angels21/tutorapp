const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Category', Schema({
    _id: Schema.Types.ObjectId,
    category: {
        type: String,
        required: true,
        validate: {
            validator: function(text) {               
                return text.length > 0;
            },
            message: "Category can not be empty"
        }
    }
}));