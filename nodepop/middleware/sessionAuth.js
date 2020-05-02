'use strict';


module.exports = function (req, res, next) {
    if (req.session.authUser) {
        next();
        return;
    }
    res.redirect('/login');
}