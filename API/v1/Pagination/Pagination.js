let PaginationModel = require('./PaginationModel');
module.exports = function (app) { //SELECTION
    app.get('/Api/v1/Pagination/', function (req, res) {
        PaginationModel.PaginationCount(function(response){
            res.send(response);
        });
    });
}
