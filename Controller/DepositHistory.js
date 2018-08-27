
//--Select Start
app.get('/Api/v1/DepositHistory/UserAccount/UserAccountID/:UserAccountID/Status/:Status/', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let UserAccountID = req.params.UserAccountID;
    let Status = req.params.Status;
    if(Status=="Approved"||Status=="Processing"||Status=="Rejected"){
      let isUserAccountIDFound=false;
      async.series([IsUserAccountIDExistCheck],function(error,response){
        if(isUserAccountIDFound==true){
          DepositHistoryUserAccountIDStatus(UserAccountID,Status,function(response){
            if(response!=undefined){
              res.send(beautify(response, null, 2, 100));
            }else{
              res.send({});
            }
          });
        }else{
          res.send({UserAccountIDFound:false});
        }
      });
      function IsUserAccountIDExistCheck(callback){
        isUserAccountIDExist(UserAccountID,function(response){
          if(response!=undefined){
            isUserAccountIDFound=true;
            callback(null,'1');
          }else{
            isUserAccountIDFound=false;
            callback(null,'1');
          }
        
        });
        
      }
      
    }else{
      res.send({StatusInvalidValue:true});
    }
  });
//--Select End

//--Update Start
//--Update End