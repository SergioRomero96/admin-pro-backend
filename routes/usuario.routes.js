/**
 * Ruta: /api/usuarios
 */
const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { getUsuarios, createUsuario, updateUsuario, deleteUsuario } = require('../controllers/usuario.controller');
const { validarJWT, validarADMIN_ROLE, validarADMIN_ROLE_o_MismoUsuario } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', validarJWT, getUsuarios);

router.post('/',
    [
        check('nombre', 'Nombre es obligatorio').not().isEmpty(),
        check('password', 'Password es obligatorio').not().isEmpty(),
        check('email', 'Email es obligatorio').isEmail(),
        validarCampos
    ],
    createUsuario
);

router.put('/:id',
    [
        validarJWT,
        validarADMIN_ROLE_o_MismoUsuario,
        check('nombre', 'Nombre es obligatorio').not().isEmpty(),
        check('email', 'Email es obligatorio').isEmail(),
        check('role', 'Rol es obligatorio').notEmpty(),
        validarCampos
    ],
    updateUsuario
)

router.delete('/:id',
    [
        validarJWT,
        validarADMIN_ROLE
    ],
    deleteUsuario)

module.exports = router;
