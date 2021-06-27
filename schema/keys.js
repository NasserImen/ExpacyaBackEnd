const mongoose = require('mongoose')
const schema = mongoose.Schema

const header = new schema ({

    header :String ,
    matchingString : [String]
})
module.exports = mongoose.model('keys',header )