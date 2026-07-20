const express = require("express");
const router = express.Router();

const {
    crearUsuario,
    obtenerUsuarios,
    obtenerUsuario,
    actualizarUsuario,
    eliminarUsuario
} = require("../controllers/authController");

const verificarToken = require("../middlewares/authMiddleware");

// Ruta pública (no requiere token)
router.post("/usuarios", crearUsuario);

// Rutas protegidas (requieren JWT)
router.get("/usuarios", verificarToken, obtenerUsuarios);

router.get("/usuarios/:id", verificarToken, obtenerUsuario);

router.put("/usuarios/:id", verificarToken, actualizarUsuario);

router.delete("/usuarios/:id", verificarToken, eliminarUsuario);

module.exports = router;