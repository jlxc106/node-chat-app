const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000; 
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
const admin = 'Admin';

app.use(express.static(publicPath));

io.on("connection",(socket)=>{
    console.log('New user connected');

    socket.emit('newMessage', generateMessage(admin, 'Welcome to the chat'))

    socket.broadcast.emit('newMessage', generateMessage(admin, 'User JAY has joined ur chat'));

    // socket.emit('newEmail', {
    //     from: 'mike@email.com',
    //     text: 'sup brah',
    //     createdAt: 123
    // });


    socket.on('createMessage', (message, callback)=>{
        console.log(message);
        //io.emit to everyone. socket.emit doesnt
        io.emit('newMessage', generateMessage(message.from, message.text))
        callback('This is from the server');
    });

    socket.on('createLocationMessage', (coords)=>{
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    })

    // socket.on('createEmail', (newEmail)=>{
    //     console.log('createEmail', newEmail);
    // });

    socket.on('disconnect', ()=>{
        console.log('user disconnected')
        socket.broadcast.emit('newMessage', generateMessage(admin, 'User JAY has disconnected'))
    });
})

server.listen(port, ()=>{
    console.log(`listening on port ${port}`);
})