var express = require('express');
const { timeout } = require('nodemon/lib/config');
var router = express.Router();
//const sha1 = require("sha1");
const {auth} = require('./../model/empleados')

const login = async(req,res)=>{
   
      //  req.body.password = sha1("req.body.password");
        var obj = req.body;
        console.log("obj: ", obj);
        var result = await auth(obj);
         console.log("result: ", result );
  
    if(result.length === 0){
        res.render('login', {message : 'wrong password o username'})
    }else{
                
        const [{id, admin}] = result;
        req.session.idUser = id;
        req.session.admin = admin;
        console.log("admin:", admin)
        if(admin == 1){
            
            res.redirect('/admin/empleados')
         
        }
        else{
            res.redirect('/perfil')
        }   
    }
}


const get = (req,res)=>{ res.render('login')};


router.post('/', login)
router.get('/', get);




module.exports = router;
