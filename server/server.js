const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');

const port = process.env.PORT || 3000;
const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user')
const { ObjectId } = require('mongodb');
const { authenticate } = require('./middleware/authenticate')

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });
    todo.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.status(400).send(err);
    });
});
app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({ todos });
    }, (err) => {
        res.status(400).send(err);
    });
});

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectId.isValid(id))
        return res.status(400).send("Id is not valid!");

    Todo.findById(id).then((todo) => {
        if (todo)
            return res.send({ todo });
        return res.status(404).send('No todo found!')
    }).catch((err) => {
        return res.status(400).send(err);
    });
});

app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectId.isValid(id))
        return res.status(400).send("Id is not valid!");

    Todo.findByIdAndRemove(id).then((todo) => {
        if (todo)
            return res.send({ todo });
        return res.status(404).send('No todo found!')
    }).catch((err) => {
        return res.status(400).send(err);
    });
});

app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectId.isValid(id))
        return res.status(400).send("Id is not valid!");

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {
        $set: body
    }, { new: true }).then((todo) => {
        if (todo)
            return res.send({ todo });
        return res.status(404).send('No todo found!')
    }).catch((err) => {
        return res.status(400).send(err);
    });
});

app.post('/users', (req, res) => {
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

app.post('/users/login', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    User.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token)=>{
            res.header('x-auth', token).send(user)
        })
    }).catch((err) => {
        res.status(400).send();
    })
});

app.delete('/users/me/token', authenticate, (req, res)=>{
    req.user.removeToken(req.token).then(()=>{
        res.status(200).send();
    },()=>{
        res.status(400).send();
    })
})

app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

app.listen(port, () => {
    console.log(`Server is up and running on port: ${port}.`);
})