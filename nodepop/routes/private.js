'use strict';

const express = require('express');
const router = express.Router();

const AdsNodepop = require('../models/AdsNodepop');

router.get('/', async (req, res, next) => {
    try {
        const total = await AdsNodepop.count();
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

        const advertisements = await AdsNodepop.list(filtro, limit, skip, sort, fields);
        res.render('private', { total, advertisements: advertisements });
    } catch (err) {
        next(err);
    }
});

module.exports = router;