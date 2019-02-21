const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');
const { ObjectId} = require('mongodb');

var id = "5c6e32cb3660321bf74d3d76";

// if(!ObjectId.isValid(id))
//     console.log("Id is not Valid!");

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('\nTodos:', todos);
// })

// Todo.findOne({
//     _id: id
// }).then(todo => {
//     console.log('\nTodo:', todo);
// })

// Todo.findById(id).then(todo => {
//     if(!todo)
//         return console.log('\nTodo not found!');
//     console.log('\nTodo:', todo);
// }).catch(err => {
//     console.log(err);
// })

User.findById(id).then(user => {
    if(!user)
        return console.log('\nUser not found!');
    console.log('\nUser:', user);
}).catch(err => {
    console.log(err);
})