const express = require("express");
const router = express.Router();

const {
    crearUsuario,
    obtenerUsuarios,
    obtenerUsuario,
    actualizarUsuario,
    eliminarUsuario
} = require("../controllers/authController");

router.post("/usuarios", crearUsuario);

router.get("/usuarios", obtenerUsuarios);

router.get("/usuarios/:id", obtenerUsuario);

router.put("/usuarios/:id", actualizarUsuario);

router.delete("/usuarios/:id", eliminarUsuario);

module.exports = router;