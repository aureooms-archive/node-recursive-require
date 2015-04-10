
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
	var extend = require('node.extend');
	var assign = function(object, key, value){ object[key] = value; };

	opt = extend({}, dflt, opt);


	// DEBUG
	var msg_t = function(type){
		return function(){
			console.log(
				[
					opt.name,
					type,
					util.format.apply(this, arguments)
				].join(' ')
			);
		};
	};

	var info = opt.debug ? msg_t('info') : function(){};
	var action = opt.debug ? msg_t('action') : function(){};

	var dflt_action_handler = function(path, fn, args){
		args.push(require(path));
		fn.apply(null, args);
	};

	var recquire = function(dir, exports, level, handler) {

		if (handler === undefined) {
			handler = dflt_action_handler;
		}

		fs.readdirSync(dir).forEach(function(file) {

			if (file === opt.intro || file === opt.outro) return;

			var path = dir + file;
			if (fs.lstatSync(path).isDirectory()) {
				if (fs.existsSync(path + '/' + opt.index)) {
					if(opt.rec){
						// DEBUG
						info("index file found in '%s'", path);
						action("@ exports['%s'] = require('%s');", file, path);

						handler(path, assign, [exports, file]);
					}
					else{
						// DEBUG
						info("index file found in '%s'", path);
						action("@ extend(true, exports, require('%s'));", path);

						handler(path, extend, [true, exports]);
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

					recquire(path + '/', target, level + 1, handler);
				}

			}
			else if (level >= 0 && file.match(/.+\.js$/g) !== null && file !== opt.index) {

				if(opt.flat){

					// DEBUG
					info(".js file '%s'", path);
					action("@ extend(true, exports, require('%s'));", path);

					handler(path, extend, [true, exports]);
				}
				else{
					var name = file.substr(0, file.length - 3);

					// DEBUG
					info(".js file '%s'", path);
					action("@ exports['%s'] = require('%s');", name, path);

					handler(path, assign, [exports, name]);
				}
			}
		});
	};

	return recquire;

};

module.exports = recquire_t;
