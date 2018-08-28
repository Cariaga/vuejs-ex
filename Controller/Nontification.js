
//--Select Start
app.get('/Api/v1/Notification/Add/:NotificationType/:Title/:Description/:Time/:Date', function (req, res) {
    let NotificationType = req.params.NotificationType;
    let Title = req.params.Title;
    let Description = req.params.Description;
    let Time = req.params.Time;
    let Date = req.params.Date;
    //USAGE Api/v1/Notification/Add/NotificationType/Title/Description/01:57:17/2018-06-27
  
    if(!isNullOrEmpty(NotificationType)){
      if(!isNullOrEmpty(Title)){
        if(!isNullOrEmpty(Description)){
          if(!isNullOrEmpty(Time)){
            if(!isNullOrEmpty(Date)){
              AddNotification(NotificationType,Title,Description,Time,Date,function(response) {
                if(response!=undefined){
                 res.send(response);
                }else{
                  res.send({AddNotificationFailed:true});
                }
             });
            }else{
              res.send({DateMissing:true});
            }
          }else{
            res.send({TimeMissing:true});
          }
        }else{
          res.send({DescriptionMissing:true});
        }
      }else{
        res.send({TitleMissing:true});
      }
    }else{
      res.send({NotificationTypeMissing:true});
    }
  });
  app.get('/Api/v1/Notification/Update/NotificationID/:NotificationID/NotificationType/:NotificationType/Title/:Title/Description/:Description/Time/:Time/Date/:Date', function (req, res) {
    let NotificationID = req.params.NotificationID;
    let NotificationType = req.params.NotificationType;
    let Title = req.params.Title;
    let Description = req.params.Description;
    let Time = req.params.Time;
    let Date = req.params.Date;
    if(!isNullOrEmpty(NotificationID)){
      if(!isNullOrEmpty(NotificationType)){
        if(!isNullOrEmpty(Title)){
          if(!isNullOrEmpty(Description)){
            if(!isNullOrEmpty(Time)){
              if(!isNullOrEmpty(Date)){
                let NotificationIDExist= undefined;
                async.series([IsNotificationIDExistCheck],function(error,response){
                  if(NotificationIDExist==true){
                    if(response!=undefined){
                    
                     NotificationUpdate(NotificationID,NotificationType,Title,Description,Time,Date,function(response){
                        res.send(response);
                      });
                    }else{
                      res.send({NotificationUpdateFailed:true});
                    }
                  }else{
                    res.send({NotificationIDExist:false});
                  }
                });
                function IsNotificationIDExistCheck(callback){
                 // console.log("IsNotificationIDExistCheck 1");
                  IsNotificationIDExist(NotificationID,function(response){
                  //  console.log("IsNotificationIDExistCheck 2");
                    if(response!=undefined){
                     // console.log("IsNotificationIDExistCheck 3");
                      if(response[0].NotificationID==NotificationID){
                        NotificationIDExist=true;
                        callback(null,'1');
                      }else{
                        NotificationIDExist=undefined;
                        callback(null,'1');
                      }
                   
                    }else{
                      NotificationIDExist=undefined;
                      callback(null,'1');
                    }
                  });
                }
  
              }else{
                res.send({DateMissing:true});
              }
            }else{
              res.send({TimeMissing:true});
            }
          }else{
            res.send({DescriptionMissing:true});
          }
        }else{
          res.send({TitleMissing:true});
        }
      }else{
        res.send({NotificationTypeMissing:true});
      }
    }else{
      res.send({NotifiactionIDMissing:true});
    }
  });
//--Select End

//--Update Start
//--Update End