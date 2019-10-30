
# Monitoring App
This is a simple application to allow time series data to be ingested and
retrieved to/from a database.

## Environment
The app requires Node 10.16 to be installed and that a mysql data server runs 
on a reachable host
 
### Installation
clone the monitoring app github repositiry ```git@github.com:snapperben/monitoring.git```
into a suitable unix directory

go into that directory and run the following command ```npm install```

### Database
This app requires a schema called ```monitoring``` to be setup.

It also requires that a user is created that can access that database schema.

Use the following command to create a table in the database schema
```
CREATE TABLE `monitoring`.`time_series` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `time_stamp` INT NOT NULL,
  `cpuload` TINYINT NOT NULL,
  `concurrency` INT NOT NULL,
  PRIMARY KEY (`id`));
``` 

### Configuration
The following configuration needs to be enterd in ```config.yaml```

* port - The port that the server will listen on (suggested 3000)
* host - The mysql host machine name (suggested localhost)
* uname - The username of the user that will operate the app
* pass - The password for the above user

In terms of security it is very advisable to give the above user
 the very minimum of privileges to reduce the risk from sql injection

## Operation
The is the guide to operating the app

### Starting
To start the app on theconfigured localhost port (localhost:3000), use ```npm run start``` 
in the app root directory

### ingestion
To ingest data into the database use the following query arguments on ```localhost:3000/ingest```

* timestamp - the date and time of the timestamp (YYYY-MM-DD-HH:II)
* cpuload - The cpu load at the timestamp
* concurrency - The concurrency factor to apply at the timestamp

i.e. ```http://localhost:3000/ingest?timestamp=2012-04-12-14:56&cpuload=92&concurrency=2345```

The above command will insert a single timestamp data point in the database

### retrieval
To retrieve timestamp data from of the database, use the following query commands on ```localhost:3000/retrieve```

* start - The date and time of the timestamp from which data is required (YYYY-MM-DD-HH:II)
* end -The date and time of the timestamp from which data is not required (YYYY-MM-DD-HH:II)

i.e.```http://www.localhost:3000/retrieve?start=2012-04-11-14:56&end=2012-04-14-14:56```
==> 
```
SELECT (time_stamp, cpuload, concurrency) FROM monitoring.time_series WHERE time_stamp >= UNIX_TIMESTAMP(STR_TO_DATE('2012-04-11-14:56', '%Y-%m-%d-%H:%i')) 
AND time_stamp <= UNIX_TIMESTAMP(STR_TO_DATE('2012-04-14-14:56', '%Y-%m-%d-%H:%i'));
```
## Further points
The following points are areas where this implementation is severely lacking

## Security
At the moment the app is naive in that is completely trusts all query data and does not attempt to escape it.

It also allows anyone access to insert or query the data 
## Functionality
It would be useful to have a way of aggregating timestamp data into specific periods

