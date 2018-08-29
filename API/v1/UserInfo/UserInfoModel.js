/**
 *
 *
 * @param {*} UserAccountID
 * @param {*} Email
 * @param {*} PhoneNumber
 * @param {*} TelephoneNumber
 * @param {*} callback
 */
function UserInfoUpdate(UserAccountID,Email,PhoneNumber,TelephoneNumber,callback){
    Models.UserInfo.sync(/*{force:true}*/);
    Models.UserInfo.update({
      Email: Email,
      PhoneNumber: PhoneNumber,
      TelephoneNumber: TelephoneNumber
    },{
      where: {UserAccountID: UserAccountID }
    })
    .then(Success => {
      console.log("Updated");
      callback("Updated");
    })
    .catch(error => {
      // mhhh, wth!
      console.log("Error Updating " +error);
      callback(undefined);
    });
  }
  function UserInfoUserAccountID(UserAccountID,callback){
    Models.UserInfo.sync();
      let result = Models.UserInfo.findAll({ 
        where: {
          UserAccountID:UserAccountID
       }
      }).then(function(result) {
        let Data = result.map(function(item) {
            return item;
        });
        if(Data.length>0){
          callback(Data);
        }else{
          callback(undefined);
        }
      }).catch(function(result) {//catching any then errors
        console.log("Error "+result);
        callback(undefined);
      });
  }
  /**
 *
 *
 * @param {*} UserAccountID
 * @param {*} callback
 */
function UserInfoUserAccountID(UserAccountID,callback){
    Models.UserInfo.sync();
      let result = Models.UserInfo.findAll({ 
        where: {
          UserAccountID:UserAccountID
       }
      }).then(function(result) {
        let Data = result.map(function(item) {
            return item;
        });
        if(Data.length>0){
          callback(Data);
        }else{
          callback(undefined);
        }
      }).catch(function(result) {//catching any then errors
        console.log("Error "+result);
        callback(undefined);
      });
  }

  function UserInfoUpdateEmail(UserAccountID,Email,callback){// Verification With UserAccountID // Forcing Account To be Verified // Via UserAccountID
    Models.UserInfo.sync(/*{alter:true}*/);//Never call Alter and force during a sequelize.query alter table without matching the model with the database first if you do records will be nulled alter is only safe when it matches the database
    Models.UserInfo.update({
      Email: Email
    },
    {
      where: {UserAccountID:UserAccountID}
    })
    .then(Success => {
      callback("Updated");
    })
    
    .catch(error => {
      console.log("Error Updating " +error);
      callback(undefined);
    }); 
  }