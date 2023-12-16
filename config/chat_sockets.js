module.exports.chatSockets = function(socketServer){
    let io = require('socket.io')(socketServer, {
        cors: {
            origin: "http://localhost:8000", 
            methods: ["GET", "POST"],
            credentials: true
        }
    });

    let rooms = [];

    io.sockets.on('connection', function(socket){
        console.log('new connection received', socket.id);
        
        socket.on('disconnect', function(){
            console.log('socket disconnected!');
        });

        socket.on('join_room', function(data){
            //if already joined do nothing
            if(rooms.includes(data.chatroom)){
                return;
            }

            // leave the previous rooms
            rooms.forEach(room => {
                socket.leave(room);
                rooms.pop(room);
            });

            console.log('joining request received', data);
            socket.join(data.chatroom);
            io.in(data.chatroom).emit('user_joined', data);

            //add the room to the rooms array
            rooms.push(data.chatroom);
        });

        socket.on('send_message', function(data){
            io.in(data.chatroom).emit('receive_message', data);
        });
        
    });

}