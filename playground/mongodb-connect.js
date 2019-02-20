// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectId} = require('mongodb');
const dbName = "TodoApp";

MongoClient.connect(`mongodb://localhost:27017/${dbName}`,(err,client)=>{
    if(err){
        console.log("Unable to connect to MongoDB server!");
    }
    console.log("Connected to MongoDB server.");
    var db = client.db(dbName);
    
    // db.collection("Todos").insertOne({
    //     text: "Hit a homerun",
    //     completed: false
    // },(err,result)=>{
    //     if(err){
    //         console.log("Unable to insert todo error:",err);
    //     }
    //     console.log(JSON.stringify(result.ops,undefined,2));
    // })

    // db.collection("Users").insertOne({
    //     name: "Vishal Mhatre",
    //     age: 24,
    //     location: 'kharghar, navi mumbai'
    // },(err,result)=>{
    //     if(err){
    //         console.log("Unable to insert user error:",err);
    //     }
    //     console.log(JSON.stringify(result.ops,undefined,2));
    // })

    client.close();
});