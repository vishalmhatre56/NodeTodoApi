const { MongoClient, ObjectId } = require('mongodb');
const dbName = "TodoApp";

MongoClient.connect(`mongodb://localhost:27017/${dbName}`, (err, client) => {
    if (err) {
        console.log("Unable to connect to MongoDB server!");
    }
    console.log("Connected to MongoDB server.");
    var db = client.db(dbName);
    
    // db.collection("Todos").findOneAndUpdate({
    //     _id: new ObjectId('5c6d32429c8c9e12b045062a')
    // },{
    //  $set:{
    //     completed: true
    //  }   
    // },{
    //     returnOriginal: false
    // }).then((res)=>{
    //     console.log(res);
    // });

    db.collection("Users").findOneAndUpdate({
        _id: new ObjectId('5c6d40bcad69017e97c20879')
    },{
     $set:{
        name: "Vishal Mhatre"
     },
     $inc:{
        age:2
     }   
    },{
        returnOriginal: false
    }).then((res)=>{
        console.log(res);
    });

    // client.close();
});