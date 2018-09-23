var db = require('../models/db');

var sendResp = function(res, status, content){
    res.status(status);
    res.json(content);
    res.end();
};

module.exports.userList = function(req, res) {
    db.get().getConnection(function(err, connection){
        if (err) throw err;
        connection.query('SELECT id, firstName, lastName, photo, studyClass FROM users', function(err, results, fields){
            connection.release();
            if(err) throw err;
            sendResp(res, 200, results);
        });
    });
};
module.exports.usersInfo = function(req, res) {
    db.get().getConnection(function(err, connection){
        if(err) throw err;
        connection.query(
            `SELECT users.id AS user_id, firstName, lastName, tasks.id AS task_id, tasks.name, last_view, rating 
            FROM users 
            LEFT JOIN users_tasks_info ON users_tasks_info.users_id = users.id 
            LEFT JOIN tasks ON tasks.id = users_tasks_info.tasks_id 
            WHERE users.id = ?`,
            [req.params.userid], 
            function(err, results, fields){
                connection.release();
                if (err) {
                    sendResp(res, 400, err);
                } else if (!results){
                    sendResp(res, 404, {message: 'User not found'});
                } else {
                    sendResp(res, 200, results);
                }
            });
    });
};