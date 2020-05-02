'use strict';

const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');

router.get('/', (req, res, next) => {
    res.locals.email = "";
    res.locals.error = "";
    res.render('login');
});

router.post('/', async (req, res, next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const usuario = await Usuario.findOne({ email: email });
        if (!usuario || !await bcrypt.compare(password, usuario.password)) {
            res.locals.email = email;
            res.locals.error = res.__('Invalid credentials');
            res.render('login');
            return;
        }

        req.session.authUser = {
            _id: usuario._id
        };
        console.log(req.session)
        res.redirect('/private');
    } catch (err) {
        next(err);
    }
});



module.exports = router;