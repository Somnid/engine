const Renderer = (function(){

	const defaults ={
		target : null
	};

	function create(options){
		let renderer = {};
		renderer.options = Object.assign({}, defaults, options);
		bind(renderer);
		renderer.init();
		return renderer;
	}

	function bind(renderer){
		renderer.init = init.bind(renderer);
		renderer.render = render.bind(renderer);
	}

	function init(){
		this.context = this.options.target.getContext("2d");
	}

	function render(){
		this.context.fillRect(0,0,this.options.target.width, this.options.target.width);
	}

	return {
		create
	};

})();
