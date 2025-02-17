/**
 * ruta: api/uploads/
 */
const { Router } = require('express');
const expressFileUpload = require('express-fileupload');
const { fileUpload, retornarImagen } = require('../controllers/uploads.controller');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.use(expressFileUpload());

router.put('/:tipo/:id', validarJWT, fileUpload);
router.get('/:tipo/:foto', retornarImagen);


module.exports = router;