const mongoose=require('../common/connection.js');
const schema=mongoose.Schema;
const userSchema=schema({
    userId : schema.Types.ObjectId,
    name : {
        type :String,
        maxlength : 100
    },
    email : {
        type : String
    },
    password : {
        type : String
    },
    imageUrl : {
        type : String
    },
    blocked : new mongoose.Schema({
        email : [String]
    }),
    liked : new mongoose.Schema({
        email : [String]
    }),
    superLiked : new mongoose.Schema({
        email : [String]
    })
})
var userModel=mongoose.model('users',userSchema);

module.exports=userModel;