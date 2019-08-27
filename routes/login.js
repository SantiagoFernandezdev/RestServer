const express = require('express');
const bcrypt = require('bcrypt');
const Usuario = require('../Models/usuarios');

const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_ID);
const jwt = require("jsonwebtoken");
const app = express();

app.post('/login', (req, res) => {

     let body = req.body;

     Usuario.findOne({email: body.email}, (err, usuarioDB) => {
          if(err) {
               return res.status(500).json({
                    ok: false,
                    err
               })
          }

          if(!usuarioDB) {
               return res.status(400).json({
                    ok: false,
                    err: {
                         message: 'usuarrio incorrecto'
                    }
               })
          }

          if(!bcrypt.compareSync(body.password, usuarioDB.password)) {
               return res.status(400).json({
                    ok: false,
                    message: 'Password incorrecta'
               })
          }

          let token = jwt.sign(
               {usuario: usuarioDB},
               'este-es-el-seed-desarrollo',
               {expiresIn: process.env.CADUCIDAD_TOKEN}
          );

          res.json({
               ok: true,
               usuarioDB,
               token
          })
     })

})


async function verify( token ) {
     const ticket = await client.verifyIdToken({
         idToken: token,
         audience: process.env.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
         // Or, if multiple clients access the backend:
         //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
     });
     const payload = ticket.getPayload();
     console.log(payload.name);
     console.log(payload.picture);
     // If request specified a G Suite domain:
     //const domain = payload['hd'];

     return {
          name: payload.name,
          email: payload.email,
          img: payload.picture,
          google: true
     }
   }


app.post('/google', async (req, res) => {
     let token = req.body.idtoken;

     let googlesResp = await verify( token ).catch((e) => {
          res.json({
               ok: false,
               Error: e
          })
     })

     Usuario.findOne({email: googlesResp.email}, (err, UsuarioDB) => {
          if(err) {
               res.status(500).json({
                    ok: false,
                    err
               })
          }

          if (UsuarioDB) {
               if (UsuarioDB.google === false) {
                    res.status(400).json({
                         ok: false,
                         message: "Debe de usar las credenciales normales"
                    })
               }  else {
                    let token = jwt.sign(
                         {usuario: usuarioDB},
                         'este-es-el-seed-desarrollo',
                         {expiresIn: process.env.CADUCIDAD_TOKEN}
                    );
          
                    res.json({
                         ok: true,
                         usuarioDB,
                         token
                    })
               }
          } else {

          }

         
     })
})
module.exports = app;