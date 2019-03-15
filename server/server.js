const express = require('express');

const { port } = require('../server/config/config')
require('./db/mongoose');//this is needed to connect database server
const userRouter = require('./routers/user-router');
const todoRouter = require('./routers/todo-router');
var app = express();

app.use(express.json());
app.use(userRouter);
app.use(todoRouter);

app.listen(port, () => {
    console.log(`Server is up and running on port: ${port}.`);
})