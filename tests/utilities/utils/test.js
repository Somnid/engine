QUnit.module("isPlainObject");
QUnit.test("returns true for object", function(assert){
	assert.ok(Utils.isPlainObject({}), "empty object");
	assert.ok(Utils.isPlainObject({ key : "value" }), "normal object");
});
QUnit.test("returns false for value", function(assert){
	assert.ok(!Utils.isPlainObject(null), "null");
	assert.ok(!Utils.isPlainObject("hello"), "string");
	assert.ok(!Utils.isPlainObject(0), "number");
	assert.ok(!Utils.isPlainObject(true), "bool");
	assert.ok(!Utils.isPlainObject(function(){}), "function");
});
QUnit.test("returns false for native objects", function(assert){
	assert.ok(!Utils.isPlainObject(document.createElement("div")), "DOM node");
	assert.ok(!Utils.isPlainObject(window), "window");
});