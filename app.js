var express = require('express');
var http = require('http');
var path = require('path');
var fs = require('fs');
var mime = require('mime');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cfenv = require('cfenv');
var vcapServices = require('vcap_services');
var jQuery = require('jquery');

// get the app environment from Cloud Foundry (Bluemix)
var appEnv = cfenv.getAppEnv();

// create a new express server
var app = express();

// prepare server for bootstrap and jQuery use
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap

// set up watson speech service
app.use('/js', express.static(__dirname + '/node_modules/watson-speech/')); // redirect CSS bootstrap

// set some defaults values for express
app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.set('appName', appEnv.name);
// disable the following line in Bluemix. App will start on port 6003 in Bluemix
//app.set('port', process.env.PORT || 6003);
// enable the following line in Bluemix
app.set('port', appEnv.port);
app.set('views', path.join(__dirname + '/HTML'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(bodyParser.json());

//
// Important stuff starts here
//

/* This tells express to set all device cenrtric code,
 * i.e. the code that goes to the browsers
 * to be in a particular folder. In this case it is in
 * ./HTML
 *
 * As we do not explicitly state what file should be returned
 * when  localhost:<port> is entered into a browser express
 * assumes index.html
 */
app.use(express.static(__dirname + '/HTML'));

// Define your own router file in controller folder, export the router, add it into the index.js.
app.use('/', require("./controller/restapi/router"));

app.listen(app.get('port'),
    function(req, res) {
        console.log(app.get('appName') + ' is listening on port: ' + app.get('port'));
    });
