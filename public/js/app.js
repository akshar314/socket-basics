var name = getQueryVariable('name') || "Anonymous"
var room = getQueryVariable('room');


var socket = io();

jQuery('.room-title').text(room); 
console.log(name + "joined" + room);

socket.on('connect', function() {
    console.log("connected to server");

    socket.emit('joinRoom', {
        
            name: name,
            room: room
        
    });
});

// Gets fired when Server.js Emits sends a message.(server broadcasts:)
socket.on('message', function(message) {
    var momentTimeStamp = moment.utc(message.timestamp);
    var $messages = jQuery('.messages');
    var $message = jQuery('<li class="list-group-item"></li>')
    console.log('new message');
    console.log(message.text);


    $message.append('<p><strong>' + message.name + '  ' + momentTimeStamp.local().format('h:mm a') + '</p></strong>')
    $message.append('<p>' + message.text + '</p>');
    $messages.append($message);
});

var $form = jQuery('#message-form');

// Gets fired when we submit chat data to form:
$form.on('submit', function(event) {
    event.preventDefault();
    $message = $form.find('input[name=message]');
    socket.emit('message', {
        name: name,
        text: $message.val()
    });

    $message.val('');

});
