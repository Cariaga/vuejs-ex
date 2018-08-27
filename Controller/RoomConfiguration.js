
//--Select Start
app.get('/Api/v1/RoomConfiguration/Update/SeasonID/:SeasonID/SmallBlind/:SmallBlind/BigBlind/:BigBlind/',function(req,res){
    let SeasonID = req.params.SeasonID;
    let SmallBlind = req.params.SmallBlind;
    let BigBlind = req.params.BigBlind;
    if(!isNullOrEmpty(SeasonID)){
      if(!isNullOrEmpty(SmallBlind)){
        if(!isNullOrEmpty(BigBlind)){
          let IsSeasonIDFound = false;// for the update SeasonID Must Exist
          async.series([IsSeasonIDExistCheck],function(error,response){
            RoomConfigurationSeasonIDUpdateSmallBigBlind(SeasonID,SmallBlind,BigBlind,function(response){
              if(IsSeasonIDFound==true){
                res.send(response);
              }else{
                res.send({});
              }
            });
          });
  
          function IsSeasonIDExistCheck(callback){
            IsSeasonIDExist(SeasonID,function(response){
              if(response!=undefined){
                IsSeasonIDFound=true;
                callback(null,'1');
              }else{
                IsSeasonIDFound =false;
                callback(null,'1');
              }
            }); 
          }
        }else{
          res.send({BigBlindMissing:true});
        }
      }else{
        res.send({SmallBlindMissing:true});
      }
    }else{
      res.send({SeasonIDMissing:true});
    }
  });
  app.get('/Api/v1/RoomConfiguration/', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let Offset =  req.query.Offset;
    let Limit =  req.query.Limit;
    let Sort =  req.query.Sort;
    Models.RoomConfiguration.sync(/*{alter:true}*/);//Never call Alter and force during a sequelize.query alter table without matching the model with the database first if you do records will be nulled alter is only safe when it matches the database
    if(isNullOrEmpty(Offset)&&isNullOrEmpty(Limit)&&isNullOrEmpty(Sort)){
      RoomConfiguration(function(response){
        if(response!=undefined){
          res.send(beautify(response, null, 2, 100));
        }else{
          res.send({});
        }
      });
    }
  });
//--Select End

//--Update Start
//--Update End