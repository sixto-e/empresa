var express = require('express');
const { verifySingUP } = require('../middlewares/users');
var router = express.Router();
//var sha1 = require('sha1');
const {create, verifyUsername} = require('./../model/empleados')


const newUser = async(req, res)=>{
    try{
        const username = req.body.username;
        const verify = await verifyUsername(username)
  //      req.body.password = sha1("req.body.password");
        if(verify.length === 0){
            const obj = req.body;
            const addUser = await create(obj);
            console.log(addUser);
           res.redirect('/login')
        }else{
            res.render('registro', {message : "username no disponible. intente con otro"})
        }


     

    }catch(e){
        console.log(e)
    }
}

router.post('/create',verifySingUP, newUser);

/* GET home page. */
router.get('/', function(req, res) {
  res.render('registro');
});

module.exports = router;
