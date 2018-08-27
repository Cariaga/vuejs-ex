
//--Select Start
//--Select End

//--Update Start
//--Update End


// -----------------------------------migrated
app.get('/Api/v1/HeadOffice/Add/:UserAccountID/:Name/:Description/', function (req, res) {
    //Usage Api/v1/HeadOffice/Add/UserAccountID/Name/Description/
    let UserAccountID = req.params.UserAccountID;
    let Name = req.params.Name;
    let Description = req.params.Description;
    if(!isNullOrEmpty(UserAccountID)){
      if(!isNullOrEmpty(Name)){
        if(!isNullOrEmpty(Description)){
          AddHeadOffice(UserAccountID,Name,Description, function(response) {
            if(response!=undefined){
              res.send(response);
            }else{
              res.send({AddHeadOfficeFailed:true});
            } 
          });
        }else{
          res.send({DescriptionMissing:true})
        }
      }else{
        res.send({NameMissing:true});
      }
    }else{
      res.send({UserAccountIDMissing:true});
    }
  });
  
  /**
   *
   *
   * @param {*} UserAccountID
   * @param {*} Name
   * @param {*} Description
   * @param {*} callback
   */
  
  // -------------------------migrated
  function AddHeadOffice(UserAccountID,Name,Description,callback){
    var item1 = Models.HeadOffice.build({
      UserAccountID:UserAccountID,
      Name:Name,
      Description:Description
    });
    Models.HeadOffice.sync({alter : true,/*force:true*/});//force true rebuilds table for non production only
    item1.save()
    .then(Success => {
    
      console.log("----AddHeadOffice Start-----");
      console.log(Success);
      console.log("----AddHeadOffice End-----");
      callback("Inserted");
    })
    .catch(error => {
      // mhhh, wth!
      console.log("error inserting " +error);
      callback(undefined);
    });
  }