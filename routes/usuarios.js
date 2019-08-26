const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../Models/usuarios');
const app = express();

app.get('/usuarios', (req, res) => {

     let desde = req.query.desde || 0;
     desde = Number(desde);

     let limit = req.query.limit || 5;
     limit = Number(limit);

     Usuario.find( { } )
     .skip(desde)
     .limit(limit)
     .exec((err, usuarioDB) => {
          if(err) {
               return res.status(400).json({
                    ok: false,
                    err
               })
          }

          Usuario.countDocuments( { }, (err, conteo) => {
               res.json({
                    ok: true,
                    usuarioDB,
                    conteo
               })
          })

          
     })
});

app.post('/usuarios', (req, res) => {
     let body = req.body;

     usuario = new Usuario({
          nombre: body.Nombre,
          email: body.correo,
          password: bcrypt.hashSync(body.password, 10),
          role: body.role
     });

     usuario.save((err, usuarioDB) => {
          if(err) {
               return res.status(400).json({
                    ok: false,
                    err
               })
          }

          res.status(200).json({
               ok: true,
               usuario: usuarioDB
          })

     })
    
});

app.put('/usuarios/:id', (req, res) => {
     let id = req.params.id;
     let body = _.pick(req.body, ['nombre', 'email', 'img', 'estado', 'role']);

     Usuario.findByIdAndUpdate(id, body, {new: true, runValidators: true}, (err, usuarioDB) => {
          if(err) {
               return res.status(400).json({
                    ok: false,
                    err
               })
          }

          res.json({
               ok: true,
               usuario: usuarioDB
          })


     })
})

module.exports = app ;