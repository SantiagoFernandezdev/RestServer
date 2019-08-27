
const jwt = require('jsonwebtoken');

let verificarToken = (req, res, next) => {
     let token = req.get('token');

     jwt.verify(token, process.env.SEED, (err, decode) => {
          if(err) {
               res.status(401).json({
                    ok: false,
                    message: "No autorizado"
               })
          }

          req.usuario = decode.usuario;
          next();

     })
}

let verificaADMIN_ROLE = (req, res, next) => {

     let role = req.usuario.role;

     if(role === "USER_ROLE") {
          return res.status(401).json({
               ok: false,
               message: "No puede acceder a este servicio"
          })
     } 
     
     next();
}

module.exports = {
     verificarToken,
     verificaADMIN_ROLE
}