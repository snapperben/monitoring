/**

 */
"use strict";
var mysql = require('mysql');

var DBManager = function () {
	this.connection = null;

	this.initiateConnection = function(_host, _uname, _pass) {
		let args = {host: _host, user: _uname, password: _pass}
		this.connection =  mysql.createConnection(args);

		this.connection(function (err) {
			if (err) throw err;
			console.log("Connected!");
		});
	}
	this.insertTimeStamp = function (_timestamp, _cpuLoad, _concurrency){
		let result = false, sqlStr;
		if (this.connection){
			sqlStr = "INSERT INTO time_series (time_stamp, cpuload, concurrency, source) VALUES " +
				" ("+_timestamp+","+_cpuLoad+","+_concurrency+",'SCRIPT')";
			this.connection.query(sqlStr, function(err, result){
				if (err) throw err;
				console.log("1 record inserted");
			})
		}
		return result
	}
}

module.exports = new DBManager()
