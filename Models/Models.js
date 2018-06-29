var express = require('express');
const mysql = require('mysql2');
const Sequelize = require('sequelize');

const  sequelize = new Sequelize('sampledb', 'user', 'user', {
  host:'172.30.166.206',
  port: 3306,
  dialect: 'mysql'
});
//we have Dedicated Headoffice,distributer,shop tables because if we used account type we would have a many to many relationship issue and alot of inner joins queries
const  HeadOffice =sequelize.define('HeadOffice', {
  HeadOfficeID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true // Automatically gets converted to SERIAL for postgres
  },
  UserAccountID:Sequelize.STRING,//my account
  Name:Sequelize.STRING,
  Description:Sequelize.STRING,
});

const  Distributor =sequelize.define('Distributor', {
  DistributorID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true 
  },
  UserAccountID:Sequelize.STRING,//my account
  HeadOfficeID:Sequelize.STRING,//FK Multiple DistributerID is referenced to A HeadOfficeID
  Name:Sequelize.STRING,
});



const  Shop =sequelize.define('Shop', {
  ShopID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true 
  },
  UserAccountID:Sequelize.STRING,//my account
  DistributorID:Sequelize.STRING,//FK Multiple ShopsID is referenced to A DistributorID
  Name:Sequelize.STRING,
	Description:Sequelize.STRING,
});




const Player =sequelize.define('Player', {
  PlayersID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true 
  },
  UserAccountID:Sequelize.STRING,//my account
  ShopsID:Sequelize.STRING,//FK Multiple PlayersID is referenced to A ShopsID
  ScreenName:Sequelize.STRING,
	Name:Sequelize.STRING,
	Surname:Sequelize.STRING,
	CurrentRoomName:Sequelize.STRING,
});



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
  UserName:  {
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

/*UserAccount.associate= function(models){
  UserAccount.hasOne(models.UserInfo,
    {
      foreignKey: 'UserAccountID'
   })
};*/

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
  /*UserAccountID:{
    type: Sequelize.STRING,
    allowNull: false,
    foreignKey: true,
    references: {
      model: UserAccount,
      key: 'UserAccountID'
    }
  }
  ,*/
  Email: {
    type :Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  PhoneNumber: Sequelize.STRING,
  TelephoneNumber: Sequelize.STRING
});
/*
UserInfo.associate= function(models){
   UserInfo.belongsTo(models.UserAccount);
};*/

UserAccount.hasOne(UserInfo, {
  foreignKey: 'UserAccountID',
  constraints: false
});

const GameHistory =sequelize.define('GameHistory', {
  GameHistoryID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true 
  },
  UserAccountID:Sequelize.STRING,//FK Many UserAccount can have many GameHistoryID
  RoundID: Sequelize.STRING,// assigned by the room
	RoomID: Sequelize.STRING,// assigned by the room
	Rank: Sequelize.STRING,
	Score: Sequelize.INTEGER,
	Card: Sequelize.STRING,//card sequence
  Time: Sequelize.TIME,
  Date:Sequelize.DATE,
	BeforePoints:  Sequelize.INTEGER,
  AfterPoints: Sequelize.INTEGER
});

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
  UserAccountID:Sequelize.STRING,//FK One BankInformationID Many UserAccountID
  BankName:  Sequelize.STRING,
  SecurityCode: Sequelize.STRING,
  Valid: Sequelize.STRING,
  Expiration: Sequelize.STRING,
  Time: Sequelize.TIME,//Time Added
  Date:Sequelize.DATE,//Date Added
});



const  LoginHistory =sequelize.define('LoginHistory', {
  LoginHistoryID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true 
  },
  UserAccountID:Sequelize.STRING,//FK
  IP:  Sequelize.STRING,
  DeviceName:Sequelize.STRING,
  DeviceRam:Sequelize.STRING,
  DeviceCpu:Sequelize.STRING,
  Time: Sequelize.TIME,
  Date:Sequelize.DATE
});

const BlackList =sequelize.define('BlackList', {
  BlackListID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true 
  },
  UserAccountID:Sequelize.STRING,//FK
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
  UserAccountID:Sequelize.STRING,//FK
  Title: Sequelize.STRING,
  Description: Sequelize.STRING,
  Reason:Sequelize.STRING,
  Time: Sequelize.TIME,
  Date:Sequelize.DATE,
  Status: Sequelize.STRING
});

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
  module.exports.DepositHistory =DepositHistory;
  module.exports.WithdrawHistory =WithdrawHistory;
  module.exports.BankInformation =BankInformation;
  module.exports.LoginHistory =LoginHistory;
  module.exports.BlackList =BlackList;
  module.exports.SupportTicket =SupportTicket;
  module.exports.Notification =Notification;
  module.exports.Item =Item;