const Usuario = require("../models/usuarioModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Crear usuario
const crearUsuario = async (req, res) => {
    try {

        const usuario = new Usuario(req.body);

        await usuario.save();

        const token = jwt.sign(
            {
                sub: usuario._id.toString()
            },
            process.env.JWT_SECRET,
            {
                algorithm: "HS256",
                expiresIn: "15m"
            }
        );

        res.status(201).json({
            mensaje: "Usuario registrado correctamente",
            usuario,
            token
        });

    } catch (error) {

        res.status(500).json({
            mensaje: "Error al registrar usuario",
            error: error.message
        });

    }
};

// Iniciar sesión
const login = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                mensaje: "Email y contraseña son obligatorios"
            });
        }

        const usuario = await Usuario.findOne({ email });

        if (!usuario) {
            return res.status(401).json({
                mensaje: "Credenciales incorrectas"
            });
        }

        if (usuario.status !== "active") {
            return res.status(401).json({
                mensaje: "Usuario inactivo"
            });
        }

        const passwordCorrecta = await bcrypt.compare(
            password,
            usuario.password
        );

        if (!passwordCorrecta) {
            return res.status(401).json({
                mensaje: "Credenciales incorrectas"
            });
        }

        const token = jwt.sign(
            {
                sub: usuario._id.toString()
            },
            process.env.JWT_SECRET,
            {
                algorithm: "HS256",
                expiresIn: "15m"
            }
        );

        res.status(200).json({
            mensaje: "Inicio de sesión correcto",
            token
        });

    } catch (error) {

        res.status(500).json({
            mensaje: "Error al iniciar sesión",
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
    login,
    obtenerUsuarios,
    obtenerUsuario,
    actualizarUsuario,
    eliminarUsuario
};