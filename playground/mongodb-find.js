const { MongoClient, ObjectId } = require('mongodb');
const dbName = "TodoApp";

MongoClient.connect(`mongodb://localhost:27017/${dbName}`, (err, client) => {
    if (err) {
        console.log("Unable to connect to MongoDB server!");
    }
    console.log("Connected to MongoDB server.");
    var db = client.db(dbName);
    // db.collection("Todos").find({_id: new ObjectId('5c6d358ead69017e97c20365')}).toArray().then((docs)=>{
    //     console.log("Todos:");
    //     console.log(JSON.stringify(docs,undefined,2));
    // },(err)=>{
    //     console.log("Unable to get todos. Error:",err);
    // })
    // db.collection("Todos").find().count().then((count)=>{
    //     console.log(`Todos Count:${count}`);
    // },(err)=>{
    //     console.log("Unable to get todos. Error:",err);
    // })

    db.collection("Users").find({name: 'Vishal Mhatre'}).toArray().then((users)=>{
        console.log("Users:");
        console.log(JSON.stringify(users,undefined,2));
    },(err)=>{
        console.log("Unable to get users. Error:",err);
    })

    // client.close();
});