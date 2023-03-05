const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    degree:{
        type:String
    },
    occupation:{
        type:String
    },
    maritalStatus:{
        type:String
    },
    homeTown:{
        type:String
    },
    state:{
        type:String
    }
})

const User = mongoose.model("User",userSchema)

module.exports = User