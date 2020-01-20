function bind(renderer) {
	renderer.init = renderer.init.bind(renderer);
	renderer.render = renderer.render.bind(renderer);
}

const defaults = {
	target: null
};

export class Renderer {
	constructor(options){
		this.options = { ...defaults, ...options };
		bind(this);
		this.init();
	}

	init(){
		this.context = this.options.target.getContext("2d");
	}

	render(){
		this.context.fillRect(0,0,this.options.target.width, this.options.target.width);
	}
}
