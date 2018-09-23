var mysql = require('mysql');
var async = require('async');

var PRODUCTION_DB = 'tasks',
    TESTING_DB = 'test';

exports.MODE_TEST = 'mode_test';
exports.MODE_PRODUCTION = 'mode_production';

var state = {
    pool: null,
    mode: null
};

exports.connect = function(mode, done){
    state.pool = mysql.createPool({
        host: 'localhost',
        user: 'yarik',
        password: '1q2w',
        database: mode === exports.MODE_PRODUCTION ? PRODUCTION_DB : TESTING_DB,
        // insecureAuth : true,
        port: 3306
    });
    state.mode = mode;
    console.log('Pool created with mode: ' + state.mode);
    done();
};

exports.get = function() {
    return state.pool;
};

exports.fixtures = function(data, done){
    var pool = state.pool;
    
    // console.log('Checking pool with mode: ' + state.mode);
    if(!pool) return done(new Error('Missing database connection'));
    
    // console.log('Pool is ok');
    var names = Object.keys(data.tables);

    async.each(names, function(name, cb){
        // console.log('Started names loop');
        async.each(data.tables[name], function(row, cb){
            // console.log('Started tables loop');
            var keys = Object.keys(row);
            var values = keys.map(function(key){ return "'" + row[key] + "'"; });
            pool.query('INSERT INTO ' + name + ' (' + keys.join(',') + ') VALUES (' + values.join(',') + ')', cb);
        }, cb);
    }, done);
};

exports.drop = function(tables, done){
    var pool = state.pool;
    if(!pool) return done(new Error('Missing database connection'));

    async.each(tables, function(name, cb){
        pool.query('DELETE FROM ' + name, cb);
    }, done);
};
exports.close = function(){
    state.pool.end(function(err){
        if(err){ 
            console.log(err);
        }else{
            console.log('Connections closed successfully.')
        }
    });
}