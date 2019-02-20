const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const dbName = "TodoApp";
mongoose.connect(`mongodb://localhost:27017/${dbName}`); 

var Todo = mongoose.model('Todo',{
    text: {
        type: String
    },
    completed: {
        type: Boolean,
        default: false 
    },
    completedAt: {
        type: Number
    }
});

var newTodo = new Todo({
    text: 'Take a break',
    completed: true,
    completedAt: 634323
});

newTodo.save().then( doc =>{
    console.log(doc);
}, err => {
    console.log("Unable to save todo, Error:",err)
})