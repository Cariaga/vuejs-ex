let ConnectingUsersModel = require('./ConnectingUsersModel');
let DBCheck = require("../../SharedController/DBCheck");
let http = require('http');
var Security = require('../../SharedController/Security');
var Management = require('../../SharedController/Management');
module.exports = function (app) { 
    app.get('/Api/v1/ConnectingUsers/', Management.RouteCalled,Security.rateLimiterMiddleware, Security.verifyToken, Security.cache.route({ expire: 5  }), function (req, res) {
        ConnectingUsersModel.ConnectingUsers(function(response){
            res.send(response);
        });
    });
       
}