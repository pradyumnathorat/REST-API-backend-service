const mongoose = require('mongoose');
const schema = mongoose.Schema;

const objectId = mongoose.objectId;

const userSchema = new schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true ,
        unique : true
    },
    password : {
        type : String,
        required : true 
    }
});

const userModel =  mongoose.model("user" , userSchema);

module.exports = userModel;