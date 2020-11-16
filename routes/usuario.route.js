/**
 * Ruta: /api/usuarios
 */
const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { getUsuarios, createUsuario, updateUsuario, deleteUsuario } = require('../controllers/usuario.controller');
const { validarJWT } = require('../middlewares/validar-jwt');

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
        check('nombre', 'Nombre es obligatorio').not().isEmpty(),
        check('email', 'Email es obligatorio').isEmail(),
        check('role', 'Rol es obligatorio').notEmpty(),
        validarCampos
    ],
    updateUsuario
)

router.delete('/:id', validarJWT, deleteUsuario)

module.exports = router;
