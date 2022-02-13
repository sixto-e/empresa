const pool = require('./../utils/baseDatos');
const TABLA_EMPLEADOS = "empleados";
const TABLA_MENSAJES = "mensajes";
const MENSAJE_EMPLEADO = "mensaje-empleado";


const get = async(habilitado)=>{
    const query =  "SELECT * FROM ?? WHERE habilitado = ?";
    const params = [TABLA_EMPLEADOS, habilitado];
    return await pool.query(query, params)
}

const auth = async({username, password})=>{
    try{
        const query = "SELECT id, admin FROM ?? WHERE username = ? AND password = ?";
        const params = [TABLA_EMPLEADOS, username, password];
        return await pool.query(query, params);

    }catch(e){
        console.log(e);
    }
}

const create = async(obj)=>{
    try{
        const query = "INSERT INTO ?? SET ?";
        const params = [TABLA_EMPLEADOS, obj];
        return await pool.query(query, params);
    }
    catch(e){
        console.log(e)}
}


const verifyUsername = async(obj)=>{
    try{
        const query = "SELECT username FROM ?? where username = ?";
        const params = [TABLA_EMPLEADOS, obj];
        return await pool.query(query, params)


    }catch(e){
        console.log(e)
    }
}

const messages = async()=>{
    try{
        const query = "SELECT * FROM ??";
        const params = [TABLA_MENSAJES];
        return await pool.query(query, params);
    }catch(e){
        console.log(e);
    }
}

const sendMessage = async(obj)=>{
    try{

        const query = "INSERT INTO ?? SET ?";
        const params = [TABLA_MENSAJES, obj];
        return await pool.query(query, params)

    }catch(e){
        console.log(e)
    }
}


const messageTo = async(obj)=>{
    try{
        const query = "INSERT INTO ?? SET ?";
        const params = [MENSAJE_EMPLEADO, obj];
        return await pool.query(query, params);

    }catch(e){
        console.log(e);
    }
}


const single = async(id)=>{
    try{
        const query = "SELECT * FROM ?? WHERE id = ?";
        const params = [TABLA_EMPLEADOS, id];
        return await pool.query(query, params)


    }catch(e){
        console.log(e)
    }
}

const getMessage = async(id)=>{
    const query = "SELECT * FROM ?? WHERE id_empleado = ?";
    const params = [MENSAJE_EMPLEADO, id];
    return await pool.query(query, params)
} 

const eliminar = async(habilitado, id)=>{
    try{
        const query = "UPDATE ?? SET habilitado = ? WHERE id = ?";
        const params = [TABLA_EMPLEADOS, habilitado, id];
        return await pool.query(query, params);
    }catch(e){
        console.log(e);
    }
}

const modificar = async(obj, id)=>{
    try{
        const query = "UPDATE ?? SET ? WHERE id = ?";
        const params = [TABLA_EMPLEADOS, obj, id];
        return await pool.query(query, params);

    }catch(e){
        console.log(e)
    }
}



//SELECT * FROM clientes WHERE nombre LIKE 'M%'; En el código superior estamos buscando los clientes cuyo nombre comienza por 'M'. SELECT * FROM clientes WHERE nombre LIKE '%a'; En el código superior estamos buscando los clientes cuyo nombre termina con 'a'

/*const buscar = async(obj)=>{

    try{
        const query = "SELECT FROM ?? WHERE  username LIKE ?% ";
        const params = [TABLA_EMPLEADOS, obj];
        return await pool.query(query, params);
    }catch(e){
        console.log(e);
    }
}*/

module.exports = {get, create, auth, verifyUsername, messages, sendMessage, messageTo, single,getMessage, eliminar, modificar}