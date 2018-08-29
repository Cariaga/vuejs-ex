
module.exports = {
  calc: function(a, b) {
      return  x(a, b);                
  }
}
module.exports.AddAccessControl = function AddAccessControl(AccessID, AccessName, AccessTags, callback) {
  /*var item1 = Models.AccessControl.build({
    AccessID:AccessID,
    AccessName:AccessName,
    AccessTags:AccessTags
  });
  Models.AccessControl.sync({alter : true});//use force only on non producti1on
  /*item1.save()
  .then(Success => {
    console.log("----AddUserAccount Start-----");
    console.log(Success);
    console.log("----AddUserAccount End-----");
    callback("Inserted");
  })
  .catch(error => {
    console.log("error inserting " +error);
    callback(undefined);
  });*/
}



module.exports = function AccessControlUpdate(AccessID, AccessName, AccessTags, callback) {
  /*var item1 = Models.AccessControl.build({
    AccessID:AccessID,
    AccessName:AccessName,
    AccessTags:AccessTags
  });
  Models.AccessControl.sync({alter : true});//use force only on non producti1on
  /*item1.save()
  .then(Success => {
    console.log("----AddUserAccount Start-----");
    console.log(Success);
    console.log("----AddUserAccount End-----");
    callback("Inserted");
  })
  .catch(error => {
    console.log("error inserting " +error);
    callback(undefined);
  });*/
  
}