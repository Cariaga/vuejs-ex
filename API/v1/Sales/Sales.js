let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
let SalesModel = require("../Sales/SalesModel");
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');
var uuidv4 = require('uuid/v4');
let http = require('http');
var Security = require('../../SharedController/Security');

module.exports = function (app) {
    //HeadOffice
    function LowRank(HeadOfficeID, res) {
        if (!isNullOrEmpty(HeadOfficeID)) {
            SalesModel.SalesLowRank(HeadOfficeID, function (response) {
                if (response != undefined) {
                    res.send(response);
                } else {
                    let status = 404;
                    res.status(status).end(http.STATUS_CODES[status]);
                }
            });
        } else {
            let status = 404;
            res.status(status).end(http.STATUS_CODES[status]);
        }
    }    
    app.get('/Api/v1/Sales/LowRank/HeadOfficeID/:HeadOfficeID', Security.verifyToken, function (req, res) {
        let HeadOfficeID = req.params.HeadOfficeID;
        LowRank(HeadOfficeID,res);
    });

    app.post('/Api/v1/Sales/LowRank/', Security.verifyToken, function (req, res) {
        let HeadOfficeID = req.body.HeadOfficeID;
        LowRank(HeadOfficeID,res);
    });

    //Distributor
    function LowRankDistributor(DistributorID, res) {
        if (!isNullOrEmpty(DistributorID)) {
            SalesModel.SalesLowRankDistributor(DistributorID, function (response) {
                if (response != undefined) {
                    res.send(response);
                } else {
                    let status = 404;
                    res.status(status).end(http.STATUS_CODES[status]);
                }
            });
        } else {
            let status = 404;
            res.status(status).end(http.STATUS_CODES[status]);
        }
    }    
    app.get('/Api/v1/Sales/LowRankDistributor/DistributorID/:DistributorID', Security.verifyToken, function (req, res) {
        let DistributorID = req.params.DistributorID;
        LowRankDistributor(DistributorID,res);
    });

    app.post('/Api/v1/Sales/LowRankDistributor/', Security.verifyToken, function (req, res) {
        let DistributorID = req.body.DistributorID;
        LowRankDistributor(DistributorID,res);
    });

    //Shop
    function LowRankShop(ShopID, res) {
        if (!isNullOrEmpty(ShopID)) {
            SalesModel.SalesLowRankShop(ShopID, function (response) {
                if (response != undefined) {
                    res.send(response);
                } else {
                    let status = 404;
                    res.status(status).end(http.STATUS_CODES[status]);
                }
            });
        } else {
            let status = 404;
            res.status(status).end(http.STATUS_CODES[status]);
        }
    }    
    app.get('/Api/v1/Sales/LowRankShop/ShopID/:ShopID', Security.verifyToken, function (req, res) {
        let ShopID = req.params.ShopID;
        LowRankShop(ShopID,res);
    });

    app.post('/Api/v1/Sales/LowRankShop/', Security.verifyToken, function (req, res) {
        let ShopID = req.body.ShopID;
        LowRankShop(ShopID,res);
    });
}