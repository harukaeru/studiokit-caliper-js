var StudioKit = require('../lib');

var id =  "https://example.edu/sensor";
var options = {
	hostname: 'eventstore.example.edu',
	port: '443',
	path: '/events',
	method: 'POST'
};

var token = {
	accessToken: 'test', //response.data['access_token'],
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
caliperService.setSoftwareApplication('https://example.edu/sensor', 'Example');
caliperService.setPerson('https://example.edu/user/1', 'Some', 'Guy');
caliperService.startSession();
caliperService.endSession();
caliperService.sendQueue();
