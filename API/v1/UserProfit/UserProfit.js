let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
let UserProfitModel = require("./UserProfitModel");
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');
let http = require('http');
var async = require("async");
var Security = require('../../SharedController/Security');
var Management = require('../../SharedController/Management');
module.exports = function (app) {


    //userprofit search
    app.get('/Api/v1/UserProfit/Search/ScreenName/:ScreenName/StartDate/:StartDate/EndDate/:EndDate', Management.RouteCalled,Security.rateLimiterMiddleware,Security.cache.route({ expire: 5  }), function (req, res) {
    let ScreenName = req.params.ScreenName;
    let StartDate = req.params.StartDate;
    let EndDate = req.params.EndDate;

        if (!isNullOrEmpty(ScreenName)) {
            if(!isNullOrEmpty(StartDate)){
                if(!isNullOrEmpty(EndDate)){
                    UserProfitModel.UserProfitSearch(ScreenName, StartDate, EndDate, function (response) {
                        if (response != undefined) {
                            res.send(response);
                        } else {
                            let status = 404;
                            res.status(status).end(http.STATUS_CODES[status]);
                        }
                    });
                }else{ //end date if else end
                    res.send({EndDateMissing:true});
                }
            }else{ //start date if else end
                res.send({StartDateMissing:true});
            }
        } else { //useracccountid if else end
            res.send({ ScreenNameMissing: true});
        }
    }); //userprofit search end

    app.get('/Api/v1/UserProfit/Limit/:Limit/Offset/:Offset',  Management.RouteCalled,Security.rateLimiterMiddleware,Security.cache.route({ expire: 5  }), function (req, res) {
    let Limit = req.params.Limit;
    let Offset = req.params.Offset;

        if (!isNullOrEmpty(Limit)) {
            if(!isNullOrEmpty(Offset)){
                UserProfitModel.UserProfit(Limit, Offset, function (response) {
                    if (response != undefined) {
                        res.send(response);
                    } else {
                        let status = 404;
                        res.status(status).end(http.STATUS_CODES[status]);
                    }
                });
            }else{ 
                res.send({OffsetMissing:true});
            }
        } else { 
            res.send({ LimitMissing: true});
        }
    }); //userprofit search end

    /*profit per user filters with limit offset order direction
    the direction is the order type */
    //order by
    app.get('/Api/v1/UserProfit/Limit/:Limit/Offset/:Offset/Order/:Order/Direction/:Direction',  Management.RouteCalled,Security.rateLimiterMiddleware,Security.cache.route({ expire: 5  }), function (req, res) {
    let Limit = req.params.Limit;
    let Offset = req.params.Offset;
    let Order = req.params.Order;
    let Direction = req.params.Direction;

        if (!isNullOrEmpty(Limit)) {
            if(!isNullOrEmpty(Offset)){
                if(!isNullOrEmpty(Order)){
                    if(!isNullOrEmpty(Direction)){
                        UserProfitModel.UserProfit2(Limit, Offset, Order, Direction, function (response) {
                            if (response != undefined) {
                                res.send(response);
                            } else {
                                let status = 404;
                                res.status(status).end(http.STATUS_CODES[status]);
                            }
                        });
                    }else{
                        res.send({OrderMissing:true});
                    }
                }else{
                    res.send({DirectionMissing:true});
                }
            }else{ 
                res.send({OffsetMissing:true});
            }
        } else { 
            res.send({ LimitMissing: true});
        }
    }); //userprofit search end
}