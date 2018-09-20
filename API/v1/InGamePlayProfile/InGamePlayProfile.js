
let http = require('http');
module.exports = function (app) { 
    app.get('/Api/v1/InGamePlayProfile/UserAccountID/:UserAccountID/SeasonID/:SeasonID/', function (req, res) {
        /*should return the points for that current season of a player*/
        /*their current points for the season will be cleared and moved to their account after the end of a season only on going season for the room is retrivable*/
    });

    app.get('/Api/v1/InGamePlayProfile/Update/Update/UserAccountID/:UserAccountID/SeasonID/:SeasonID/CurrentSeasonPoints/:CurrentSeasonPoints', function (req, res) {
        
    });
}