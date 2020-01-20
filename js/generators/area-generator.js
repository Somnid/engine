function bind(areaGenerator) {
	areaGenerator.generateArea = areaGenerator.generateArea.bind(areaGenerator);
}

export class AreaGenerator {
	constructor() {
		bind(this);
	}

	generateArea() {
		//return a data structure for a map or something
		return [
			[1, 1, 1, 1],
			[1, 0, 0, 1],
			[1, 0, 0, 1],
			[1, 1, 1, 1],
		];
	}
}