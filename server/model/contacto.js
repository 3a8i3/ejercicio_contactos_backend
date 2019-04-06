const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let contactoSchema = Schema({
    nombre: {
        type: String,
        require: [true,'No se ha ingresado un nombre']
    },
    apellido: {
        type: String,
        require: [true,'No se ha ingresado un apellido']
    },
    telefono: {
        type: String,
        unique: true,
        require: [true,'No se ha ingresado un teléfono']
    },
    email: {
        type: String,
        unique:  true
    },
    direccion: {
        type: String
    },
    activo: {
        type: Boolean,
        default:  true
    }
});

contactoSchema.plugin( uniqueValidator, { message: '{PATH} debe ser único' } );

module.exports = mongoose.model('Contacto', contactoSchema);