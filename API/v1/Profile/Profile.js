let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
let ProfileModel = require("./ProfileModel");
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');
var uuidv4 = require('uuid/v4');
var http = require('http');
var Security = require('../../SharedController/Security');
module.exports = function (app) {
    app.get('/Api/v1/Profile/UserAccountID/:UserAccountID/', Security.rateLimiterMiddleware,Security.verifyToken,Security.cache.route({ expire: 5  }), function (req, res) {
        let UserAccountID = req.params.UserAccountID;

        DBCheck.isUserAccountIDExist(UserAccountID, function (response) {
            if (response == true) {
                ProfileModel.Profile(UserAccountID, function (response) {
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
        });
    });
    app.get('/Api/v1/Profile/Settings/Update/UserAccountID/:UserAccountID/DeviceUUID/:DeviceUUID/BackDeck/:BackDeck/Avatar/:Avatar/FrontDeck/:FrontDeck/Felt/:Felt/Background/:Background/', /*Security.rateLimiterMiddleware,Security.verifyToken,Security.cache.route({ expire: 5  }),*/ function (req, res) {
        let UserAccountID = req.params.UserAccountID;
        let DeviceUUID = req.params.DeviceUUID;
        let BackDeck = req.params.BackDeck;
        let Avatar = req.params.Avatar;
        let FrontDeck = req.params.FrontDeck;
        let Felt = req.params.Felt;
        let Background = req.params.Background;
        console.log("UserAccountID "+UserAccountID);
        console.log("DeviceUUID "+DeviceUUID);
        console.log("BackDeck "+BackDeck);
        console.log("Avatar "+Avatar);
        console.log("FrontDeck "+FrontDeck);
        console.log("Felt "+Felt);
        console.log("Background "+Background);
        DBCheck.isUserAccountIDExist(UserAccountID, function (response) {
            if (response == true) {
                ProfileModel.isDeviceUUIDExist(UserAccountID,DeviceUUID,function(response){
                    if(response==true){
                        ProfileModel.ProfileSettingsUpdate(UserAccountID,DeviceUUID,BackDeck,Avatar,FrontDeck,Felt,Background, function (response) {
                            if (response != undefined) {
                                res.send(response);
                            } else {
                                let status = 404;
                                res.status(status).end(http.STATUS_CODES[status]);
                            }
                        });
                    }
                });
            } else {
                let status = 404;
                res.status(status).end(http.STATUS_CODES[status]);
            }
        });
    });
    app.get('/Api/v1/Profile/Settings/UserAccountID/:UserAccountID/DeviceUUID/:DeviceUUID/', /*Security.rateLimiterMiddleware,Security.verifyToken,Security.cache.route({ expire: 5  }),*/ function (req, res) {
        let UserAccountID = req.params.UserAccountID;
        let DeviceUUID = req.params.DeviceUUID;
        DBCheck.isUserAccountIDExist(UserAccountID, function (response) {
            if (response == true) {

                ProfileModel.isDeviceUUIDExist(UserAccountID,DeviceUUID,function(response){
                    if(response==true){
                        ProfileModel.ProfileSettings(UserAccountID,DeviceUUID, function (response) {
                            if (response != undefined) {
                                res.send(response);
                            } else {
                                let status = 404;
                                res.status(status).end(http.STATUS_CODES[status]);
                            }
                        });
                    }else{
                        ProfileModel.InsertSettings(UserAccountID,DeviceUUID,function(response){
                            if(response!=undefined){
                                ProfileModel.ProfileSettings(UserAccountID,DeviceUUID, function (response) {
                                    if (response != undefined) {
                                        res.send(response);
                                    } else {
                                        let status = 404;
                                        res.status(status).end(http.STATUS_CODES[status]);
                                    }
                                });
                            }else{
                                let status = 404;
                                res.status(status).end(http.STATUS_CODES[status]);
                            }
                            
                        })
                    }
                });
            } else {
                let status = 404;
                res.status(status).end(http.STATUS_CODES[status]);
            }
        });
    });
}