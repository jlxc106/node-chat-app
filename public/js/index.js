function display_message(message) {
	$("<div>")
		.addClass("chat_div")
		.html(`${message.from}:     ${message.text}`)
		.appendTo(".contain_chat");
}

function display_location(message){
    var a = $('<a target="_blank">My current location</a>');
    a.attr('href', message.url);
    $("<div>").addClass("chat_div").html(`${message.from}: `).append(a).appendTo(".contain_chat");
}


$("#message-form").on("submit", function(e) {
	e.preventDefault();
});

var socket = io();

//event listeners
socket.on("connect", function() {
	console.log("connected to server");

	// socket.emit('createEmail', {
	//     to: 'jen@example.com',
	//     text: 'Hey. this is andrew',
	//     createdAt: new Date()
	// });

	$("#send_button").click(function() {
		var user = $("#input_user").val();
		var text = $("#input_message").val();
		socket.emit(
			"createMessage",
			{
				from: user,
				text: text
			},
			function(data) {
				console.log(data);
			}
		);
	});

	// socket.emit('createMessage', {
	//     from: 'me',
	//     text: 'hello'
	// })
});

socket.on("disconnect", function() {
	console.log("Disconnected from server");
});

socket.on("newMessage", function(message) {
	console.log("New message from", message.from);
	console.log(message);
	display_message(message);
});


socket.on('newLocationMessage', function(message){
    display_location(message);
})

var locationButton = $("#send-location");

locationButton.click(function() {
	console.log("click");
	if (!navigator.geolocation) {
		return alert("geolocation not supported by your browser");
	}
	navigator.geolocation.getCurrentPosition(
		function(position) {
			socket.emit("createLocationMessage", {
				latitude: position.coords.latitude,
				longitude: position.coords.longitude
			});
		},
		function() {
			alert("Unable to fetch location");
		}
	);
});
