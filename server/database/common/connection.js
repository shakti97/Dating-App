const mongoose=require('mongoose');
const dbconfig=require('./config.js');

mongoose.connect(dbconfig.dbUrl,{useNewUrlParser: true}).then(
    (res)=>{
        console.log('connected to mlab');
    }
).catch(()=>{
    console.log('Connection to db failed');
})

module.exports=mongoose;