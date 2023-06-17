const mongoose = require("mongoose")

const Auth = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
    },
    name:{
        type:String,
    }
})

module.exports = mongoose.model("auth",Auth)