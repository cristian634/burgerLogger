var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306, 
    user: "node",
    password: "12345",
    database: "burgersDB"
});

connection.connect((err)=> {
    if (err) {
        console.error("error connecting: " +err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});

module.exports = connection; 