const { response } = require('express');
const Medico = require('../models/medico');

const getMedicos = async (req, res = response) => {
    const medicos = await Medico.find()
        .populate('usuario', 'nombre img')
        .populate('hospital', 'nombre img');

    res.json({
        ok: true,
        medicos
    });
}

const createMedico = async (req, res = response) => {
    const uid = req.uid;
    const medico = new Medico({
        usuario: uid,
        ...req.body
    });
    try {
        await medico.save();

        res.json({
            ok: true,
            medico
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor'
        })
    }

}

const updateMedico = async (req, res = response) => {
    const id = req.params.id;
    const uid = req.uid;
    try {
        const medicoDB = await Medico.findById(id);

        if (!medicoDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Medico no encontrado'
            });
        }

        const medico = {
            ...req.body,
            usuario: uid
        }

        const medicoUpdated = await Medico.findByIdAndUpdate(id, medico, { new: true });

        res.json({
            ok: true,
            medico: medicoUpdated
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor'
        });
    }


}

const deleteMedico = async (req, res = response) => {
    const id = req.params.id;
    try {
        const medicoDB = await Medico.findById(id);

        if (!medicoDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Medico no encontrado'
            });
        }

        await Medico.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Medico eliminado'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor'
        });
    }


}

module.exports = {
    getMedicos,
    createMedico,
    updateMedico,
    deleteMedico
}