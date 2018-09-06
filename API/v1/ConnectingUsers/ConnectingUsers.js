let ConnectingUsersModel = require('./ConnectingUsersModel');
module.exports = function (app) { 
    app.get('/Api/v1/ConnectingUsers/', function (req, res) {
        ConnectingUsersModel.ConnectingUsers(function(response){
            res.send(response);
        });
    });
       
}