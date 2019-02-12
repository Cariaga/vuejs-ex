let logs = []
module.exports.RouteCalled = function RouteCalled(req, res, next) {
     
    let url2 = req.url.slice(req.url.search('v1') + 3, req.url.length);
    if(logs.length == 0){
      logs.push(
        {
          title: url2.slice(0,url2.search('/')), 
          data : [
            {url:req.url.toString(),datetime: Date.now()}
            ]
        }
      );

    }else{
      var indexFound = logs.findIndex(CheckIfDuplicate)
      // index not found therefore new title
      if(indexFound < 0){
        logs.push(
          {
            title: url2.slice(0,url2.search('/')), 
            data : [
              {url:req.url.toString(),datetime: Date.now()}
              ]
          }
        );
      }else{
        logs[indexFound].data.push({url:req.url.toString(),datetime: Date.now()});
      }
    }


    function CheckIfDuplicate(element) {
      return element.title === url2.slice(0,url2.search('/'))
    }

      
    next();
}

module.exports.GetLogs = function GetLogs() {
    return logs
}


// module.exports.verifyToken = function verifyToken(req, res, next) {
//     const bearerHeader = req.headers['authorization'];
//       console.log('TCL: verifyToken -> bearerHeader', bearerHeader)
//     // Check if bearer is undefined
    
//     if (typeof bearerHeader !== 'undefined') {
//       // Split at the space
//       const bearer = bearerHeader.split(' ');
  
//       if (bearer != null && bearer != undefined && bearer[0] != undefined) {
//         // Get token from array
  
  
//         const bearerToken = bearer[1];
//         // Set the token
//         req.token = bearerToken;
       
  
//         jwt.verify(bearerToken, 'secretkey', function (err, decoded) {
//           if (err) {
//             console.log("Error Token A" );
//             res.sendStatus(403);
//           } else {
//             let resultDecoded = jwt.decode(bearerToken, {
//               complete: true
//             });
//            // console.log(resultDecoded.header);
//            // console.log(resultDecoded.payload);
//             var dateNow = new Date();
            
//             if(resultDecoded.expiresIn < dateNow.getTime())// token expired
//             {
//               console.log("Expired");
//               res.sendStatus(401);
//             }else{
//               next();
//             }
//           }
//         });
//       }else{
//         console.log("Error Token split");
//         res.sendStatus(403);
//       }
//       // Next middleware
//     } else {
//       // Forbidden
//       console.log("Error Token undefined");
//       res.sendStatus(403);
//     }
//   }