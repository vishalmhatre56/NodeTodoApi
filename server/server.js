const express = require('express');

const { port , isMaintanenceModeOn } = require('../server/config/config')
require('./db/mongoose');//this is needed to connect database server
const userRouter = require('./routers/user-router');
const todoRouter = require('./routers/todo-router');
var app = express();

app.use((req, res, next)=>{
    if(isMaintanenceModeOn)
        res.status(503).send("Site is currently down. Please check back soon!")
    else
        next();
})

app.use(express.json());
app.use(userRouter);
app.use(todoRouter);

app.listen(port, () => {
    console.log(`Server is up and running on port: ${port}.`);
})