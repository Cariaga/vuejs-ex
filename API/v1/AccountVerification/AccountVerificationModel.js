  //MODIFY
  app.get('/Api/v1/UserAccount/Update/UserAccountID/:UserAccountID/Verify/:Verify', function (req, res) { 
    let UserAccountIDFound = false;
    let UserAccountID = req.params.UserAccountID;
    let Verify = req.params.Verify;
    async.waterfall([
      myFirstFunction
    ], function (err, result) { //final function
      if (UserAccountIDFound == true) {
        DBCheck.VerifyAccountUserAccountID(UserAccountID, Verify, function (response) {
          if (response != undefined) {
            res.send({});
          } else {
            res.send({
              VerifyAccountUserAccountIDFailed: true
            });
          }
        });
      } else {
        res.send({
          UserAccountIDInvalid: true
        });
      }
      callback(result);
    });

    function myFirstFunction(callback2) {
      console.log('1');
      Models.UserAccount.sync( /*{force:true}*/ ); //makes sure table exist and syncs it
      let result = Models.UserAccount.findAll({
        where: {
          UserName: UserName //not null
            ,
          ValidKey: ValidKey //not null
        }
      }).then(function (result) {
        let Data = result.map(function (item) {
          return item;
        });
        //  console.log('2');
        if (Data.length > 0) {
          UserAccountIDFound = true;
        } else {
          UserAccountIDFound = false;
        }
        callback2(null, Data);
      }).catch(function (result2) {
        console.log("Verify Error : " + result2);
        //  console.log('2');
        callback2(null, result2);
      });
    }
  });