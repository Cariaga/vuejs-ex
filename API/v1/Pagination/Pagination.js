let PaginationModel = require('./PaginationModel');
let http = require('http');
var Security = require('../../SharedController/Security');
var Management = require('../../SharedController/Management');
module.exports = function (app) { //SELECTION
    app.get('/Api/v1/Pagination/:Page/', Management.RouteCalled,Security.rateLimiterMiddleware,Security.cache.route({ expire: 10  }), function (req, res) {
        let page = req.params.Page;
        PaginationModel.PaginationCount(page, function(response){
            res.send(response);
        });
    });
    
    //without token
    // app.get('/Api/v1/Pagination/:Page', function (req, res) {
    //     let page = req.params.Page;
    //     PaginationModel.PaginationCount(page, function(response){
    //         res.send(response);
    //     });
    // });
    // app.post('/Api/v1/Pagination/PostToken/',Security.verifyToken, function (req, res) {
    //     PaginationModel.PaginationCount(function(response){
    //         res.send(response);
    //     });
    // });

}
