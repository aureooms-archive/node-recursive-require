
var testrunner = require('qunit');

testrunner.options.coverage = true;

testrunner.run(
	{
		code : {path :[__dirname, '..', '..', 'js', 'index.js'].join('/'), namespace: 'recquire_t'},
		tests : [__dirname, 'src', 'all.js'].join('/')
	},
	
	function(err, report) {
		console.dir(report);
	}
);