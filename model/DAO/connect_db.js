/*
    ATTENTION: Right now, the database is hard-coded.
    Due to that, I just export the database object.
    When you want to change to a real DB, you should export only the connection variable and no function.
    All APIs to access to the DB should be specified in distict JS files according to the model that each file is representing.
*/
// var mysql = require("mysql2")

// var connect_DB = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "hcmut_spss"
// });

// connect_DB.connect(function(err) {
//     if (err) throw err;
// });

// module.exports = connect_DB;
const Database = require('better-sqlite3')
const DBSOURCE = "spss.db"
const connect_DB = new Database(DBSOURCE, {fileMustExist: true, verbose: console.log})
console.log('Connect to database successfully.')

all = (sql, params, callback) => {
    try {
        const stmt = connect_DB.prepare(sql);
        const result = params ? stmt.all(params) : stmt.all();
        callback(null, result);
    } catch (err) {
        console.error(err);
        callback(err, null);
    }
}

run = (sql, params, callback) => {
    try {
        const stmt = connect_DB.prepare(sql);
        const result = params ? stmt.run(params) : stmt.run();
        callback(null,result);
    } catch (err) {
        console.error(err);
        callback(err, null);
    }
}

get = (sql, params, callback) => {
    try {
        const stmt = connect_DB.prepare(sql);
        const result = params ? stmt.get(params) : stmt.all();
        callback(null, result);
    } catch (err) {
        console.error(err);
        callback(err, null);
    }
}
  
  module.exports = {
    all,
    run,
    get
  }