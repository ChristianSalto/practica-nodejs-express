'use strict';

const express = require('express');
const router = express.Router();

const AdsNodepop = require('../../models/AdsNodepop');

// GET /api/adsnodepops
// Conseguimos todos los ads

router.get('/', async (req, res, next) => {
    try {
        const docs = await AdsNodepop.find();
        res.json(docs);
    } catch (err) {
        next(err);
    }
});

// POST /api/adsnodepops
// Crear un ads

router.post('/', async (req, res, next) => {
    try {
        const adsData = req.body;
        const ads = new AdsNodepop(adsData);
        const adsSaved = await ads.save();

        res.status(201).json({ success: adsSaved });
    } catch (err) {
        next(err);
    }
});


// PUT /api/adsnodepop/:id
// Actualizamos un ads

router.put('/:id', async (req, res, next) => {
    try {
        const _id = req.params.id;
        const body = req.body;
        const adsUpdate = await AdsNodepop.findByIdAndUpdate(_id, body, { new: true });
        if (adsUpdate === null) {
            res.json({ message: "update was impossible" });
            return;
        }
        res.json({ success: adsUpdate, message: "this ad was update" });
    } catch (err) {
        next(err);
    }
});


// DELETE /api/adsnodepop/:id
// borramos un ad

router.delete('/:id', async (req, res, next) => {
    try {
        const _id = req.params.id;
        const adsDelete = await AdsNodepop.findByIdAndDelete({ _id });
        if (adsDelete === null) {
            res.json({ message: "delete was impossible" });
            return;
        }
        res.json({ success: adsDelete, message: "this ad was deleted" });
    } catch (err) {
        next(err);
    }
});

module.exports = router;