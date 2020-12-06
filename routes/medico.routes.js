const { Router } = require('express');
const { check } = require('express-validator');
const { getMedicos, createMedico, updateMedico, deleteMedico, getMedicoById } = require('../controllers/medico.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', validarJWT, getMedicos);

router.get('/:id', validarJWT, getMedicoById);

router.post('/',
    [
        validarJWT,
        check('nombre', 'Nombre es requerido').notEmpty(),
        check('hospital', 'El hospital ID debe ser valido').isMongoId(),
        validarCampos
    ],
    createMedico
);
router.put('/:id',
    [
        validarJWT,
        check('nombre', 'Nombre es requerido').notEmpty(),
        check('hospital', 'El hospital ID debe ser valido').isMongoId(),
        validarCampos
    ],
    updateMedico
);
router.delete('/:id', validarJWT, deleteMedico);

module.exports = router;