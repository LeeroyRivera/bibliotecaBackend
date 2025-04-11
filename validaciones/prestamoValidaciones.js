const { body } = require('express-validator');

const prestamoValidaciones = () => {
    return [
        body('libros_ID').isInt().withMessage('El ID del libro debe ser un número entero'),
        body('usuarios_ID').isInt().withMessage('El ID del usuario debe ser un número entero'),
    ];
};

module.exports = {
    prestamoValidaciones
};
