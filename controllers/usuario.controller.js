const { response } = require("express");
const bcrypt = require('bcryptjs');
const Usuario = require("../models/usuario");
const { generateJWT } = require('../helpers/jwt');

const getUsuarios = async (req, res) => {
	const desde = Number(req.query.desde) || 0;

	const [usuarios, total] = await Promise.all([
		Usuario.find({}, "nombre email role google img")
			.skip(desde)
			.limit(5),
		Usuario.countDocuments()
	])

	res.json({
		ok: true,
		usuarios,
		total,
	});
}

const createUsuario = async (req, res = response) => {
	const { password, email } = req.body;

	try {
		const existeEmail = await Usuario.findOne({ email });

		if (existeEmail) {
			return res.status(400).json({
				ok: false,
				msg: "El correo ya esta registrado",
			});
		}

		const usuario = new Usuario(req.body);

		// Encriptar contraseña
		const salt = bcrypt.genSaltSync();
		usuario.password = bcrypt.hashSync(password, salt);

		// Generar el TOKEN - JWT
		const token = await generateJWT(usuario.id);

		// Guardar Usuario
		await usuario.save();

		res.json({
			ok: true,
			usuario,
			token
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: "Error inesperado... revisar logs",
		});
	}
}

const updateUsuario = async (req, res = response) => {
	const uid = req.params.id;

	try {
		const usuarioDB = await Usuario.findById(uid);
		if (!usuarioDB) {
			return res.status(404).json({
				ok: false,
				msg: 'No existe el usuario'
			});
		}

		const { password, google, email, ...campos } = req.body;
		if (usuarioDB.email !== email) {

			const existeEmail = await Usuario.findOne({ email });
			if (existeEmail) {
				return res.status(400).json({
					ok: false,
					msg: 'Ya existe un usuario con ese email'
				})
			}
		}

		if(!usuarioDB.google){
			campos.email = email;
		}else if(usuarioDB.email !== email){
			return res.status(400).json({
				ok: false,
				msg: 'Usuario de google no pueden cambiar su correo'
			});
		}
		const usuarioUpdated = await Usuario.findByIdAndUpdate(uid, campos, { new: true });

		res.json({
			ok: true,
			usuario: usuarioUpdated
		})

	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Error inesperado'
		})
	}
}

const deleteUsuario = async (req, res = response) => {
	const uid = req.params.id;
	try {
		const usuarioDB = await Usuario.findById(uid);
		if (!usuarioDB) {
			return res.status(404).json({
				ok: false,
				msg: 'No existe el usuario'
			});
		}

		await Usuario.findByIdAndDelete(uid);

		res.json({
			ok: true,
			msg: 'Usuario eliminado'
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Error inesperado'
		});
	}
}

module.exports = {
	getUsuarios,
	createUsuario,
	updateUsuario,
	deleteUsuario
};
