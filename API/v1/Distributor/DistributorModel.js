let DBConnect = require("../../SharedController/DBConnect");
/**
 *
 *
 * @param {*} UserAccountID
 * @param {*} HeadOfficeID
 * @param {*} Name
 * @param {*} callback
 */
module.exports.AddDistributor = function AddDistributor(UserAccountID, HeadOfficeID, Name, callback) {
  var item1 = Models.Distributor.build({
    UserAccountID: UserAccountID,
    HeadOfficeID: HeadOfficeID,
    Name: Name
  });
  Models.Distributor.sync({
    alter: true,
    /*force:true*/
  }); //force removes rebuilds the table only for non production 
  item1.save()
    .then(Success => {

      console.log("----AddDistributor Start-----");
      console.log(Success);
      console.log("----AddDistributor End-----");
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
 * @param {*} UserAccountID
 * @param {*} HeadOfficeID
 * @param {*} Name
 * @param {*} callback
 */
module.exports.DistributorUpdate = function DistributorUpdate(UserAccountID, HeadOfficeID, Name, callback) {
  Models.Distributor.update({
      UserAccountID: UserAccountID,
      HeadOfficeID: HeadOfficeID,
      Name: Name
    }, {
      where: {
        DistributorID: DistributorID
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