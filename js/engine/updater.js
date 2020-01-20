const defaults = {
	inputter: null
};

function bind(updater) {
	updater.update = updater.update.bind(updater);
}

export class Updater{
	constructor(options) {
		this.options = { ...defaults, ...options };
		bind(this);
		return updater;
	}

	update(state) {
		const now = performance.now();
		const timeSinceLastFrame = now - this.lastFrameTime;
		this.lastFrameTime = now;
		const newState = state; //For bootstrapping, this should probably be an immutable copy
		const inputState = this.options.inputter.getInputState();
		//game tick logic
		return newState;
	}
}
