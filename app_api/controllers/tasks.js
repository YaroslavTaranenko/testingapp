var db = require('../models/db');

var sendResp = function(res, status, content){
    res.status(status);
    res.json(content);
    res.end();
};

module.exports.taskList = function(req, res){
    db.get().getConnection(function(err, connection){
        if (err) throw err;
        connection.query('SELECT id, name, code FROM tasks ORDER BY created DESC', function(err, results, fields){
            connection.release();
            if (err) {
                sendResp(res, 400, err);
            } else if (!results){
                sendResp(res, 404, {message: 'Tasks not found.'});
            } else {
                sendResp(res, 200, results);
            }
        });
    });
};

module.exports.lastTasksLists = function(req, res){
    db.get().getConnection(function(err, connection){
        if(err) {
            sendResp(res, 400, {message: "Can't connect to database."});
            return;
        }
        connection.query(
            `SELECT tasks.id as task_id, name, code, last_view, rating FROM users_tasks_info 
            LEFT JOIN tasks ON tasks.id = users_tasks_info.tasks_id
            WHERE users_id = ? 
            ORDER BY last_view DESC 
            LIMIT ?`,
            [req.params.userid, req.params.limit],
            function(err, results, fields){
                connection.release();
                if (err) {
                    sendResp(res, 400, err);
                } else if (!results){
                    sendResp(res, 404, {message: 'User didn\'t pass any tasks yet.'});
                } else {
                    sendResp(res, 200, results);
                }
            }
        );
            

    });
};
module.exports.getTask = function(req, res){
    db.get().getConnection(function(err, connection){
        if(err) {
            sendResp(res, 400, {message: "Can't connect to database."});
            return;
        }
        connection.query(
            ``, 
            function(err, results, fields){
                connection.release();
                if (err) {
                    sendResp(res, 400, err);
                } else if (!results){
                    sendResp(res, 404, {message: "Task not found."});
                } else {
                    sendResp(res, 200, results);
                }
            }
        );
    });
};