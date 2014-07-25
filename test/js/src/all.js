
var dflt = {
	name : undefined,
	index : 'index.js',
	intro : 'intro.js',
	outro : 'outro.js',
	rec : true,
	flat : true,
	debug : false
};

test('ff', function (assert) {
	var opt = {
		name : 'test-namespace',
		index : 'index.js',
		intro : 'intro.js',
		outro : 'outro.js',
		rec : false,
		flat : false,
		debug : true
	};
	var recquire = recquire_t(opt);
	var namespace = {};
	recquire(__dirname + '/test-namespace/', namespace, -1);

	var ref = {
		file1 : {
			prop1 : true
		},
		file2 : {
			prop2 : true
		},
		file3 : {
			prop3 : true
		},
		file4 : {
			prop4 : true
		}
	};

	deepEqual(namespace, ref, 'check reference');
});

test('ft', function (assert) {
	var opt = {
		name : 'test-namespace',
		index : 'index.js',
		intro : 'intro.js',
		outro : 'outro.js',
		rec : false,
		flat : true,
		debug : undefined
	};
	var recquire = recquire_t(opt);
	var namespace = {};
	recquire(__dirname + '/test-namespace/', namespace, -1);

	var ref = {
		prop1 : true,
		prop2 : true,
		file3 : {
			prop3 : true
		},
		file4 : {
			prop4 : true
		}
	};

	deepEqual(namespace, ref, 'check reference');
});

test('tf', function (assert) {
	var opt = {
		name : 'test-namespace',
		index : 'index.js',
		intro : 'intro.js',
		outro : 'outro.js',
		rec : true,
		flat : false,
		debug : undefined
	};
	var recquire = recquire_t(opt);
	var namespace = {};
	recquire(__dirname + '/test-namespace/', namespace, -1);

	var ref = {
		dir1 : {
			file1 : {
				prop1 : true
			},
			dir2 : {
				file2 : {
					prop2 : true
				},
				dir3 : {
					file3 : {
						prop3 : true
					},
					file4 : {
						prop4 : true
					}
				}
			}
		}
	};

	deepEqual(namespace, ref, 'check reference');
});

test('tt', function (assert) {
	var opt = {
		name : 'test-namespace',
		index : 'index.js',
		intro : 'intro.js',
		outro : 'outro.js',
		rec : true,
		flat : true,
		debug : undefined
	};
	var recquire = recquire_t(opt);
	var namespace = {};
	recquire(__dirname + '/test-namespace/', namespace, -1);

	var ref = {
		dir1 : {
			prop1 : true,
			dir2 : {
				prop2 : true,
				dir3 : {
					file3 : {
						prop3 : true
					},
					file4 : {
						prop4 : true
					}
				}
			}
		}
	};

	deepEqual(namespace, ref, 'check reference');
});

test('ff-2', function (assert) {
	var opt = {
		name : 'test-namespace',
		index : 'index.js',
		intro : 'intro.js',
		outro : 'outro.js',
		rec : false,
		flat : false,
		debug : undefined
	};
	var recquire = recquire_t(opt);
	var namespace = {};
	recquire(__dirname + '/test-namespace/', namespace, -2);

	var ref = {
		file2 : {
			prop2 : true
		},
		file3 : {
			prop3 : true
		},
		file4 : {
			prop4 : true
		}
	};

	deepEqual(namespace, ref, 'check reference');
});

test('ft-2', function (assert) {
	var opt = {
		name : 'test-namespace',
		index : 'index.js',
		intro : 'intro.js',
		outro : 'outro.js',
		rec : false,
		flat : true,
		debug : undefined
	};
	var recquire = recquire_t(opt);
	var namespace = {};
	recquire(__dirname + '/test-namespace/', namespace, -2);

	var ref = {
		prop2 : true,
		file3 : {
			prop3 : true
		},
		file4 : {
			prop4 : true
		}
	};

	deepEqual(namespace, ref, 'check reference');
});

test('tf-2', function (assert) {
	var opt = {
		name : 'test-namespace',
		index : 'index.js',
		intro : 'intro.js',
		outro : 'outro.js',
		rec : true,
		flat : false,
		debug : undefined
	};
	var recquire = recquire_t(opt);
	var namespace = {};
	recquire(__dirname + '/test-namespace/', namespace, -2);

	var ref = {
		dir1 : {
			dir2 : {
				file2 : {
					prop2 : true
				},
				dir3 : {
					file3 : {
						prop3 : true
					},
					file4 : {
						prop4 : true
					}
				}
			}
		}
	};

	deepEqual(namespace, ref, 'check reference');
});

test('tt-2', function (assert) {
	var opt = {
		name : 'test-namespace',
		index : 'index.js',
		intro : 'intro.js',
		outro : 'outro.js',
		rec : true,
		flat : true,
		debug : undefined
	};
	var recquire = recquire_t(opt);
	var namespace = {};
	recquire(__dirname + '/test-namespace/', namespace, -2);

	var ref = {
		dir1 : {
			dir2 : {
				prop2 : true,
				dir3 : {
					file3 : {
						prop3 : true
					},
					file4 : {
						prop4 : true
					}
				}
			}
		}
	};

	deepEqual(namespace, ref, 'check reference');
});

