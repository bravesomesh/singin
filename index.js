/**
 * Author Somesh Vyas
 */

var express = require('express'),
	app	= express(),
    path = require('path'),
    http = require('http').Server(app),
    user = require('./routes/user.js'),
	config = require('./config'),
	auth = require('./middleware/authenticate');

var bodyParser = require('body-parser')

app.set('port', process.env.PORT || 3000);
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.use(express.static(path.join(__dirname, 'public')));

// Serve admin panel files
app.get('/', express.static(__dirname+'/public'));

// user's api
app.post('/addUser', user.addUser);
app.post('/login', user.login);

http.listen(app.get('port'), function() {
    console.log("Express server listening on port " + app.get('port'));
});