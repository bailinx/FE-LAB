'use strict';
module.exports = function (app, middleware) {
    middleware.setPowerBy = function (req, res, next) {
        res.setHeader('X-Powered-By', 'wo shuo php ni xin ma');
        next();
    }
    return middleware;
}