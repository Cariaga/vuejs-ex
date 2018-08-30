module.exports = function HandHistoryUpdate(HandHistoryID, UserAccountID, MoveHand, RoundID, callback) {
  Models.HandHistory.sync();
  Models.HandHistory.update({
      MoveHand: MoveHand,
      RoundID: RoundID
    }, {
      where: {
        HandHistoryID: HandHistoryID,
        UserAccountID: UserAccountID
      }
    })
    .then(Success => {
      console.log("Updated");
      callback("Updated");
    })
    .catch(error => {
      // mhhh, wth!
      console.log("Error Updating " + error);
      callback(undefined);
    });
}
module.exports =function AddHandHistory(UserAccountID, MoveHand, RoundID, callback) {
  Models.HandHistory.sync( /*{force:true}*/ );
  var item1 = Models.HandHistory.build({
    UserAccountID: UserAccountID,
    MoveHand: MoveHand,
    RoundID: RoundID
  });
  Models.HandHistory.sync(); //only use force true if you want to destroy replace table
  item1.save()
    .then(Success => {
      callback("Inserted");
    })
    .catch(error => {

      console.log("error inserting " + error);
      callback(undefined);
    });
}