const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const port = process.env.PORT || 3000; 
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

const admin = 'Admin';

app.use(express.static(publicPath));

io.on("connection",(socket)=>{
    console.log('New user connected');

    socket.on('join', (params, callback)=>{
        if(!isRealString(params.name) || !isRealString(params.room)){
            return callback('Name and room name are required');
        }

        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        socket.emit('newMessage', generateMessage(admin, 'Welcome to the chat app'))
        socket.broadcast.to(params.room).emit('newMessage', generateMessage(admin, `${params.name} has joined ur chat`));
        callback();

        //socket.leave('some string value');
        //io.emit -> io.to('the office fans) --  everyone in the room 
        //socket.broadcast.emit -> socket.broadcast.to('the office fans').emit -- everyone except you
        //socket.emit -- only you
    });


    socket.on('createMessage', (message, callback)=>{
        var user = users.getUser(socket.id);
        if(user && isRealString(message.text)){
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text))
        }
        // console.log(message);
        //io.emit to everyone. socket.emit doesnt
        callback('This is from the server');
    });

    socket.on('createLocationMessage', (coords)=>{
        var user = users.getUser(socket.id);
        if(user){
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
        }
    })

    socket.on('disconnect', ()=>{
        var user = users.removeUser(socket.id);
        
        if(user){
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage(admin, `${user.name} has disconnected`));
        }

        // socket.broadcast.emit('newMessage', generateMessage(admin, 'User JAY has disconnected'))
    });
})

server.listen(port, ()=>{
    console.log(`listening on port ${port}`);
})