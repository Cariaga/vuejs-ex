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
    
    app.get('/Api/v1/CalculateManage/LowRank/:LowRank/Office/:Office/Limit/:Limit/Offset/:Offset', Security.verifyToken,Security.rateLimiterMiddleware,Security.cache.route({ expire: 5  }),  function (req, res) {
    let Limit = req.params.Limit;
    let Offset = req.params.Offset;
    let LowRank = req.params.LowRank;
    let Office = req.params.Office;

        if (!isNullOrEmpty(Limit)) {
            if(!isNullOrEmpty(Offset)){
                if(!isNullOrEmpty(LowRank)){
                    if(LowRank >= 1 && LowRank <= 3){
                        if(!isNullOrEmpty(Office)){
                            CalculateManagementModel.LowRank1(LowRank, Office, Limit, Offset,  function (response) {
                                if (response != undefined) {
                                    res.send(response);
                                } else {
                                    let status = 404;
                                    res.status(status).end(http.STATUS_CODES[status]); }
                            });
                        }else{ 
                            res.send({InvalidLowRank:true}); }
                    }else{ 
                        res.send({InvalidLowRank:true}); }
                }else{ 
                    res.send({LowRankMissing:true}); }
            }else{ 
                res.send({OffsetMissing:true}); }
        } else { 
            res.send({ LimitMissing: true}); }
    });

    app.get('/Api/v1/CalculateManage/Pagination/:Pagination/Office/:Office', Security.verifyToken,Security.rateLimiterMiddleware,Security.cache.route({ expire: 5  }),  function (req, res) {
    let Pagination = req.params.Pagination;
    let Office = req.params.Office;

        if (!isNullOrEmpty(Pagination)) {
            if(!isNullOrEmpty(Office)){
                CalculateManagementModel.Pagination(Pagination, Office, function (response) {
                    if (response != undefined) {
                        res.send(response);
                    } else {
                        let status = 404;
                        res.status(status).end(http.STATUS_CODES[status]); }
                });
            }else{
                res.send({ OfficeMissing: true}); }
        } else { 
            res.send({ PaginationMissing: true}); }
    });

    app.get('/Api/v1/CalculateManage/Search/LowRank/:LowRank/Office/:Office/StartDateTime/:StartDateTime/EndDateTime/:EndDateTime', Security.verifyToken,Security.rateLimiterMiddleware,Security.cache.route({ expire: 5  }),  function (req, res) {
    let LowRank = req.params.LowRank;
    let Office = req.params.Office;
    let StartDateTime = req.params.StartDateTime;
    let EndDateTime = req.params.EndDateTime;

        if (!isNullOrEmpty(LowRank)) {
            if(!isNullOrEmpty(Office)){
                if(!isNullOrEmpty(StartDateTime)){
                    if(!isNullOrEmpty(EndDateTime)){
                        CalculateManagementModel.Search(LowRank, Office, StartDateTime, EndDateTime, function (response) {
                            if (response != undefined) {
                                res.send(response);
                            } else {
                                let status = 404;
                                res.status(status).end(http.STATUS_CODES[status]); }
                        });
                
                    }else{
                    res.send({ EndDateTimeMissing: true}); }
                }else{
                    res.send({ StartDateTimeMissing: true}); }
            }else{
                res.send({ OfficeMissing: true}); }
        } else { 
            res.send({ PaginationMissing: true}); }
    });

}
