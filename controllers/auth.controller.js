const { response} = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const {generateJWT} = require('../helpers/jwt');

const login = async (req, res = response) =>{
    const {email, password} = req.body;
    try {

        // Verificar por email
        const usuarioDB = await Usuario.findOne({email});
        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg:'No existe el usuario'
            });
        }

        // Verificar contraseña
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if(!validPassword){
            return res.status(400).json({
                ok:false,
                msg:'Contraseña no valida'
            })
        }

        // Generar el TOKEN - JWT
        const token = await generateJWT(usuarioDB.id);

        res.json({
            ok:true,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error en el servidor'
        });
    }
}

module.exports = {
    login
}