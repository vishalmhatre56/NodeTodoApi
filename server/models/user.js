const mongoose = require('mongoose');
const validator = require('validator');

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            // validator: (value)=>{
            //     return validator.isEmail(value);
            // },
            validator: validator.isEmail,
            message: '{value} is not a valid email.'
        }
    },
    password: {
        type: String,
        require: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            require: true
        },
        token: {
            type: String,
            require: true
        }
    }]
})

var User = mongoose.model('User', UserSchema );

module.exports = {
    User
};