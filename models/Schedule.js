'use strict';
var connection = require('config/db');

/**
 * [selectAll description]
 * @param  {Function} callback [description]
 * args: err, array of schedule
 */
function selectAll(callback) {
  connection.query('SELECT * from Schedule', callback);
}


function selectById(eid, callback) {
  connection.query('SELECT * from Schedule where eid=?', [eid], function(err, result) { 
    if (err) {return callback(err); }
    if (!result) { return callback(new Error('No existing user')); }
    callback(null, result);
  });
}

/**
 * [insert description]
 * @param  {object}   hour
 * hour is an array containing fields:
 * day, time, employee id
 * @param  {Function} callback [description]
 * args: err
 */

function insert(day, time, eid, callback){
  connection.query('insert into Schedule (day, time, eid) values (?, ?, ?);', [day, time, eid], function(err, result) { 
    err ? callback(err) : callback(null, result.insertId);
  });
}

//hour is an array of 3 containing day, time, eid in order
function update(day, time, eid, callback) {
  connection.query('UPDATE Schedule SET day = ?, time = ? WHERE eid = ?', [day, time, eid], function(err) {
    err ? callback(err) : callback(null);
  });
}

function deleteSchedule(day,time, eid, callback) {
  connection.query('DELETE FROM Schedule WHERE day = ? AND time = ? AND eid = ?', [day, time, eid], function(err, result) {
    err ? callback(err) : callback(null,result.insertId);
  });
}

exports.selectAll = selectAll;
exports.insert = insert;
exports.update = update;
exports.deleteSchedule = deleteSchedule;
exports.selectById = selectById;