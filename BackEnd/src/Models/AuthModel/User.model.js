const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:[true,"First Name is Required."],
    },
    lastName:{
        type:String,
        required:[true,"Last Name is Required."],
    },
    email:{
        type:String,
        required:[true,"Email is Required."],
        unique:true
    },
    password:{
        type:String,
        required:[true,"Password is Required."],
        unique:true
    },
    userType:{
        type:Number,
        required:[true,"User Type is Required."],
        enum:[1,2]
    },
    status:{
        type:Boolean,
        required:[true,"Status is Required."],
    }
},{timestamps:true});


module.exports = mongoose.model("User",userSchema);