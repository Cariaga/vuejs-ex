let PaginationModel = require('./PaginationModel');
let http = require('http');
var Security = require('../../SharedController/Security');
module.exports = function (app) { //SELECTION
    app.get('/Api/v1/Pagination/:Page/', Security.globalBruteforce.prevent, function (req, res) {
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
