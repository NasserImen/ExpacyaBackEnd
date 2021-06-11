const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Uploadfile = new Schema ({
    path : String
})
module.exports = mongoose.model('File',Uploadfile )