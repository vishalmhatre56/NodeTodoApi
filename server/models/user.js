const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const { jwtSecret } = require('../config/config');
const { Todo } = require('./todo')

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
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
}, {
        timestamps: true
    });

UserSchema.virtual('todos', {
    ref: 'Todo',
    localField: '_id',
    foreignField: '_ownerId'
})

UserSchema.methods.toJSON = function () {
    var user = this;
    var userObject = user.toObject();

    return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth'

    var token = jwt.sign({ _id: user._id.toString(), access }, jwtSecret).toString();
    user.tokens = user.tokens.concat([{ access, token }]);

    return user.save().then(() => {
        return token;
    })
};
UserSchema.methods.removeToken = function (token) {
    var user = this;

    return user.update({
        $pull: {
            tokens: {
                token
            }
        }
    })
}

UserSchema.statics.findByToken = function (token) {
    var User = this;
    var decoded;

    try {
        decoded = jwt.verify(token, jwtSecret);
    } catch (e) {
        return Promise.reject();
    }

    return User.findOne({
        _id: decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    })
}

UserSchema.statics.findByCredentials = function (email, password) {
    var User = this;

    return User.findOne({ email }).then((user) => {
        if (!user) {
            return Promise.reject();
        }

        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                if (res) {
                    resolve(user);
                } else {
                    reject();
                }
            })
        })
    });
};

UserSchema.pre('save', function (next) {
    var user = this;
    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, res) => {
                user.password = res;
                next();
            })
        })
    } else {
        next();
    }
})
UserSchema.pre('remove', async function (next) {
    var user = this;
    try {
        await Todo.deleteMany({ _ownerId: user._id });
        next();
    } catch (err) {

        console.log(err)
        res.status(500).send(err)
    }
})

var User = mongoose.model('User', UserSchema);

module.exports = {
    User
};