var Character = function(moveset) { this.moveset = moveset; };

Character.prototype.move = function(name) {
	var move = this.moveset[name];
	if (!move.com && !move.ref) { return move; }

	var ref = move.char ?
			characters[move.char].move(move.ref) :
			(
					move.com ?
					characters.common.move(move.com) :
					this.move(move.ref)
			);
	var ret = Object.create(ref);
	for (var prop in move) {
		ret[prop] = move[prop];
	}
	return ret;
};

var characters = {
	common: new Character({
		'L': {t:'L', m:[2.5]},
		'M': {t:'M', m:[7.5]},
		'H': {t:'H', m:[10.0]},
		'Throw':   {t:'X',
			forcedScaling:50.0,
			freezeScaling:true,
			forcedStage:3
		},
		'Lvl1': {t:'X', lv:1, m:[-100]},
		'Lvl2': {t:'X', lv:2, m:[-200]},
		'Lvl3': {t:'X', lv:3, m:[-300]},
		'Lvl5': {t:'X', lv:5, m:[-500]},
		'TagIn': {t:'X', d:[500], m:[10.1]},
		'Snap':  {t:'X', d:[0], m:[-100]}
	}),

	filia: new Character({
		// Standing
		's.LP': {com:'L', d:[300, 200], m:[2.5, 2.5]},
		's.MP': {com:'M', d:[550]},
		's.HP': {com:'H', d:[1000]},
		's.LK': {com:'L', d:[400]},
		's.MK': {com:'M', d:[450]},
		's.HK': {com:'H', d:[1000]},
		// Crouching
		'c.LP': {com:'L', d:[200]},
		'c.MP': {com:'M', d:[600]},
		'c.HP': {com:'H', d:[900]},
		'c.LK': {com:'L', d:[200]},
		'c.MK': {com:'M', d:[150, 150, 200, 250, 400], m:[1.3.x(5)].flat()},
		'c.HK': {com:'H', d:[1100]},
		// Air
		'j.LP': {com:'L', d:[250]},
		'j.MP': {com:'M', d:[150..x(5), 250].flat(), m:[1.1.x(6)].flat()},
		'j.HP': {com:'H', d:[900]},
		'j.LK': {com:'L', d:[250]},
		'j.MK': {com:'M', d:[200, 350], m:[7.5, 7.5]},
		'j.HK': {com:'H', d:[900]},
		// Throws
		'Throw':   {com:'Throw', d:[0, 212..x(4)].flat(), m:[0, 5.0.x(4)].flat()},
		'j.Throw': {com:'Throw', d:[300, 1000], m:[10.0, 10.0]},
		// Specials
		'qcf.LP':   {t:'S', d:[600], m:[3.9]},
		'qcf.MP':   {ref:'qcf.LP'},
		'qcf.HP':   {ref:'qcf.LP'},
		'dp.LP':    {t:'S', d:[800], m:[3.9]},
		'dp.MP':    {t:'S', d:[600, 400], m:[2.4, 2.4]},
		'dp.HP':    {t:'S', d:[900, 300, 300], m:[2.4, 2.4, 2.4]},
		'qcf.K':    {t:'X', d:[], m:[]},
		'qcb.LK':   {t:'S', d:[300, 300, 400], m:[2.0, 2.0, 3.9]},
		'qcb.MK':   {t:'S', d:[300, 300, 300, 400], m:[2.0, 2.0, 2.0, 3.9]},
		'qcb.HK':   {t:'S', d:[300..x(5), 400].flat(), m:[2.0.x(5), 3.9].flat()},
		'j.qcb.LK': {ref:'qcb.MK'},
		'j.qcb.MK': {ref:'qcb.MK'},
		'j.qcb.HK': {ref:'qcb.MK'},
		// Supers
		'dp.PP':    {com:'Lvl1', d:[400, 200..x(6), 400, 1500, 200].flat(),
			retroScaling:[8, 9],
			minScaling:{8:0.34}
		},
		'qcb.KK':   {com:'Lvl1', d:[300..x(4), 1750].flat()},
		'j.qcb.KK': {ref:'qcb.KK'},
		'qcb.PP':   {com:'Lvl1', d:[4750]},
		// Misc
		'TagIn': {com:'TagIn'},
		'Snap':  {com:'Snap'}
	}),

	cerebella: new Character({
		// Standing
		's.LP': {com:'L', d:[300, 300], m:[2.5, 2.5]},
		's.MP': {com:'M', d:[600]},
		's.HP': {com:'H', d:[1000]},
		's.LK': {com:'L', d:[400]},
		's.MK': {com:'M', d:[600]},
		's.HK': {com:'H', d:[625, 725], m:[10.0, 10.0]},
		// Crouching
		'c.LP': {com:'L', d:[250]},
		'c.MP': {com:'M', d:[550]},
		'c.HP': {com:'H', d:[950]},
		'c.LK': {com:'L', d:[325]},
		'c.MK': {com:'M', d:[550]},
		'c.HK': {com:'H', d:[1100]},
		// Air
		'j.LP': {com:'L', d:[250, 100..x(14)].flat(), m:[2.5.x(15)].flat()},
		'j.MP': {com:'M', d:[575]},
		'j.HP': {com:'H', d:[1000]},
		'j.LK': {com:'L', d:[300]},
		'j.MK': {com:'M', d:[650]},
		'j.HK': {com:'H', d:[950]},
		// Command Normals
		'f.HP': {com:'H', d:[1600]},
		'j.d.MP': {com:'M', d:[1000], m:[4.2]},
		// Throws
		'Throw':   {com:'Throw', d:[1000], m:[15.0]},
		'j.Throw': {com:'Throw', d:[200, 200, 200, 800], m:[3.0, 3.0, 3.0, 6.0]},
		// Specials
		'qcf.LP':   {t:'S', d:[1075], m:[14.0]},
		'qcf.MP':   {t:'S', d:[1450], m:[18.2]},
		'qcf.HP':   {t:'S', d:[1800], m:[18.2]},
		'dp.LP':    {t:'S', d:[400], m:[14.0]},
		'dp.MP':    {t:'S', d:[1200], m:[14.0]},
		'dp.HP':    {t:'S', d:[250..x(7), 1350].flat(), m:[2.5.x(7), 3.6].flat()},
		'run.LK':   {t:'X', d:[], m:[]},
		'run.MK':   {t:'S', d:[1400], m:[14.0]},
		'run.HK':   {t:'S', d:[1400], m:[9.6]},
		'run.Throw': {t:'S', d:[0, 200..x(6)].flat(), m:[7.6],
			forcedScaling:50.0,
			freezeScaling:true,
			noScale:true,
		},
		'qcf.Throw':    {t:'S', d:[0, 2300], m:[5.0, 8.0],
			forcedScaling:55.0,
			freezeScaling:true,
			noScale:true,
		},
		'qcb.Throw':    {t:'S', d:[0, 2300], m:[3.0, 7.0],
			forcedScaling:55.0,
			freezeScaling:true,
			noScale:true,
		},
		'dp.Throw':    {t:'S', d:[0, 150..x(5), 1100].flat(), m:[14.0, 2.0.x(5), 9.0].flat(),
			forcedScaling:50.0,
			freezeScaling:true,
		},
		'j.qcf.Throw':    {t:'S', d:[0, 150..x(10), 1200].flat(), m:[0.0, 2.5.x(10), 6.7].flat(),
			forcedScaling:50.0,
			freezeScaling:true,
		},
		// Supers
		'qcf.PP':    {com:'Lvl1', d:[300..x(8), 2100].flat()},
		'spd.Throw':   {com:'Lvl1', d:[0, 300..x(4), 100, 3500].flat(),
			forcedScaling:50.0,
			freezeScaling:true,
			noScale:true,
		},
		'qcb.PP':   {com:'Lvl3', d:[0, 2700, 2800]},
		// Misc
		'TagIn': {com:'TagIn'},
		'Snap':  {com:'Snap'}
	})
};
