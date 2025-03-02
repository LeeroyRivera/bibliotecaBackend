const { body } = require('express-validator');

const usuarioValidaciones = () => {
    return [
        body('usuariosNombre').notEmpty().withMessage('El nombre es obligatorio'),
        body('usuariosCorreo').isEmail().withMessage('Debe ser un correo válido'),
        body('usuariosTelefono').isNumeric().withMessage('El teléfono debe contener solo números')
    ];
};

module.exports = {
    usuarioValidaciones
};
