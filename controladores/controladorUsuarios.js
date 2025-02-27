const {Op, where } = require('sequelize');
const modeloUsuario = require('../modelos/usuarios');
const {validationResult} = require('express-validator');

function enviarRespuesta(res, jsonObject) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json(jsonObject)
}

exports.getUsuarios = async (req, res) => {
    try {
        await modeloUsuario.findAll( {raw: true})
        .then((data) => {
            enviarRespuesta(res, data);
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.postUsuarios = async (req, res) => {

    const errores = validationResult(req);
    var ers = []

    errores.error.forEach(element => {
        ers.push({ campo: element.path, mensaje: element.msg})
    });

    if (ers.length > 0) {
        enviarRespuesta(res, ers);
    } else {
    try{
        var usuarioIDNULL, nombreNULL, correoNULL, telefonoNULL;
        const {id} = req.query;
        const {usuarioID, nombre, correo, telefono} = req.body;

    }
    catch (ex) {
        enviarRespuesta(res, {msg: "Errior en el servidor " + ex.message});   
    }
}
}