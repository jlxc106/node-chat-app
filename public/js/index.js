function display_message(message){
$('<div>').addClass('chat_div').html("from: " + message.from + "       " + message.text).appendTo('.contain_chat');
}




var socket = io();

//event listeners
socket.on("connect", function() {
    console.log("connected to server");
    

    // socket.emit('createEmail', {
    //     to: 'jen@example.com',
    //     text: 'Hey. this is andrew',
    //     createdAt: new Date()
    // });

    $('#send_button').click(function(){
        var user = $('#input_user').val();
        var text = $('#input_message').val();
        socket.emit('createMessage', {
            from: user,
            text: text
        })

    });



    // socket.emit('createMessage', {
    //     from: 'me',
    //     text: 'hello'
    // })


});

socket.on("disconnect", function() {
	console.log("Disconnected from server");
});

socket.on('newMessage', function(message){
    console.log('New message from', message.from);
    console.log(message);
    display_message(message);
});