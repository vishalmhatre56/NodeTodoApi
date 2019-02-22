const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

var data = {
    id: 10
}

var token = jwt.sign(data,"VishPro");
console.log(token);

var decoded = jwt.verify(token,"VishPro");
console.log(decoded);


// var message = "I'm a simple text.";
// var hashValue = SHA256(message).toString();

// console.log(`message: ${message}`);
// console.log(`hashValue: ${hashValue}`);