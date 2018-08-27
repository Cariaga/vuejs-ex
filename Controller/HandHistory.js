
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