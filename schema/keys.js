const mongoose = require('mongoose')
const schema = mongoose.Schema

const Arraykeys = new schema ({
    keys =[
        FirstName,
        lastName,
        email,
        adress,
    ]
})
module.exports = mongoose.model('keys',Arraykeys )