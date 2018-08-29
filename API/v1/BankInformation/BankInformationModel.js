/**
 *
 *
 * @param {*} UserAccountID
 * @param {*} BankInformationID
 * @param {*} BankName
 * @param {*} SecurityCode
 * @param {*} Expiration
 * @param {*} Time
 * @param {*} Date
 * @param {*} callback
 */
function BankInformationUpdate(UserAccountID, BankInformationID, BankName, SecurityCode, Expiration, Time, Date, callback) {
  Models.BankInformation.update({
      UserAccountID: UserAccountID,
      BankName: BankName,
      SecurityCode: SecurityCode,
      Expiration: Expiration,
      Time: Time,
      Date: Date
    }, {
      where: {
        BankInformationID: BankInformationID
      }
    })
    .then(Success => {
      callback("Updated");
    })
    .catch(error => {
      console.log("Error Updating " + error);
      callback(undefined);
    });
}
/**
 *
 *
 * @param {*} UserAccountID
 * @param {*} BankName
 * @param {*} SecurityCode
 * @param {*} Valid
 * @param {*} Expiration
 * @param {*} Time
 * @param {*} Date
 * @param {*} callback
 */
// --------------------------------------- MIGRATED
function BankInformationAdd(UserAccountID, BankName, SecurityCode, Valid, Expiration, Time, Date, callback) {
  var item1 = Models.BankInformation.build({
    UserAccountID: UserAccountID,
    BankName: BankName,
    SecurityCode: SecurityCode,
    Valid: Valid,
    Expiration: Expiration,
    Time: Time,
    Date: Date
  });
  Models.BankInformation.sync({
    alter: true /*,force:true*/
  }); //force recreates deletes old table
  item1.save().then(Success => {
      callback("Inserted");
    })
    .catch(error => {
      console.log("error inserting " + error);
      callback(undefined);
    });
}