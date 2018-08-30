let DBConnect = require("../../SharedController/DBConnect");
/**
 *
 *
 * @param {*} UserAccountID
 * @param {*} DistributorID
 * @param {*} Description
 * @param {*} callback
 */
module.exports = function AddShop(UserAccountID, DistributorID, Description, callback) {
  var item1 = Models.Shop.build({
    UserAccountID: UserAccountID,
    DistributorID: DistributorID,
    Description: Description
  });
  Models.Shop.sync({
    alter: true,
    /*force:true*/
  }); //use force to recreate for non production only
  item1.save()
    .then(Success => {
      console.log("----AddShop Start-----");
      console.log(Success);
      console.log("----AddShop End-----");
      callback("Inserted");
    })
    .catch(error => {
      // mhhh, wth!
      console.log("error inserting " + error);
      callback(undefined);
    });
}