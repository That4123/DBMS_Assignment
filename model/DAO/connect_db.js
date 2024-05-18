
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