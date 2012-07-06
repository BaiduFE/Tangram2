module("baidu.type");

test("Data", function(){
	// expect(5);
	equalAll(baidu.type, {
		"Array": valueis("array", [[1, 2]], [new Array(1, 2)]),
		"Boolean": valueis("boolean", [true], [new Boolean(true)]),
		"Date": valueis("date", [new Date()]),
		"Error": valueis("error", [new Error("hello")]),
		"Function": valueis("function", [function(){}], [new Function("", "")]),
		"Number": valueis("number", [8], [new Number(8)], [Number(8)], [NaN]),
		"RegExp": valueis("regexp", [/ /], [new RegExp(" ")], [RegExp(" ")]),
		"String": valueis("string", [""], [new String("")], [String("")]),
		"Object": valueis("object", [{}], [new Object()], [Object()], [navigator]),
		"Other": [
			[undefined], "undefined",
			[null], "null"
		]
	});

	try{
		throw new Error("hello");
	}catch(e){
		equal(baidu.type(e), "error", "try cache Error");
	}
});

test("NodeType", function(){
	var el = document.createElement("div");
	var de = document.documentElement;
	var body = document.body;
	var head = document.getElementsByTagName("head")[0];
	var text = document.createTextNode("");

	var style = document.createElement("style");
		head.appendChild(style);

	var fragment = document.createDocumentFragment();

	var comment = "<!-- 123 -->";
	el.innerHTML = comment;

	comment = el.firstChild;

	body.setAttribute("a", 1);

	var attributes = body.attributes;

    equalAll(baidu.type, {
    	"HTMLElement": valueis("HTMLElement", [el], [de], [body], [head], [style]),
    	"Comment": valueis(comment ? "Comment" : "null", [comment]),
    	"Document": valueis("Document", [document]),
    	"DocumentFragment": valueis("DocumentFragment", [fragment]),
    	"Attribute": valueis("Attribute", [attributes[0]]),
    	"Text": valueis("Text", [text])
    	//,"NodeList": valueis("NodeList", [document.getElementsByTagName("*")], [document.getElementsByTagName("dd")])
    });
});

test("_type_", function(){
	var fn = new function(){
	    this._type_ = "hello";
	};

	equalAll(baidu.type, {
		"_type_": valueis("hello", [fn])
	});
});

test("bom", function(){
	equalAll(baidu.type, {
		"Window": valueis("Window", [window], [parent], [top])
	});
});