
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
}
module.exports = function(app) {
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

