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
    //OHO = operating head office
    // Security.rateLimiterMiddleware,Security.cache.route({ expire: 5  }),

    //head office
    app.get('/Api/v1/Sales/HeadOfficeList/ParentID/:ParentID/Limit/:Limit/Offset/:Offset', function (req, res) {
        let ParentID = req.params.ParentID;
        let Limit = req.params.Limit;
        let Offset = req.params.Offset;

            if (!isNullOrEmpty(ParentID)) {
                if(!isNullOrEmpty(Limit)){
                    if(!isNullOrEmpty(Offset)){
                        SalesModel.SalesHeadOffice(ParentID, Limit, Offset, function(response){
                            if (response != undefined) {
                                res.send(response);
                            } else {
                                let status = 404;
                                res.status(status).end(http.STATUS_CODES[status]);
                            }
                        });
                    }else{  
                        res.send({
                            OffsetIsMissing: true
                          });
                    }
                }else{
                    res.send({
                        LimitIsMissing: true
                      });
                }
            } else {
                res.send({
                    IDisMissing: true
                  });
            }
        
    });

    //distributors
    app.get('/Api/v1/Sales/DistributorList/ParentID/:ParentID/Limit/:Limit/Offset/:Offset', function (req, res) {
        let ParentID = req.params.ParentID;
        let Limit = req.params.Limit;
        let Offset = req.params.Offset;

            if (!isNullOrEmpty(ParentID)) {
                if(!isNullOrEmpty(Limit)){
                    if(!isNullOrEmpty(Offset)){
                        SalesModel.SaledDistributor(ParentID, Limit, Offset, function(response){
                            if (response != undefined) {
                                res.send(response);
                            } else {
                                let status = 404;
                                res.status(status).end(http.STATUS_CODES[status]);
                            }
                        });
                    }else{  
                        res.send({
                            OffsetIsMissing: true
                          });
                    }
                }else{
                    res.send({
                        LimitIsMissing: true
                      });
                }
            } else {
                res.send({
                    IDisMissing: true
                  });
            }
        
    });

    //shops
    app.get('/Api/v1/Sales/ShopList/ParentID/:ParentID/Limit/:Limit/Offset/:Offset', function (req, res) {
        let ParentID = req.params.ParentID;
        let Limit = req.params.Limit;
        let Offset = req.params.Offset;

            if (!isNullOrEmpty(ParentID)) {
                if(!isNullOrEmpty(Limit)){
                    if(!isNullOrEmpty(Offset)){
                        SalesModel.SalesShop(ParentID, Limit, Offset, function(response){
                            if (response != undefined) {
                                res.send(response);
                            } else {
                                let status = 404;
                                res.status(status).end(http.STATUS_CODES[status]);
                            }
                        });
                    }else{  
                        res.send({
                            OffsetIsMissing: true
                          });
                    }
                }else{
                    res.send({
                        LimitIsMissing: true
                      });
                }
            } else {
                res.send({
                    IDisMissing: true
                  });
            }
        
    });

    //pagination
    app.get('/Api/v1/Sales/Pagination/Page/:Page', function (req, res) {
        let Page = req.params.Page;

            if (!isNullOrEmpty(Page)) {
                SalesModel.SalesPaginationCount(Page, function(response){
                    if (response != undefined) {
                        res.send(response);
                    } else {
                        let status = 404;
                        res.status(status).end(http.STATUS_CODES[status]);
                    }
                });
            } else {
                res.send({
                    IDisMissing: true
                  });
            }
        
    });



    // SalesModel.SalesLowRank(HeadOfficeID, function (response) {
    //     if (response != undefined) {
    //         res.send(response);
    //     } else {
    //         let status = 404;
    //         res.status(status).end(http.STATUS_CODES[status]);
    //     }
    // });























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
    app.get('/Api/v1/Sales/LowRank/HeadOfficeID/:HeadOfficeID', Security.rateLimiterMiddleware,Security.cache.route({ expire: 5  }), function (req, res) {
        let HeadOfficeID = req.params.HeadOfficeID;
        LowRank(HeadOfficeID,res);
    });

    app.post('/Api/v1/Sales/LowRank/', Security.rateLimiterMiddleware,Security.cache.route({ expire: 5  }), function (req, res) {
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
    app.get('/Api/v1/Sales/LowRankDistributor/DistributorID/:DistributorID', Security.rateLimiterMiddleware,Security.cache.route({ expire: 5  }), function (req, res) {
        let DistributorID = req.params.DistributorID;
        LowRankDistributor(DistributorID,res);
    });

    app.post('/Api/v1/Sales/LowRankDistributor/', Security.rateLimiterMiddleware, function (req, res) {
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
    app.get('/Api/v1/Sales/LowRankShop/ShopID/:ShopID', Security.rateLimiterMiddleware,Security.cache.route({ expire: 5  }), function (req, res) {
        let ShopID = req.params.ShopID;
        LowRankShop(ShopID,res);
    });

    app.post('/Api/v1/Sales/LowRankShop/', Security.rateLimiterMiddleware, function (req, res) {
        let ShopID = req.body.ShopID;
        LowRankShop(ShopID,res);
    });
}