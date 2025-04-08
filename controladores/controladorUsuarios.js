const { Op } = require('sequelize');
const modeloUsuario = require('../modelos/usuarios');
const { validationResult } = require('express-validator');

function enviarRespuesta(res, jsonObject) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json(jsonObject);
}

exports.getUsuarios = async (req, res) => {
    try {
        await modeloUsuario.findAll({ raw: true })
        .then((data) => {
            enviarRespuesta(res, data);
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.getUsuariosID = async (req, res) => {
    try {
        await modeloUsuario.findOne({
            where: {
                usuariosID: req.params.id
            },
            raw: true
        })
        .then((data) => {
            if (data) {
                enviarRespuesta(res, data);
            } else {
                enviarRespuesta(res, { msg: "Usuario no encontrado" });
            }
        });
    }catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.getUsuariosLogin = async (req, res) => {
    try {
        const data = await modeloUsuario.findOne({
            where: {
                usuariosCorreo: req.params.correo,
                usuariosContra: req.params.contra,
                usuariosEstado: true
            },
            raw: true
        });

        if (data) {
            enviarRespuesta(res, data);
        } else {
            enviarRespuesta(res, { msg: "Usuario o contraseña incorrectos" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.postUsuarios = async (req, res) => {
    // Valida los campos del formulario
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        // Si hay errores, se mapean los errores y se envían como respuesta
        const ers = errores.array().map(error => ({ campo: error.param, mensaje: error.msg }));
        return enviarRespuesta(res, ers); // Enviar respuesta con los errores
    }

    try {
        // Crea un nuevo usuario con los datos del formulario
        const data = await modeloUsuario.create(req.body);
        // Enviar respuesta con el usuario creado
        enviarRespuesta(res, { msg: "Registro guardado correctamente", data });
    } catch (error) {
        // Enviar respuesta con el error si no se pudo guardar el registro
        enviarRespuesta(res, { msg: "Error al guardar registro", error: error.message });
    }
}

exports.putUsuarios = async (req, res) => {
    // Valida los campos del formulario
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        const ers = errores.array().map(error => ({ campo: error.param, mensaje: error.msg }));
        return enviarRespuesta(res, ers); // Enviar respuesta con los errores
    }

    try {
        // Busca el usuario por ID
        const usuario = await modeloUsuario.findOne({ where: { usuariosID: req.params.id } });
        if (!usuario) {
            return enviarRespuesta(res, { msg: "Usuario no encontrado" });
        }

        // Mezcla los datos existentes con los nuevos datos del formulario
        const usuarioActualizado = { ...usuario.toJSON(), ...req.body };

        // Actualiza el usuario con los datos mezclados
        await modeloUsuario.update(usuarioActualizado, {
            where: { usuariosID: req.params.id }
        });

        // Enviar respuesta con el usuario actualizado
        enviarRespuesta(res, { msg: "Registro actualizado correctamente", data: usuarioActualizado });
    } catch (error) {
        // Enviar respuesta con el error si no se pudo actualizar el registro
        enviarRespuesta(res, { msg: "Error al actualizar registro", error: error.message });
    }
}

exports.deleteUsuarios = async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        const ers = errores.array().map(error => ({ campo: error.param, mensaje: error.msg }));
        return enviarRespuesta(res, ers); // Enviar respuesta con los errores
    }

    try {
        // Busca el usuario por ID
        const usuario = await modeloUsuario.findOne({ where: { usuariosID: req.params.id } });
        if (!usuario) {
            return enviarRespuesta(res, { msg: "Usuario no encontrado" });
        }

        // Elimina el usuario
        await modeloUsuario.destroy({ where: { usuariosID: req.params.id } });

        // Enviar respuesta con el usuario eliminado
        enviarRespuesta(res, { msg: "Registro eliminado correctamente", data: usuario });
    } catch (error) {
        // Enviar respuesta con el error si no se pudo eliminar el registro
        enviarRespuesta(res, { msg: "Error al eliminar registro", error: error.message });
    }
}