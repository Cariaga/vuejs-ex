let DBConnect = require("../../SharedController/DBConnect");
let DBCheck = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
let InGamePlayRoomNoticeModel = require("./InGamePlayRoomNoticeModel");
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');

module.exports = function (app) {
    app.get('/Api/v1/InGameNoticeRoomNotice/RoomID/:RoomID/', function (req, res) {
        let RoomID=req.params.RoomID;
        InGamePlayRoomNoticeModel.InGamePlayRoomNotice(RoomID,function(response){
            res.send(response);
        });
    });
}