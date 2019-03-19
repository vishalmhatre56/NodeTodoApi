const mongoose = require('mongoose');

var TodoSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    completed: {
        type: Boolean,
        default: false
    },
    _ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
    });
var Todo = mongoose.model('Todo', TodoSchema);

module.exports = {
    Todo
};