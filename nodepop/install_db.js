'use strict';

const conn = require('./lib/connectMongoose');
const AdsNodepop = require('./models/AdsNodepop');
const ads = require('./ads.json');


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
    await AdsNodepop.insertMany(ads);
}