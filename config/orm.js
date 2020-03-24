var connection = require("./connection.js");

function objToSql(ob) {
    var arr = [];

    for (var key in ob) {
        var value = ob[key];

        if (Object.hasOwnProperty.call(ob, key)) {
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            arr.push(key + "=" + value);
        }
    }
    return arr.toString();
};

var orm = {
    selectAll: function (tableInput, cb){
        var queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, function(err, result){
            if (err) {
                throw err;
            }
            cb(result);
        });
    },
    create: function(table, cols, vals, cb){
        var queryString = `INSTER INTO ${table} (${cols.toString()}) VALUES (?,?)`;

        console.log("create: " + queryString);

        connection.query(queryString, vals, function(err, result){
            if(err) throw err;
            
            cb(result);
        });
    },

    update: function(table, colVal, condition, cb){
        var queryString = `UPDATE ${table} SET ${objToSql(colVal)} WHERE ${condition}`;

        console.log("update: " + queryString); 

        connection.query(queryString, function( err, result){
            if (err) throw err;
            cb(result);
        });
    }
};

module.exports = orm; 