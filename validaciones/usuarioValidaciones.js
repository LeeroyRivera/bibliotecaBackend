const { body } = require('express-validator');

const usuarioValidaciones = () => {
    return [
        body('usuariosNombre')
            .notEmpty().withMessage('El nombre es obligatorio'),
        body('usuariosCorreo')
            .isEmail().withMessage('Debe ser un correo válido')
            .normalizeEmail(),
        body('usuariosTelefono')
            .isNumeric().withMessage('El teléfono debe contener solo números')
            .isLength({ min: 8, max: 8 }).withMessage('El teléfono debe tener 8 caracteres')
    ];
};

module.exports = {
    usuarioValidaciones
};
