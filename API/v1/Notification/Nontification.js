let DBConnect = require("../../SharedController/DBConnect");
let DBConnect = require("../../SharedController/DBCheck");
let GlobalFunctions = require("../../SharedController/GlobalFunctions");
var beautify = require("json-beautify");
var isNullOrEmpty = require('is-null-or-empty');
//--Select Start
module.exports = function (app) {//INSERT
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
  //MODIFY
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
    //SELECTION
    app.get('/Api/v1/Notification', function (req, res) {
      res.setHeader('Content-Type', 'application/json');
      let Offset =  req.query.Offset;
      let Limit =  req.query.Limit;
      let Sort =  req.query.Sort;
      if(isNullOrEmpty(Offset)&&isNullOrEmpty(Limit)&&isNullOrEmpty(Sort)){
        Models.Notification.sync();
        let result = Models.Notification.findAll({ 
          where: {
            NotificationID: {
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
     // res.send("Notification "+Offset+" "+ Limit+" "+Sort);
    });
    //STRUCTURE
    app.get('/Api/v1/Notification/Clear', function (req, res){
      Models.Notification.destroy({
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
    app.get('/Api/v1/Notification/Delete', function (req, res){
      Models.Notification.sync({force:true}).then(function(result) {
        res.send("Deleted");
      }).catch(function(result) {//catching any then errors
    
        res.send("Error "+result);
      });
    });
    app.get('/Api/v1/Notification/Describe', function (req, res) {
      res.setHeader('Content-Type', 'application/json');
      Models.Notification.sync(/*{alter:true}*/);//Never call Alter and force during a sequelize.query alter table without matching the model with the database first if you do records will be nulled alter is only safe when it matches the database
      Models.Notification.describe().then(result=>{
        res.send(beautify(result, null, 2, 100));
      });
    });
    
  }
