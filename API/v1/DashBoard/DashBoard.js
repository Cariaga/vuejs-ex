var beautify = require("json-beautify");
var DashBoardModel = require('./DashBoardModel');
var isNullOrEmpty = require('is-null-or-empty');
let DBCheck = require("../../SharedController/DBCheck");
let http = require('http');
var Security = require('../../SharedController/Security');
var Management = require('../../SharedController/Management');
module.exports = function (app) { 


    app.get('/Api/v1/Dashboard/HeadOffice/Betting/Daily/',Management.RouteCalled,/* Management.RouteCalled,Security.rateLimiterMiddleware,*/Security.verifyToken,Security.cache.route({ expire: 10  }), function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        DashBoardModel.HeadOfficeBettingDaily(function (response) {
            res.send(response);
          });
      });
    app.get('/Api/v1/Dashboard/HeadOffice/Betting/Weekly/', Management.RouteCalled,/*Management.RouteCalled,Security.rateLimiterMiddleware,*/Security.verifyToken,Security.cache.route({ expire: 10  }), function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        DashBoardModel.HeadOfficeBettingWeekly(function (response) {
            res.send(response);
        });
    });
    app.get('/Api/v1/Dashboard/HeadOffice/Betting/Monthly/',Management.RouteCalled, /*Management.RouteCalled,Security.rateLimiterMiddleware,*/Security.verifyToken,Security.cache.route({ expire: 10  }), function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        DashBoardModel.HeadOfficeBettingMonthly(function (response) {
            res.send(response);
          });
      });
    app.get('/Api/v1/Dashboard/HeadOffice/Deposit/Daily/', Management.RouteCalled,/*Management.RouteCalled,Security.rateLimiterMiddleware,*/Security.verifyToken,Security.cache.route({ expire: 10  }), function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        DashBoardModel.HeadOfficeDepositDaily(function (response) {
            res.send(response);
          });
      });
    app.get('/Api/v1/Dashboard/HeadOffice/Withdraw/Daily/', Management.RouteCalled,/*Management.RouteCalled,Security.rateLimiterMiddleware,*/Security.verifyToken,Security.cache.route({ expire: 10  }), function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        DashBoardModel.HeadOfficeWithdrawDaily(function (response) {
            res.send(response);
          });
      });

    app.get('/Api/v1/Dashboard/OnlineStatuses/', Management.RouteCalled,/*Management.RouteCalled,Security.rateLimiterMiddleware,*/Security.verifyToken,Security.cache.route({ expire: 10  }), function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        DashBoardModel.UserAccountOnline(function (response) {
            res.send(response);
          });
      });
    /*app.get('/Api/v1/Dashboard/NewUsers/', function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        DashBoardModel.UserAccountRecentRegistered(function (response) {
            res.send(response);
          });
      });*/

    app.get('/Api/v1/Dashboard/TotalRegisteredUser/',Management.RouteCalled, /*Management.RouteCalled,Security.rateLimiterMiddleware,*/Security.verifyToken,Security.cache.route({ expire: 10  }), function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        DashBoardModel.TotalRegisteredUsers(function (response) {
            res.send(response[0]);
          });
      });

    app.get('/Api/v1/Dashboard/TotalRegisteredUsersToday/',Management.RouteCalled,/* Management.RouteCalled,Security.rateLimiterMiddleware,*/Security.verifyToken,Security.cache.route({ expire: 10  }), function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        DashBoardModel.TotalRegisteredUsersToday(function (response) {
            res.send(response[0]);
            });
        });

      app.get('/Api/v1/Dashboard/TotalDepositWithdrawProfit/',Management.RouteCalled, /*Management.RouteCalled,Security.rateLimiterMiddleware,*/Security.verifyToken,Security.cache.route({ expire: 10  }), function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        DashBoardModel.TotalWithdrawDepositProfit(function (response) {
            res.send(response);
          });
      });

      app.get('/Api/v1/Dashboard/TransactionRecent/', Management.RouteCalled,/*Management.RouteCalled,Security.rateLimiterMiddleware,*/Security.verifyToken,Security.cache.route({ expire: 10  }), function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        DashBoardModel.TransactionRecent(function (response) {
            res.send(response);
          });
      });
      
      app.get('/Api/v1/Dashboard/TotalTransactionRecent/',Management.RouteCalled,Security.verifyToken,Security.cache.route({ expire: 10 }), function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        DashBoardModel.TotalTransactionRecent(function (response) {
            res.send(response);
          });
      });
      
}
