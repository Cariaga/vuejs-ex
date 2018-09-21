let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
let InGameRoomModel = require("./InGameRoomModel");
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');
let http = require('http');
module.exports = function (app) {
    app.get('/Api/v1/InGameRoom/Update/UserAccountID/:UserAccountID/CurrentRoomName/:CurrentRoomName/', function (req, res) {
        let UserAccountID = req.params.UserAccountID;
        let CurrentRoomName = req.params.CurrentRoomName;
        InGameRoomModel.InGameRoomPlayerCurrentRoom(UserAccountID,CurrentRoomName, function (response) {
            if (response != undefined) {
                let status = 200;
                res.status(status).end(http.STATUS_CODES[status]);
              } else {
                let status = 404;
                res.status(status).end(http.STATUS_CODES[status]);
              }
          
        });
    });
}