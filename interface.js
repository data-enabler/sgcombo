var currentCharacter = 'filia';
var currentCombo = [];

var $editor;

var $chainTemplate;
var $moveTemplate;
var $moveSelectTemplate;

var $infoHits;
var $infoDamage;
var $infoTensionGain;
var $infoDrama;

$(function() {
	$editor = $('#editor');

	$editor.on('click', '.js-append-chain', function() { appendChain(); });
	$editor.on('click', '.js-insert-chain', function() {
		insertChain($(this).closest('.js-chain').index());
	});
	$editor.on('click', '.js-remove-chain', function() {
		removeChain($(this).closest('.js-chain').index());
		updateInfo();
	});

	$editor.on('click', '.js-append-move', function() {
		appendMove($(this).closest('.js-chain').index());
	});
	$editor.on('click', '.js-insert-move', function() {
		var $this = $(this);
		insertMove(
			$this.closest('.js-chain').index(),
			$this.closest('.js-move').index());
	});
	$editor.on('click', '.js-remove-move', function() {
		var $this = $(this);
		removeMove(
			$this.closest('.js-chain').index(),
			$this.closest('.js-move').index());
		updateInfo();
	});

	$editor.on('click', '.js-move-token', function() {
		var $this = $(this);
		$this
			.hide()
			.after(
				getMoveSelectTemplate(
					$this.closest('.js-chain').index(),
					$this.closest('.js-move').index()));
	});

	$editor.on('change', '.js-move-select', function() {
		var $this = $(this);
		setMove(
			$this.closest('.js-chain').index(),
			$this.closest('.js-move').index(),
			$this.val());
		$this.remove();
		updateInfo();
	});

	$chainTemplate = $($('#js-chain-template').html());
	$moveTemplate = $($('#js-move-template').html());
	$moveSelectTemplate = $($('#js-move-select-template').html());

	$infoHits = $('.js-info-hits');
	$infoDamage = $('.js-info-damage');
	$infoTensionGain = $('.js-info-tension-gain');
	$infoDrama = $('.js-info-drama');

	updateInfo();
});

var getChainTemplate = function() {
	return $chainTemplate.clone();
};

var getMoveTemplate = function() {
	return $moveTemplate.clone();
};

var getMoveSelectTemplate = function(chainNum, moveNum) {
	var clonedCombo = cloneCombo(currentCombo);
	var original = combo(
		characters[currentCharacter],
		pruneCombo(currentCombo));
	var currentMove = currentCombo[chainNum][moveNum];

	var $select = $moveSelectTemplate.clone();

	var $default = $('<option disabled>Select a Move</option>');
	$default.prop('selected', !currentMove);
	$select.append($default);

	for (var move in characters[currentCharacter].moveset) {
		clonedCombo[chainNum][moveNum] = move;
		var result = combo(
			characters[currentCharacter],
			pruneCombo(clonedCombo));
		console.log(clonedCombo);
		console.log(result);

		var damageChange = result.damage - original.damage;

		var displayText = move + ': ' +
			((damageChange >= 0) ? '+' : '') + damageChange + ' dmg';
		$('<option/>')
			.prop('selected', move === currentMove)
			.html(displayText)
			.val(move)
			.appendTo($select);
	}
	return $select;
};

var cloneCombo = function(combo) {
	var c = [];
	for (var i = 0; i < combo.length; i++) {
		var chain = [];
		for (var j = 0; j < combo[i].length; j++) {
			chain.push(combo[i][j]);
		}
		c.push(chain);
	}
	return c;
};

var pruneCombo = function(combo) {
	var c = [];
	for (var i = 0; i < combo.length; i++) {
		var chain = [];
		for (var j = 0; j < combo[i].length; j++) {
			if (combo[i][j]) {
				chain.push(combo[i][j]);
			}
		}
		if (chain.length) {
			c.push(chain);
		}
	}
	return c;
};

var setMove = function(chainNum, moveNum, move) {
	validateChainAndMove('Cannot update move:', chainNum, moveNum);
	currentCombo[chainNum][moveNum] = move;
	$editor
		.children(':eq('+ chainNum + ')')
		.find('.js-moves')
		.children(':eq(' + moveNum + ')')
		.find('.js-move-token')
		.html(move)
		.show();
};

var updateInfo = function() {
	var results = combo(
		characters[currentCharacter],
		pruneCombo(currentCombo));
	$infoHits.html(results.hits);
	$infoDamage.html(results.damage);
	$infoTensionGain.html(results.tensionGain);
	$infoDrama.html(results.drama);
};

var appendChain = function() {
	addChain(currentCombo.length);
};

var insertChain = function(index) {
	validateChain('Cannot insert chain:', index);
	addChain(index);
};

var addChain = function(index) {
	currentCombo.splice(index, 0, []);
	$editor
		.children(':eq(' + index + ')')
		.before(getChainTemplate());
};

var removeChain = function(index) {
	validateChain('Cannot remove chain:', index);
	currentCombo.splice(index, 1);
	$editor.children(':eq(' + index + ')').remove();
};

var appendMove = function(chainNum) {
	validateChain('Cannot append move:', chainNum);
	addMove(chainNum, currentCombo[chainNum].length);
};

var insertMove = function(chainNum, index) {
	validateChainAndMove('Cannot insert move:', chainNum, index);
	addMove(chainNum, index);
};

var addMove = function(chainNum, index) {
	currentCombo[chainNum].splice(index, 0, '');
	$editor
		.children(':eq('+ chainNum + ')')
		.find('.js-moves')
		.children(':eq(' + index + ')')
		.before(getMoveTemplate());
};

var removeMove = function(chainNum, index) {
	validateChainAndMove('Cannot remove move:', chainNum, index);
	currentCombo[chainNum].splice(index, 1);
	$editor
		.children(':eq('+ chainNum + ')')
		.find('.js-moves')
		.children(':eq(' + index + ')')
		.remove();
};

var validateChain = function(message, chainNum) {
	if (typeof(chainNum) != 'number' ||
	    chainNum < 0 ||
	    chainNum >= currentCombo.length) {
		throw new Error(message + ' Unknown chain number ' + chainNum);
	}
}
var validateChainAndMove = function(message, chainNum, moveNum) {
	validateChain(message, chainNum);
	if (typeof(moveNum) != 'number' ||
	    moveNum < 0 ||
	    moveNum >= currentCombo[chainNum].length) {
		throw new Error(message + 'Unknown move number ' + moveNum +
			' in chain ' + chainNum);
	}
}
