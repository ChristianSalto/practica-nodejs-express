const express = require('express');
const router = express.Router();

router.get('/:locale', (req, res, next) => {
    const locale = req.params.locale;
    const refererHeaders = req.get('referer');
    res.cookie('main-language', locale, { maxAge: 1000 * 60 * 60 * 24 * 20 });
    res.redirect(refererHeaders);
})

module.exports = router;