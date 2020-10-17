# Engine

Some boilerplate for browser-based games.  Designed to be side-effect free, predictable and composed of dependency-injected modules.

# How to use

- ```js/engine/engine.js``` - The main game loop.
- ```js/engine/inputter.js``` - This is where you handle control inputs and add them to the state.
- ```js/engine/loader.js``` - This is where you handle loading assets, at the very least before the first run.
- ```js/engine/renderer.js``` - This is where all the main rendering happens, takes a state object and turns it into audio/video.
- ```js/engine/updater.js``` - This is where all the per tick updates happen takes the last state and time and makes a new one.

As more files are added it makes sense to group them under folders with the same name as the engine component.

- ```js/generators/*``` - These are used to generate assets programmatically
- ```js/lib/*``` - These are global libraries and 3rd party stuff
- ```js/utilities/*``` - These are simple helper methods, usually divided up in files by function
- ```js/components/app-view.js``` - This is the main javascript file that hooks up the engine to the dom.  `connectedCallback` is where dependency injection for the engine happens.

## Tests

- ```tests/[module]/test.js``` - Unit tests for the module in question.
