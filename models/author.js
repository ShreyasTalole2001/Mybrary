const mongoose = require('mongoose')

const autherSchema = new mongoose.Schema({
    name: {
        type : String,
        required : true
    }
})


module.exports = mongoose.model('Author', autherSchema)