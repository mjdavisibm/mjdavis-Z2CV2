var extend = require('extend');
var watson = require('watson-developer-cloud');
var vcapServices = require('vcap_services');
var local_credentials = require('../../env.json');


/*
 * This function when called will log into the isnatnce of Watson you bound to
 * the application in bluemix
 */
exports.token = function(req, res) {
    // get the credentials to log into the watson service
    // Note that when running local the vcap services returns an empty object and
    // thus the local ones in env.json are used
    var credentials = extend(local_credentials.speech_to_text, vcapServices.getCredentials('speech_to_text'));

    var sttAuthService = watson.authorization(credentials);

    sttAuthService.getToken({
        url: credentials.url
    }, function(err, token) {
        if (err) {
            console.log('Error retrieving token: ', err);
            res.status(500).send('Error retrieving token');
            return;
        }
        res.send(token);
    });
};
