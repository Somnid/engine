const Updater = (function() {

	const defaults = {
		inputter: null
	};

	function create(options) {
		let updater = {};
		updater.options = Object.assign({}, defaults, options);
		bind(updater);
		return updater;
	}

	function bind(updater) {
		updater.update = update.bind(updater);
	}

	function update(state) {
		const now = performance.now();
		const timeSinceLastFrame = now - this.lastFrameTime;
		this.lastFrameTime = now;
		const newState = state; //For bootstrapping, this should porbably be an immutable copy
		const inputState = this.options.inputter.getInputState();
		//game tick logic
		return newState;
	}

	return {
		create
	};

})();
