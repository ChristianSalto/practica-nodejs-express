var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');



// /* GET home page. */
// router.get('/', function (req, res, next) {
//   res.locals.myGreeting = 'Welcome to my world';
//   res.render('index', { title: 'Nodepop', });
// });



// module.exports = router;


router.get('/', async function (req, res, next) {
  try {
    const filename = path.join(__dirname, '../README.md');
    const readme = await new Promise((res, rej) => {
      fs.readFile(filename, 'utf8', (err, data) => err ? rej(err) : res(data))
    });
    // console.log(typeof readme);
    res.render('index', { readme, title: 'NodePop' });
  } catch (err) {
    return next(err);
  }
});


module.exports = router;