var express = require('express');
var router = express.Router();
const {messages} = require('../model/empleados');

const get = async(req,res)=>{
    try{
        const mensaje = await messages();
        console.log(mensaje);
       
        res.render('mensajes', {mensaje});
        
    }catch(e){
        console.log(e)
    }
}

router.get('/', get)


module.exports = router;