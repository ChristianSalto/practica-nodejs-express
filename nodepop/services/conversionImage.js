'use strict'

const cote = require('cote');
const jimp = require('jimp');
const path = require('path');
const requester = new cote.Requester({ name: 'Conversion image' });

const imgPath = path.join(__dirname, '../public/img/');



requester.send({ type: 'image' }, (file) => {

    file.forEach(img => {
        console.log(img);

        jimp.read(imgPath + img)
            .then(image => {
                return image
                    .resize(100, 100)
                    .quality(60)
                    .grayscale()
                    .write('small_' + img)
            }).catch(err => {
                console.log(err);
                return
            });
    })
});

