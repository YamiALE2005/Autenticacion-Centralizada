const jwt = require("jsonwebtoken");

const verificarToken = (req, res, next) => {

    // Obtener el token de los headers comunes o de Authorization
    const token = req.header("x-access-token") || 
                  req.header("x-token") || 
                  req.header("token") || 
                  req.header("app_token") || 
                  req.header("app-token") || 
                  req.header("APP_TOKEN") || 
                  req.header("Authorization");

    if (!token) {
        return res.status(401).json({
            mensaje: "Acceso denegado. Token requerido."
        });
    }

    try {

        // Si viene de Authorization con el prefijo "Bearer ", se lo quitamos.
        // Si viene directo en otro header, lo usamos tal cual.
        const tokenSinBearer = token.startsWith("Bearer ") ? token.replace("Bearer ", "") : token;

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