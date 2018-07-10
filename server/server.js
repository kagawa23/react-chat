const express = require('express')
const user = require('./user');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express()

const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connect',function(socket){
	console.log('connected')
	socket.on('clientmsg',function(data){
		console.log(data)
		io.emit('servermsg',data);
	})
})

app.use(cookieParser());
app.use(bodyParser.json());

app.use('/user',user);

server.listen(9093,function(){
	console.log('Node app start at port 9093')
})



