'use strict'

const cote = require('cote');
const imageService = new cote.Responder({ name: 'Image Service' });
const fs = require('fs');
const path = require('path');

const imagePath = path.join(__dirname, '../public/img/');

imageService.on('image', (req, done) => {
    fs.readdir(imagePath, (err, file) => {
        if (err) {
            console.log(err);
            return
        }
        done(file);
    });
});
