var HeadOffice =sequelize.define('sampledb', {
    HeadOfficeID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true // Automatically gets converted to SERIAL for postgres
    },
    UserAccountID:Sequelize.STRING,//my account
    Name:Sequelize.STRING,
    Description:Sequelize.STRING,
  });
  var Distributor =sequelize.define('sampledb', {
    DistributorID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true 
    },
    UserAccountID:Sequelize.STRING,//my account
    HeadOfficeID:Sequelize.STRING,//FK Multiple DistributerID is referenced to A HeadOfficeID
    Name:Sequelize.STRING,
  });
  var Shops =sequelize.define('sampledb', {
    ShopsID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true 
    },
    UserAccountID:Sequelize.STRING,//my account
    DistributorID:Sequelize.STRING,//FK Multiple ShopsID is referenced to A DistributorID
    Name:Sequelize.STRING,
      Description:Sequelize.STRING,
  });
  
  var Players =sequelize.define('sampledb', {
    PlayersID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true 
    },
    UserAccountID:Sequelize.STRING,//my account
    DistributorID:Sequelize.STRING,//FK Multiple PlayersID is referenced to A ShopsID
    ScreenName:Sequelize.STRING,
      Name:Sequelize.STRING,
      Surname:Sequelize.STRING,
      CurrentRoomName:Sequelize.STRING,
  });
  var UserAccount =sequelize.define('sampledb', {//the main schema
    UserID: {//PK
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true 
    },
    UserAccountID:Sequelize.STRING,//primary key to connect keys
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
  
  var AccessControl =sequelize.define('sampledb', {//A flexible way of access control Account Privileges 
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
  var UserInfo =sequelize.define('sampledb', {
    UserInfoID: {//PK
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true 
    },
    UserAccountID:Sequelize.STRING,//FK A user account can have multiple Information Type
    Email: {
      type :Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    PhoneNumber: Sequelize.STRING,
    TelephoneNumber: Sequelize.STRING
  });
  
  var GameHistory =sequelize.define('sampledb', {
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
  var DepositHistory =sequelize.define('sampledb', {
    DepositHistoryID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    UserAccountID:Sequelize.STRING,//FK One Deposit UserAccountID can have many DepositHistory
    Amount:Sequelize.NUMBER,
    BankNameUsed:  Sequelize.STRING,
    SecurityCodeUsed: Sequelize.STRING,
    Status:Sequelize.STRING,//Current Status
    RequestedDATE: Sequelize.DATE,
    ApprovedDATE: Sequelize.DATE,
    ProcessingDATE: Sequelize.DATE,
    RequestedTIME: Sequelize.TIME,
    ApprovedTIME: Sequelize.TIME,
    RejectedTIME: Sequelize.TIME,
  });
  var WithdrawHistory =sequelize.define('sampledb', {
    WithdrawHistoryID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    UserAccountID:Sequelize.STRING,//FK One WithdrawHistoryID Many UserAccountID
    Amount:Sequelize.NUMBER,
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
    ProcessingDATE: Sequelize.DATE,
  });
  var BankInformation =sequelize.define('sampledb', {
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
  var  LoginHistory =sequelize.define('sampledb', {
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
  var BlackList =sequelize.define('sampledb', {
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
  var SupportTicket =sequelize.define('sampledb', {
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
  var Notification =sequelize.define('sampledb', {
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