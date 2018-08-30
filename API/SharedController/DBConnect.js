const mysql = require('mysql2');
module.exports.DBConnect = function DBConnect(RawQuery,callback){
    const connection = mysql.createConnection({
      host: '172.30.166.206'||'localhost'||'192.168.254.106',
      user: 'new',
      password: 'user',
      port: process.env.OPENSHIFT_MYSQL_DB_PORT||3306,
      database: 'sampledb'
    });
    connection.connect();
    // simple query
    connection.query(RawQuery,
      function (err, results, fields) {
        console.log(err);
        /*console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available*/
        callback(results);
      });
    connection.end();
}