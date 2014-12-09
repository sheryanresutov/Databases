'use strict';
(require('rootpath')());

var async = require('async');
var Schedule = require('models/Schedule');
var PayEarned = require('models/PayEarned');
var HourLog = require('models/HourLog');

function submitWorkHour(req, res, next){
  
    function(callback) {
      HourLog.insert(req.user.eid, request.connection.remoteAddress, callback);
    }
  //results[0] is the schedule and results[1] is the payearned object
  function(err, results) {
    err ? next(err) : res.send({
      employee: req.user,
      schedule: results[0],
      payperiod: results[1]
    });
  });

}

function get(req, res, next) {
  async.parallel(
  [
    function(callback) {
      Schedule.selectById(req.user.eid, callback);
    },
    function(callback) {
      PayEarned.selectById(req.user.eid, callback);
    }
  ],
  //results[0] is the schedule and results[1] is the payearned object
  function(err, results) {
    err ? next(err) : res.send({
      employee: req.user,
      schedule: results[0],
      payperiod: results[1]
    });
  });
}


exports.get = get;
exports.submitWorkHour = submitWorkHour;
