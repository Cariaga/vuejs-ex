let Management = require('../../SharedController/Management');

module.exports = function (app) {//SELECTION

    app.get('/Api/v1/ServerManagement',function (req, res) {//OK
        console.log('called')
        console.log(req.url)
        res.send(Management.GetLogs())
    });
}