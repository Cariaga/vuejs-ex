var GameLogListModel = require('./GameLogListModel');
var isNullOrEmpty = require('is-null-or-empty');
let DBCheck = require("../../SharedController/DBCheck");
let http = require('http');
var Security = require('../../SharedController/Security');
var Management = require('../../SharedController/Management');
module.exports = function (app) {
    /*Game Log List of all games */
    app.get('/Api/v1/GameLogList/', function (req, res) {
        GameLogListModel.GameLogList(undefined, undefined, function (response) {
            if (response != undefined) {
                res.send(response);
            } else {
                let status = 404;
                res.status(status).end(http.STATUS_CODES[status]);
            }
        });

    });

    function GameLogListLimitOffsetOrder(Limit,Offset,Order,Direction, res){
        GameLogListModel.GameLogList(Limit,Offset,Order,Direction, function (response) {
            if (response != undefined) {
                res.send(response);
            } else {
                let status = 404;
                res.status(status).end(http.STATUS_CODES[status]);
            }
        });
    }
    /*game log list of a user account with offset and limit */
    app.get('/Api/v1/GameLogList/Limit/:Limit/Offset/:Offset/Order/:Order/Direction/:Direction', Security.verifyToken, Security.checkValues, Management.RouteCalled,Security.rateLimiterMiddleware, Security.cache.route({ expire: 5  }), function (req, res) {
        let Limit = req.params.Limit;
        let Offset = req.params.Offset;
        let Order = req.params.Order;
        let Direction = req.params.Direction;
        GameLogListLimitOffsetOrder(Limit,Offset,Order,Direction,res);
    });
    app.post('/Api/v1/GameLogList/',Security.verifyToken, Security.checkValues, Management.RouteCalled,Security.rateLimiterMiddleware, Security.cache.route({ expire: 5  }), function (req, res) {
        let Limit = req.body.Limit;
        let Offset = req.body.Offset;
        let Order = req.body.Order;
        let Direction = req.body.Direction;
        GameLogListLimitOffsetOrder(Limit,Offset,Order,Direction,res);
    });
    
    function GameLogListSearch(Column,Value,res){
        if (!isNullOrEmpty(Column)) {
            if (!isNullOrEmpty(Value)) {
                GameLogListModel.GameLogSearch(Column, Value, function (response) {
                    if (response != undefined) {
                        res.send(response);
                    } else {
                        console.log('gamelog failed')
                        let status = 404;
                        res.status(status).end(http.STATUS_CODES[status]);
                    }
                });
            } else {
                res.send({
                    InvalidValue: true
                });
            }
        } else {
            res.send({
                InvalidColumn: true
            });
        }
    }
    /*search a specific Game Log List Specifying the column and value */
    app.get('/Api/v1/GameLogList/Search/Column/:Column/Value/:Value', Management.RouteCalled,Security.rateLimiterMiddleware,Security.verifyToken,Security.cache.route({ expire: 5  }), function (req, res) {
        let Column = req.params.Column;
        let Value = req.params.Value;
        GameLogListSearch(Column,Value,res);
    });
    
    app.post('/Api/v1/GameLogList/Search/',Security.verifyToken, function (req, res) {
        let Column = req.body.Column;
        let Value = req.body.Value;
        GameLogListSearch(Column,Value,res);
    });
}