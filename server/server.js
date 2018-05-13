const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000; 
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on("connection",(socket)=>{
    console.log('New user connected');

    socket.emit('newMessage', {
        from: 'Admin',
        text: 'WELCOME JAY',
        createdAt: new Date().getTime()
    })

    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'User JAY has joined ur chat',
        createdAt: new Date().getTime()
    })

    // socket.emit('newEmail', {
    //     from: 'mike@email.com',
    //     text: 'sup brah',
    //     createdAt: 123
    // });

 
    socket.on('createMessage', (message)=>{
        console.log(message);
        //io.emit to everyone. socket.emit doesnt
        // UNCOMMENT LATER//
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        })

        


    });

    // socket.on('createEmail', (newEmail)=>{
    //     console.log('createEmail', newEmail);
    // });

    socket.on('disconnect', ()=>{
        console.log('user disconnected')
    });
})

server.listen(port, ()=>{
    console.log(`listening on port ${port}`);
})