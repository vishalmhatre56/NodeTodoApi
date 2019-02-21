const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');
const { ObjectId} = require('mongodb');

// Todo.remove({}).then((res)=>{
//     console.log(res);
// });

// Todo.findOneAndRemove
// Todo.findByIdAndRemove

Todo.findOneAndRemove('5c6e8542f14a387384b180da').then((todo)=>{
    console.log(todo); 
})

Todo.findByIdAndRemove('5c6e8542f14a387384b180da').then((todo)=>{
    console.log(todo); 
})