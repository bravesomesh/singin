var mongodb = require('mongodb');
var crypto = require('crypto');
var config = require('../config');
var jwt    = require('jsonwebtoken');


//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;
// Connection URL. This is where your mongodb server is running.
var db;
var url = config.database;

exports.verifyUser = function(request, response, next) {
	var email = request.body.email;
	MongoClient.connect(url, function(err, database) {
		if(err) {
			response.send({"data":"", "error":"Error while connecting","errorCode":1});
		} else {
			db = database;
			db.collection('users', function(err, collection) {
                var cursor = collection.find({'email': email});
                cursor.count(function(err, count){
                    if(count > 0){
                        response.send({"data":"", "error":"email is already present","errorCode":4});
                    } else {
                    	next();
                    }
                });
            });
		}
	});
}

// Register user
exports.addUser = function(request, response) {

    var email = request.body.email;
    var password = request.body.password;
	password = crypto.createHash('md5').update(password).digest("hex");
    var date = new Date();
    MongoClient.connect(url, function(err, database) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            //HURRAY!! We are connected. :)
            // console.log('Connection established to', url);
            db = database;

            db.collection('users', function(err, collection) {
                collection.insert({'email':email, 'password':password, 'insertedAt':date}, function(err, result) {
                    if (err) {
                        response.send({"data":"", "error":"An Error has occured","errorCode":3});
                    } else {
                        var token = jwt.sign({'email': email, 'password': password}, config.secret, {
                                  expiresIn: 345600 // expires in 4 days
                                });
                        response.send({"data":"Registered successfully","error":"","errorCode":0,"token": token});
                    }
                });
            });
        }
    });
}

// Login user
exports.login = function(request, response) {
	var email = request.body.email;
	var password = request.body.password;
	password = crypto.createHash('md5').update(password).digest("hex");

	MongoClient.connect(url, function(err, database) {
		if(err) {
			response.send({"data":"", "error":"Error while connecting","errorCode":1});
		} else {
			db = database;

			db.collection('users', function(err, collection) {
                var cursor = collection.find({'email': email});
                cursor.count(function(err, count){
                    if(count > 0){
                    	var cursor1 = collection.find({'email': email, 'password': password});
                    	cursor1.count(function(err, count1) {
                    		if(count1 > 0) {
                        		var token = jwt.sign({'email': email, 'password': password}, config.secret, {
						          expiresIn: 345600 // expires in 4 days
						        });
                        		response.send({"data":"Login successfully","error":"","errorCode":0,"token": token});
                    		} else {
		                        response.send({"data":"", "error":"password is incorrect","errorCode":3});
                    		}
                    	});
                    } else {
                        response.send({"data":"", "error":"email is not present","errorCode":2});
                    }
                });
			});
		}
	});
}