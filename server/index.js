const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const {Server} = require('socket.io');
const { rootCertificates } = require('tls');

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {      //dealing with the cors issue and trying to add an object 
    cors: {
        origin: "http://localhost:3000",  //the location where the react will be running at 
        methods: ['GET', 'POST']    
    }     
});

//trying to connenct the socket.io server with the http server just created
io.on('connection', (socket) => {
    console.log(`User ${socket.id} just connected!`);

    socket.on('', (data) => {
        socket.emit();
    });

    socket.on('join_room', (data) => {
        socket.join(data); //join the specific user to the specified room 
        console.log(`User ${socket.id} just joined the room ${data}`);
    });

    socket.on('disconnect', () => {    
        console.log(`User ${socket.id} just disconnencted to the server...`);
    });


    socket.on('send_message', (data) => {   //the name of the event
        socket.to(data.room).emit('receive_message', data);
    });
});




server.listen(3001, () => {
    console.log('the server is now running port 3001!');
})






