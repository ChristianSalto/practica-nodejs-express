'use strict';

const conn = require('./lib/connectMongoose');
const AdsNodepop = require('./models/AdsNodepop');
const ads = require('./ads.json');
const Usuario = require('./models/Usuario');


conn.once('open', async () => {
    try {
        await initAdsNodepop();
        await initUsuario();
        conn.close();
    } catch (err) {
        console.error('Hubo un error: ', err);
        process.exit(1);
    }
});

async function initAdsNodepop() {
    await AdsNodepop.deleteMany();
    await AdsNodepop.insertMany(ads);
}

async function initUsuario() {
    await Usuario.deleteMany();
    await Usuario.insertMany([
        {
            email: 'user@example.com',
            password: await Usuario.hashPassword('1234')
        }
    ]);
}