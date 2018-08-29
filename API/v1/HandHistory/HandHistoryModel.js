function HandHistoryUpdate(HandHistoryID,UserAccountID,MoveHand,RoundID,callback){
    Models.HandHistory.sync();
    Models.HandHistory.update({
      MoveHand: MoveHand,
      RoundID: RoundID
    },{
      where: {HandHistoryID: HandHistoryID,UserAccountID:UserAccountID }
    })
    .then(Success => {
      console.log("Updated");
      callback("Updated");
    })
    .catch(error => {
      // mhhh, wth!
      console.log("Error Updating " +error);
      callback(undefined);
    });
  }
  