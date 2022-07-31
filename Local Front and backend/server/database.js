//Import Sqlite3 module
var sqlite3 = require('sqlite3').verbose();
//Assign the database to db variable
var db = new sqlite3.Database('Patient Database.db');
//Export db 
module.exports = db