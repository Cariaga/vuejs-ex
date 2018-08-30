module.exports = function AddHandHistory(UserAccountID, MoveHand, RoundID, callback) {
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
/**
 *
 *
 * @param {*} UserAccountID
 * @param {*} Name
 * @param {*} Description
 * @param {*} callback
 */
module.exports = function AddHeadOffice(UserAccountID, Name, Description, callback) {
  var item1 = Models.HeadOffice.build({
    UserAccountID: UserAccountID,
    Name: Name,
    Description: Description
  });
  Models.HeadOffice.sync({
    alter: true,
    /*force:true*/
  }); //force true rebuilds table for non production only
  item1.save()
    .then(Success => {

      console.log("----AddHeadOffice Start-----");
      console.log(Success);
      console.log("----AddHeadOffice End-----");
      callback("Inserted");
    })
    .catch(error => {
      // mhhh, wth!
      console.log("error inserting " + error);
      callback(undefined);
    });
}
/**
 *
 *
 * @param {*} HeadOfficeID
 * @param {*} UserAccountID
 * @param {*} Name
 * @param {*} callback
 */
module.exports = function HeadOfficeUpdate(HeadOfficeID, UserAccountID, Name, callback) {
  Models.HeadOffice.update({
      UserAccountID: UserAccountID,
      Name: Name
    }, {
      where: {
        HeadOfficeID: HeadOfficeID
      }
    })
    .then(Success => {
      callback("Updated");
    })

    .catch(error => {
      // mhhh, wth!
      console.log("Error Updating " + error);
      callback(undefined);
    });
}