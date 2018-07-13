const express = require('express')
const user = require('./user');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express()

const server = require('http').createServer(app);
const io = require('socket.io')(server);

const models = require('./model')
const chatModel = models.getModel('chat');

io.on('connect',function(socket){
	console.log('connected')
	socket.on('clientmsg',function({from,to,msg:content}){
		//console.log(data)
		const chatId = [from,to].sort().join('_');
		const createTime = new Date().getTime();
		chatModel.create({chatId,from,to,content, createTime},(err,d)=>{
			if(!err) {
				io.emit('servermsg',Object.assign({},d._doc));
			}
		})	
	})
})

app.use(cookieParser());
app.use(bodyParser.json());

app.use('/user',user);

server.listen(9093,function(){
	console.log('Node app start at port 9093')
})



