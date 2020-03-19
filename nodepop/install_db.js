'use strict';

const conn = require('./lib/connectMongoose');
const AdsNodepop = require('./models/AdsNodepop');

conn.once('open', async () => {
    try {
        await initAdsNodepop();
        conn.close();
    } catch (err) {
        console.error('Hubo un error: ', err);
        process.exit(1);
    }
});

async function initAdsNodepop() {
    await AdsNodepop.deleteMany();
    await AdsNodepop.insertMany([
        {
            nombre: "Bicicleta", venta: true, precio: 230.15, foto: "bici.jpg", tags: [
                "lifestyle", "motor"
            ]
        },
        {
            nombre: "iPhone 3G", venta: false, precio: 50.00, foto: "iphone.png", tags: [
                "lifestyle", "mobile"
            ]
        }
    ])
}