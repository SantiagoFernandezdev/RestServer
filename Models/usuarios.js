const mongoose = require('mongoose');

const usuarioValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
     nombre: {
          type: String,
          required: [true, 'El nombre es necesarios']
     },
     email: {
          type: String,
          required: [true, 'El correo es necesario'],
          unique: true
     },
     password: {
          type: String,
          required: [true, 'El password es requerido']
     },
     img: {
          type: String
     },
     role: {
          type: String,
          default: 'USER_ROLE',
          enum: {
               values: ['USER_ROLE', 'ADMIN_ROLE'],
               message: '{VALUE} No es un rol permitido'
          }
     },
     estado: {
          type: Boolean,
          default: true
     },
     google: {
          type: Boolean,
          default: false
     }
});

usuarioSchema.methods.toJSON = function() {
     let user = this;
     let userObjet = user.toObject();
     delete userObjet.password;

     return userObjet;
}

usuarioSchema.plugin( usuarioValidator, {message: '{PATH} debe ser unico'});

module.exports = mongoose.model('usuarios', usuarioSchema);