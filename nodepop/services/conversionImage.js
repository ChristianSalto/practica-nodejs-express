'use strict'

const cote = require('cote');
const jimp = require('jimp');
const path = require('path');
const requester = new cote.Requester({ name: 'Conversion image' });

const imgPath = path.join(__dirname, '../public/img/');



requester.send({ type: 'image' }, (file) => {
    let counter = 0;
    file.forEach(img => {
        counter = 0;
        for (let i of file) {
            counter++
            if (i === `small_${img}`) {
                file.splice(counter - 1, 1);
            }
        }
        jimp.read(imgPath + img)
            .then(image => {
                return image
                    .resize(100, 100)
                    .quality(60)
                    .grayscale()
                    .write(imgPath + 'small_' + img)
            }).catch(err => {
                console.log(err);
                return
            });
    })
});

