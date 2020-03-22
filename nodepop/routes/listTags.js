'use strict';

var express = require('express');
var router = express.Router();

/* GET tags list. */

router.get('/', (req, res, next) => {
    res.locals.myTags = ["work", "lifestyle", "mobile", "motor"]
    res.render('listTags', { title: 'These are all available tags' });
});

module.exports = router;
