const { body } = require('express-validator');

const usuarioValidaciones = () => {
    return [
        body('usuariosNombre')
            .notEmpty().withMessage('El nombre es obligatorio'),
        body('usuariosCorreo')
            .isEmail().withMessage('Debe ser un correo válido')
            .normalizeEmail(),
        body('usuariosContra')
            .notEmpty().withMessage('La contraseña es obligatoria')
            .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
            .matches(/\d/).withMessage('La contraseña debe contener al menos un número')
    ];
};

module.exports = {
    usuarioValidaciones
};
