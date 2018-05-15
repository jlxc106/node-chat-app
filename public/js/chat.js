


var socket = io();

function scrollToBottom(){
    // selectors
    var messages = $('#messages');
    var newMessage = messages.children('li:last-child');

    //heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
        messages.scrollTop(scrollHeight);
    }
}


//event listeners
socket.on("connect", function() {
	console.log("connected to server");
});


$("#message-form").on("submit", function(e) {
    e.preventDefault();

    var messageTextbox = $("#input_message");
    var user = $("#input_user").val() || 'User' ;
    var text = messageTextbox.val();

    socket.emit(
        "createMessage",
        {
            from: user,
            text: text
        },
        function() {
            messageTextbox.val('');
        }
    );
});


socket.on("disconnect", function() {
	console.log("Disconnected from server");
});

socket.on("newMessage", function(message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = $('#message-template').html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });
    $('#messages').append(html);
    scrollToBottom();
});


socket.on('newLocationMessage', function(message){
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = $("#location-message-template").html();
    var html = Mustache.render(template, {
        url: message.url,
        from: message.from,
        createdAt: formattedTime
    })
    $('#messages').append(html);
    scrollToBottom();
})

var locationButton = $("#send-location");

locationButton.click(function() {
	console.log("click");
	if (!navigator.geolocation) {
		return alert("geolocation not supported by your browser");
    }
    
    locationButton.attr('disabled', 'disabled').text('Sending location...');
	navigator.geolocation.getCurrentPosition(
		function(position) {
            locationButton.removeAttr('disabled').text('Send location');
			socket.emit("createLocationMessage", {
				latitude: position.coords.latitude,
				longitude: position.coords.longitude
			});
		},
		function() {
            locationButton.removeAttr('disabled').text('Send location');
			alert("Unable to fetch location");
		}
	);
});