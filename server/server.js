const express=require('express');
const app=express();
const http = require('http').Server(app);
const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
const dotenv=require('dotenv');

dotenv.config();

const cors=require('./utils/cors.js');

app.use(cors);
const appRoute=require('./routes/appRoute.js');
app.use('/',appRoute);

http.listen(process.env.PORT || 8080,()=>{
    console.log('Server Started');
})
var connectedSockets=[];
const io=require('socket.io')(http);
io.sockets.on('connection',(socket)=>{
    console.log('socket connected');
    socket.on('login',(data)=>{
        console.log('login user',data);
        connectedSockets.push(data.socketId);
    })
})


// module.exports.io=io;
// const socketManager=require('./socketManager');
// io.on('connection',socketManager);