function bind(inputter) {
	inputter.init = inputter.init.bind(inputter);
	inputter.getInputState = inputter.getInputState.bind(inputter);
	inputter.getKeyboard = inputter.getKeyboard.bind(inputter);
	inputter.getGamepad = inputter.getGamepad.bind(inputter);
}

export class Inputter {
	constructor(options) {
		this.options = { ...options, ...defaults };
		bind(this);
		this.init();
	}

	getInputState() {
		return {
			keyboard: this.getKeyboard(),
			gamepad: this.getGamepad()
		};
	}

	getKeyboard() {
		return this.keyboard.currentState; //make immutable
	}

	getGamepad() {

	}

	init(){
		this.keyboard = Keyboard.create();
		this.keyboard.attach();
	}
}
