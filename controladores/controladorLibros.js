const { Op } = require('sequelize');
const modeloLibros = require('../modelos/libros');
const { validationResult } = require('express-validator');

function enviarRespuesta(res, jsonObject) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json(jsonObject);
}

exports.getLibros = async (req, res) => {
    try {
        await modeloLibros.findAll({ raw: true })
        .then((data) => {
            enviarRespuesta(res, data);
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.postLibros = async (req, res) => {
    // Valida los campos del formulario
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        // Si hay errores, se mapean los errores y se envían como respuesta
        const ers = errores.array().map(error => ({ campo: error.param, mensaje: error.msg }));
        return enviarRespuesta(res, ers); // Enviar respuesta con los errores
    }

    try {
        // Crea un nuevo Libro con los datos del formulario
        const data = await modeloLibros.create(req.body);
        // Enviar respuesta con el Libros creado
        enviarRespuesta(res, { msg: "Registro guardado correctamente", data });
    } catch (error) {
        // Enviar respuesta con el error si no se pudo guardar el registro
        enviarRespuesta(res, { msg: "Error al guardar registro", error: error.message });
    }
}

exports.putLibros = async (req, res) => {
    // Valida los campos del formulario
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        const ers = errores.array().map(error => ({ campo: error.param, mensaje: error.msg }));
        return enviarRespuesta(res, ers); // Enviar respuesta con los errores
    }

    try {
        // Busca el Libro por ID
        const Libros = await modeloLibros.findOne({ where: { librosID: req.params.id } });
        if (!Libros) {
            return enviarRespuesta(res, { msg: "Libros no encontrado" });
        }

        // Mezcla los datos existentes con los nuevos datos del formulario
        const LibrosActualizado = { ...Libros.toJSON(), ...req.body };

        // Actualiza el Libros con los datos mezclados
        await modeloLibros.update(LibrosActualizado, {
            where: { librosID: req.params.id }
        });

        // Enviar respuesta con el Libros actualizado
        enviarRespuesta(res, { msg: "Registro actualizado correctamente", data: LibrosActualizado });
    } catch (error) {
        // Enviar respuesta con el error si no se pudo actualizar el registro
        enviarRespuesta(res, { msg: "Error al actualizar registro", error: error.message });
    }
}

exports.deleteLibros = async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        const ers = errores.array().map(error => ({ campo: error.param, mensaje: error.msg }));
        return enviarRespuesta(res, ers); // Enviar respuesta con los errores
    }

    try {
        // Busca el Libros por ID
        const Libros = await modeloLibros.findOne({ where: { librosID: req.params.id } });
        if (!Libros) {
            return enviarRespuesta(res, { msg: "Libros no encontrado" });
        }

        // Elimina el Libros
        await modeloLibros.destroy({ where: { librosID: req.params.id } });

        // Enviar respuesta con el Libros eliminado
        enviarRespuesta(res, { msg: "Registro eliminado correctamente", data: Libros });
    } catch (error) {
        // Enviar respuesta con el error si no se pudo eliminar el registro
        enviarRespuesta(res, { msg: "Error al eliminar registro", error: error.message });
    }
}