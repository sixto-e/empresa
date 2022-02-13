const verifyUser = (req, res, next)=>{
    req.session.idUser ? next() : res.redirect('/login')
}

const verifyAdmin = (req, res, next)=>{
    req.session.idUser  && req.session.admin ? next() : res.redirect('/login')
}

const verifyLogin = (req, res, next)=>{
    ! req.session.idUser  ? next() : res.redirect('/perfil')
}


module.exports = {verifyUser, verifyAdmin, verifyLogin}