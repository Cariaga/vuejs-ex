app.get('/Api/v1/UserInfo/Update/UserAccountID/:UserAccountID/Email/:Email/',function(req,res){
    let UserAccountID = req.params.UserAccountID;
    let Email = req.params.Email;
    let UserAccountIDExist = false;
    if(!isNullOrEmpty(UserAccountID)){
      if(!isNullOrEmpty(Email)){
        async.series([UserAccountCheck],function(error,response){
          if(UserAccountIDExist==true){
            UserInfoUpdateEmail(UserAccountID,Email,function(response){
              if(response!=undefined){
               res.send(response);
              }else{
               res.send({UserAccountIDUpdateEmailFailed:true});
              }
             });
          }else{
            res.send({UserAccountIDExist:false});
          }
        });
        function UserAccountCheck(callback){
          isUserAccountIDExist(UserAccountID,function(response){
            if(response!=undefined){
              UserAccountIDExist= true;
              callback(null,'1');
            }else{
              UserAccountIDExist=false;
              callback(null,'1');
            }
          });
        }
      }else{
        res.send({EmailMissing:true});
      }
    }else{
      res.send({UserAccountIDMissing:true});
    }
  });