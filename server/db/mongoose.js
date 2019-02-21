const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const dbName = "TodoApp";
mongoose.connect(`mongodb+srv://cluster0-cpvan.mongodb.net/test?retryWrites=true`, {
    auth: {
        user: 'vishalmhatre56',
        password: 'vishal#56',
    }
}).then(()=>{
    console.log("Connected to remote MongoDb Server.")
}).catch(err => {
     console.log("-----\nUnable to connect to the mongodb server,\nError:", err) 
    });

module.exports = {
    mongoose
};