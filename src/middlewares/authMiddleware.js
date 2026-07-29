const jwt = require("jsonwebtoken");

const verificarToken = (req, res, next) => {

    // Obtener el header Authorization
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            mensaje: "Acceso denegado. Token requerido."
        });
    }

    // Extraer únicamente el JWT
    const token = authHeader.split(" ")[1];

    try {

        // Verificar el token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET,
            {
                algorithms: ["HS256"]
            }
        );

        // Guardar la información del usuario autenticado
        req.auth = {
            userId: decoded.sub
        };

        next();

    } catch (error) {

        return res.status(401).json({
            mensaje: "Token inválido o expirado."
        });

    }

};

module.exports = verificarToken;