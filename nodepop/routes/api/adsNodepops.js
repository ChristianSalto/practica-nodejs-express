'use strict';

const express = require('express');
const router = express.Router();

const AdsNodepop = require('../../models/AdsNodepop');

// GET /apiv1/adsnodepops
// Conseguimos todos los ads

router.get('/', async (req, res, next) => {
    try {
        const name = req.query.name;
        const tags = req.query.tags;
        const sale = req.query.sale;
        let price = req.query.price;
        const limit = parseInt(req.query.limit || 10);
        const skip = parseInt(req.query.skip);
        let field = req.query.sort;
        const fields = req.query.fields;

        const filtro = {};
        let sort = {};

        if (typeof field !== 'undefined') {
            let count = 0;
            let myFilter = true;
            for (let i of field) {
                count++;
                if (i === '-') {
                    field = field.slice(0, count - 1);
                    sort[field] = -1;
                    myFilter = false;
                }
            }
            if (myFilter) {
                field = field.slice(0, count - 1);
                sort[field] = 1;
            }
        }

        if (typeof name !== 'undefined') {
            filtro.name = new RegExp(name, 'i');
        };

        if (typeof tags !== 'undefined') {
            filtro.tags = new RegExp(tags, 'i');
        }

        if (typeof sale !== 'undefined') {
            filtro.sale = sale;
        }

        if (typeof price !== 'undefined') {
            price = price.split("-");
            if (price[0] === '') {
                filtro.price = { $lte: price[1] };
            }

            if (price[1] === '') {
                filtro.price = { $gte: price[0] };

            }

            if (price[0] !== '' && price[1] !== '') {
                filtro.price = { $gte: price[0], $lte: price[1] }
            }
        }


        const docs = await AdsNodepop.list(filtro, limit, skip, sort, fields);
        res.json(docs);
    } catch (err) {
        next(err);
    }
});


// POST /apiv1/adsnodepops
// Crear un ads

router.post('/', async (req, res, next) => {
    try {
        const adsData = req.body;
        let tags = req.body.tags;
        typeof tags !== 'object' ? tags = [tags] : tags;
        console.log(tags);
        for (let i of tags) {
            if (i !== 'work' && i !== 'lifestyle' && i !== 'mobile' && i !== 'motor') {
                return res.status(400).json({
                    error: i,
                    msj: "only the following tags writing in lowercase are valid",
                    tags: ["work", "lifestyle", "mobile", "motor"]
                });
            }
        }
        const ads = new AdsNodepop(adsData);
        const adsSaved = await ads.save();

        res.status(201).json({ success: adsSaved });
    } catch (err) {
        next(err);
    }
});


// PUT /apiv1/adsnodepop/:id
// Actualizamos un ads

router.put('/:id', async (req, res, next) => {
    try {
        const _id = req.params.id;
        const body = req.body;
        const adsUpdate = await AdsNodepop.findByIdAndUpdate(_id, body, {
            new: true,
            useFindAndModify: false
        });
        if (adsUpdate === null) {
            res.json({ message: "update was impossible" });
            return;
        }
        res.json({ success: adsUpdate, message: "this ad was update" });
    } catch (err) {
        next(err);
    }
});


// DELETE /apiv1/adsnodepop/:id
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