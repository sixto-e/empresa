var express = require('express');
var router = express.Router();
const {get,sendMessage,messageTo, eliminar, single, modificar} = require('../../model/empleados')

const AllEmpleados = async(req,res)=>{
    const habilitado = true;
    const empleados = await get(habilitado);
    console.log("empleados: ", empleados)
    res.render('empleados', {empleados, habilitado})
}

const allFalse = async(req,res)=>{
    const habilitado = false;
    const empleados = await get(habilitado);
    console.log("empleados: ", empleados)
    res.render('empleados', {empleados, habilitado})
}

const sending = async(req,res)=>{
    try{
        const obj = req.body;
        console.log(obj)
        const newMessage = await sendMessage(obj);
        console.log(newMessage);
        //req.flash('info', 'mensaje enviado exitosamente');
        res.render('sendingMessage', {message : 'mensaje enviado exitosamente'})
    }catch(e){
        console.log(e)
    }
}

const mensajeA = async(req, res)=>{
    try{
        const id = req.params.id;
        const obj = req.body;
        const newMenssage = await messageTo(obj);
        console.log(newMenssage);
       //req.flash('info', 'mensaje enviado exitosamente');
       res.render('mensajeAempleado', {message : 'mensaje enviado exitosamente'})

    }catch(e){
        console.log(e);
    }
}

const mensajeSingle =async (req,res)=>{
    const id = req.params.id;
    res.render('mensajeAempleado', {id})
}

const borrar = async(req, res)=>{
    try{
        const habilitado = false;
        const id = req.params.id;
        const deshabilitar = await eliminar(habilitado, id);
        console.log(deshabilitar);
        res.redirect('/admin/empleados');

    }catch(e){
        console.log(e)
    }
}
const habilitar = async(req, res)=>{
    try{
        const habilitado = true;
        const id = req.params.id;
        const deshabilitar = await eliminar(habilitado, id);
        console.log(deshabilitar);
        res.redirect('/admin/empleados');

    }catch(e){
        console.log(e)
    }
}

/*const searching = async(req,res)=>{
    const obj = req.body;
    const encontrado = await buscar(obj);
    console.table(encontrado);
    res.render
}*/

const getModify = async(req, res)=>{
    const id = req.params.id;
    const user = await single(id);
    console.table(user);
    res.render('modificar', {user});
}


const modify = async(req,res)=>{
    const obj = req.body;
    const id = req.params.id;
    const modified = await modificar(obj, id);
    console.table(modified);
    res.redirect('/admin/empleados');
}


router.get('/disabled', allFalse);
router.get('/modify/:id', getModify);
router.post('/modify/:id/create', modify);
router.get('/borrar/:id', borrar);
router.get('/habilitar/:id', habilitar);
router.get('/mensaje/:id', mensajeSingle)
router.post('/mensaje/:id/create', mensajeA);
router.get('/mensaje', (req,res)=>{res.render("sendingMessage");})
router.post('/mensaje/create', sending)
router.get('/', AllEmpleados)

module.exports = router;
