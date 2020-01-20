export function getInt(exclusiveCap){
	return Math.floor(Math.random() * exclusiveCap);
}

export function getBool(){
	if(getInt(2) == 0){
		return true;
	}else{
		return false;
	}
}

export function getOption(optionList){
	var index = getInt(optionList.length);
	return optionList[index];
}