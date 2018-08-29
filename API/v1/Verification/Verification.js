app.get('/Verify', function (req, res) {
  // Usage /Verify?UserName=UserName&VerifyKey=VerifyKey
  res.setHeader('Content-Type', 'application/json');
  let UserName = req.query.UserName;
  let ValidKey = req.query.VerifyKey;
  if (!isNullOrEmpty(UserName)) {
    if (!isNullOrEmpty(ValidKey)) {
      isUserNameExist(UserName, function (response3) {
        console.log("Verify response : " + response3);
        let obj = response3;
        if (!isNullOrEmpty(obj) && obj != undefined) {
          if (obj[0].UserName == UserName) {

            Verify(UserName, ValidKey, function (response) {
              if (response.Verified == false) {
                VerifyAccount(UserName, ValidKey, function (response2) {

                  let Data = {
                    validUserName: true,
                    validUserKey: true,
                    isAlreadyRegistered: false,
                    isUserNameExist: true,
                    ResponseCode: 1
                  };
                  res.send(beautify(Data, null, 2, 100));
                });
              } else {
                let Data = {
                  validUserName: true,
                  validUserKey: true,
                  isAlreadyRegistered: true,
                  isUserNameExist: true,
                  ResponseCode: 2
                };
                res.send(beautify(Data, null, 2, 100));
              }
            });
          }
        } else {
          let Data = {
            validUserName: true,
            validUserKey: true,
            isAlreadyRegistered: false,
            isUserNameExist: false,
            ResponseCode: 3
          };
          res.send(beautify(Data, null, 2, 100));
        }
      });
    } else {
      let Data = {
        validUserName: true,
        validUserKey: false,
        isAlreadyRegistered: false,
        isUserNameExist: false,
        ResponseCode: 4
      };
      res.send(beautify(Data, null, 2, 100));
    }
  } else {
    let Data = {
      validUserName: false,
      validUserKey: false,
      isAlreadyRegistered: false,
      isUserNameExist: false,
      ResponseCode: 5
    };
    res.send(beautify(Data, null, 2, 100));
  }
});