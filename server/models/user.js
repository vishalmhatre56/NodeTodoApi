const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');

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

UserSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth'

    var token = jwt.sign({ _id: user._id.toString(), access }, 'vish123').toString();
    user.tokens = user.tokens.concat([{ access, token }]);

    return user.save().then(()=>{
        return token;
    })
}

var User = mongoose.model('User', UserSchema);

module.exports = {
    User
};