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

    // socket.emit('newEmail', {
    //     from: 'mike@email.com',
    //     text: 'sup brah',
    //     createdAt: 123
    // });


    // socket.emit('newMessage', {

    // })


    socket.on('createMessage', (message)=>{
        console.log(message);
        //io.emit to everyone. socket.emit doesnt
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date()
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