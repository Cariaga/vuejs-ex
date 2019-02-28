
let Remote = "https://tester-holdem-server.4b63.pro-ap-southeast-2.openshiftapps.com";
let localhost = "localhost";

module.exports.getMainAddressByProductionKey = function (callback) {
    if(process.env.NODE_ENV=="production"){
        callback(Remote)
    }else{
        callback(localhost);
    }
}