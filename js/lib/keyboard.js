const keyMap = {
	"backspace": 8,
	"tab": 9,
	"shift": 16,
	"enter": 13,
	"shift": 16,
	"ctrl": 17,
	"alt": 18,
	"capslock": 20,
	"esc": 27,
	"space": 32,
	"pageup": 33,
	"pagedown": 34,
	"end": 35,
	"home": 36,
	"left": 37,
	"up": 38,
	"right": 39,
	"down": 40,
	"insert": 45,
	"delete": 46,
	"zero": 48,
	"0": 48,
	"left_paren": { code: 48, mod: "shift" },
	")": { code: 48, mod: "shift" },
	"one": 49,
	"1": 49,
	"exclamation": { code: 49, mod: "shift" },
	"!": { code: 49, mod: "shift" },
	"two": 50,
	"2": 50,
	"at": { code: 50, mod: "shift" },
	"@": { code: 50, mod: "shift" },
	"three": 51,
	"3": 51,
	"pound": { code: 51, mod: "shift" },
	"hash": { code: 51, mod: "shift" },
	"sharp": { code: 51, mod: "shift" },
	"#": { code: 51, mod: "shift" },
	"four": 52,
	"4": 52,
	"dollar": { code: 52, mod: "shift" },
	"$": { code: 52, mod: "shift" },
	"five": 53,
	"5": 53,
	"percent": { code: 53, mod: "shift" },
	"%": { code: 53, mod: "shift" },
	"six": 54,
	"6": 54,
	"caret": { code: 54, mod: "shift" },
	"^": { code: 54, mod: "shift" },
	"seven": 55,
	"7": 55,
	"and": { code: 55, mod: "shift" },
	"ampersand": { code: 55, mod: "shift" },
	"&": { code: 55, mod: "shift" },
	"eight": 56,
	"8": 56,
	"star": { code: 56, mod: "shift" },
	"asterik": { code: 56, mod: "shift" },
	"*": { code: 56, mod: "shift" },
	"nine": 57,
	"9": 57,
	"right_paren": { code: 57, mod: "shift" },
	"(": { code: 57, mod: "shift" },
	"a": 65,
	"A": { code: 65, mod: "shift" },
	"b": 66,
	"B": { code: 66, mod: "shift" },
	"c": 67,
	"C": { code: 67, mod: "shift" },
	"d": 68,
	"D": { code: 68, mod: "shift" },
	"e": 69,
	"E": { code: 69, mod: "shift" },
	"f": 70,
	"F": { code: 70, mod: "shift" },
	"g": 71,
	"G": { code: 71, mod: "shift" },
	"h": 72,
	"H": { code: 72, mod: "shift" },
	"i": 73,
	"I": { code: 73, mod: "shift" },
	"j": 74,
	"J": { code: 74, mod: "shift" },
	"k": 75,
	"K": { code: 75, mod: "shift" },
	"l": 76,
	"L": { code: 76, mod: "shift" },
	"m": 77,
	"M": { code: 77, mod: "shift" },
	"n": 78,
	"N": { code: 78, mod: "shift" },
	"o": 79,
	"O": { code: 79, mod: "shift" },
	"p": 80,
	"P": { code: 80, mod: "shift" },
	"q": 81,
	"Q": { code: 81, mod: "shift" },
	"r": 82,
	"R": { code: 82, mod: "shift" },
	"s": 83,
	"S": { code: 83, mod: "shift" },
	"t": 84,
	"T": { code: 84, mod: "shift" },
	"u": 85,
	"U": { code: 85, mod: "shift" },
	"v": 86,
	"V": { code: 86, mod: "shift" },
	"w": 87,
	"W": { code: 87, mod: "shift" },
	"x": 88,
	"X": { code: 88, mod: "shift" },
	"y": 89,
	"Y": { code: 89, mod: "shift" },
	"z": 90,
	"Z": { code: 90, mod: "shift" },
	"=": 187,
	"equals": 187,
	"+": { code: 187, mod: "shift" },
	"plus": { code: 187, mod: "shift" },
	"-": 189,
	"minus": 189,
	"dash": 189,
	"_": { code: 189, mod: "shift" },
	"underscore": { code: 189, mod: "shift" },
	"backtick": 192,
	"\`": 192,
	"tilde": { code: 192, mod: "shift" },
	"~": { code: 192, mod: "shift" }
};

function bind(keyboard) {
	keyboard.attach = keyboard.attach.bind(keyboard);
	keyboard.detach = keyboard.detach.bind(keyboard);
	keyboard.handleKeyPress = keyboard.handleKeyPress.bind(keyboard);
	keyboard.handleKeyUnpress = keyboard.handleKeyUnpress.bind(keyboard);
	keyboard.searchBindings = keyboard.searchBindings.bind(keyboard);
	keyboard.getBindingForKey = keyboard.getBindingForKey.bind(keyboard);
	keyboard.addKeyFunction = keyboard.addKeyFunction.bind(keyboard);
	keyboard.addKeyFunctions = keyboard.addKeyFunctions.bind(keyboard);
}

export class Keyboard {
	constructor(){
		bind(this);
		this.keyBindings = [];
		this.currentState = {};
	}

	attach(){
		document.body.addEventListener("keydown", this.handleKeyPress);
		document.body.addEventListener("keyup", this.handleKeyUnpress);
	}

	detach(){
		document.body.removeEventListener("keydown", this.handleKeyPress);
		document.body.removeEventListener("keyup", this.handleKeyUnpress);
	}

	addKeyFunctions(keyHandlerMap){
		for(let key in keyHandlerMap){
			addKeyFunction(key, keyHandlerMap[key]);
		}
	}

	addKeyFunction(key, handler){
		const binding = getBindingForKey(key);
		this.keyBindings.push({
			keyCode : binding.keyCode,
			keyModifier : binding.keyModifier,
			handler : handler
		});
	}

	getBindingForKey(key){
		let keyCode;
		let keyModifier = null;
		try{
			if(typeof(key) == "string"){
				key = key.length > 1 ? key.toLowerCase() : key; //for key names "Esc" vs "esc" we don't care about case but singles we do 'a' vs 'A'
				keyBinding = Util.searchMap(keyMap, key);
				if(keyBinding){
					keyCode = typeof(keyBinding) == "object" ? keyBinding.code : keyBinding;
					keyModifier = typeof(keyBinding) == "object" ? keyBinding.mod : null;
				}else if(key.indexOf("+") != -1){ //with modifier
					const keySplit = key.split("+");
					keyModifier = keySplit[0];
					keyCode = getBindingForKey(keySplit[1]).keyCode;
				}
			}else if(typeof(key) == "number"){
				keyCode = key;
			}
		}catch(e){
			console.error("No known key of type: ", key);
		}
		return {
			keyCode,
			keyModifier
		};
	}

	handleKeyPress(e){
		var bindings = this.searchBindings(e);
		if(bindings.length > 0){
			e.preventDefault();
		}
		for(var i = 0; i < bindings.length; i++){
			bindings[i].handler();
		}
		this.currentState[e.key] = true;
	}

	handleKeyUnpress(e){
		this.currentState[e.key] = false;
	}

	searchBindings(keyEvent){
		const keyCode = keyEvent.keyCode;
		let keyModifier = null;
		if(keyEvent.shiftKey){
			keyModifier = "shift";
		}else if(keyEvent.ctrlKey){
			keyModifier = "ctrl";
		}else if(keyEvent.altKey){
			keyModifier = "alt"
		}
		return this.keyBindings.filter(item => item.keyCode == keyCode && ((!keyModifier && !item.keyModifier) || item.keyModifier == keyModifier));
	}
}
