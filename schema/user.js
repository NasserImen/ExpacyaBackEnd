const mongoose = require ('mongoose')
const schema = mongoose.Schema;

const user = new schema ({
    password : String,
    name : String,
    lastName :String,
    email : String,
    adress : String,
})
module.exports = mongoose.model('userArray' , user)