/**

 */
"use strict";
var mysql = require('mysql');

var DBManager = function () {
	this.connection = null;

	this.initiateConnection = function(_host, _uname, _pass) {
		let args = {host: _host, user: _uname, password: _pass}
		this.connection =  mysql.createConnection(args);

		this.connection.connect(function (err) {
			if (err) throw err;
			console.log("Connected!");
		});
	}
	/**
	 * INsert a row in timeseries
	 * @param _timeDate in format YYYY-MM-DD-TT24:MM
	 * @param _cpuLoad a percentage
	 * @param _concurrency a concurrency factor
	 * @return {boolean}
	 */
	this.insertTimeStamp = function (_timeDate, _cpuLoad, _concurrency){
		let result = false, sqlStr;
		if (this.connection){
			sqlStr = "INSERT INTO monitoring.time_series (time_stamp, cpuload, concurrency) VALUES " +
				" (UNIX_TIMESTAMP(STR_TO_DATE('"+_timeDate+"', '%Y-%m-%d-%H:%i')),"
				+_cpuLoad+","+_concurrency+");";
			this.connection.query(sqlStr, function(err, result){
				if (err) throw err;
				console.log("1 record inserted");
			})
		}
		return result
	}

	this.queryTimeSeries = function (_startTimeDate, _endTimeDate){
		return  new Promise(function(resolve, reject) {
			if(this.connection)
			{
				let sqlStr = "SELECT * FROM monitoring.time_series " +
					"WHERE time_stamp >= UNIX_TIMESTAMP(STR_TO_DATE('" + _startTimeDate + "', '%Y-%m-%d-%H:%i'))" +
					" AND time_stamp <= UNIX_TIMESTAMP(STR_TO_DATE('" + _endTimeDate + "', '%Y-%m-%d-%H:%i'));";

				this.connection.query(sqlStr, function (err, result, fields) {
					if (err)
						reject(err);
					else
						resolve(result)
				})
			}
		}.bind(this))
	}
}

module.exports = new DBManager()
