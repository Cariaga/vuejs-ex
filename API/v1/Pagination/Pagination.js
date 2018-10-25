let PaginationModel = require('./PaginationModel');
let http = require('http');
var Security = require('../../SharedController/Security');
module.exports = function (app) { //SELECTION
    /*app.get('/Api/v1/Pagination/',Security.verifyToken, function (req, res) {
        PaginationModel.PaginationCount(function(response){
            res.send(response);
        });
    });*/
    app.get('/Api/v1/Pagination/', function (req, res) {
        PaginationModel.PaginationCount(function(response){
            res.send(response);
        });
    });
    app.post('/Api/v1/Pagination/',Security.verifyToken, function (req, res) {
        PaginationModel.PaginationCount(function(response){
            res.send(response);
        });
    });
}
