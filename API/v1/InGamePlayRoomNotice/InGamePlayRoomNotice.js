let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
let InGamePlayRoomNoticeModel = require("./InGamePlayRoomNoticeModel");
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');
let http = require('http');
var Security = require('../../SharedController/Security');
module.exports = function (app) {
    app.get('/Api/v1/InGameNoticeRoomNotice/RoomID/:RoomID/',Security.verifyToken, function (req, res) {
        let RoomID=req.params.RoomID;
        InGamePlayRoomNoticeModel.InGamePlayRoomNotice(RoomID,function(response){
            res.send(response);
        });
    });
}