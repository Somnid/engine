test("Thing is created", function(){
	var thing = new Thing();
	equal(thing.property, "someValue");
});