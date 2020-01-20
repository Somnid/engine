const defaults = {
	areaGenerator: null
};

function bind(loader) {
	loader.initialLoad = loader.initialLoad.bind(loader);
}

export class {
	constructor(options) {
		this.options = { ...defaults, ...options };
		bind(this);
	}

	async initialLoad() {
		return {
			map: this.options.areaGenerator.generateArea()
		}
	}
}
