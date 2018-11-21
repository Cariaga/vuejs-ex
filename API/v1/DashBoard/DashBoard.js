var beautify = require("json-beautify");
var DashBoardModel = require('./DashBoardModel');
var isNullOrEmpty = require('is-null-or-empty');
let DBCheck = require("../../SharedController/DBCheck");
let http = require('http');
var Security = require('../../SharedController/Security');
module.exports = function (app) { 

// Security.rateLimiterMiddleware,Security.verifyToken,Security.cache.route({ expire: 5  }),
    app.get('/Api/v1/Dashboard/HeadOffice/Betting/Daily/', Security.verifyToken,Security.cache.route({ expire: 5  }), function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        DashBoardModel.HeadOfficeBettingDaily(function (response) {
            res.send(response);
          });
      });
// Security.rateLimiterMiddleware,Security.verifyToken,Security.cache.route({ expire: 5  }),
    app.get('/Api/v1/Dashboard/HeadOffice/Betting/Monthly/', Security.verifyToken,Security.cache.route({ expire: 5  }), function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        DashBoardModel.HeadOfficeBettingMonthly(function (response) {
            res.send(response);
          });
      });
// Security.rateLimiterMiddleware,Security.verifyToken,Security.cache.route({ expire: 5  }),
    app.get('/Api/v1/Dashboard/HeadOffice/Betting/Yearly/', Security.verifyToken,Security.cache.route({ expire: 5  }), function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        DashBoardModel.HeadOfficeBettingYearly(function (response) {
            res.send(response);
          });
      });
// Security.rateLimiterMiddleware,Security.verifyToken,Security.cache.route({ expire: 5  }),
    app.get('/Api/v1/Dashboard/HeadOffice/Deposit/Daily/', Security.verifyToken,Security.cache.route({ expire: 5  }), function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        DashBoardModel.HeadOfficeDepositDaily(function (response) {
            res.send(response);
          });
      });
// Security.rateLimiterMiddleware,Security.verifyToken,Security.cache.route({ expire: 5  }),
    app.get('/Api/v1/Dashboard/HeadOffice/Withdraw/Daily/', Security.verifyToken,Security.cache.route({ expire: 5  }), function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        DashBoardModel.HeadOfficeWithdrawDaily(function (response) {
            res.send(response);
          });
      });
// Security.rateLimiterMiddleware,Security.verifyToken,Security.cache.route({ expire: 5  }),
    app.get('/Api/v1/Dashboard/OnlineStatuses/', Security.verifyToken,Security.cache.route({ expire: 5  }), function (req, res) {
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

    app.get('/Api/v1/Dashboard/TotalRegisteredUser/', /*Security.rateLimiterMiddleware,Security.verifyToken,Security.cache.route({ expire: 5  }),*/ function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        DashBoardModel.TotalRegisteredUsers(function (response) {
            res.send(response[0]);
          });
      });
// Security.rateLimiterMiddleware,Security.verifyToken,Security.cache.route({ expire: 5  }),
    app.get('/Api/v1/Dashboard/TotalRegisteredUsersToday/', Security.verifyToken,Security.cache.route({ expire: 5  }), function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        DashBoardModel.TotalRegisteredUsersToday(function (response) {
            res.send(response[0]);
            });
        });
// Security.rateLimiterMiddleware,Security.verifyToken,Security.cache.route({ expire: 5  }),
      app.get('/Api/v1/Dashboard/TotalDepositWithdrawProfit/', Security.verifyToken,Security.cache.route({ expire: 5  }), function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        DashBoardModel.TotalWithdrawDepositProfit(function (response) {
            res.send(response);
          });
      });
// Security.rateLimiterMiddleware,Security.verifyToken,Security.cache.route({ expire: 5  }),
      app.get('/Api/v1/Dashboard/TransactionRecent/', Security.verifyToken,Security.cache.route({ expire: 5  }), function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        DashBoardModel.TransactionRecent(function (response) {
            res.send(response);
          });
      });
      app.get('/Api/v1/Dashboard/TotalTransactionRecent/', Security.verifyToken,Security.cache.route({ expire: 5  }), function (req, res) {
        res.setHeader('Content-Type',Security.verifyToken,Security.cache.route({ expire: 5  }),  'application/json');
        DashBoardModel.TotalTransactionRecent(function (response) {
            res.send(response);
          });
      });
      
}
