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

var MAX_UNDIZZY = 240,
    MIN_SCALING = 0.2,
    MIN_HEAVY_SCALING = 0.275,
    MIN_LVL3_SCALING = 0.45;
var SCALING_RATE = 0.875;
var UD = { l:15, m:20, h:30, s:20, x:0 };

var Character = function(moveset) { this.moveset = moveset; };

Character.prototype.move = function(name) {
  var move = this.moveset[name];
  if (!move.ref) { return move; }
  var ret = Object.create(this.movemove.ref);
  for (var prop in move) {
    ret[prop] = move[prop];
  }
  return ret;
};

var characters = {
	filia: new Character({
    // Standing
    's.LP': {t:'l', d:[300, 200], m:[2.5, 2.5]},
    's.MP': {t:'m', d:[550], m:[7.5]},
    's.HP': {t:'h', d:[1000], m:[10.0]},
    's.LK': {t:'l', d:[400], m:[2.5]},
    's.MK': {t:'m', d:[450], m:[7.5]},
    's.HK': {t:'h', d:[1000], m:[10.0]},
    // Crouching
    'c.LP': {t:'l', d:[200], m:[2.5]},
    'c.MP': {t:'m', d:[600], m:[7.5]},
    'c.HP': {t:'h', d:[900], m:[10.0]},
    'c.LK': {t:'l', d:[200], m:[2.5]},
    'c.MK': {t:'m', d:[150, 150, 200, 250, 400], m:[1.3.x(5)].flat()},
    'c.HK': {t:'h', d:[1100], m:[10.0]},
    // Air
    'j.LP': {t:'l', d:[250], m:[2.5]},
    'j.MP': {t:'m', d:[150..x(5), 250].flat(), m:[1.1.x(6)].flat()},
    'j.HP': {t:'h', d:[900], m:[10.0]},
    'j.LK': {t:'l', d:[250], m:[2.5]},
    'j.MK': {t:'m', d:[200, 350], m:[7.5, 7.5]},
    'j.HK': {t:'h', d:[900], m:[10.0]},
    // Throws
    'Throw':   {t:'x', s:50.0, freeze:true, d:[0, 212..x(4)].flat(), m:[0, 5.0.x(4)].flat()},
    'j.Throw': {t:'x', s:50.0, freeze:true, d:[300, 1000], m:[10.0, 10.0]},
    // Specials
    'qcf.LP':   {t:'s', d:[600], m:[3.9]},
    'qcf.MP':   {ref:'qcf.LP'},
    'qcf.HP':   {ref:'qcf.LP'},
    'dp.LP':    {t:'s', d:[800], m:[3.9]},
    'dp.MP':    {t:'s', d:[600, 400], m:[2.4, 2.4]},
    'dp.HP':    {t:'s', d:[900, 300, 300], m:[2.4, 2.4, 2.4]},
    'qcf.K':    {t:'x', d:[], m:[]},
    'qcb.LK':   {t:'s', d:[300, 300, 400], m:[2.0, 2.0, 3.9]},
    'qcb.MK':   {t:'s', d:[300, 300, 300, 400], m:[2.0, 2.0, 2.0, 3.9]},
    'qcb.HK':   {t:'s', d:[300..x(5), 400].flat(), m:[2.0.x(5), 3.9].flat()},
    'j.qcb.LK': {ref:'qcb.MK'},
    'j.qcb.MK': {ref:'qcb.MK'},
    'j.qcb.HK': {ref:'qcb.MK'},
    // Supers
    'dp.PP':    {t:'x', lv:1, d:[400, 200..x(6), 400, 3500, 500].flat(), m:[-100]},
    'qcb.KK':   {t:'x', lv:1, d:[300..x(4), 1750].flat(), m:[-100]},
    'j.qcb.KK': {ref:'qcb.KK'},
    'qcb.PP':   {t:'x', lv:3, d:[4750], m:[-300]},
    // Misc
    'TagIn': {t:'x', d:[500], m:[10.1]},
    'Snap':  {t:'x', d:[0], m:[-100]}
	})
};

var inAir = function(move) {
  return typeof move == 'string' && move.slice(0, 2) == 'j.';
};

var dizzy = function(move) {
  return UD[move.t];
};

var minScaling = function(move, dmg) {
  if (move.lv == 3) { return MIN_LVL3_SCALING; }
  if (dmg >= 1000) { return MIN_HEAVY_SCALING; }
  return MIN_SCALING;
};

var scale = function(scaling) {
  return Math.max(MIN_SCALING, scaling * SCALING_RATE);
};

var scaleDmg = function(scaling, baseDmg) {
 return Math.max(1, scaling * baseDmg);
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

  var atk = { name:found[1] };

  var hits = found[2].replace(/\s/g, '').split(',');
  if (hits.length == 2) {
    var h1 = [];
    for (var i = 0; i < +hits[0]; i++) {
      h1[i] = i;
    }
    if (h1.length) atk.hits = h1;
  } else if (hits.length >= 3) {
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
  if (typeof options == 'object') {
    stage = (options.startStage | 0) || stage;
    undizzy = options.startDrama | 0;
    if (!isNaN(options.startScaling) && options.startScaling >= MIN_SCALING &&
        options.startScaling < 1) {
      scaling = options.startScaling;
    }
  }

  for (var c = 0; c < chains.length; c++) {
    var chain = chains[c];

    for (var m = 0; m < chain.length; m++) {
      var atk = parseAtk(chain[m]);
      var move = character.move(atk.name);
      var hits = atk.hits;

      // Default hits if necessary
      if (!hits) {
        hits = [];
        for (var i = 0; i < move.d; i++) {
          hits.push(i);
        }
      }

      for (var h = 0; h < atk.hits.length; h++) {
        var hit = hits[h];
        var dmg = move.d[hit];
        var meter = move.m[hit];

        var s = Math.max(minScaling(move, dmg), scaling);
        totalDmg += scaleDmg(s, dmg);
        if (!isNaN(meter) && meter !== 0) {
          if (meter > 0) {
            meterGain += scaleMeter(s, meter);
          } else {
            meterDrain -= meter;
          }
        }

        // Increment chain?
        if (m === 0 && h === 0) {
          switch (stage) {
            case 0:
              if (inAir(move)) {
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

        var oldUndizzy = undizzy;
        undizzy += dizzy(move);

        // Burst?
        if (m === 0 && oldUndizzy >= MAX_UNDIZZY) {
          udTriggered = true;
          // End combo
        }

        // Scale damage
        if (numHits >= 3 && !move.freeze) {
          scaling = scale(scaling);
        }
      }

      // Forced damage scaling
      if (move.s) {
        scaling = Math.min(move.s, scaling);
      }
    }

    c++;
  }

  return {
    'Hits': numHits,
    'Damage': totalDmg,
    'Tension Gain': meterGain,
    'Tension Drain': meterDrain,
    'Net Tension': meterGain - meterDrain,
    'Drama': undizzy,
    'Infinity Breaker Triggered': udTriggered
  };
};