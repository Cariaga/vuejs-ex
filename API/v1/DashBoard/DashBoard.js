var beautify = require("json-beautify");
var DashBoardModel = require('./DashBoardModel');
var isNullOrEmpty = require('is-null-or-empty');
let http = require('http');
module.exports = function (app) { 


    app.get('/Api/v1/Dashboard/HeadOffice/Betting/Daily/', function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        DashBoardModel.HeadOfficeBettingDaily(function (response) {
            res.send(response);
          });
      });
    app.get('/Api/v1/Dashboard/HeadOffice/Betting/Monthly/', function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        DashBoardModel.HeadOfficeBettingMonthly(function (response) {
            res.send(response);
          });
      });
    app.get('/Api/v1/Dashboard/HeadOffice/Betting/Yearly/', function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        /*DashBoardModel.UserAccountOnline(function (response) {
            res.send(response);
          });*/
      });
    app.get('/Api/v1/Dashboard/HeadOffice/Deposit/Daily/', function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        /*DashBoardModel.UserAccountOnline(function (response) {
            res.send(response);
          });*/
      });
    app.get('/Api/v1/Dashboard/HeadOffice/Withdraw/Daily/', function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        /*DashBoardModel.UserAccountOnline(function (response) {
            res.send(response);
          });*/
      });

    app.get('/Api/v1/Dashboard/OnlineStatuses/', function (req, res) {
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

    app.get('/Api/v1/Dashboard/TotalRegisteredUser/', function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        DashBoardModel.TotalRegisteredUsers(function (response) {
            res.send(response[0]);
          });
      });

    app.get('/Api/v1/Dashboard/TotalRegisteredUsersToday/', function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        DashBoardModel.TotalRegisteredUsersToday(function (response) {
            res.send(response[0]);
            });
        });

      app.get('/Api/v1/Dashboard/TotalDepositWithdrawProfit/', function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        DashBoardModel.TotalWithdrawDepositProfit(function (response) {
            res.send(response);
          });
      });

      app.get('/Api/v1/Dashboard/TransactionRecent/', function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        DashBoardModel.TransactionRecent(function (response) {
            res.send(response);
          });
      });
      app.get('/Api/v1/Dashboard/TotalTransactionRecent/', function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        DashBoardModel.TotalTransactionRecent(function (response) {
            res.send(response);
          });
      });
      
}
