var fs = require('fs')
    , path = require('path');

exports.merge_options = function(a, b){
    var c = {};
    for (attr in a) { c[attr] = a[attr]; }
    for (attr in b) { c[attr] = b[attr]; }
    return c;
}

//
// E.g. mkdirSync('/home/user/a/b/c/', 0755) 
//   or mkdirSync('home/user/a/../b/c', 0755)
//
var mkdirSync = exports.mkdirSync = function(dirpath, mode) {
	if (dirpath == '' || path.existsSync(dirpath)) // dirpath could be either 'a/b/c' or '/a/b/c'
		return;
	else {
		var parent = dirpath.replace(/[^\/]*\/?$/,'');
		if (!path.existsSync(parent))
			mkdirSync(parent, mode);
		
		fs.mkdirSync(dirpath, mode);
	}
}

exports.createFileSync = function(file) {
	if (!path.existsSync(file)) {
  	fs.writeFileSync(file, '');
  }
}
