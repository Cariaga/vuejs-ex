
//--Select Start
app.get('/Api/v1/Player/ShopID/:ShopID/', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let ShopID = req.params.ShopID;
    if(!isNullOrEmpty(ShopID)){
      ChildPlayersFromShopID(ShopID,function(response){
        if(response!=undefined){
          res.send(beautify(response, null, 2, 100));
        }else{
          res.send([]);
        }
      });
    }else{
      res.send({ShopIDMissing:true});
    }
  });
  
app.get('/Api/v1/Player/Update/UserAccountID/:UserAccountID/AddPoint/:Point', function (req, res) {
  let UserAccountID = req.params.UserAccountID;
  let Point = req.params.Point;
  if(!isNullOrEmpty(UserAccountID)){
    if(!isNullOrEmpty(Point)){
      if(validator.isInt(Point)==true){
        let UserAccountIDExist =false;
        let CurrentPoints = undefined;
        async.series([UserAccountIDCheck,PlayerCurrentPointsCheck],function(error,response){
      
          if(UserAccountIDExist==true){
            let NewPoints = parseInt(CurrentPoints)+parseInt(Point);
            if(!(parseInt(Point)<0)){
              if(parseInt(Point)!=0){
                if(NewPoints>=0){
                  
                    PlayerUpdatePoint(UserAccountID,NewPoints,function(response){
                      if(response!=undefined){
                        res.send(response);
                      }else{
                        res.send({PlayerUpdatePointFailed:true});
                      }
                    });
                }
              }else{
                res.send({NothingToAdd:true});
              }
            }else{
              res.send({IsPointNegativeValue:true});
            }
            
          }else{
            res.send({UserAccountIDExist:false});
          }
         

        });
        function UserAccountIDCheck(callback){
          if(!isNullOrEmpty(UserAccountID)&&UserAccountID!=undefined){
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
          }else{
          
            callback(null,'1');
          }
        }
        function PlayerCurrentPointsCheck(callback){
          if(UserAccountIDExist!=undefined){
            PlayerUserAccountID(UserAccountID,function(response){
              let obj = response;
              if(obj!=undefined&&obj[0].CurrentPoints!=undefined){
                CurrentPoints = obj[0].CurrentPoints;
                callback(null,'1');
              }else{
                CurrentPoints = undefined;
                callback(null,'1');
              }
            });
          }else{
            callback(null,'1');
          }
        }
      }else{
        res.send({PointInvalidValue:true});
      }
    }else{
      res.send({PointEmpty:true});
    }
  }else{
    res.send({UserAccountIDEmpty:true});
  }
});
//--Select End

//--Update Start
//--Update End