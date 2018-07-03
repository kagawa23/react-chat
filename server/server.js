const express = require('express')
const user = require('./user');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// 新增数据
// User.create({
// 	user:'xiaohua',
// 	age:12
// },function(err, doc){
// 	if (!err) {
// 		console.log(doc)
// 	}else{
// 		console.log(err)
// 	}
// })
// 新建app
// User.remove({age:18},function(err,doc){
// 	console.log(doc)
// })
// User.update({'user':'xiaoming'},{'$set':{age:26}},function(err,doc){
// 	console.log(doc)
// })
const app = express()

app.use(cookieParser());
app.use(bodyParser.json());

app.use('/user',user);

app.listen(9093,function(){
	console.log('Node app start at port 9093')
})



