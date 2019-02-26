const { User } = require('../models/user')

var authenticate = (req, res, next) => {
    var token = req.header('x-auth');

    User.findByToken(token).then((user) => {
        if (!user) {
            console.log(user)
            return Promise.reject;
        }
        req.user = user;
        req.token = token;
        console.log("req:",req)
        next();
    }).catch((e) => {
        res.status(401).send();
    });
}

module.exports = {
    authenticate
}