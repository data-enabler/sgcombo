var MAX_UNDIZZY = 240,
		MIN_SCALING = 0.2,
		MIN_HEAVY_SCALING = 0.275,
		MIN_LVL3_SCALING = 0.45;
var SCALING_RATE = 0.875;
var UD = { L:15, M:20, H:30, S:20, X:0 };

var inAir = function(move) {
	return typeof move == 'string' && move.slice(0, 2) == 'j.';
};

var dizzy = function(move) {
	return UD[move.t];
};

var minScaling = function(move, hit) {
	if (move.minScaling && move.minScaling[hit]) {
		return move.minScaling[hit];
	}
	if (move.lv == 3) { return MIN_LVL3_SCALING; }
	if (move.d[hit] >= 1000) { return MIN_HEAVY_SCALING; }
	return MIN_SCALING;
};

var scale = function(scaling) {
	return Math.max(MIN_SCALING, scaling * SCALING_RATE);
};

var scaleDmg = function(scaling, baseDmg) {
	if (!baseDmg) { return baseDmg; }
	return Math.max(1, scaling * baseDmg) | 0;
};

var scaleMeter = function(scaling, baseMeter) {
	return scaling * baseMeter;
};

var parseAtk = function(atkStr) {
	var found = atkStr.match(/^([A-Za-z\.]+)(?:\(([\d,\s]+)\))?$/);
	if (!found) {
		console.log('Error parsing "' + atkStr + '"');
		return null;
	}

	var atk = { name: found[1] };
	if (!found[2]) return atk;

	var hits = found[2].replace(/\s/g, '').split(',');
	if (hits.length == 1 && hits[0] !== '') {
		var h1 = [];
		for (var i = 0; i < +hits[0]; i++) {
			h1[i] = i;
		}
		atk.hits = h1;
	} else if (hits.length > 1) {
		var h2 = [];
		for (var j = 0; j < hits.length; j++) {
			if (+hits[j]) {
				h2.push(+hits[j] - 1);
			}
		}
		if (h2.length) atk.hits = h2;
	}

	return atk;
};

var combo = function(character, chains, options) {
	var numHits = 0, totalDmg = 0;
	var stage = 0, scaling = 1, undizzy = 0, meterGain = 0, meterDrain = 0;
	var udTriggered = false;
	var verbose = false;
	if (typeof options == 'object') {
		stage = (options.startStage | 0) || stage;
		undizzy = options.startDrama | 0;
		if (!isNaN(options.startScaling) && options.startScaling >= MIN_SCALING &&
				options.startScaling < 1) {
			scaling = options.startScaling;
		}
		verbose = options.verbose;
	}

	for (var c = 0; c < chains.length; c++) {
		var chain = chains[c];

		// Print
		if (verbose && c > 0) {
			console.log('----------');
		}

		for (var m = 0; m < chain.length; m++) {
			var atk = parseAtk(chain[m]);
			var move = character.move(atk.name);
			var hits = atk.hits;

			// Record scaling at start of move
			var origScaling = scaling;

			// Default hits if necessary
			if (!hits) {
				hits = range(move.d.length);
			}

			for (var h = 0; h < hits.length; h++) {
				var hit = hits[h];
				var dmg = move.d[hit];
				var meter = move.m[hit];

				// Calculate scaling
				var min = minScaling(move, hit);
				var s = Math.max(min, scaling);
				if (move.retroScaling && move.retroScaling.indexOf(h) >= 0) {
					s = Math.max(min, origScaling);
				}

				numHits++;
				var d = scaleDmg(s, dmg);
				totalDmg += d;
				if (!isNaN(meter) && meter !== 0) {
					if (meter > 0) {
						meterGain += scaleMeter(s, meter / 100);
					} else {
						meterDrain -= meter / 100;
					}
				}

				// Increment chain?
				if (m === 0 && h === 0) {
					switch (stage) {
						case 0:
							if (inAir(atk.name)) {
								stage = 1;
							} else {
								stage = 2;
							}
							break;
						case 3:
							stage = 5;
							break;
						default:
							stage = Math.min(5, stage + 1);
					}
				}

				// Add undizzy
				var oldUndizzy = undizzy;
				if (stage >= 3 && h === 0) undizzy += dizzy(move);

				// Print
				if (verbose) {
					console.log('[' + stage + ']Hit ' + ('  ' + numHits).slice(-3) +
							': ' + d + 'dmg,\tTotal: ' + totalDmg + 'dmg,\tDrama: ' +
							undizzy + ' (scaling: ' + s + ')');
				}

				// Burst?
				if (m === 0 && h === 0 && stage >= 3 && oldUndizzy >= MAX_UNDIZZY) {
					udTriggered = true;
					// End combo
				}

				// Scale damage
				if (numHits >= 3 && !move.noScale &&
						(!move.freezeScaling || h == hits.length - 1)) {
					scaling = scale(scaling);
				}
			}

			// Forced damage scaling
			if (move.forcedScaling) {
				scaling = Math.min(move.forcedScaling/100, scaling);
			}
		}
	}

	var result = {
		'Hits': numHits,
		'Damage': totalDmg,
		'Tension Gain': +meterGain.toFixed(3),
		'Tension Drain': +meterDrain.toFixed(3),
		'Net Tension': +(meterGain - meterDrain).toFixed(3),
		'Drama': undizzy,
		'Infinity Breaker Triggered': udTriggered,
		'IPS Stage': stage
	};

	// Print
	if (verbose) {
		console.log(result);
	}

	return result;
};
