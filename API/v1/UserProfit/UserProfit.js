let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
let UserProfitModel = require("./UserProfitModel");
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');
let http = require('http');
var async = require("async");
var Security = require('../../SharedController/Security');
module.exports = function (app) {


    //userprofit search
    // 
    app.get('/Api/v1/UserProfit/Search/UserAccountID/:UserAccountID/StartDate/:StartDate/EndDate/:EndDate', Security.rateLimiterMiddleware,Security.cache.route({ expire: 5  }), function (req, res) {
    let UserAccountID = req.params.UserAccountID;
    let StartDate = req.params.StartDate;
    let EndDate = req.params.EndDate;

        if (!isNullOrEmpty(UserAccountID)) {
            if(!isNullOrEmpty(StartDate)){
                if(!isNullOrEmpty(EndDate)){
                    DBCheck.isUserAccountIDExist(UserAccountID, function (response) {
                        if(response == true){
                            UserProfitModel.UserProfitSearch(UserAccountID, StartDate, EndDate, function (response) {
                                if (response != undefined) {
                                    res.send(response);
                                } else {
                                    res.send({
                                        UserProfitSearchFailed: true
                                    });
                                }
                            });
                        }else{ //isUserAccountIDExist end
                            let status = 404;
                            res.status(status).end(http.STATUS_CODES[status]);
                        }
                    }); //isUserAccountIDExist function end
                }else{ //end date if else end
                    res.send({EndDateMissing:true});
                }
            }else{ //start date if else end
                res.send({StartDateMissing:true});
            }
        } else { //useracccountid if else end
            res.send({ UserAccountIDMissing: true});
        }
    }); //userprofit search end

    app.get('/Api/v1/UserProfit/Limit/:Limit/Offset/:Offset',  Security.rateLimiterMiddleware,Security.cache.route({ expire: 5  }), function (req, res) {
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
}