const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '123abc!';

bcrypt.genSalt(10,(err,salt)=>{
    bcrypt.hash(password,salt,(err,hash)=>{
        console.log(hash);
    })
})

var hashedValue = '$2a$10$iI.LvGeErqbuSalP0EGbuurn51kkLtoJMKQHHXe/cOcT2rkMnKaES';
bcrypt.compare(password,hashedValue,(err,res)=>{
    console.log(res)
})

// var data = {
//     id: 10
// }

// var token = jwt.sign(data,"VishPro");
// console.log(token);

// var decoded = jwt.verify(token,"VishPro");
// console.log(decoded);


// var message = "I'm a simple text.";
// var hashValue = SHA256(message).toString();

// console.log(`message: ${message}`);
// console.log(`hashValue: ${hashValue}`);