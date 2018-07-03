const exporess = require('express');
const Router = exporess.Router();

const models = require('./model')

const user = models.getModel('user');

Router.get('/list',(req,res) => {
    user.find({},(err,doc)=>{
        console.log(doc);
        return res.json(doc);
    })
})

Router.get('/info',(req,res)=>{
    return res.json({code:0});
})

module.exports = Router;