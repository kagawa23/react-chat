const exporess = require('express');
const Router = exporess.Router();

const models = require('./model')

const userModel = models.getModel('user');
const chatModel = models.getModel('chat');
const utils = require('utility');
const _filter = {'pwd':0,'__v':0}

// Router.get('/list',(req,res) => {
//     userModel.find({},(err,doc)=>{
//         console.log(doc);
//         return res.json(doc);
//     })
// })

Router.get('/list',(req,res) => {
    const { type } = req.query;
    userModel.find({type},_filter,(err,doc)=>{
        if(err){
            return res.json({status:1,msg:"服务器错误"});
        }
        console.log(doc);
        return res.json({status:0,data:doc});
    })
})

Router.get('/chatlist',(req,resp) => {
    const { userId } = req.cookies;
    userModel.find({},_filter,(err,doc)=>{
        const users = {};
        if(!err){
            doc.forEach((d)=>{
                users[d._id] = d;
            })
            chatModel.find({"$or":[{from:userId},{to:userId}]},(err,chats)=>{
                if(!err){
                    return resp.json({code:0,data:chats,users})
                }
            })
        }
    })
})

Router.post('/chatlist',(req,resp) =>{
    const { userId:to } = req.cookies;
    const { from } = req.body;
    console.log(from+' '+to)
    chatModel.update({from,to},{"$set":{read:true}},{"multi":true},(err,data)=>{
        console.log(data);
        if(!err){
            resp.json({err:0,data})
        }
       // console.log(data)
    })
});

Router.get('/info',(req,res)=>{
    const { userId} = req.cookies;
    if(!userId){
        return res.json({code:1,msg:"没有cookie"});
    }
    userModel.findById(userId,_filter,function(err,doc){
        if(err){
            return res.json({code:1,msg:'用户名密码错误'})
        }
        return res.json({code:0,data:doc})
    })
})

Router.post('/update',(req,res)=>{
    const { userId} = req.cookies;
    if(!userId){
        return res.json({code:1,msg:"没有cookie"});
    }
    const body = req.body;

    userModel.findByIdAndUpdate(userId,body,function(err,doc){
        if(err){
            return res.json({code:1,msg:'内部错误'})
        }
        const data = Object.assign({},{
			user:doc.user,
			type:doc.type
		},body)
		return res.json({code:0,data})
    })
})


Router.post('/login',(req,res) => {
    const { user, pwd} = req.body;
    const encryPwd = getMd5Pwd(pwd);
    userModel.findOne({user,pwd:encryPwd},_filter,function(err,doc){
        if(err){
            return res.json({code:1,msg:'用户名密码错误'})
        }
        res.cookie("userId",doc._id);
        return res.json({code:0,data:doc})
    })
})

Router.post('/register',(req,res) => {
    const { user, pwd, type} = req.body;
    userModel.findOne({user},function(err,doc){
        if(doc){
            return res.json({code:1,msg:'用户已存在'})
        }
        const md5Pwd = getMd5Pwd(pwd);
        const usr = new userModel({user,type,pwd:md5Pwd})

        usr.save(function(err,data){
            if(err){
                return res.json({code:1,msg:'后端出错'})
            }
            res.cookie("userId",data.id);
            return res.json({code:0,data});
        })
    });

})

function getMd5Pwd(pwd){
    const str = "djjdhu32901";
    return utils.md5(utils.md5(pwd+str));
}

module.exports = Router;