
//--Select Start
app.get('/Api/v1/GameHistory/Update/GameHistoryID/:GameHistoryID/UserAccountID/:UserAccountID/RoundID/:RoundID/SeasonID/:SeasonID/Rank/:Rank/Score/:Score/Card/:Card/Time/:Time/Date/:Date/BeforePoints/:BeforePoints/AfterPoints/:AfterPoints/', function(req,res) {
 
    let GameHistoryID = req.params.GameHistoryID;
    let UserAccountID = req.params.UserAccountID;
    let RoundID = req.params.RoundID;
    let SeasonID = req.params.SeasonID;
    let Rank = req.params.Rank;
    let Score = req.params.Score;
    let Card = req.params.Card;
    let Time = req.params.Time;
    let Date = req.params.Date;
    let BeforePoints = req.params.BeforePoints;
    let AfterPoints = req.params.AfterPoints;
  
    if(!isNullOrEmpty(GameHistoryID)){
      if(!isNullOrEmpty(UserAccountID)){
        if(!isNullOrEmpty(SeasonID)){
          if(!isNullOrEmpty(RoundID)){
            if(!isNullOrEmpty(Rank)){
              if(!isNullOrEmpty(Score)){
                if(!isNullOrEmpty(Card)){
                  if(!isNullOrEmpty(Time)){
                    if(!isNullOrEmpty(Date)){
                      if(!isNullOrEmpty(BeforePoints)){
                        if(!isNullOrEmpty(AfterPoints)){
                          let isUserAccountIDFound = undefined;
                          async.series([IsUserAccountIDExistCheck,IsGameHistoryIDExistCheck],function(error,response){
  
                            //not done
                            if(isUserAccountIDFound==true){
  
                              Models.GameHistory.update({
                                UserAccountID: UserAccountID,
                                RoundID: RoundID,
                                SeasonID: SeasonID,
                                Rank: Rank,
                                Score: Score,
                                Card: Card,
                                Time: Time,
                                Date: Date,
                                BeforePoints: BeforePoints,
                                AfterPoints: AfterPoints
                              },{
                                where: {GameHistoryID: GameHistoryID }
                              })
                              .then(Success => {
                                res.send("Updated");
                              })
                              
                              .catch(error => {
                             
                                console.log("Error Updating");
                                res.send("Error Updating " +error);
                              });
                            //  res.send({Success:true});
                            }else{
                              res.send({Success:false});
                            }
                          });
                          function IsUserAccountIDExistCheck(callback){
                            isUserAccountIDExist(UserAccountID,function(response){
                              if(response!=undefined){
                                isUserAccountIDFound=true;
                                callback(null,'1');
                              }else{
                                isUserAccountIDFound =false;
                                callback(null,'1');
                              }
                             
                            });
                          }
                          function IsGameHistoryIDExistCheck(callback){
                            callback(null,'2');
                          }
                          res.send({success:true});
                        }else{
                          res.send({AfterPointsMissing:true});
                        }
                      }else{
                        res.send({BeforePointsMissing:true});
                      }
                    }else{
                      res.send({DateMissing:true});
                    }
                  }else{
                    res.send({TimeMissing:true});
                  }
                }else{
                  res.send({CardMissing:true});
                }
              }else{
                res.send({ScoreMissing:true});
              }
            }else{
              res.send({RankMissing:true});
            }
          }else{
            res.send({RoundIDMissing:true});
          }
        }else{
          
        }
      }else{
        res.send({UserAccountIDMissing:true});
      }
    }else{
      res.send({GameHistoryIDMissing:true});
    }
  
  /*
    if(!isNullOrEmpty(GameHistoryID)&&
    !isNullOrEmpty(UserAccountID)&&
    !isNullOrEmpty(RoundID)&&
    !isNullOrEmpty(SeasonID)&&
    !isNullOrEmpty(Rank)&&
    !isNullOrEmpty(Score)&&
    !isNullOrEmpty(Card)&&
    !isNullOrEmpty(Time)&&
    !isNullOrEmpty(Date)&&
    !isNullOrEmpty(BeforePoints)&&
    !isNullOrEmpty(AfterPoints)){
      
    }*/
  });
//--Select End

//--Update Start
//--Update End