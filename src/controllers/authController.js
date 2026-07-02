const Usuario = require("../models/usuarioModel");
const crearUsuario = async (req, res) => {
    try {

        const usuario = new Usuario(req.body);

        await usuario.save();

        res.status(201).json({
            mensaje: "Usuario registrado correctamente",
            usuario
        });

    } catch (error) {

        res.status(500).json({
            mensaje: "Error al registrar usuario",
            error: error.message
        });

    }
};
const obtenerUsuarios = async (req, res) => {

    try {

        const usuarios = await Usuario.find();

        res.status(200).json(usuarios);

    } catch (error) {

        res.status(500).json({
            mensaje: "Error al obtener usuarios",
            error: error.message
        });

    }

};
const obtenerUsuario = async (req, res) => {

    try {

        const usuario = await Usuario.findById(req.params.id);

        if (!usuario) {
            return res.status(404).json({
                mensaje: "Usuario no encontrado"
            });
        }

        res.status(200).json(usuario);

    } catch (error) {

        res.status(500).json({
            mensaje: "Error al buscar usuario",
            error: error.message
        });

    }

};
const actualizarUsuario = async (req, res) => {

    try {

        const usuario = await Usuario.findByIdAndUpdate(

            req.params.id,

            req.body,

            {
                new: true,
                runValidators: true
            }

        );

        if (!usuario) {

            return res.status(404).json({
                mensaje: "Usuario no encontrado"
            });

        }

        res.status(200).json({
            mensaje: "Usuario actualizado",
            usuario
        });

    } catch (error) {

        res.status(500).json({
            mensaje: "Error al actualizar",
            error: error.message
        });

    }

};
const eliminarUsuario = async (req, res) => {

    try {

        const usuario = await Usuario.findByIdAndDelete(req.params.id);

        if (!usuario) {

            return res.status(404).json({
                mensaje: "Usuario no encontrado"
            });

        }

        res.status(200).json({
            mensaje: "Usuario eliminado correctamente"
        });

    } catch (error) {

        res.status(500).json({
            mensaje: "Error al eliminar usuario",
            error: error.message
        });

    }

};
module.exports = {

    crearUsuario,

    obtenerUsuarios,

    obtenerUsuario,

    actualizarUsuario,

    eliminarUsuario

};