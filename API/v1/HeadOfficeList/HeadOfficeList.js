let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
let HeadOfficeListModel = require("../HeadOfficeList/HeadOfficeListModel");
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');
let http = require('http');
module.exports = function (app) {
    app.get('/Api/v1/HeadOfficeList/Search/Column/:Column/Value/:Value', function (req, res) {
        let Column = req.params.Column;
        let Value = req.params.Value;

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
    });

    app.get('/Api/v1/HeadOfficeList/Limit/:Limit/Offset/:Offset', function (req, res) {
        let Limit = req.params.Limit;
        let Offset = req.params.Offset;
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
    });
}