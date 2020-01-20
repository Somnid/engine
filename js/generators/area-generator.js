function bind(areaGenerator) {
	areaGenerator.generateArea = areaGenerator.generateArea.bind(areaGenerator);
}

export class AreaGenerator {
	constructor() {
		bind(areaGenerator);
	}

	generateArea() {
		//return a data structure for a map or something
	}
}