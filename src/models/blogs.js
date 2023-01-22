const mongoose = require('mongoose');
const schema = mongoose.Schema;

const blogSchema = new schema({
    title : {
        type : String,
        required : true
    },
    body : {
        type : String,
        required : true 
    },
    image : {
        type : String,
        required : true
    },
    user : {
        type : schema.Types.ObjectId,
        ref: 'user'
    }
});

const blogModel =  mongoose.model("blog" , blogSchema);

module.exports = blogModel;