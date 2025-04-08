const { body } = require('express-validator');

const libroValidaciones = () => {
    return [
        body('librosTitulo').notEmpty().withMessage('El título es obligatorio'),
        body('librosGenero').notEmpty().withMessage('El género es obligatorio'),
        body('librosAutor').notEmpty().withMessage('El autor es obligatorio'),
        body('librosDescripcion').notEmpty().withMessage('La descripción es obligatoria'),
        body('librosFechaPublicacion').isDate().withMessage('Debe ser una fecha válida')
    ];
};

module.exports = {
    libroValidaciones
};
