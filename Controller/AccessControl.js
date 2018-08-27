
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

//--Select Start
module.exports = function(app) {
    /*app.get('/selectTest', function(req, res) {
      console.log('got the get!');
      res.send("Worked Select");
    });*/
    
    };
  
//--Select End

//--Update Start
module.exports = function(app) {
    app.get('/selectTest', function(req, res) {
      console.log('got the update!');
      res.send("Worked Update");
    });
  };
//--Update End
