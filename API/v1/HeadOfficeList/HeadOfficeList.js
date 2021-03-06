let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
let HeadOfficeListModel = require("../HeadOfficeList/HeadOfficeListModel");
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');
let http = require('http');
var Security = require('../../SharedController/Security');
var Management = require('../../SharedController/Management');
/*a list of head offices */
module.exports = function (app) {
    function HeadOfficeListSearch(Column,Value,res){
        if (!isNullOrEmpty(Column)) {
            if (!isNullOrEmpty(Value)) {
                HeadOfficeListModel.HeadOfficeListSearch(Column, Value, function (response) {
                    if (response != undefined) {
                        res.send(response);
                    } else {
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
    /*filtering the list of head office with specific target column and value */
    app.get('/Api/v1/HeadOfficeList/Search/Column/:Column/Value/:Value', Management.RouteCalled,Security.rateLimiterMiddleware,Security.verifyToken,Security.cache.route({ expire: 5  }), function (req, res) {
        let Column = req.params.Column;
        let Value = req.params.Value;
        HeadOfficeListSearch(Column,Value,res);
    });
    app.post('/Api/v1/HeadOfficeList/Search/',Security.verifyToken, function (req, res) {
        let Column = req.body.Column;
        let Value = req.body.Value;
        HeadOfficeListSearch(Column,Value,res);
    });
    
    function HeadOfficeListLimitOffet(Limit,Offset,res){
        if (!isNullOrEmpty(Limit)) {
            if (!isNullOrEmpty(Offset)) {
                HeadOfficeListModel.HeadOfficeList(Limit, Offset, function (response) {
                    if (response != undefined) {
                        res.send(response);
                    } else {
                        let status = 404;
                        res.status(status).end(http.STATUS_CODES[status]);
                    }
                });
            } else {
                res.send({
                    OffsetMissing: true
                });
            }
        } else {
            res.send({
                LimitMissing: true
            });
        }
    }
    app.get('/Api/v1/HeadOfficeList/Limit/:Limit/Offset/:Offset', Management.RouteCalled,Security.rateLimiterMiddleware,Security.verifyToken,Security.cache.route({ expire: 5  }), function (req, res) {
        let Limit = req.params.Limit;
        let Offset = req.params.Offset;
        HeadOfficeListLimitOffet(Limit,Offset,res);
    });
    app.post('/Api/v1/HeadOfficeList/',Security.verifyToken, function (req, res) {
        let Limit = req.body.Limit;
        let Offset = req.body.Offset;
        HeadOfficeListLimitOffet(Limit,Offset,res);
    });
}