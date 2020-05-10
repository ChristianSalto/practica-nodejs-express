'use strict'

const cote = require('cote');
const jimp = require('jimp');
const path = require('path');
const requester = new cote.Requester({ name: 'Conversion image' });

const imgPath = path.join(__dirname, '../public/img/');
let arrayBackup = [];

setInterval(() => {
    requester.send({ type: 'image' }, (file) => {
        file.forEach(img => {
            let result = arrayBackup.includes(img);
            if (!result) {
                arrayBackup.push(img);
                arrayBackup.push('small_' + img);

                jimp.read(imgPath + img)
                    .then(image => {
                        return image
                            .resize(100, 100)
                            .quality(60)
                            .write(imgPath + 'small_' + img)
                    }).catch(err => {
                        console.log(err);
                        throw err;
                    });
            }
        })
    })
}, 1000);


