const express = require('express');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;
const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user')
const { ObjectId } = require('mongodb');

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
        res.send({todos});
    }, (err) => {
        res.status(400).send(err);
    });
});

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;
    if(!ObjectId.isValid(id))
       return res.status(400).send("Id is not valid!");

    Todo.findById(id).then((todo) => {
        if(todo)
            return res.send({todo});
        return res.status(404).send('No todo found!')
    }).catch((err)=>{
       return res.status(400).send(err);
    });
});

app.listen(port, () => {
    console.log(`Server is up and running on port: ${port}.`);
})