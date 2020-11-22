/**
 * ruta: api/todo/:busqueda
 */
const {Router} = require('express');
const { getTodo, getDocumentoColeccion } = require('../controllers/busqueda.controller');
const { validarJWT } = require('../middlewares/validar-jwt');

const routes = Router();

routes.get('/:busqueda', validarJWT, getTodo);
routes.get('/coleccion/:tabla/:busqueda', validarJWT, getDocumentoColeccion);


module.exports = routes;
