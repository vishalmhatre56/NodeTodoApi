const express = require('express');
const { authenticate } = require('../middleware/authenticate');
const { User } = require('../models/user');
const _ = require('lodash');
const multer = require('multer');
const sharp = require('sharp');

const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, callback) {
        if (!file.originalname.match(/\.(jpg|png|jpeg)$/)) {
            return callback(new Error("Please upload an image file"));
        }

        callback(undefined, true);
    }
});

const router = new express.Router();

router.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);

    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).status(201).send(user);
    }).catch((err) => {
        res.status(400).send(err);
    });
});

router.post('/users/login', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    User.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);
        })
    }).catch((err) => {
        res.status(400).send({ error: "login failed!" });
    })
});

router.post('/users/logout', authenticate, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((tokenObj) => {
            return tokenObj.token !== req.token;
        });
        await req.user.save({ message: "Sucessfully logged out" });

        res.send();
    } catch (err) {
        res.status(500).send({ error: "Operation failed" });
    }
});

router.post('/users/logoutAll', authenticate, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save({ message: "Sucessfully logged out from all sessions." });

        res.send();
    } catch (err) {
        res.status(500).send({ error: "Operation failed" });
    }
});

router.patch('/users/me', authenticate, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['password'];
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidUpdate) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update]);
        await req.user.save();
        res.send(req.user);
    } catch (err) {
        res.status(400).send(err);
    }
})

router.delete('/users/me/token', authenticate, (req, res) => {

    req.user.removeToken(req.token).then(() => {
        res.status(200).send({ message: "Token removed successfully" });
    }).catch(() => {
        res.status(400).send({ error: "Operation failed" });
    });
})

router.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

router.post('/users/me/avatar', authenticate, upload.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    res.send({ message: "avatar uploaded succesfully" });
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message });
});

router.delete('/users/me/avatar', authenticate, async (req, res) => {
    req.user.avatar = undefined;
    await req.user.save();
    res.send({ message: "avatar deleted succesfully" });
});

router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user || !user.avatar) {
            throw new Error("user or avatar not found!");
        }

        res.set('Content-Type', 'image/png');
        res.send(user.avatar);

    } catch (err) {
        res.status(400).send(err.message);
    }
});

router.delete('/users/me', authenticate, async (req, res) => {
    try {
        await req.user.remove();
        res.send({ message: "User removed successfully." });
    } catch (err) {
        res.status(500).send({ error: "Operation failed" });
    }
});

module.exports = router;