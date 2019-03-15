const mongoose = require('mongoose');
const { dbName } = require('../config/config');
mongoose.Promise = global.Promise;

// mongoose.connect(`mongodb://localhost:27017/${dbName}`
mongoose.connect(`mongodb+srv://cluster0-cpvan.mongodb.net/${dbName}?retryWrites=true`, {
    auth: {
        user: 'vishalmhatre56',
        password: 'vishal#56',
    },
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}
).then(() => {
    console.log("Connected to remote MongoDb Server.")
}).catch(err => {
    console.log("-----\nUnable to connect to the mongodb server,\nError:", err)
});

module.exports = {
    mongoose
};