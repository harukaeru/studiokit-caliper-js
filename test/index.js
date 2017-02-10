var StudioKit = require('../lib');

var id =  "https://app.example.edu/sensor";
var options = {
	hostname: 'eventstore.example.edu',
	port: '443',
	path: '/events',
	method: 'POST'
};

var token = {
	accessToken: 'THIS_IS_NOT_A_REAL_ACCESS_TOKEN', //response.data['access_token'],
	expires: 'Thu, 09 Feb 2017 06:08:58 GMT' //response.data['.expires']
};

// e.g. fetch(), $http.get()
var getToken = function() {
	return new Promise(function(resolve, reject){
		resolve(token);
	});
};

// e.g. localStorage
var store = {};
var storageService = {
	get: function(key) {
		return store[key];
	},
	set: function(key, value) {
		store[key] = value;
	},
	remove: function(key) {
		delete store[key]
	}
};

var caliperService = new StudioKit.CaliperService(id, options, getToken, storageService);
caliperService.setSoftwareApplication('https://app.example.edu', 'Example App');
caliperService.setPerson('https://example.edu/user/1', 'Some', 'Guy');
caliperService.startSession();
caliperService.endSession();
caliperService.send()
	.catch(function(err) {
		console.error('error', err);
	})
	.then(function(result) {
		console.log('success');
	});
