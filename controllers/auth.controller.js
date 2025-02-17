const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generateJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');
const { getMenuFrontend } = require('../helpers/menu-frontend');

const login = async (req, res = response) => {
    const { email, password } = req.body;
    try {

        // Verificar por email
        const usuarioDB = await Usuario.findOne({ email });
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe el usuario'
            });
        }

        // Verificar contraseña
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no valida'
            })
        }

        // Generar el TOKEN - JWT
        const token = await generateJWT(usuarioDB.id);

        res.json({
            ok: true,
            token,
            menu: getMenuFrontend(usuarioDB.role)
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor'
        });
    }
}

const googleSignIn = async (req, res = response) => {
    const googleToken = req.body.token;
    try {
        const { name, email, picture } = await googleVerify(googleToken);
        const usuarioDB = await Usuario.findOne({ email });
        let usuario;

        // si no existe el usuario
        if (!usuarioDB) {
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });
        } else {
            usuario = usuarioDB;
            usuario.google = true;
        }

        // Guardar en DB
        await usuario.save();

        // Generar el TOKEN - JWT
        const token = await generateJWT(usuarioDB.id);

        res.json({
            ok: true,
            token,
            menu: getMenuFrontend(usuarioDB.role)
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Token no valido'
        })
    }
}

const renewToken = async (req, res = response) => {
    const uid = req.uid;

    // Generar el TOKEN - JWT
    const token = await generateJWT(uid);

    const usuario = await Usuario.findById(uid);

    res.json({
        ok: true,
        token,
        usuario,
        menu: getMenuFrontend(usuario.role)
    })
}

module.exports = {
    login,
    googleSignIn,
    renewToken
}