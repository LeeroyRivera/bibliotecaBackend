const { body } = require('express-validator');

const prestamoValidaciones = () => {
    return [
        body('libros_ID').isInt().withMessage('El ID del libro debe ser un número entero'),
        body('usuarios_ID').isInt().withMessage('El ID del usuario debe ser un número entero'),
        body('prestamosFechaInicial').isDate().withMessage('Debe ser una fecha válida'),
        body('prestamosFechaDevolucion').isDate().withMessage('Debe ser una fecha válida')
    ];
};

module.exports = {
    prestamoValidaciones
};
