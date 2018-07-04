const exporess = require('express');
const Router = exporess.Router();

const models = require('./model')

const userModel = models.getModel('user');

const utils = require('utility');
const _filter = {'pwd':0,'__v':0}

Router.get('/list',(req,res) => {
    userModel.find({},(err,doc)=>{
        console.log(doc);
        return res.json(doc);
    })
})

Router.get('/info',(req,res)=>{
    return res.json({code:0});
})

Router.post('/login',(req,res) => {
    const { user, pwd} = req.body;
    const encryPwd = getMd5Pwd(pwd);
    userModel.findOne({user,pwd:encryPwd},_filter,function(err,doc){
        if(err){
            return res.json({code:1,msg:'用户名密码错误'})
        }
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
                return res.json({code:1,msg:'后端出错ß'})
            }
            return res.json({code:0,data});
        })
    });

})

function getMd5Pwd(pwd){
    const str = "djjdhu32901";
    return utils.md5(utils.md5(pwd+str));
}

module.exports = Router;