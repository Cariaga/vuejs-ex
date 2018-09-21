let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
let InGameScoreModel = require("./InGameScoreModel");
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');
let http = require('http');
module.exports = function (app) {
    app.get('/Api/v1/InGameRoom/Update/UserAccountID/:UserAccountID/RoomName/:RoomName/', function (req, res) {
        let UserAccountID = req.params.UserAccountID;
        let RoomName = req.params.RoomName;
        InGameScoreModel.InGameRoomPlayerCurrentRoom(UserAccountID,RoomName, function (response) {
            res.send(response);
        });
    });
}