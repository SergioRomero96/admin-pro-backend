const { Router } = require('express');
const { check } = require('express-validator');
const { getHospitales, createHospital, deleteHospital, updateHospital } = require('../controllers/hospital.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', validarJWT, getHospitales);

router.post('/',
    [
        validarJWT,
        check('nombre', 'Nombre es requerido').notEmpty(),
        validarCampos
    ],
    createHospital
);

router.put('/:id',
    [
        validarJWT,
        check('nombre', 'Nombre es requerido').notEmpty(),
        validarCampos
    ],
    updateHospital
);

router.delete('/:id', validarJWT, deleteHospital);

module.exports = router;