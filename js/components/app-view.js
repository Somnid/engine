import { AreaGenerator } from "../generators/area-generator.js";
import { Inputter } from "../engine/inputter.js";
import { Renderer } from "../engine/renderer.js";
import { Loader } from "../engine/loader.js";
import { Updater } from "../engine/updater.js";
import { Engine } from "../engine/engine.js";

customElements.define("app-view",
	class extends HTMLElement{

	constructor() {
		super();
		this.bind(this);
	}

	bind(appView) {
		appView.cacheDom = appView.cacheDom.bind(appView);
		appView.attachEvents = appView.attachEvents.bind(appView);
		appView.onResize = appView.onResize.bind(appView);
	}

	prerender(){
		this.attachShadow({ mode: "open" });
		this.shadowRoot.innerHTML = `
			<style>
				:host { display: block; }
				canvas { display: block; }
				#main { image-rendering: pixelated; }
			</style>
			<canvas id="main"></canvas>
		`;
	}

	cacheDom() {
		this.dom = {
			canvas: this.shadowRoot.getElementById("main")
		};
	}

	attachEvents() {
		window.addEventListener("resize", this.onResize);
	}

	onResize() {
		this.dom.canvas.width = window.innerWidth;
		this.dom.canvas.height = window.innerHeight;
	}

	connectedCallback() {
		this.prerender();
		this.cacheDom();
		this.attachEvents();
		this.onResize();

		const areaGenerator = new AreaGenerator();
		const loader = new Loader({
			areaGenerator: areaGenerator
		});
		const inputter = new Inputter();
		const updater = new Updater({
			inputter: inputter
		});
		const renderer = new Renderer({
			target: this.dom.canvas
		});
		const engine = new Engine({
			onUpdate: updater.update,
			onRender: renderer.render,
			onCreate: loader.initialLoad
		});

		engine.init();
	}
});
