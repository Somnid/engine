"use strict";
const Engine = (function(){

	const defaults = {
		onCreate : Utils.promiseStub,
		onUpdate : function(){},
		onRender : function(){}
	};

	function create(options){
		let engine = {};
		engine.options = Object.assign({}, defaults, options);
		bind(engine);

		engine.init();

		return engine;
	}

	function bind(engine){
		engine.init = init.bind(engine);
		engine.startEngine = startEngine.bind(engine);
		engine.tick = tick.bind(engine);
	}

	function init(){
		this.options.onCreate()
			.then(this.startEngine);
	}

	function startEngine(initialState){
		this.state = initialState;
		requestAnimationFrame(this.tick);
	}

	function tick(){
		this.state = this.options.onUpdate(this.state);
		this.options.onRender(this.state);
		requestAnimationFrame(this.tick);
	}

	return {
		create
	};

})();
