const {response} = require('express');
const Medico = require('../models/medico');

const getMedicos = async (req, res = response) =>{
    const medicos = await Medico.find()
                            .populate('usuario','nombre img')
                            .populate('hospital','nombre img');

    res.json({
        ok:true,
        medicos
    });
}

const createMedico = async (req, res = response) =>{
    const uid = req.uid;
    const medico = new Medico({
        usuario: uid,
        ...req.body
    });
    try {
        await medico.save();

        res.json({
            ok:true,
            medico
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error en el servidor'
        })
    }
    
}

const updateMedico = (req, res = response) =>{
    res.json({
        ok:true
    });
}

const deleteMedico = (req, res = response) =>{
    res.json({
        ok:true
    });
}

module.exports = {
    getMedicos,
    createMedico,
    updateMedico,
    deleteMedico
}