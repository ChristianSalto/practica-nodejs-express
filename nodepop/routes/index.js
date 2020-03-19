var express = require('express');
var router = express.Router();
const AdsNodepop = require('../models/AdsNodepop');


/* GET home page. */
router.get('/', function (req, res, next) {
  res.locals.myGreeting = 'Welcome to world';
  res.render('index', { title: 'Nodepop', });
});

router.get('/adsnodepops', (req, res, next) => {
  AdsNodepop.find().exec((err, docs) => {
    res.json(docs);
  })
})


module.exports = router;
