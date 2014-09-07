Number.prototype.x = function(n) {
	var ret = [];
	for (var i = 0; i < n; i++) {
		ret.push(this);
	}
	return ret;
};

Array.prototype.flat = function() {
	return this.reduce(function(a, b) {
		return a.concat(b);
	}, []);
};

var range = function(n) {
	var ret = [];
	for (var i = 0; i < n; i++) {
		ret.push(i);
	}
	return ret;
};
