'use strict';

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../../models/Usuario');

router.post('/', async (req, res, next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const usuario = await Usuario.findOne({ email: email });

        if (!usuario || !await bcrypt.compare(password, usuario.password)) {
            const error = new Error('Invalid credentials');
            error.status = 401;
            next(error);
            return;
        }



        const token = jwt.sign({ _id: usuario._id }, process.env.JWT_SECRET, {
            expiresIn: '2d'
        });

       // console.log(token);
        res.json({ token: token });

    } catch (err) {
        next(err);
    }
});

module.exports = router;