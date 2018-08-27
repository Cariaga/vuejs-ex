
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
//--Select End

//--Update Start
//--Update End

//---Player ROUTING START -----------------=migrated
app.get('/Api/v1/Player/Add/:UserAccountID/:ShopID/:ScreenName/:Name/:Surname/:CurrentRoomName', function (req, res) {
  //USAGE /Api/v1/Player/Add/528861d4-3e49-4223-9b1a-913d72112112/1/ScreenName/Name/Surname/CurrentRoomName
  let UserAccountID = req.params.UserAccountID;
  let ShopID = req.params.ShopID;
  let ScreenName = req.params.ScreenName;
  let Name = req.params.Name;
  let Surname = req.params.Surname;
  let CurrentRoomName = req.params.CurrentRoomName;

  if(!isNullOrEmpty(UserAccountID)){
    if(!isNullOrEmpty(ShopID)){
      if(!isNullOrEmpty(ScreenName)){
        if(!isNullOrEmpty(Name)){
          if(!isNullOrEmpty(Surname)){
            if(!isNullOrEmpty(CurrentRoomName)){
              AddPlayer(UserAccountID,ShopID,ScreenName,Name,Surname,CurrentRoomName,function(response) {
                if(response!=undefined){
                  res.send(response);
                }else{
                  res.send({AddPlayerFailed:true});
                }
              });
            }else{
              res.send({CurrentRoomNameMissing:true});
            }
          }else{
            res.send({SurnameMissing:true});
          }
        }else{
          res.send({NameMissing:true});
        }
      }else{
        res.send({ScreenNameMissing:true});
      }
    }else{
      res.send({ShopIDMissing:true});
    }
  }else{
    res.send({UserAccountIDMissing:true});
  }
});

/**
 *
 *
 * @param {*} UserAccountID
 * @param {*} ShopID
 * @param {*} ScreenName
 * @param {*} Name
 * @param {*} Surname
 * @param {*} CurrentRoomName
 * @param {*} callback
 */

//  ----------------------------------migrated
function AddPlayer(UserAccountID,ShopID,ScreenName,Name,Surname,CurrentRoomName,callback){
    //res.send('test');
    //Setting up the config
    let item1 = Models.Player.build({
      UserAccountID:UserAccountID,
      ShopID:ShopID,
      ScreenName:ScreenName,
      Name:Name,
      Surname:Surname,
      CurrentRoomName:CurrentRoomName
    });
    Models.Player.sync();//use force to clear/delete old table non production only
    item1.save()
    .then(Success => {
      
      console.log("----AddPlayer Start-----");
      console.log(Success);
      console.log("----AddPlayer End-----");
      callback("Inserted");
    })
    .catch(error => {
      // mhhh, wth!
      console.log("error inserting " +error);
      callback(undefined);
    });
    //res.send("Player "+UserAccountID+" "+ ShopID+" "+ScreenName);
}