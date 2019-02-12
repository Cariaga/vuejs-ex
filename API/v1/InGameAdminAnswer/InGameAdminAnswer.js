let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
let InGameAdminAnswerModel = require("./InGameAdminAnswerModel");
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');
let http = require('http');
var Security = require('../../SharedController/Security');
var Management = require('../../SharedController/Management');
module.exports = function (app) {
    function InGameAdminAnswer(SupportTicketID,Answer,res){
        if (!isNullOrEmpty(SupportTicketID)) {
            if (!isNullOrEmpty(Answer)) {
                InGameAdminAnswerModel.InGameAdminAnswerSupport(SupportTicketID,Answer,function(response){
                    if(response==true){
                        let status = 200;
                        res.status(status).end(http.STATUS_CODES[status]);
                    }else{
                        let status = 404;
                        res.status(status).end(http.STATUS_CODES[status]);
                    }
                });
            }else{
                let status = 404;
                res.status(status).end(http.STATUS_CODES[status]);
            }
        }else{
            let status = 404;
            res.status(status).end(http.STATUS_CODES[status]);
        }
    }
    app.get('/Api/v1/InGameAdminAnswer/SupportTicketID/:SupportTicketID/Answer/:Answer', Management.RouteCalled,Security.rateLimiterMiddleware, Security.verifyToken,Security.cache.route({ expire: 5  }), function (req, res) {
        let SupportTicketID = req.params.SupportTicketID;
        let Answer = req.params.Answer;
        InGameAdminAnswer(SupportTicketID,Answer,res);
    });

    app.post('/Api/v1/InGameAdminAnswer/', Security.verifyToken,Security.cache.route({ expire: 5  }), function (req, res) {
        let SupportTicketID = req.body.SupportTicketID;
        let Answer = req.body.Answer;
        console.log(SupportTicketID);
        InGameAdminAnswer(SupportTicketID,Answer,res);
    });

}