'use strict';

// cargamos la libreria de mongoose
const mongoose = require('mongoose');

//guardamos conexion en variable
const conn = mongoose.connection;

// con Objeto connetion podremos subscribirnos a eventos que heredan de eventEmitter como .on
// podremos ver si la conexion ha sido correcta
conn.on('open', () => {
    console.log('Conectando a MongoDB en', conn.name);
});

// con este evento podremos ver el error de conexion
conn.on('error', err => {
    console.log('Error de conexion', err);
    process.exit(1);
});

mongoose.connect('mongodb://localhost/nodepop', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports = conn;