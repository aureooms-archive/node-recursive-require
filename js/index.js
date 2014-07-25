
'use strict';


/**
 * recquire default options
 * 
 * @param name name of global namespace
 * @param index name of index files
 * @param intro name of intro files
 * @param outro name of outro files
 * @param rec whether dirs should have their own namespace
 * @param flat whether files should have their own namespace
 * @param debug flag whether or not debug messages should be printed
 * 
 * 
 */

var dflt = {
	name : undefined,
	index : 'index.js',
	intro : 'intro.js',
	outro : 'outro.js',
	rec : true,
	flat : true,
	debug : false
};


/**
 * recquire template
 * 
 * @param <opt> options
 * 
 */

var recquire_t = function(opt) {

	var fs = require('fs');
	var util = require('util');
	var clc = require('cli-color');
	var extend = require('node.extend');
	var assign = function(object, key, value){ object[key] = value; };

	opt = extend({}, dflt, opt);


	// DEBUG
	var msg_t = function(type, transform){
		// transform = transform || function(s){return s;};
		return function(){
			console.log(
				[
					clc.white(clc.bgBlack(opt.name)),
					clc.green(type),
					transform(util.format.apply(this, arguments))
				].join(' ')
			);
		};
	};
	
	var info = opt.debug ? msg_t('info', clc.blue) : function(){};
	var action = opt.debug ? msg_t('action', clc.magenta) : function(){};

	var recquire = function(dir, exports, level) {
		fs.readdirSync(dir).forEach(function(file) {

			if (file === opt.intro || file === opt.outro) return;

			var path = dir + file;
			if (fs.lstatSync(path).isDirectory()) {
				if (fs.existsSync(path + '/' + opt.index)) {
					if(opt.rec){
						// DEBUG
						info("index file found in '%s'", path);
						action("@ exports['%s'] = require('%s');", file, path);

						assign(exports, file, require(path));
					}
					else{
						// DEBUG
						info("index file found in '%s'", path);
						action("@ extend(true, exports, require('%s'));", path);

						extend(true, exports, require(path));
					}
				}
				else{

					var target = opt.rec ? exports[file] = {} : exports;

					// DEBUG
					info("no index file found in '%s'", path);
					action(
						"@ recquire('%s/', %s, %d);",
						path,
						opt.rec ? util.format("exports['%s'] = {}", file) : 'exports',
						level + 1
					);

					recquire(path + '/', target, level + 1);
				}

			}
			else if (level >= 0 && file.match(/.+\.js$/g) !== null && file !== opt.index) {

				if(opt.flat){

					// DEBUG
					info(".js file '%s'", path);
					action("@ extend(true, exports, require('%s'));", path);

					extend(true, exports, require(path));
				}
				else{
					var name = file.substr(0, file.length - 3);

					// DEBUG
					info(".js file '%s'", path);
					action("@ exports['%s'] = require('%s');", name, path);

					assign(exports, name, require(path));
				}
			}
		});
	};

	return recquire;

};

module.exports = recquire_t;
