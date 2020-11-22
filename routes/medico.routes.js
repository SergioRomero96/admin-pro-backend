const { Router } = require('express');
const { check } = require('express-validator');
const { getMedicos, createMedico, updateMedico, deleteMedico } = require('../controllers/medico.controller');
const {validarCampos} = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', getMedicos);
router.post('/',
    [
        validarJWT,
        check('nombre', 'Nombre es requerido').notEmpty(),
        check('hospital','El hospital ID debe ser valido').isMongoId(),
        validarCampos
    ],
    createMedico
);
router.put('/:id', [], updateMedico);
router.delete('/:id', deleteMedico);

module.exports = router;