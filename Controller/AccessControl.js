
//--Select Start
module.exports = function(app) {

app.get('/Api/v1/AccessControl/Update/AccessControlID/:AccessControlID/AccessID/:AccessID/AccessName/:AccessName/AccessTags/:AccessTags', function (req, res) {
  let AccessControlID = req.params.AccessControlID;
  let AccessID = req.params.AccessID;
  let AccessName = req.params.AccessName;
  let AccessTags = req.params.AccessTags;
  if(!isNullOrEmpty(AccessControlID)){
    if(!isNullOrEmpty(AccessID)){
      if(!isNullOrEmpty(AccessName)){
        if(!isNullOrEmpty(AccessTags)){
          AccessControlUpdate(AccessID,AccessName,AccessTags,function(response){
            if(response!=undefined){
              res.send(response);
            }else{
              res.send({AccessControlUpdateFailed:true});
            }
          });
        }else{
          res.send({AccessTagsMissing:true});
        }
      }else{
        res.send({AccessNameMissing:true});
      }
    }else{
      res.send({AccessIDMissing:true});
    }
  }else{
    res.send({AccessControlIDMissing:true});
  }
});
app.get('/Api/v1/AccessControl/Add/AccessID/:AccessID/AccessName/:AccessName/AccessTags/:AccessTags', function (req, res) {
  let AccessID = req.params.AccessID;
  let AccessName = req.params.AccessName;
  let AccessTags = req.params.AccessTags;
    if(!isNullOrEmpty(AccessID)){
      if(!isNullOrEmpty(AccessName)){
        if(!isNullOrEmpty(AccessTags)){
          AddAccessControl(AccessID,AccessName,AccessTags,function(response) {
            if(response!=undefined){
              res.send(response);
            }else{
              res.send({AddAccessControlFailed:true});
            }
          });
        }else{
          res.send({AccessTagsMissing:true});
        }
      }else{
        res.send({AccessNameMissing:true});
      }
    }else{
      res.send({AccessIDMissing:true});
    }
  });
  };
// mmigrated
function AddAccessControl(AccessID,AccessName,AccessTags,callback){
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