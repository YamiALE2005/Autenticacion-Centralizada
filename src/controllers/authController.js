const Usuario = require("../models/usuarioModel");
const jwt = require("jsonwebtoken");

// Crear usuario
const crearUsuario = async (req, res) => {
    try {

        const usuario = new Usuario(req.body);

        await usuario.save();

        // Generar JWT
        const app_token = jwt.sign(
            {
                id: usuario._id,
                username: usuario.username,
                email: usuario.email,
                role: usuario.role
            },
            process.env.APP_TOKEN,
            {
                expiresIn: "1h"
            }
        );

        res.status(201).json({
            mensaje: "Usuario registrado correctamente",
            usuario,
            app_token
        });

    } catch (error) {

        res.status(500).json({
            mensaje: "Error al registrar usuario",
            error: error.message
        });

    }
};

// Obtener todos los usuarios
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

// Obtener un usuario por ID
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

// Actualizar usuario
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

// Eliminar usuario
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