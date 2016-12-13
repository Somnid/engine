const Inputter = (function() {

	const defaults = {

	};

	function create(options) {
		let inputter = {};
		inputter.options = Object.assign({}, options, defaults);
		bind(inputter);
		inputter.init();
		return inputter;
	}

	function bind(inputter) {
		inputter.init = init.bind(inputter);
		inputter.getInputState = getInputState.bind(inputter);
		inputter.getKeyboard = getKeyboard.bind(inputter);
		inputter.getGamepad = getGamepad.bind(inputter);
	}

	function getInputState() {
		return {
			keyboard: this.getKeyboard(),
			gamepad: this.getGamepad()
		};
	}

	function getKeyboard() {
		return this.keyboard.currentState; //make immutable
	}

	function getGamepad() {

	}

	function init(){
		this.keyboard = Keyboard.create();
		this.keyboard.attach();
	}

	return {
		create: create
	};

})();
