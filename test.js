var tests = [
// Filia
{// https://www.youtube.com/watch?v=nxEurUTqJD0
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
{// https://www.youtube.com/watch?v=-1-BaECSRZ8
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
{// https://www.youtube.com/watch?v=mOz4qSlWlVY
	character:'filia',
	hits: 35,
	dmg: 5515,
	drama: 250,
	combo: [
		['c.LK', 'c.MP'],
		['j.LP', 'j.HP'],
		['j.LK', 'j.MK'],
		['j.MP'],
		['s.MK', 'c.HP', 'qcf.MP(0)', 'qcb.KK'],
		['s.MP', 'c.HP', 'qcf.K'],
		['c.HK', 'dp.HP(2)', 'dp.PP']
	]
},

// Cerebella
{// https://www.youtube.com/watch?v=r0Gnf0TQqig
	character:'cerebella',
	hits: 43,
	dmg: 9194,
	drama: 305,
	combo: [
		['c.LK', 'c.MP', 's.HP', 'run.MK'],
		['c.MK'],
		['j.MP', 'j.HK'],
		['s.MP', 'qcb.Throw'],
		['c.LK', 'c.MP', 'c.HP'],
		['j.LP(8)', 'j.HP'],
		['c.LP', 'c.MP', 's.HK', 'dp.HP', 'qcf.PP']
	]
},
{// https://www.youtube.com/watch?v=OOWcJkQ6jao
	character:'cerebella',
	hits: 35,
	dmg: 7752,
	drama: 310,
	burst: true,
	combo: [
		['c.LK', 'c.MK', 'c.HP'],
		['j.MP', 'j.MK', 'j.HP'],
		['s.LK', 'c.HP'],
		['j.LP(1)', 'j.HP'],
		['j.LK', 'j.HK'],
		['s.LP', 's.MP', 's.HK', 'dp.HP', 'qcf.PP'],
		['dp.MP']
	]
},
{// https://www.youtube.com/watch?v=PS87O40A3RI
	character:'cerebella',
	hits: 23,
	dmg: 6368,
	drama: 95,
	combo: [
		['j.HK'],
		['c.LK', 'c.MK'],
		['j.d.MP'],
		['c.LK', 'c.MK', 'run.MK'],
		['dp.Throw', 'qcf.PP'],
	]
},
{// https://www.youtube.com/watch?v=wYxi5K9nmKY
	character:'cerebella',
	hits: 41,
	dmg: 7982,
	drama: 320,
	combo: [
		['c.LK', 'c.MP', 'c.HP'],
		['j.MK', 'j.HK'],
		['c.LK', 'c.MK'],
		['j.MP', 'j.HK'],
		['s.HP', 'run.Throw'],
		['c.MP', 's.HP', 'run.LK'],
		['s.LP', 's.MP', 's.HK', 'dp.HP', 'qcf.PP']
	]
},
{// Did it myself...
	character:'cerebella',
	hits: 47,
	dmg: 5969,
	drama: 300,
	combo: [
		['j.Throw'],
		['j.LP(1)'],
		['c.MK'],
		['j.MP', 'j.HK'],
		['s.HP', 'run.Throw'],
		['c.MP', 'c.HP'],
		['j.LP(6)', 'j.HP'],
		['s.LP', 's.MK', 's.HK', 'dp.HP', 'qcf.PP']
	]
},

// Valentine
{// TODO(mullings): Add video url when I eventually upload this
	character:'valentine',
	hits: 43,
	dmg: 7599,
	drama: 320,
	combo: [
		['c.LK(1)', 'c.MK(1)', 's.HP', 'qcf.HK'],
		['s.HK', 'qcf.LK'],
		['s.LP(1)', 'c.HP'],
		['j.HP'],
		['j.MP(3)', 'j.HP'],
		['s.MK(1)', 'qcf.LK'],
		['s.LK', 's.MP(1, 2, 3, 5, 6, 7, 8, 9)', 'c.MK', 's.HP', 'qcf.HK', 'qcf.KK']
	]
},

// Team Combos
{// Did it myself...
	character:'filia',
	hits: 55,
	dmg: 7616,
	drama: 85,
	combo: [
		['s.LP', 's.MP', 'c.MK', 's.HK', 'qcb.HK', 'dp.PP', dhc('cerebella', 'qcf.PP')],
		['c.LK', 'c.MP', 's.HK', 'dp.HP', 'qcf.PP']
	]
},
{// https://www.youtube.com/watch?v=L6HhJ21QjLs
	character:'cerebella',
	hits: 40,
	dmg: 14351,
	drama: 355,
	combo: [
		['spd.Throw', dhc('filia', 'qcb.PP')],
		['c.MP', 'c.HP', 'qcf.LP'],
		['s.LK', 's.MK', 's.HP'],
		['j.HP', 'j.HK', 'j.qcb.HK'],
		['j.MP(4)'],
		['s.LP', 's.LK', 's.MP', 'c.MK', 's.HK', 'qcb.HK']
	]
},
{// Did it myself...
	character:'cerebella',
	hits: 33,
	dmg: 7683,
	drama: 175,
	combo: [
		['c.LK', 'c.MK'],
		['j.MP', 'j.HK'],
		['s.MP', tag('valentine')],
		['c.LK(1)', 'c.MK(1)', 's.HP', 'qcf.HK', 'qcf.KK', dhc('filia', 'dp.PP')]
	]
}
];

var check = function(expected, got, name) {
	if (expected != got) {
		console.log('Wrong ' + name + ': expected ' + expected + ', got ' + got);
		return false;
	}
	return true;
};

var runTest = function(test, name, verbose) {
	var fail = false;
	var opt = test.options ? Object.create(test.options) : {};
	if (verbose) { opt.verbose = true; }
	var result = combo(characters[test.character], test.combo, opt);

	fail = !check(test.hits, result.Hits, '# of hits') || fail;
	fail = !check(test.dmg, result.Damage, 'damage') || fail;
	fail = !check(test.drama, result.Drama, 'drama') || fail;
	var burst = test.burst ? true : false;
	fail = !check(burst, result['Infinity Breaker Triggered'], 'burst') || fail;
	if (fail) {
		console.log('Test ' + name + ' failed');
		opt.verbose = true;
		combo(characters[test.character], test.combo, opt);
	}
	return !fail;
};

var runTests = function(verbose) {
	for (var i = 0; i < tests.length; i++) {
		if (!runTest(tests[i], i + 1, verbose)) {
			return;
		}
	}
	console.log('All tests passed');
};