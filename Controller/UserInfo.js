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
  app.get('/Api/v1/UserInfo/Update/UserAccountID/:UserAccountID/Email/:Email/PhoneNumber/:PhoneNumber/TelephoneNumber/:TelephoneNumber', function (req, res) {
    let UserAccountID = req.params.UserAccountID;
    let Email = req.params.Email;
    let PhoneNumber = req.params.PhoneNumber;
    let TelephoneNumber = req.params.TelephoneNumber;
    if(!isNullOrEmpty(UserAccountID)){
      if(!isNullOrEmpty(Email)){
        if(!isNullOrEmpty(PhoneNumber)){
          if(!isNullOrEmpty(TelephoneNumber)){
            let UserAccountIDExist=false;
            async.series([UserAccountIDCheck],function(error,response){
              if(UserAccountIDExist==true){
                UserInfoUpdate(UserAccountID,Email,PhoneNumber,TelephoneNumber,function(response){
                  if(!isNullOrEmpty(response)&&response!=undefined){
                    res.send(response);
                  }else{
                    res.send({UserInfoUpdateFailed:true});
                    }
                });
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
  
          }else{
            res.send({TelephoneNumberExist:false});
          }
        }else{
          res.send({PhoneNumberExist:false});
        }
      }else{
        res.send({EmailExist:false});
      }
    }else{
      res.send({UserAccountIDExist:false});
    }
  });
  app.get('/Api/v1/UserInfo/', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let Offset =  req.query.Offset;
    let Limit =  req.query.Limit;
    let Sort =  req.query.Sort;
    Models.UserInfo.sync(/*{alter:true}*/);//Never call Alter and force during a sequelize.query alter table without matching the model with the database first if you do records will be nulled alter is only safe when it matches the database
    if(isNullOrEmpty(Offset)&&isNullOrEmpty(Limit)&&isNullOrEmpty(Sort)){
      Models.UserInfo.sync();
      let result = Models.UserInfo.findAll({ 
        where: {
          UserInfoID: {
            ne: null//not null
          }
       }
      }).then(function(result) {
        let Data = result.map(function(item) {
            return item;
        });
       
        res.send(beautify(Data, null, 2, 100));
      }).catch(function(result) {//catching any then errors
  
        res.send("Error "+result);
      });
    }
    if(!isNullOrEmpty(Offset)&&!isNullOrEmpty(Limit)&&!isNullOrEmpty(Sort)){
    }
    if(!isNullOrEmpty(Offset)&&!isNullOrEmpty(Limit)&&isNullOrEmpty(Sort)){
    }
    if(!isNullOrEmpty(Offset)&&isNullOrEmpty(Limit)&&!isNullOrEmpty(Sort)){
    }
    if(isNullOrEmpty(Offset)&&!isNullOrEmpty(Limit)&&!isNullOrEmpty(Sort)){
    }
    if(isNullOrEmpty(Offset)&&isNullOrEmpty(Limit)&&!isNullOrEmpty(Sort)){
    }
    if(!isNullOrEmpty(Offset)&&isNullOrEmpty(Limit)&&isNullOrEmpty(Sort)){
    }
  });