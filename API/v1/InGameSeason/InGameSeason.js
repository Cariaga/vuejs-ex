var uuidv4 = require('uuid/v4');
var passwordValidator = require('password-validator');
var validator = require('validator'); //email,mobile phone,isIP,isPostalCode,credit card
var async = require("async");
var moment = require('moment');
const Collection = require('linqjs');
let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
var isNullOrEmpty = require('is-null-or-empty');
let InGameSeasonModel = require('./InGameSeasonModel');
let http = require('http');
let UUID = require('uuid');
/*the FinalCard Current Points is the points to the current season only ones someone won it returns to zero */
module.exports = function (app) { //selection
    app.get('/Api/v1/InGameSeason/Request/UserAccountID/:UserAccountID', function (req, res) {
        let UserAccountID = req.params.UserAccountID;
        if (!isNullOrEmpty(UserAccountID)) {
            DBCheck.isUserAccountIDExist(UserAccountID, function (response) {
                if (response == true) {
                    res.send(UUID());
                }
            });
        } else {
            let status = 404;
            res.status(status).end(http.STATUS_CODES[status]);
        }
    });

    app.get('/Api/v1/InGameSeason/Clear/SeasonID/:SeasonID/', function (req, res) {
        let SeasonID = req.params.SeasonID;
        if (!isNullOrEmpty(SeasonID)) {
            InGameSeasonModel.InGameSeasonClear(SeasonID, function (response) {
                if (response != undefined) {
                    res.send({
                        InGameSeasonClear: SeasonID
                    });
                } else {
                    let status = 404;
                    res.status(status).end(http.STATUS_CODES[status]);
                }
            });

        } else {
            let status = 404;
            res.status(status).end(http.STATUS_CODES[status]);
        }
    });
}