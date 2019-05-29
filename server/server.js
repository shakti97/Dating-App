const express=require('express');
const app=express();
const http = require('http').Server(app);
const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
const dotenv=require('dotenv');

dotenv.config();
const userOperations=require('./database/UserOperations.js');
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
        console.log('login user1 ',data);
        connectedSockets.push(data.socketId);
        console.log('socket ',connectedSockets);
    })
    socket.on('liked',(data)=>{
        console.log("liked ",data);
        userOperations.likedUser(data,(data)=>{
            connectedSockets.forEach(socket=>{
                if(socket.email==data.targetEmail){
                    io.to(socket.id).emit('liked',{
                        notificationMessage : 'Liked By' +data.currentEmail
                    })
                }
            })
        });
    })
    socket.on('superLiked',(data)=>{
        console.log('superLiked ',data);
        userOperations.superLikedUser(data,(data)=>{
            connectedSockets.forEach(socket=>{
                if(socket.email==data.targetEmail){
                    io.to(socket.id).emit('superLiked',{
                        notificationMessage : 'SuperLiked By'+data.currentEmail,
                        imageurl : data.imageUrl
                    })
                }
            })
        });
    })
    socket.on('blocked ',(data)=>{
        console.log('blocked ',data)
        userOperations.blockedUser(data,(data)=>{
            connectedSockets.forEach(socket=>{
                if(socket.email==data.targetEmail){
                    io.to(socket.id).emit('blocked',{
                        notificationMessage : 'Blocked By'+data.currentEmail
                    })
                }
            })
        });
    })
})


// module.exports.io=io;
// const socketManager=require('./socketManager');
// io.on('connection',socketManager);