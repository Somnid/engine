const AreaGenerator = (function() {

	function create() {
		let areaGenerator = {};
		bind(areaGenerator);
		return areaGenerator;
	}

	function bind(areaGenerator) {
		areaGenerator.generateArea = generateArea.bind(areaGenerator);
	}

	function generateArea() {

	}

	return {
		create
	};

})();
