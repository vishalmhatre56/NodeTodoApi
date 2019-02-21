const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const dbName = "TodoApp";
mongoose.connect(`mongodb://localhost:27017/${dbName}`).catch(err=>{console.log("-----\nUnable to connect to the mongodb server,\nError:",err)}); 

module.exports = {
    mongoose
};