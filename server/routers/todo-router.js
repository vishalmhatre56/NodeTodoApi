const express = require('express');
const _ = require('lodash');
const { Todo } = require('../models/todo');
const { ObjectId } = require('mongodb');
const { authenticate } = require('../middleware/authenticate');

const router = new express.Router();

router.post('/todos', authenticate, async (req, res) => {
    var todo = new Todo({
        text: req.body.text,
        _ownerId: req.user._id
    });
    try {
        await todo.save();
        res.status(201).send(todo);
    } catch (err) {
        res.status(400).send(err);
    }
});
router.get('/todos', authenticate, async (req, res) => {
    try {
        var todos = await Todo.find({ _ownerId: req.user._id });
        res.send(todos);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.get('/todos/:id', authenticate, async (req, res) => {
    var id = req.params.id;
    if (!ObjectId.isValid(id))
        return res.status(400).send({message:"Id is not valid!"});
    try {
        var todo = await Todo.findOne({ _id: id, _ownerId: req.user._id });
        if (todo)
            return res.send({ todo });
        return res.status(404).send({error:'No todo found!'})
    } catch (err) {
        res.status(400).send(err);
    }
});

router.delete('/todos/:id', authenticate, async (req, res) => {
    var id = req.params.id;
    if (!ObjectId.isValid(id))
        return res.status(400).send({error:"Id is not valid!"});

    try {
        var todo = await Todo.findOneAndRemove({ _id: id, _ownerId: req.user._id });
        if (todo)
            return res.send({ todo });
        return res.status(404).send({error:'No todo found!'})
    } catch (err) {
        res.status(400).send(err);
    }
});

router.patch('/todos/:id', authenticate, async (req, res) => {
    var updates = Object.keys(req.body);
    const allowedupdateds = ['text', 'completed']
    const isValidOpration = updates.every((update) => allowedupdateds.includes(update));

    if (!isValidOpration) {
        return res.status(400).send({error:"Invalid update property!"});
    }

    var id = req.params.id;
    var body = _.pick(req.body, allowedupdateds);

    if (!ObjectId.isValid(id))
        return res.status(400).send({error:"Id is not valid!"});

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    try {
        var todo = await Todo.findOneAndUpdate({ _id: id, _ownerId: req.user._id }, {
            $set: body
        }, { new: true });
        if (todo)
            return res.send({ todo });
        return res.status(404).send({error:'No todo found!'});
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;