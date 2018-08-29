app.get('/Api/v1/Notification/Describe', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    Models.Notification.sync(/*{alter:true}*/);//Never call Alter and force during a sequelize.query alter table without matching the model with the database first if you do records will be nulled alter is only safe when it matches the database
    Models.Notification.describe().then(result=>{
      res.send(beautify(result, null, 2, 100));
    });
  });

  /**
 *
 *
 * @param {*} NotificationID
 * @param {*} NotificationType
 * @param {*} Title
 * @param {*} Description
 * @param {*} Time
 * @param {*} Date
 * @param {*} callback
 */
function NotificationUpdate(NotificationID,NotificationType,Title,Description,Time,Date,callback){
  Models.Notification.update({
    NotificationType: NotificationType,
    Title: Title,
    Description: Description,
    Time: Time,
    Date: Date
  },{
    where: {NotificationID: NotificationID }
  })
  .then(Success => {
    callback("Updated");
  })
  
  .catch(error => {
    console.log("Error Updating " +error);
    callback(undefined);
  }); 
}