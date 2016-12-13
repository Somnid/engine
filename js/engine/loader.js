const Loader = (function() {

	const defaults = {
		areaGenerator: null
	};

	function create(options) {
		const loader = {};
		loader.options = Object.assign({}, defaults, options);
		bind(loader);

		return loader;
	}

	function bind(loader) {
		loader.initialLoad = initialLoad.bind(loader);
	}

	function initialLoad() {
		return new Promise((resolve, reject) => {
			resolve({
				map: this.options.areaGenerator.generateArea()
			});
		});
	}

	return {
		create
	};

})();
