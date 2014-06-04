
test('ff', function (assert) {
	var recquire = recquire_t('test-namespace', 'index.js', 'intro.js', 'outro.js', false, false, true);
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
	var recquire = recquire_t('test-namespace', 'index.js', 'intro.js', 'outro.js', false, true);
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
	var recquire = recquire_t('test-namespace', 'index.js', 'intro.js', 'outro.js', true, false);
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
	var recquire = recquire_t('test-namespace', 'index.js', 'intro.js', 'outro.js', true, true);
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
	var recquire = recquire_t('test-namespace', 'index.js', 'intro.js', 'outro.js', false, false);
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
	var recquire = recquire_t('test-namespace', 'index.js', 'intro.js', 'outro.js', false, true);
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
	var recquire = recquire_t('test-namespace', 'index.js', 'intro.js', 'outro.js', true, false);
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
	var recquire = recquire_t('test-namespace', 'index.js', 'intro.js', 'outro.js', true, true);
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

