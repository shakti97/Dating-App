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
const userOperations=require('./database/UserOperations.js');
var connectedSockets=[];
const io=require('socket.io')(http);
io.sockets.on('connection',(socket)=>{
    console.log('socket connected');
    socket.on('login',(data)=>{
        console.log('login user1 ',data);
        connectedSockets.push(data);
        console.log('socket ',connectedSockets);
    })
    socket.on('liked',(data)=>{
        console.log("liked ",data);
        userOperations.likedUser(data,()=>{
            connectedSockets.forEach(socket=>{
                console.log('socket liked',socket);
                // console.log(socket.email);
                // console.log(data.targetEmail);
                if(socket.email==data.targetEmail){
                    // console.log('liked emit ',socket.id);
                    io.to(socket.socketId).emit('liked',{
                        notificationMessage : 'Liked By ' +data.currentEmail
                    })
                }
            })
        });
    })
    socket.on('superLiked',(data)=>{
        console.log('superLiked ',data);
        userOperations.superLikedUser(data,(doc)=>{
            connectedSockets.forEach(socket=>{
                // console.log(socket.email);
                // console.log(data.targetEmail);
                if(socket.email==data.targetEmail){
                    io.to(socket.socketId).emit('superLiked',{
                        notificationMessage : 'SuperLiked By '+data.currentEmail,
                        imageUrl : doc.imageUrl
                    })
                }
            })
        });
    })
    socket.on('blocked',(data)=>{
        console.log('blocked1 ',data)
        userOperations.blockedUser(data,(data)=>{
            console.log("c1",connectedSockets);
            connectedSockets.forEach(socket=>{
                if(socket.email==data.currentEmail){
                    console.log('userOperation m dal diya hai');
                    console.log(socket);
                    io.to(socket.socketId).emit('blocked',{
                        notificationMessage : 'Blocked User'+data.targetEmail
                    })
                }
            })
        });
    })
})


// module.exports.io=io;
// const socketManager=require('./socketManager');
// io.on('connection',socketManager);