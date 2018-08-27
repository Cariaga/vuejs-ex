
//--Select Start
app.get('/Api/v1/HandHistory/UserAccountID/:UserAccountID', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    if(!isNullOrEmpty(UserAccountID)){
      HandHistoryUserAccountID(UserAccountID,function(response){
        if(response!=undefined){
          res.send(beautify(response, null, 2, 100));
        }else{
          res.send({HandHistoryFailed:true});
        }
      });
    }
  });
  app.get('/Api/v1/HandHistory/Update/HandHistoryID/:HandHistoryID/UserAccountID/:UserAccountID/MoveHand/:MoveHand/RoundID/:RoundID/', function (req, res) {
    let RoundID =  req.params.RoundID;
    let HandHistoryID = req.params.HandHistoryID;
    let UserAccountID = req.params.UserAccountID;
    let MoveHand =  req.params.UserAccountID;
    
    if(!isNullOrEmpty(RoundID)){
      if(!isNullOrEmpty(HandHistoryID)){
        if(!isNullOrEmpty(UserAccountID)){
          if(!isNullOrEmpty(MoveHand)){
            HandHistoryUpdate(HandHistoryID,UserAccountID,MoveHand,RoundID,function(response){
              if(response!=undefined){
                res.send(response);
              }else{
                res.send({HandHistoryUpdateFailed:true});
              }
            });
          }else{
            res.send({MoveHandMissing:true});
          }
        }else{
          res.send({UserAccountIDMissing:true});
        }
      }else{
        res.send({HandHistoryIDMissing:true});
      }
    }else{
      res.send({RoundIDMissing:true});
    }
    
  });
//--Select End

//--Update Start
//--Update End

// ---------------------------MIGRATED
app.get('/Api/v1/HandHistory/Add/UserAccountID/:UserAccountID/MoveHand/:MoveHand/RoundID/:RoundID/', function (req, res) {
  let UserAccountID = req.params.UserAccountID;
  let MoveHand =  req.params.MoveHand;
  let RoundID =  req.params.RoundID;
  if(!isNullOrEmpty(RoundID)){
    if(!isNullOrEmpty(UserAccountID)){
      
      if(!isNullOrEmpty(MoveHand)){

        if(MoveHand=="Fold"||MoveHand=="Call"||MoveHand=="Raise"||MoveHand=="Check"){
          let UserAccountIDExist = false;
          let PlayerExist = false;
        async.series([UserAccountIDCheck,PlayerCheck],function(error,response){

          if(UserAccountIDExist==true){
            if(PlayerExist==true){
              AddHandHistory(UserAccountID,MoveHand,RoundID,function(response){
                if(response!=undefined){
                  res.send(response);
                }else{
                  res.send({AddHandHistoryFailed:true});
                }
              });
            }else{
              res.send({PlayerExist:false});
            }
          }else{
            res.send({UserAccountIDExist:false});
          }
        });
        
        function UserAccountIDCheck(callback){
          isUserAccountIDExist(UserAccountID,function(response){
            let obj = response;
            if(!isNullOrEmpty(obj)&&obj!=undefined&&obj[0].UserAccountID==UserAccountID){
              UserAccountIDExist = true;
              callback(null,'1');
            }else{
              UserAccountIDExist = false;
              callback(null,'1');
            }
          });
        }
        function PlayerCheck(callback){
          PlayerUserAccountID(UserAccountID,function(response){
            
            if(response!=undefined){
             PlayerExist= true;
             callback(null,'1');
            }else{
             PlayerExist= false;
             callback(null,'1');
            }
          });
        }
        }else{
          res.send({MoveHandInvalidValue:true});
        }
        
        
      }else{
        res.send({MoveHandMissing:true});
      }
    }else{
      res.send({UserAccountIDMissing:true});
    }
  }else{
    res.send({RoundIDMissing:true});
  }
});
function AddHandHistory(UserAccountID,MoveHand,RoundID,callback){
  Models.HandHistory.sync(/*{force:true}*/);
  var item1 = Models.HandHistory.build({
    UserAccountID:UserAccountID,
    MoveHand:MoveHand,
    RoundID:RoundID
  });
  Models.HandHistory.sync();//only use force true if you want to destroy replace table
  item1.save()
  .then(Success => {
    callback("Inserted");
  })
  .catch(error => {
  
    console.log("error inserting " +error);
    callback(undefined);
  });
}