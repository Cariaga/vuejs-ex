let logs = []
module.exports.RouteCalled = function RouteCalled(req, res, next) {
     
    let url2 = req.url.slice(req.url.search('v1') + 3, req.url.length);
    console.log('url:' + req.url)
    console.log(req.params)
    console.log(Object.values(req.params).length)
    // get -> url2.slice(0,url2.search('/'))

    // insert first log if log is zero
    if(logs.length == 0){
      logs.push(
        {
          title: GetTitle(), // Sales, Blacklist, etc...
          show : true,
          datetime: GetDateTimeNow(),
          url: GetURL(),
          data : [
            { 
              label: GetDateTimeNow(), 
              data: "Pictures Folder",
              expandedIcon: "fa fa-folder-open",
              collapsedIcon: "fa fa-folder",
              children : 
                GetChildren() //values of limit, offset, etc...
              
            }
          ]
        }
      );

    }else{
      var indexFound = logs.findIndex(CheckIfDuplicate)
      // index not found therefore new title
      if(indexFound < 0){
        logs.push(
          {
            title: GetTitle(), // Sales, Blacklist, etc...
            show : true,
            datetime: GetDateTimeNow(),
            url: GetURL(),
            data : [
              { 
                label: GetDateTimeNow(), 
                data: "Pictures Folder",
                expandedIcon: "fa fa-folder-open",
                collapsedIcon: "fa fa-folder",
                children : 
                  GetChildren() //values of limit, offset, etc...
                
              }
            ]
          }
        );
      }else{//to avoid title duplication, if title is found we get the index then add data to that title
        logs[indexFound].data.push(
          { 
            label: GetDateTimeNow(), 
            data: "Pictures Folder",
            expandedIcon: "fa fa-folder-open",
            collapsedIcon: "fa fa-folder",
            children : GetChildren() //values of limit, offset, etc...
          }
        );
      }
    }


    function CheckIfDuplicate(element) {
      return element.title === GetTitle()
    }

    function GetTitle(){
      return url2.slice(0,url2.search('/'))
    }

    function GetURL(){
      return req.url.toString()
    }

    function GetDateTimeNow(){
      let d = Date.now()
      return new Date(d).toLocaleString('en-GB', { timeZone: 'Asia/Shanghai' })
    }
    function GetChildren(){
      let output = []
      if(Object.keys(req.params).length > 0){
        for(i = 0; i < Object.keys(req.params).length; i++ ){
          output.push({
            label: Object.keys(req.params)[i],
            expandedIcon: "fa fa-folder-open",
            collapsedIcon: "fa fa-folder",
            children : [
              {label: Object.values(req.params)[i], icon: "fa fa-angle-right" }
            ]
          });
        }
        return output
      }else{
        return {label: 'none', icon: "fa fa-angle-right", data: 'none'}
      }
      
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