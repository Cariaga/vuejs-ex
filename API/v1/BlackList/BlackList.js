
//--Select Start
module.exports = function(app) {
  app.get('/Api/v1/BlackList/Update/BlackListID/:BlackListID/UserAccountID/:UserAccountID/Status/:Status/Title/:Title/Description/:Description/ReportDate/:ReportDate/ReleaseDate/:ReleaseDate/', function (req, res) {
    let BlackListID = req.params.BlackListID;
    let UserAccountID = req.params.UserAccountID;
    let Status = req.params.Status;
    let Title = req.params.Title;
    let Description = req.params.Description;
    let ReportDate = req.params.ReportDate;
    let ReleaseDate = req.params.ReleaseDate;
  
    if(!isNullOrEmpty(BlackListID)){
      if(!isNullOrEmpty(UserAccountID)){
        if(!isNullOrEmpty(Status)){
          if(!isNullOrEmpty(Title)){
            if(!isNullOrEmpty(Description)){
              if(!isNullOrEmpty(ReportDate)){
                if(!isNullOrEmpty(ReleaseDate)){
                  BlackListUpdate(BlackListID,UserAccountID,Status,Title,Description,ReportDate,ReleaseDate,function(response){
                    if(response!=undefined){
                      res.send(response);
                    }else{
                      res.send({BlackListUpdateFailed:true});
                    }
                  });
                }else{
                  res.send({ReleaseDateMissing:true});
                }
              }else{
                res.send({ReportDateMissing:true});
              }
            }else{
              res.send({DescriptionMissing:true});
            }
          }else{
            res.send({TitleMissing:true});
          }
        }else{
          res.send({StatusMissing:true});
        }
      }else{
        res.send({UserAccountIDMissing:true});
      }
    }else{
      res.send({BlackListIDMissing:true});
    }
  });
  app.get('/Api/v1/BlackList/Update/BlackListID/:BlackListID/UserAccountID/:UserAccountID/Status/:Status/', function (req, res) {
      let BlackListID = req.params.BlackListID;
      let UserAccountID = req.params.UserAccountID;
      let Status = req.params.Status;//status to set
      if(!isNullOrEmpty(BlackListID)){
        if(!isNullOrEmpty(UserAccountID)){
            if(!isNullOrEmpty(Status)){
                let AccountStatus = undefined;//status retrived
                let UserAccountIDExist = false;
                let FoundBlackListID= undefined;//used to check if it matches the BlackListID params
                async.series([UserAccountIDCheck,IsAccountBlockedCheck],function(err,response){
                      if(FoundBlackListID == BlackListID){//it must match the id of the given params // for aditional validation besides UserAccountID
                        if(UserAccountIDExist==true){
                          if(Status=="Blocked"||Status=="Released"){
                            if(Status!=AccountStatus){
                              BlackListStatusUpdate(BlackListID,UserAccountID,Status,function(response){
                                console.log("Status Set");
                                if(response!=undefined){
                                  res.send(response);
                                }else{
                                  res.send({BlackListStatusUpdateFailed:true});
                                }
                              });
                            }else{
                              res.send({StatusAlready:AccountStatus});//Account Aleady Set To This status
                            }
                          }else{
                            res.send({InvalidStatusType:true});//Status is Invalid
                          }
                      }else{
                        res.send({UserAccountIDExist:UserAccountIDExist});//Exist in the UserAccount Table
                      }
                    }else{
                      res.send({InvalidBlackListID:true});
                    } 
            });
    
            function UserAccountIDCheck(callback){
              isUserAccountIDExist(UserAccountID,function(response){
                let obj = response;
                if(!isNullOrEmpty(obj)&&obj!=undefined&&obj.length>0&&obj[0].UserAccountID==UserAccountID){
                  UserAccountIDExist = true;
                  callback(null,'1');
                }else{
                  UserAccountIDExist = false;
                  callback(null,'1');
                }
              });
            }
            function IsAccountBlockedCheck(callback){
              isUserAccountBlocked(UserAccountID,function(response){
                let obj = response;
                if(!isNullOrEmpty(obj)&&obj!=undefined&&obj.length>0&&obj[0].UserAccountID==UserAccountID){
                  console.log('IsAccountBlockedCheck');
                  FoundBlackListID =obj[0].BlackListID;//matching Blacklist ID
                  AccountStatus=obj[0].Status;
                  callback(null,'1');
                }else{
                  AccountStatus=undefined;
                  callback(null,'1');
                }
              });
            }
          }else{
            res.send("Missing Status "+Status);
          }
        }else{
          res.send("Missing UserAccountID "+UserAccountID);
        }
      }else{
        res.send("Missing BlackListID "+BlackListID);
      }
    });
    app.get('/Api/v1/BlackList/Update/BlackListID/:BlackListID/UserAccountID/:UserAccountID/Status/:Status/Title/:Title/Description/:Description/ReportDate/:ReportDate/ReleaseDate/:ReleaseDate/', function (req, res) {
      let BlackListID = req.params.BlackListID;
      let UserAccountID = req.params.UserAccountID;
      let Status = req.params.Status;
      let Title = req.params.Title;
      let Description = req.params.Description;
      let ReportDate = req.params.ReportDate;
      let ReleaseDate = req.params.ReleaseDate;
    
      if(!isNullOrEmpty(BlackListID)){
        if(!isNullOrEmpty(UserAccountID)){
          if(!isNullOrEmpty(Status)){
            if(!isNullOrEmpty(Title)){
              if(!isNullOrEmpty(Description)){
                if(!isNullOrEmpty(ReportDate)){
                  if(!isNullOrEmpty(ReleaseDate)){
                    BlackListUpdate(BlackListID,UserAccountID,Status,Title,Description,ReportDate,ReleaseDate,function(response){
                      if(response!=undefined){
                        res.send(response);
                      }else{
                        res.send({BlackListUpdateFailed:true});
                      }
                    });
                  }else{
                    res.send({ReleaseDateMissing:true});
                  }
                }else{
                  res.send({ReportDateMissing:true});
                }
              }else{
                res.send({DescriptionMissing:true});
              }
            }else{
              res.send({TitleMissing:true});
            }
          }else{
            res.send({StatusMissing:true});
          }
        }else{
          res.send({UserAccountIDMissing:true});
        }
      }else{
        res.send({BlackListIDMissing:true});
      }
    });    
}
module.exports = function(app) {
  app.get('/Api/v1/BlackList/Add/UserAccountID/:UserAccountID/Title/:Title/Status/:Status/Description/:Description/ReportDate/:ReportDate/ReleaseDate/:ReleaseDate/', function (req, res) {
    //USAGE /Api/v1/BlackList/Add/UserAccountID/Title/:Status/Description/2018-06-27/2018-06-27
    let UserAccountID = req.params.UserAccountID;
    let Title = req.params.Title;
    let Status = req.params.Status;
    let Description = req.params.Description;
    let ReportDate = req.params.ReportDate;
    let ReleaseDate = req.params.ReleaseDate;
  
    if(!isNullOrEmpty(UserAccountID)){
      if(!isNullOrEmpty(Title)){
        if(!isNullOrEmpty(Status)){
          if(!isNullOrEmpty(Description)){
            if( !isNullOrEmpty(ReportDate)){
              if(!isNullOrEmpty(ReleaseDate)){
                AddBlackList(UserAccountID,Title,Status,Description,ReportDate,ReleaseDate,function(response){
                  if(response!=undefined){
                    res.send(response);
                  }else{
                    res.send({AddBlackListFailed:true});
                  }
                });
              }else{
                res.send({ReleaseDateMissing:true});
              }
            }else{
              res.send({ReportDateMissing:true});
            }
          }else{
            res.send({DescriptionMissing:true});
          }
        }else{
          res.send({StatusMissing:true});
        }
      }else{
        res.send({TitleMissing:true});
      }
    }else{
      res.send({UserAccountIDMissing:true});
    }
  });
}
module.exports = function(app) {
  app.get('/Api/v1/BlackList/', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let Offset =  req.query.Offset;
    let Limit =  req.query.Limit;
    let Sort =  req.query.Sort;
    Models.BlackList.sync(/*{alter:true}*/);//Never call Alter and force during a sequelize.query alter table without matching the model with the database first if you do records will be nulled alter is only safe when it matches the database
    if(isNullOrEmpty(Offset)&&isNullOrEmpty(Limit)&&isNullOrEmpty(Sort)){
  
      BlackListAll(function(response){
        res.send(beautify(response, null, 2, 100));
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
   // res.send("BlackList "+Offset+" "+ Limit+" "+Sort);
  });
}
  
app.get('/Api/v1/BlackList/Clear', function (req, res){
  Models.BlackList.destroy({
    where: {},
    truncate: true
  })
  .then(Success => {
    res.send("Cleared");
  })
  .catch(err=>{
    res.send("Truncate "+err);
  });
});
app.get('/Api/v1/BlackList/Delete', function (req, res){
  Models.BlackList.sync({force:true}).then(function(result) {
    res.send("Deleted");
  }).catch(function(result) {//catching any then errors

    res.send("Error "+result);
  });
});

app.get('/Api/v1/BlackList/Describe', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  Models.BlackList.sync(/*{alter:true}*/);//Never call Alter and force during a sequelize.query alter table without matching the model with the database first if you do records will be nulled alter is only safe when it matches the database
  Models.BlackList.describe().then(result=>{
    res.send(beautify(result, null, 2, 100));
  });
});