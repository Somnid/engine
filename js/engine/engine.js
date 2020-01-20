const defaults = {
	onCreate: Promise.resolve({}),
	onUpdate: function () { },
	onRender: function () { }
};

function bind(engine){
	engine.init = engine.init.bind(engine);
	engine.startEngine = engine.startEngine.bind(engine);
	engine.tick = engine.tick.bind(engine);
}

export class Engine {
	constructor(options){
		this.options = { ...defaults, ...options };
		bind(this);
		this.init();
	}

	init(){
		this.options.onCreate()
			.then(this.startEngine);
	}

	startEngine(initialState){
		this.state = initialState;
		requestAnimationFrame(this.tick);
	}

	tick(){
		this.state = this.options.onUpdate(this.state);
		this.options.onRender(this.state);
		requestAnimationFrame(this.tick);
	}
}
