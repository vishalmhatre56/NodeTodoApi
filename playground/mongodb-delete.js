const { MongoClient, ObjectId } = require('mongodb');
const dbName = "TodoApp";

MongoClient.connect(`mongodb://localhost:27017/${dbName}`, (err, client) => {
    if (err) {
        console.log("Unable to connect to MongoDB server!");
    }
    console.log("Connected to MongoDB server.");
    var db = client.db(dbName);
    // deleteMany
    // db.collection("Todos").deleteMany({text: 'commit code'}).then((result)=>{
    //     console.log(result);
    // })
    // db.collection("Users").deleteMany({name: 'Vishal Mhatre'}).then((res)=>{
    //     console.log(res);
    // })

    //deleteOne
    // db.collection("Todos").deleteOne({text: 'commit code'}).then((result)=>{
    //     console.log(result);
    // })

    //findOneAndDelete
    // db.collection("Todos").findOneAndDelete({ text: 'commit code' }).then((result) => {
    //     console.log(result);
    // })
    db.collection("Users").findOneAndDelete({_id: new ObjectId('5c6d40d1ad69017e97c2088d')}).then((res)=>{
        console.log(res);
    })


    // client.close();
});