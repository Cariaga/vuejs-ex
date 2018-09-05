


var GameLogListModel = require('./GameLogListModel');
var isNullOrEmpty = require('is-null-or-empty');

module.exports = function (app) {
    app.get('/Api/v1/GameLogList/', function (req, res) {
        let Min = req.params.Min;
        let Max = req.params.Max;
        if(!isNullOrEmpty(Min)){
            if(!isNullOrEmpty(Max)){
                GameLogListModel.GameLogList(undefined,undefined,function(response){
                    if(response!=undefined){
                        res.send(response);
                    }else{
                        res.send({});
                    }
                });
            }else{
                res.send({MaxMissing:true});
            }
        }else{
            res.send({MinMissing:true});
        }
    });
    app.get('/Api/v1/GameLogList/Min/:Min/Max/:Max', function (req, res) {
        let Min = req.params.Min;
        let Max = req.params.Max;
        if(!isNullOrEmpty(Min)){
            if(!isNullOrEmpty(Max)){
                GameLogListModel.GameLogList(Min,Max,function(response){
                    if(response!=undefined){
                        res.send(response);
                    }else{
                        res.send({});
                    }
                });
            }else{
                res.send({MaxMissing:true});
            }
        }else{
            res.send({MinMissing:true});
        }

    });
    
}