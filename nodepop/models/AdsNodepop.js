'use strict';

const mongoose = require('mongoose');

// creo un esquema modelo para BD
const addSchema = mongoose.Schema({
    name: String,
    sale: Boolean,
    price: Number,
    foto: String,
    tags: [String]
});

// creo modelo 
addSchema.statics.list = function (filtro, limit, skip, sort, fields) {
    const query = AdsNodepop.find(filtro);
    query.skip(skip);
    query.limit(limit);
    query.sort(sort);
    query.select(fields);
    return query.exec();
}

// addSchema.statics.listTags = function (filtro, limit, skip, sort, fields) {
//     const query = AdsNodepop.find(filtro);
//     return query.exec();
// }


const AdsNodepop = mongoose.model('AdsNodepop', addSchema);

// exportamos el modelo
module.exports = AdsNodepop;