/**
 * Recquire template.
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



var recquire_t = function(name, index, intro, outro, rec, flat, debug) {

	var fs = require('fs');
	var util = require('util');
	var clc = require('cli-color');
	var extend = require('node.extend');


	// DEBUG
	var msg_t = function(type, transform){
		// transform = transform || function(s){return s;};
		return function(){
			console.log(
				[
					clc.white(clc.bgBlack(name)),
					clc.green(type),
					transform(util.format.apply(this, arguments))
				].join(' ')
			);
		};
	};
	
	var info = debug ? msg_t('info', clc.blue) : function(){};
	var action = debug ? msg_t('action', clc.magenta) : function(){};

	var recquire = function(dir, exports, level) {
		fs.readdirSync(dir).forEach(function(file) {

			if (file === intro || file === outro) return;

			var path = dir + file;
			if (fs.lstatSync(path).isDirectory()) {
				if (fs.existsSync(path + '/' + index)) {
					if(rec){
						// DEBUG
						info("index file found in '%s'", path);
						action("@ exports['%s'] = require('%s');", file, path);

						exports[file] = require(path);
					}
					else{
						// DEBUG
						info("index file found in '%s'", path);
						action("@ extend(true, exports, require('%s'));", path);

						extend(true, exports, require(path));
					}
				}
				else{

					var target = rec ? exports[file] = {} : exports;

					// DEBUG
					info("no index file found in '%s'", path);
					action(
						"@ recquire('%s/', %s, %d);",
						path,
						rec ? util.format("exports['%s'] = {}", file) : 'exports',
						level + 1
					);

					recquire(path + '/', target, level + 1);
				}

			}
			else if (level >= 0 && file.match(/.+\.js$/g) !== null && file !== index) {

				if(flat){

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

					exports[name] = require(path);
				}
			}
		});
	};

	return recquire;

};

module.exports = recquire_t;
