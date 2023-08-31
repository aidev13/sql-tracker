const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'general_db',
    password: 'root'
  });


module.exports = connection;