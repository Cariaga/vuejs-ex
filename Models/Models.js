var express = require('express');
const mysql = require('mysql2');
const Sequelize = require('sequelize');

const  sequelize = new Sequelize('sampledb', 'user', 'user', {
  host:'172.30.166.206',
  port: 3306,
  dialect: 'mysql'
});
//<summary>
//we have Dedicated Headoffice,Distributer,Shop,Player tables because if we used account type we would have a many to many relationship issue and a lot of self joins queries 
//this way now we have a hierarchy Getting its children/subtype will be easier to read from HeadOffice Down to the Player e.g HeadOffice>Distributor>Shop>Player
// the earnings of e.g is computed still computed seperately from the hierarchy

//Important Note : HeadOffice Distributor Shop Player UserAccountID Must Never exist in both instance This is must be validated at application Layer instead
//</summary>



const UserAccount =sequelize.define('UserAccount', {//the main schema
  UserID: {//PK only used in this part
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true 
  },
  UserAccountID:{
    type :Sequelize.STRING,
    allowNull: false,
    unique: true,
  },//primary key to connect keys
  AccessID: Sequelize.STRING,//FK 1 account can have many access control
  UserName:{
    type :Sequelize.STRING,
    allowNull: false,
    unique: true
  },
	Password:{
    type :Sequelize.STRING,
    allowNull: false,
  },
  
  Verify:  Sequelize.BOOLEAN,
  ValidKey: Sequelize.STRING,
  RegisteredDate:Sequelize.DATE,
  RegisteredTime: Sequelize.TIME,
});


const  HeadOffice =sequelize.define('HeadOffice', {
  HeadOfficeID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true // Automatically gets converted to SERIAL for postgres
  },
  UserAccountID:Sequelize.STRING,//UserAccountID Must Be validated at application  Level  against Distributer HeadOffice Shop Player the UserAccountID must never exist in two places
  Name:Sequelize.STRING,
  Description:Sequelize.STRING,
  CurrentPoints:{ type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 }//1 CurrentPoints = Korean Won
});

const  Distributor =sequelize.define('Distributor', {// any number of distributer point to a headoffice but accountID/Shop Both must be unique
  DistributorID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true 
  },
  UserAccountID:Sequelize.STRING,//UserAccountID in Distributor  Must Be validated at application  Level  against Distributer HeadOffice Shop Player the UserAccountID must never exist in two places
  HeadOfficeID:Sequelize.STRING,//FK Multiple DistributerID is referenced to A HeadOfficeID
  Name:Sequelize.STRING,
  CurrentPoints:{ type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 }//1 CurrentPoints = Korean Won
});

const  Shop =sequelize.define('Shop', {// any number of shop point to a distributer but accountID/shopID both must be u unique
  ShopID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true 
  },
  UserAccountID:{
    type: Sequelize.STRING,
    unique: true,
    foreignKey: true,
    references: {
      model: UserAccount,
      key: 'UserAccountID'
    }
  },//UserAccountID in Shop  Must Be validated at application  Level  against Distributer HeadOffice Shop Player the UserAccountID must never exist in two places
  DistributorID:Sequelize.STRING,//FK Multiple ShopsID is referenced to A DistributorID
  Name:Sequelize.STRING,
  Description:Sequelize.STRING,
  CurrentPoints: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 }//1 CurrentPoints = Korean Won
});

Shop.belongsTo(Distributor, {
  foreignKey: 'DistributorID',
  targetKey: 'DistributorID', 
  constraints: true}); 

Shop.belongsTo(UserAccount, {
  foreignKey: 'UserAccountID',
  targetKey: 'UserAccountID', 
  constraints: true}); 

/*UserAccount.associate= function(models){
  UserAccount.hasOne(models.UserInfo,
    {
      foreignKey: 'UserAccountID'
   })
};*/

const Player =sequelize.define('Player', {//any number of player point to a shopID but accountID/PlayersID both unique
  PlayersID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true 
  },
  UserAccountID:{
    type: Sequelize.STRING,
    unique: true,
    foreignKey: true,
    references: {
      model: UserAccount,
      key: 'UserAccountID'
    }
  },//UserAccountID in Player Must Be validated at application  Level  against Distributer HeadOffice Shop Player the UserAccountID must never exist in two places
  ShopID:{
    type: Sequelize.INTEGER,
    unique: true,
    foreignKey: true,
    references: {
      model: Shop,
      key: 'ShopID'
    }
  },//FK Multiple PlayersID is referenced to A ShopsID
  ScreenName:Sequelize.STRING,
	Name:Sequelize.STRING,
	Surname:Sequelize.STRING,
  CurrentRoomName:{ type: Sequelize.STRING, allowNull: true},
  CurrentPoints:{ type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 }//1 CurrentPoints = Korean Won
});

Player.belongsTo(Shop, {
  foreignKey: 'ShopID',
  targetKey: 'ShopID', 
  constraints: true}); 

Player.belongsTo(UserAccount, {
  foreignKey: 'UserAccountID',
  targetKey: 'UserAccountID', 
  constraints: true}); 

//access control needed to restrict not just the account previllages for admin types but if its a player aswell
const AccessControl =sequelize.define('AccessControl', {//A flexible way of access control Account Privileges 
  AccessControlID: {//PK
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true 
  },
  AccessID: {
    type :Sequelize.STRING,
    allowNull: false,
    unique: true
  },//UK Fully Unique
  AccessName: Sequelize.STRING,
  AccessTags: Sequelize.STRING,// comma delimited tags for access
});

const UserInfo =sequelize.define('UserInfo', {
  UserInfoID: {//PK
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true 
  },
  UserAccountID:{
    type: Sequelize.STRING,
    unique: true,
    foreignKey: true,
    references: {
      model: UserAccount,
      key: 'UserAccountID'
    }
  }
  ,
  Email: {
    type :Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  PhoneNumber: Sequelize.STRING,
  TelephoneNumber: Sequelize.STRING
});
//foreignKey for UserInfo.
//belongsTo creates a 1 to many relationship
//to enforce 1 to 1  you need to add the key as well with the unique:true and foreignKey:true and reference{model and key}

UserInfo.belongsTo(UserAccount, {
    foreignKey: 'UserAccountID',
    targetKey: 'UserAccountID', 
    constraints: true}); 



const RoomConfiguration =sequelize.define('RoomConfiguration', {
  RoomConfigurationID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true 
  },
  RoomID: {
    type: Sequelize.STRING,
    unique:true
  },
  SmallBlind:Sequelize.INTEGER,//dosn't change upon creating room only
  BigBlind:Sequelize.INTEGER,//dosn't change upon creating room only
  Speed:Sequelize.INTEGER//dosn't change upon creating room only
});

const GameHistory =sequelize.define('GameHistory', {
  GameHistoryID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true 
  },
  UserAccountID:Sequelize.STRING,//FK Many UserAccount can have many GameHistoryID
  RoundID: Sequelize.STRING,// assigned by the room
	RoomID:{//
    type: Sequelize.STRING,
    foreignKey: true,
    references: {
      model: RoomConfiguration,
      key: 'RoomID'
    },
    targetKey: 'RoomID',
  },// assigned by the room
	Rank: Sequelize.STRING,
	Score: Sequelize.INTEGER,
	Card: Sequelize.STRING,//card sequence
  Time: Sequelize.TIME,
  Date:Sequelize.DATE,
  BeforePoints:  Sequelize.INTEGER,
  AfterPoints: Sequelize.INTEGER//also called current Points
});

GameHistory.belongsTo(RoomConfiguration, {
  options:onDelete='CASCADE',
  foreignKey: 'RoomID',
  targetKey: 'RoomID',
  constraints: true}); 

//invoices
const DepositHistory =sequelize.define('DepositHistory', {
  DepositHistoryID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  UserAccountID:Sequelize.STRING,//FK One Deposit UserAccountID can have many DepositHistory
  Amount:Sequelize.INTEGER,
  BankNameUsed:  Sequelize.STRING,
  SecurityCodeUsed: Sequelize.STRING,
  Status:Sequelize.STRING,//Current Status
  RequestedDATE: Sequelize.DATE,
  ApprovedDATE: Sequelize.DATE,
  ProcessingDATE: Sequelize.DATE,
  RequestedTIME: Sequelize.TIME,
  ApprovedTIME: Sequelize.TIME,
  RejectedTIME: Sequelize.TIME,
  ProcessingTIME: Sequelize.TIME,
});

//invoices
const WithdrawHistory =sequelize.define('WithdrawHistory', {
  WithdrawHistoryID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  UserAccountID:Sequelize.STRING,//FK One WithdrawHistoryID Many UserAccountID
  Amount:Sequelize.INTEGER,
  BankNameUsed:  Sequelize.STRING,
  SecurityCodeUsed: Sequelize.STRING,
  Status:Sequelize.STRING,
  RequestedDATE: Sequelize.DATE,
  ApprovedDATE: Sequelize.DATE,
  RejectedDATE: Sequelize.DATE,
  ProcessingDATE: Sequelize.DATE,
  RequestedTIME: Sequelize.TIME,
  ApprovedTIME: Sequelize.TIME,
  RejectedTIME: Sequelize.TIME,
  ProcessingTIME: Sequelize.TIME,
});

const BankInformation =sequelize.define('BankInformation', {
  BankInformationID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true 
  },
  UserAccountID:{
    type: Sequelize.STRING,
    unique: true,
    foreignKey: true,
    references: {
      model: UserAccount,
      key: 'UserAccountID'
    }
  },//FK One BankInformationID Many UserAccountID
  BankName:  Sequelize.STRING,
  SecurityCode: Sequelize.STRING,
  Valid: Sequelize.STRING,
  Expiration: Sequelize.STRING,
  Time: Sequelize.TIME,//Time Added
  Date:Sequelize.DATE,//Date Added
});

BankInformation.belongsTo(UserAccount, {
  foreignKey: 'UserAccountID',
  targetKey: 'UserAccountID', 
  constraints: true}); 


const  LoginHistory =sequelize.define('LoginHistory', {
  LoginHistoryID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true 
  },
  UserAccountID:{
    type: Sequelize.STRING,
    unique: false,//false because 1 can have many logins
    foreignKey: true,
    references: {
      model: UserAccount,
      key: 'UserAccountID'
    }
  },//FK
  IP:  Sequelize.STRING,
  DeviceName:Sequelize.STRING,
  DeviceRam:Sequelize.STRING,
  DeviceCpu:Sequelize.STRING,
  Time: Sequelize.TIME,
  Date:Sequelize.DATE
});
LoginHistory.belongsTo(UserAccount, {
  foreignKey: 'UserAccountID',
  targetKey: 'UserAccountID', 
  constraints: true}); 

const BlackList =sequelize.define('BlackList', {
  BlackListID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true 
  },
  UserAccountID:Sequelize.STRING,//FK
  Status:Sequelize.STRING,
  Title:  Sequelize.STRING,
  Description:  Sequelize.STRING,
  ReportDate:  Sequelize.DATE,
  ReleaseDate: Sequelize.DATE
});

const SupportTicket =sequelize.define('SupportTicket', {
  SupportTicketID: {//PK Can be used to Connect to A user Chat Room Name 
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  UserAccountID:{
    type: Sequelize.STRING,
    unique: false,//false because 1 can have many Support Ticket
    foreignKey: true,
    references: {
      model: UserAccount,
      key: 'UserAccountID'
    }
  },//FK
  Title: Sequelize.STRING,
  Description: Sequelize.STRING,
  Reason:Sequelize.STRING,
  Time: Sequelize.TIME,
  Date:Sequelize.DATE,
  Status: Sequelize.STRING
});
SupportTicket.belongsTo(UserAccount, {
  foreignKey: 'UserAccountID',
  targetKey: 'UserAccountID', 
  constraints: true}); 
const Notification =sequelize.define('Notification', {
  NotificationID: {//PK
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true 
  },
  NotificationType:  Sequelize.STRING,
  Title: Sequelize.STRING,
  Description:  Sequelize.STRING,
  Time: Sequelize.TIME,
  Date:Sequelize.DATE
});


//model
 var Item = sequelize.define('Item', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true 
    },
    name:Sequelize.STRING,
    description: Sequelize.STRING,
    qty: Sequelize.INTEGER
  });
  module.exports.HeadOffice =HeadOffice;
  module.exports.Distributor =Distributor;
  module.exports.Shop =Shop;
  module.exports.Player =Player;
  module.exports.UserAccount =UserAccount;
  module.exports.AccessControl =AccessControl;
  module.exports.UserInfo =UserInfo;
  module.exports.GameHistory =GameHistory;
  module.exports.RoomConfiguration =RoomConfiguration;
  module.exports.DepositHistory =DepositHistory;
  module.exports.WithdrawHistory =WithdrawHistory;
  module.exports.BankInformation =BankInformation;
  module.exports.LoginHistory =LoginHistory;
  module.exports.BlackList =BlackList;
  module.exports.SupportTicket =SupportTicket;
  module.exports.Notification =Notification;
  module.exports.Item =Item;