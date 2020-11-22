const { response } = require('express');
const Hospital = require('../models/hospital');

const getHospitales = async (req, res = response) => {
    const hospitales = await Hospital.find()
        .populate('usuario', 'nombre img');

    res.json({
        ok: true,
        hospitales
    });
}

const createHospital = async (req, res = response) => {
    const uid = req.uid;
    const hospital = new Hospital({
        usuario: uid,
        ...req.body
    });

    try {
        await hospital.save();

        res.json({
            ok: true,
            hospital
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor'
        })
    }


}

const updateHospital = async (req, res = response) => {
    const id = req.params.id;
    const uid = req.uid;

    try {
        const hospital = await Hospital.findById(id);
        if (!hospital) {
            return res.status(404).json({
                ok: false,
                msg: 'Hospital no encontrado'
            });
        }

        const cambiosHospital = {
            ...req.body,
            usuario: uid
        };

        //{new: true} trae el documento actualizado
        const hospitalUpdated = await Hospital.findByIdAndUpdate(id, cambiosHospital, { new: true });

        res.json({
            ok: true,
            hospital: hospitalUpdated
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: true,
            msg: 'Error en el servidor'
        });
    }

}

const deleteHospital = async (req, res = response) => {
    const id = req.params.id;
    try {
        const hospital = await Hospital.findById(id);
        if (!hospital) {
            return res.status(404).json({
                ok: true,
                msg: 'Hospital no encontrado'
            });
        }

        await Hospital.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Hospital eliminado'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: true,
            msg: 'Error en el servidor'
        });
    }


}

module.exports = {
    getHospitales,
    createHospital,
    updateHospital,
    deleteHospital
}