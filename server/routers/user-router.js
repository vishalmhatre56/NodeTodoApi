const express = require('express');
const { authenticate } = require('../middleware/authenticate');
const { User } = require('../models/user')
const _ = require('lodash');

const router = new express.Router();

router.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);

    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user)
    }).catch((err) => {
        res.status(400).send(err);
    });
});

router.post('/users/login',(req, res) => {
    var body = _.pick(req.body, ['email', 'password']);

    User.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user)
        })
    }).catch((err) => {
        res.status(400).send();
    })
});

router.delete('/users/me/token', authenticate,(req, res) => {

    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    }).catch(() => {
        res.status(400).send();
    });
})

router.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});


module.exports = router;