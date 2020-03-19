'use strict';

const mongoose = require('mongoose');

// creo un esquema modelo para BD
const addSchema = mongoose.Schema({
    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: [String]
});

// creo modelo 
const AdsNodepop = mongoose.model('AdsNodepop', addSchema);


// exportamos el modelo
module.exports = AdsNodepop;