const mysql = require('mysql2');
//DEBUGGING mysql
//if can't connect try to alter ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'
module.exports.DBConnect = function DBConnect(RawQuery,callback){
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'password',
      port: process.env.OPENSHIFT_MYSQL_DB_PORT||3306,
      database: 'sampledb',
      insecureAuth:true
    });
    connection.connect();
    // simple query
    connection.query(RawQuery,
      function (err, results, fields) {
        if(err!=undefined){
           console.log(err); // results contains rows returned by server
        }
        /*if(fields!=undefined){
           console.log(fields);// fields contains extra meta data about results, if available
        }*/
        if(results!=undefined){
          console.log(results);
        }
        
        callback(results);
        
      });
      connection.end();
}