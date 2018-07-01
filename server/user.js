const exporess = require('express');
const Router = exporess.Router();

Router.get('/info',(req,res)=>{
    return res.json({code:0});
})

module.exports = Router;