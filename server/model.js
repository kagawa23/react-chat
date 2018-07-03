const mongoose = require('mongoose')
// 链接mongo 并且使用imooc这个集合
const DB_URL = 'mongodb://localhost:27017/imooc'
mongoose.connect(DB_URL)
mongoose.connection.on('connected',function(){
	console.log('mongo connect success')
})

// 类似于mysql的表 mongo里有文档、字段的概念，
// const User = mongoose.model('user', new mongoose.Schema({
// 	user:{type:String,require:true},
// 	age:{type:Number,require:true}
// }))
const models = {
	user:{ 
		user:{type:'string',require:true},
		pwd:{type:'string',require:true},
		type:{type:'string',require:true},
		avatar:{type:'string',require:true},
		desc:{type:'string'},
		title:{type:'string'},
		company:{type:'string'},
		money:{type:'string'},
	},
	chat: {}
}

for(let o in models){
	mongoose.model(o, new mongoose.Schema(models[o]));
}

module.exports = {
	getModel:function(name){
		return mongoose.model(name)
	}
}