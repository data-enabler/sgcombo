var tests = [
{
	// https://www.youtube.com/watch?v=nxEurUTqJD0
	character:'filia',
	hits: 31,
	dmg: 5627,
	drama: 260,
	combo: [
		['s.LP(1)', 's.LK', 's.MK', 's.HP'],
		['j.MK(1)', 'j.HK'],
		['c.LK', 's.HP'],
		['j.LP', 'j.LK', 'j.qcb.HK'],
		['j.MP(3)', 'j.HK'],
		['s.LP(1)', 's.MK', 's.HP', 'dp.PP']
	]
},
{
	// https://www.youtube.com/watch?v=-1-BaECSRZ8
	character:'filia',
	hits: 45,
	dmg: 6596,
	drama: 335,
	combo: [
		['c.LK', 's.MK', 's.HP'],
		['j.HP'],
		['j.LK', 'j.HK'],
		['c.LK', 's.MK', 's.HP'],
		['j.LP', 'j.LK', 'j.MP(4)', 'j.MK', 'j.qcb.HK'],
		['s.LP', 's.MP', 'c.MK(4)', 'c.HP', 'qcb.HK', 'dp.PP']
	]
},
{
	// https://www.youtube.com/watch?v=mOz4qSlWlVY
	character:'filia',
	hits: 35,
	dmg: 5515,
	drama: 250,
	combo: [
		['c.LK', 'c.MP'],
		['j.LP', 'j.HP'],
		['j.LK', 'j.MK'],
		['j.MP'],
		['s.MK', 'c.HP', 'qcf.MP(0)', 'qcb.KK'], // Note: actually whiffed M Ringlet
		['s.MP', 'c.HP', 'qcf.K'],
		['c.HK', 'dp.HP(2)', 'dp.PP']
	]
}
];

var runTest = function(test, name) {
	var fail = false;
	var result = combo(characters[test.character], test.combo, test.options);
	if (test.hits != result.Hits) {
		console.log('Wrong # of hits: expected ' + test.hits + ', got ' + result.Hits);
		fail = true;
	}
	if (test.dmg != result.Damage) {
		console.log('Wrong damage: expected ' + test.dmg + ', got ' + result.Damage);
		fail = true;
	}
	if (test.drama != result.Drama) {
		console.log('Wrong drama: expected ' + test.drama + ', got ' + result.Drama);
		fail = true;
	}
	if (fail) {
		console.log('Test ' + name + ' failed');
		test.options = test.options || {};
		test.options.verbose = true;
		combo(characters[test.character], test.combo, test.options);
	}
	return !fail;
};

var runTests = function() {
	for (var i = 0; i < tests.length; i++) {
		if (!runTest(tests[i], i)) {
			return;
		}
	}
	console.log('All tests passed');
};