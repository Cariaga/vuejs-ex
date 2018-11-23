let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
let CalculateManagementModel = require("./CalculateManagementModel");
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');
let http = require('http');
var async = require("async");
var Security = require('../../SharedController/Security');
module.exports = function (app) {
    // Security.rateLimiterMiddleware,Security.cache.route({ expire: 5  }),
    app.get('/Api/v1/CalculateManage/LowRank/:LowRank/Office/:Office/Limit/:Limit/Offset/:Offset',  function (req, res) {
    let Limit = req.params.Limit;
    let Offset = req.params.Offset;
    let LowRank = req.params.LowRank;
    let Office = req.params.Office;

        if (!isNullOrEmpty(Limit)) {
            if(!isNullOrEmpty(Offset)){
                if(!isNullOrEmpty(LowRank)){
                    if(LowRank >= 1 && LowRank <= 3){
                        if(!isNullOrEmpty(Office)){
                            CalculateManagementModel.LowRank1(Limit, Offset, LowRank, function (response) {
                                if (response != undefined) {
                                    res.send(response);
                                } else {
                                    let status = 404;
                                    res.status(status).end(http.STATUS_CODES[status]);
                                }
                            });
                        }else{ 
                            res.send({InvalidLowRank:true});
                        }
                    }else{ 
                        res.send({InvalidLowRank:true});
                    }
                }else{ 
                    res.send({LowRankMissing:true});
                }
            }else{ 
                res.send({OffsetMissing:true});
            }
        } else { 
            res.send({ LimitMissing: true});
        }
    }); //userprofit search end
}
