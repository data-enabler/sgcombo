var Character = function(name, moveset) {
	this.name = name;
	this.moveset = moveset;
};

Character.prototype.move = function(name) {
	var move = this.moveset[name];

	if (!move) {
		console.log('Can\'t find move ' + this.name + '[' + name + ']');
		return move;
	}

	if (!move.com && !move.ref) { return move; }

	// The move references another (either from the current character, another
	// character, or the common base), so use that as the base for this move.
	var ref = move.char ?
			characters[move.char].move(move.ref) :
			(
					move.com ?
					characters.common.move(move.com) :
					this.move(move.ref)
			);

	// Create new object with reference as the prototype
	var ret = Object.create(ref);

	// Override move properties
	for (var prop in move) {
		ret[prop] = move[prop];
	}

	return ret;
};

var characters = {
	common: new Character('common', {
		'L': {t:'L', m:[2.5]},
		'M': {t:'M', m:[7.5]},
		'H': {t:'H', m:[10.0]},
		'Throw':   {t:'X',
			forcedScaling:50.0,
			freezeScaling:true,
			forcedStage:2
		},
		'Lvl1': {t:'X', lv:1, m:[-100]},
		'Lvl2': {t:'X', lv:2, m:[-200]},
		'Lvl3': {t:'X', lv:3, m:[-300]},
		'Lvl5': {t:'X', lv:5, m:[-500]},
		'TagIn': {t:'S', d:[500], m:[10.1]},
		'Snap':  {t:'X', d:[0], m:[-100]}
	}),

	filia: new Character('Filia', {
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
		'j.qcb.KK': {com:'Lvl1', d:[250..x(4), 1250].flat()},
		'qcb.PP':   {com:'Lvl3', d:[4750]},
		// Misc
		'TagIn': {com:'TagIn'},
		'Snap':  {com:'Snap'}
	}),

	cerebella: new Character('Cerebella', {
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
		'f.HP':   {com:'H', d:[1600]},
		'j.d.MP': {com:'M', d:[1000], m:[4.2]},
		// Throws
		'Throw':   {com:'Throw', d:[1000], m:[15.0]},
		'j.Throw': {com:'Throw', d:[200, 200, 200, 800], m:[3.0, 3.0, 3.0, 6.0]},
		// Specials
		'qcf.LP': {t:'S', d:[1075], m:[14.0]},
		'qcf.MP': {t:'S', d:[1450], m:[18.2]},
		'qcf.HP': {t:'S', d:[1800], m:[18.2]},
		'dp.LP':  {t:'S', d:[400], m:[14.0]},
		'dp.MP':  {t:'S', d:[1200], m:[14.0]},
		'dp.HP':  {t:'S', d:[250..x(7), 1350].flat(), m:[2.5.x(7), 3.6].flat()},
		'run.LK': {t:'X', d:[], m:[]},
		'run.MK': {t:'S', d:[1400], m:[14.0]},
		'run.HK': {t:'S', d:[1400], m:[9.6]},
		'run.Throw': {t:'S', d:[0, 200..x(6)].flat(), m:[7.6],
			forcedScaling:50.0,
			freezeScaling:true,
			noScale:true,
		},
		'qcf.Throw': {t:'S', d:[0, 2300], m:[5.0, 8.0],
			forcedScaling:55.0,
			freezeScaling:true,
			noScale:true,
		},
		'qcb.Throw': {t:'S', d:[0, 2300], m:[3.0, 7.0],
			forcedScaling:55.0,
			freezeScaling:true,
			noScale:true,
		},
		'dp.Throw':  {t:'S', d:[0, 150..x(5), 1100].flat(), m:[14.0, 2.0.x(5), 9.0].flat(),
			forcedScaling:50.0,
			freezeScaling:true,
		},
		'j.qcf.Throw': {t:'S', d:[0, 150..x(10), 1200].flat(), m:[0.0, 2.5.x(10), 6.7].flat(),
			forcedScaling:50.0,
			freezeScaling:true,
		},
		// Supers
		'qcf.PP':    {com:'Lvl1', d:[300..x(8), 2100].flat()},
		'spd.Throw': {com:'Lvl1', d:[0, 300..x(4), 100, 3500].flat(),
			forcedScaling:50.0,
			freezeScaling:true,
			noScale:true,
		},
		'qcb.PP':    {com:'Lvl3', d:[0, 2700, 2800]},
		// Misc
		'TagIn': {com:'TagIn'},
		'Snap':  {com:'Snap'}
	}),

	painwheel: new Character('Painwheel', {
		// Standing
		's.LP': {com:'L', d:[325]},
		's.MP': {com:'M', d:[675]},
		's.HP': {com:'H', d:[900]},
		's.HP[Charged]': {com:'H', d:[1100]},
		's.LK': {com:'L', d:[375]},
		's.MK': {com:'M', d:[200, 200, 200, 500], m:[1.7.x(4)].flat()},
		's.HK': {com:'H', d:[300, 400, 500], m:[3.3, 3.3, 3.3]},
		// Crouching
		'c.LP': {com:'L', d:[325]},
		'c.MP': {com:'M', d:[210, 210, 210, 350], m:[1.7.x(4)].flat()},
		'c.HP': {com:'H', d:[950]},
		'c.HP[Charged]': {com:'H', d:[1150]},
		'c.LK': {com:'L', d:[325]},
		'c.MK': {com:'M', d:[650]},
		'c.HK': {com:'H', d:[900]},
		'c.HK[Charged]': {com:'H', d:[1000]},
		// Air
		'j.LP': {com:'L', d:[325]},
		'j.MP': {com:'M', d:[250, 250, 250, 425], m:[1.7.x(4)].flat()},
		'j.HP': {com:'H', d:[300, 300, 300, 550], m:[1.7.x(4)].flat()},
		'j.HP[Charged]': {com:'H', d:[300..x(5), 550].flat(), m:[1.7.x(6)].flat()},
		'j.LK': {com:'L', d:[350]},
		'j.MK': {com:'M', d:[650]},
		'j.HK': {com:'H', d:[225..x(7)].flat(), m:[1.5.x(7)].flat()},
		// Command Normals
		'f.HK':   {com:'H', d:[300, 250, 250, 720], m:[2.6.x(4)].flat()},
		// Throws
		'Throw':          {com:'Throw', d:[0, 1000], m:[0.0, 15.0]},
		'Throw[Install]': {com:'Throw', d:[0, 1000, 1300], m:[0.0, 5.0, 10.0]},
		'j.Throw':          {ref:'Throw'},
		'j.Throw[Install]': {ref:'Throw[Install]'},
		// Specials
		'qcf.LP':   {t:'S', d:[650], m:[9.1],
			forcedScaling:50.0,
		},
		'qcf.MP':   {t:'S', d:[350], m:[6.1]},
		'qcf.HP':   {ref:'qcf.MP'},
		'qcf.LK':   {t:'S', d:[0, 1400], m:[0.0, 7.6],
			forcedScaling:50.0,
			freezeScaling:true,
		},
		'qcf.MK':   {ref:'qcf.LK'},
		'qcf.HK':   {ref:'qcf.LK'},
		'j.qcf.LK': {ref:'qcf.LK'},
		'j.qcf.MK': {ref:'qcf.LK'},
		'j.qcf.HK': {ref:'qcf.LK'},
		'qcb.K':    {t:'X', d:[], m:[]},
		'j.qcb.K':  {t:'X', d:[], m:[]},
		'dd.LK':    {t:'S', d:[1050], m:[7.6]},
		'dd.MK':    {t:'S', d:[1150], m:[8.3]},
		'dd.HK':    {t:'S', d:[1250], m:[9.1]},
		// Supers
		'qcf.PP':            {com:'Lvl1', d:[220..x(26)].flat()},
		'qcf.PP[Install]':   {com:'Lvl1', d:[220..x(39)].flat()},
		'j.qcf.KK':          {com:'Lvl1', d:[150, 150, 150, 70..x(15), 500].flat(),
			retroScaling:true
		},
		'j.qcf.KK[Install]': {ref:'j.qcf.KK', d:[150, 150, 150, 90..x(30), 700].flat(),
			forcedScaling:50.0,
			freezeScaling:true
		},
		'qcb.KK':   {com:'Lvl2', d:[], m:[]},
		'qcb.PP':   {com:'Lvl3', d:[2000, 175..x(16), 1000].flat()},
		// Misc
		'TagIn':          {com:'TagIn', d:[0, 500], m:[0.0, 10.1],
			forcedScaling:50.0,
			freezeScaling:true,
			forcedStage:3
		},
		'TagIn[Install]': {ref:'TagIn', d:[0, 500, 650], m:[0.0, 10.1, 10.0]},
		'Snap':           {com:'Snap'}
	}),

	valentine: new Character('Valentine', {
		// Standing
		's.LP': {com:'L', d:[200, 200, 200], m:[2.5, 2.5, 2.5]},
		's.MP': {com:'M', d:[140, 140, 140, 325, 300, 100..x(4)].flat(), m:[2.3.x(9)].flat()},
		's.HP': {com:'H', d:[950]},
		's.LK': {com:'L', d:[275]},
		's.MK': {com:'M', d:[400, 75..x(4)].flat(), m:[7.6, 1.8.x(4)].flat()},
		's.HK': {com:'H', d:[400, 450, 600], m:[10.0, 4.5, 4.5]},
		// Crouching
		'c.LP': {com:'L', d:[200]},
		'c.MP': {com:'M', d:[160, 160, 300], m:[2.3, 2.3, 2.3]},
		'c.HP': {com:'H', d:[950]},
		'c.LK': {com:'L', d:[225, 85, 85, 85], m:[2.5, 2.0, 2.0, 2.0]},
		'c.MK': {com:'M', d:[350, 350], m:[3.6, 3.6]},
		'c.HK': {com:'H', d:[975]},
		// Air
		'j.LP': {com:'L', d:[200]},
		'j.MP': {com:'M', d:[250, 175..x(4)].flat(), m:[1.8.x(5)].flat()},
		'j.HP': {com:'H', d:[875]},
		'j.LK': {com:'L', d:[325, 100, 100, 100], m:[2.0, 1.8, 1.8, 1.8]},
		'j.MK': {com:'M', d:[300, 550], m:[2.5, 6.0]},
		'j.HK': {com:'H', d:[500, 600], m:[2.5, 6.0]},
		// Throws
		'Throw':   {com:'Throw', d:[800], m:[8.0]},
		'j.Throw': {com:'Throw', d:[0, 75..x(4), 800].flat(), m:[5.0, 1.0.x(4), 0.0].flat()},
		// Specials
		'qcf.LP':   {t:'S', d:[300], m:[6.1]},
		'qcf.MP':   {ref:'qcf.LP'},
		'qcf.HP':   {ref:'qcf.LP'},
		'j.qcf.LP': {ref:'qcf.LP'},
		'j.qcf.MP': {ref:'qcf.LP'},
		'j.qcf.HP': {ref:'qcf.LP'},
		'qcf.P(Orange1)':   {t:'S', d:[400], m:[6.1]},
		'qcf.P(Orange2)':   {ref:'qcf.P(Orange1)'},
		'qcf.P(Orange3)':   {ref:'qcf.P(Orange1)'},
		'j.qcf.P(Orange1)': {ref:'qcf.P(Orange1)'},
		'j.qcf.P(Orange2)': {ref:'qcf.P(Orange2)'},
		'j.qcf.P(Orange3)': {ref:'qcf.P(Orange3)'},
		'qcf.P(Purple1)':   {ref:'qcf.P(Orange1)'},
		'qcf.P(Purple2)':   {ref:'qcf.P(Purple1)'},
		'qcf.P(Purple3)':   {ref:'qcf.P(Purple1)'},
		'j.qcf.P(Purple1)': {ref:'qcf.P(Purple1)'},
		'j.qcf.P(Purple2)': {ref:'qcf.P(Purple2)'},
		'j.qcf.P(Purple3)': {ref:'qcf.P(Purple3)'},
		'qcf.P(Green1)':    {ref:'qcf.P(Orange1)'},
		'qcf.P(Green2)':    {ref:'qcf.P(Green1)'},
		'qcf.P(Green3)':    {ref:'qcf.P(Green1)'},
		'j.qcf.P(Green1)':  {ref:'qcf.P(Green1)'},
		'j.qcf.P(Green2)':  {ref:'qcf.P(Green2)'},
		'j.qcf.P(Green3)':  {ref:'qcf.P(Green3)'},
		'qcb.LP':    {t:'S', d:[150, 150, 150], m:[2.5, 2.5, 2.5]},
		'qcb.MP':    {ref:'qcb.LP'},
		'qcb.HP':    {ref:'qcb.LP'},
		'qcf.LK':    {t:'S', d:[975], m:[10.1]},
		'qcf.MK':    {t:'S', d:[1110], m:[10.1]},
		'qcf.HK':    {t:'S', d:[1275], m:[10.1]},
		'j.qcf.LK':  {t:'S', d:[750], m:[10.1], forcedScaling:75.0},
		'j.qcf.MK':  {t:'S', d:[825], m:[10.1], forcedScaling:75.0},
		'j.qcf.HK':  {t:'S', d:[900], m:[10.1], forcedScaling:75.0},
		'qcb.Throw': {t:'S', d:[0, 0, 1200], m:[7.0, 3.0, 8.0]},
		// Supers
		'qcf.PP':   {com:'Lvl1', d:[450..x(8)].flat()},
		'j.qcf.PP': {ref:'qcf.PP'},
		'qcf.KK':   {com:'Lvl1', d:[275..x(12), 1850].flat()},
		'j.qcf.KK': {com:'Lvl1', d:[240..x(12), 1750].flat()},
		'rdp.KK(Orange)': {com:'Lvl2', d:[2250]},
		'rdp.KK(Purple)': {ref:'rdp.KK(Orange)'},
		'rdp.KK(Green)':  {ref:'rdp.KK(Orange)'},
		'qcb.PP':   {com:'Lvl3', d:[0, 0, 1000, 4000]},
		'qcb.Tag':  {com:'Lvl5', d:[4500]},
		// Misc
		'TagIn': {com:'TagIn'},
		'Snap':  {com:'Snap'}
	}),

	bigBand: new Character('Big Band', {
		// Standing
		's.LP': {com:'L', d:[300, 300], m:[2.5, 2.5]},
		's.MP': {com:'M', d:[700, 75..x(4)].flat(), m:[7.5, 0.0.x(4)].flat()},
		's.HP': {com:'H', d:[950]},
		's.LK': {com:'L', d:[270, 325], m:[2.5, 2.5]},
		's.MK': {com:'M', d:[600, 650], m:[3.8, 3.8]},
		's.HK': {com:'H', d:[950]},
		// Crouching
		'c.LP': {com:'L', d:[250, 100..x(5)].flat(), m:[2.5, 1.0.x(5)].flat()},
		'c.MP': {com:'M', d:[550, 700], m:[3.8, 3.8]},
		'c.HP': {com:'H', d:[1000]},
		'c.LK': {com:'L', d:[325]},
		'c.MK': {com:'M', d:[750]},
		'c.HK': {com:'H', d:[1200]},
		// Air
		'j.LP': {com:'L', d:[400]},
		'j.MP': {com:'M', d:[650]},
		'j.HP': {com:'H', d:[900]},
		'j.LK': {com:'L', d:[200, 200, 200], m:[2.0, 2.0, 2.0]},
		'j.MK': {com:'M', d:[400, 350..x(4)].flat(), m:[7.5, 1.6.x(4)].flat()},
		'j.HK': {com:'H', d:[1200]},
		// Throws
		'Throw':   {com:'Throw', d:[0, 150..x(8)].flat(), m:[5.0, 1.0.x(8)].flat()},
		'j.Throw': {com:'Throw', d:[0, 350, 1000], m:[5.0, 2.0, 6.0]},
		// Specials
		'dp.LP':    {t:'S', d:[350, 350, 150..x(9)].flat(), m:[3.0, 3.0, 0.8.x(9)].flat()},
		'dp.MP':    {t:'S', d:[350, 550, 150..x(11)].flat(), m:[4.5, 4.5, 0.8.x(11)].flat()},
		'dp.HP':    {t:'S', d:[350, 350, 550, 150..x(14)].flat(), m:[4.5, 4.5, 3.0, 0.8.x(14)].flat()},
		'qcb.LK':   {t:'S', d:[650], m:[4.5]},
		'qcb.MK':   {t:'S', d:[800], m:[4.5]},
		'qcb.HK':   {t:'S', d:[950], m:[4.5]},
		'sb.LP':    {t:'S', d:[900], m:[4.5]},
		'sb.MP':    {t:'S', d:[1300], m:[4.5]},
		'sb.HP':    {t:'S', d:[1750], m:[4.5]},
		'sb.LK':    {t:'S', d:[0, 350, 1000], m:[2.5, 3.0, 14.0],
			forcedScaling:50.0,
			freezeScaling:true,
		},
		'sb.MK':    {ref:'sb.LK', d:[0, 350, 450, 1000], m:[4.5, 2.5, 3.0, 10.0]},
		'sb.HK':    {ref:'sb.LK', d:[0, 350, 450, 500, 1000], m:[4.5, 2.5, 3.0, 3.0, 10.0]},
		'sb.P~K':   {t:'X', d:[], m:[]},
		'sb.K~P':   {t:'X', d:[], m:[]},
		'j.qcb.LK': {t:'S', d:[700], m:[7.5]},
		'j.qcb.MK': {t:'S', d:[400, 500], m:[4.5, 4.5]},
		'j.qcb.HK': {t:'S', d:[350, 400, 450], m:[2.87, 2.87, 2.87]},
		// Supers
		'qcf.PP':           {com:'Lvl1', d:[600, 600, 600, 2300]},
		'qcf.PP[Taunt]':    {com:'Lvl1', d:[600..x(4), 475..x(12), 2300].flat()},
		'j.qcf.KK':         {com:'Lvl1', d:[275..x(15), 1200].flat()},
		'j.qcf.KK[Taunt]':  {com:'Lvl1', d:[275..x(15), 0, 250, 1400, 0].flat(),
			minScaling:{16:1.0, 17:1.0}
		},
		'qcb.PP':           {com:'Lvl3', d:[550..x(7), 110..x(60)].flat()},
		'qcb.PP[Big Band]': {com:'Lvl3', d:[550..x(7), 110..x(77)].flat()},
		'qcb.PP[Corner]':   {com:'Lvl3', d:[550..x(4), 110..x(46)].flat()},
		'Level5':           {com:'Lvl5', d:[400..x(20), 4500].flat()},
		// Misc
		'TagIn': {com:'TagIn'},
		'Snap':  {com:'Snap'}
	})
};
