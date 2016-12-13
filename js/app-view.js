"use strict";
const AppView = (function() {

	function create() {
		let appView = {};
		bind(appView);
		appView.init();
		return appView;
	}

	function bind(appView) {
		appView.cacheDom = cacheDom.bind(appView);
		appView.init = init.bind(appView);
		appView.attachEvents = attachEvents.bind(appView);
		appView.onResize = onResize.bind(appView);
	}

	function cacheDom() {
		this.dom = {};
		this.dom.canvas = document.getElementById("main");
	}

	function attachEvents() {
		window.addEventListener("resize", this.onResize);
	}

	function onResize() {
		this.dom.canvas.width = window.innerWidth;
		this.dom.canvas.height = window.innerHeight;
	}

	function init() {
		this.cacheDom();
		this.attachEvents();
		this.onResize();

		const areaGenerator = AreaGenerator.create();
		const loader = Loader.create({
			areaGenerator: areaGenerator
		});
		const inputter = Inputter.create();
		const updater = Updater.create({
			inputter: inputter
		});
		const renderer = Renderer.create({
			target: this.dom.canvas
		});
		const engine = Engine.create({
			onUpdate: updater.update,
			onRender: renderer.render,
			onCreate: loader.initialLoad
		});

		engine.init();
	}

	return {
		create
	};

})();
