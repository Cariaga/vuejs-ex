//http://localhost:8080/Api/v1/RoomConfiguration/Add/RoomID/RID6/GameType/Holdem/SmallBlind/50/BigBlind/100/Speed/50
let RoomConfigurationModel = require('./API/v1/RoomConfiguration/RoomConfigurationModel');
RoomConfigurationModel.AddRoomConfiguration('RID88', 'Holdem', '11', '22', 'Fast', function (response) {
  console.log("done");
});

let DBCheck = require('./API/SharedController/DBCheck');
DBCheck.IsRoomIDExist('RID88',function(response){
  console.log("Done");
  console.log(response);
});

let NotificationModel = require ('./API/v1/Notification/NotificationModel');
NotificationModel.AddNotification('Notif', 'NotificationSample', 'Nothing', 'Stable', function (response) {
  console.log("done");
});

//http://localhost:8080/Api/v1/HandHistory/Add/UserAccountID/Account1/MoveHand/Call/SeasonID/S2/