const { Op } = require('sequelize');
const modeloPrestamos = require('../modelos/prestamos');
const { validationResult } = require('express-validator');
const { prestamoValidaciones } = require('../validaciones/prestamoValidaciones');

function enviarRespuesta(res, jsonObject) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json(jsonObject);
}

exports.getPrestamos = async (req, res) => {
    try {
        await modeloPrestamos.findAll({ raw: true })
        .then((data) => {
            enviarRespuesta(res, data);
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.postPrestamos = async (req, res) => {
    // Valida los campos del formulario
    await Promise.all(prestamoValidaciones().map(validation => validation.run(req)));
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        // Si hay errores, se mapean los errores y se envían como respuesta
        const ers = errores.array().map(error => ({ campo: error.param, mensaje: error.msg }));
        return enviarRespuesta(res, ers); // Enviar respuesta con los errores
    }

    try {
        // Crea un nuevo prestamo con los datos del formulario
        const data = await modeloPrestamos.create(req.body);
        // Enviar respuesta con el prestamo creado
        enviarRespuesta(res, { msg: "Registro guardado correctamente", data });
    } catch (error) {
        // Enviar respuesta con el error si no se pudo guardar el registro
        enviarRespuesta(res, { msg: "Error al guardar registro", error: error.message });
    }
}

exports.putPrestamos = async (req, res) => {
    // Valida los campos del formulario
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        const ers = errores.array().map(error => ({ campo: error.param, mensaje: error.msg }));
        return enviarRespuesta(res, ers); // Enviar respuesta con los errores
    }

    try {
        // Busca el prestamo por ID
        const Prestamos = await modeloPrestamos.findOne({ where: { prestamosID: req.params.id } });
        if (!Prestamos) {
            return enviarRespuesta(res, { msg: "Prestamos no encontrado" });
        }

        // Mezcla los datos existentes con los nuevos datos del formulario
        const PrestamosActualizado = { ...Prestamos.toJSON(), ...req.body };

        // Actualiza el Prestamos con los datos mezclados
        await modeloPrestamos.update(PrestamosActualizado, {
            where: { prestamosID: req.params.id }
        });

        // Enviar respuesta con el Prestamos actualizado
        enviarRespuesta(res, { msg: "Registro actualizado correctamente", data: PrestamosActualizado });
    } catch (error) {
        // Enviar respuesta con el error si no se pudo actualizar el registro
        enviarRespuesta(res, { msg: "Error al actualizar registro", error: error.message });
    }
}

exports.deletePrestamos = async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        const ers = errores.array().map(error => ({ campo: error.param, mensaje: error.msg }));
        return enviarRespuesta(res, ers); // Enviar respuesta con los errores
    }

    try {
        // Busca el Prestamos por ID
        const Prestamos = await modeloPrestamos.findOne({ where: { prestamosID: req.params.id } });
        if (!Prestamos) {
            return enviarRespuesta(res, { msg: "Prestamos no encontrado" });
        }

        // Elimina el Prestamos
        await modeloPrestamos.destroy({ where: { prestamosID: req.params.id } });

        // Enviar respuesta con el Prestamos eliminado
        enviarRespuesta(res, { msg: "Registro eliminado correctamente", data: Prestamos });
    } catch (error) {
        // Enviar respuesta con el error si no se pudo eliminar el registro
        enviarRespuesta(res, { msg: "Error al eliminar registro", error: error.message });
    }
}