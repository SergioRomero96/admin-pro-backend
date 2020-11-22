const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth.controller');
const {validarCampos} = require('../middlewares/validar-campos');

const router = Router();

router.post('/',
    [
        check('email', 'Email es obligatorio').isEmail(),
        check('password','Password es obligatorio').not().isEmpty(),
        validarCampos
    ],
    login
);

router.post('/google',
    [
        check('token','Token de Google es obligatorio').not().isEmpty(),
        validarCampos
    ],
    googleSignIn
);

module.exports = router;