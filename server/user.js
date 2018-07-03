const exporess = require('express');
const Router = exporess.Router();

const models = require('./model')

const userModel = models.getModel('user');

Router.get('/list',(req,res) => {
    userModel.find({},(err,doc)=>{
        console.log(doc);
        return res.json(doc);
    })
})

Router.get('/info',(req,res)=>{
    return res.json({code:0});
})

Router.post('/register',(req,res) => {
    const { user, pwd, type} = req.body;
    userModel.findOne({user},function(err,doc){
        if(doc){
            return res.json({code:1,msg:'用户已存在'})
        }
        userModel.create({user,pwd,type},function(err,dara){
            if(err){
                return res.json({code:1,msg:'后端出错ß'})
            }
            return res.json({code:0})
        })
    });

})

module.exports = Router;