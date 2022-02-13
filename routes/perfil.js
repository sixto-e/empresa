var express = require('express');
var router = express.Router();
const {single, getMessage} = require('./../model/empleados')
const get = async(req,res)=>{
    const misMensajes = await getMessage(req.session.idUser)
    const datosPersonales = await single(req.session.idUser);
    console.table(datosPersonales)
    res.render('perfil', {datosPersonales, misMensajes});
}

router.get('/', get)
module.exports = router;