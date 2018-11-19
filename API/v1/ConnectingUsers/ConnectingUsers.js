let ConnectingUsersModel = require('./ConnectingUsersModel');
let DBCheck = require("../../SharedController/DBCheck");
let http = require('http');
var Security = require('../../SharedController/Security');
module.exports = function (app) { 
    app.get('/Api/v1/ConnectingUsers/', Security.rateLimiterMiddleware,Security.cache.route({ expire: 5  }), function (req, res) {
        ConnectingUsersModel.ConnectingUsers(function(response){
            res.send(response);
        });
    });
       
}