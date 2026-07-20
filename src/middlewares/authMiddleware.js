const jwt = require("jsonwebtoken");

const verificarToken = (req, res, next) => {

    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({
            mensaje: "Acceso denegado. Token requerido."
        });
    }

    try {

        const tokenSinBearer = token.replace("Bearer ", "");

        // Si es el token maestro definido en .env, lo permitimos directamente
        if (tokenSinBearer === process.env.APP_TOKEN) {
            const verificado = jwt.decode(tokenSinBearer);
            req.usuario = verificado || { username: "master_user", role: "admin" };
            return next();
        }

        const verificado = jwt.verify(
            tokenSinBearer,
            process.env.APP_TOKEN
        );

        req.usuario = verificado;

        next();

    } catch (error) {

        return res.status(401).json({
            mensaje: "Token inválido"
        });

    }

};

module.exports = verificarToken;