module("baidu.dom.addClass");
stop();

waiting(function(){ return baidu.query; }, function(){

//新接口测试
	test("给没有className的元素添加", function(){
		//expect(4);
		var div = document.createElement('div');

		document.body.appendChild(div);
		equal(div.className, "", "div no class");
		
		baidu.dom(div).addClass("div_class1");
		equal(div.className, "div_class1", "div_class1");

		baidu.dom(div).addClass("div_class2 div_class3");// 添加多个class
		equal(div.className, "div_class1 div_class2 div_class3");

		baidu.dom(div).addClass("div_class1 div_class4");// 重名
		equal(div.className, "div_class1 div_class2 div_class3 div_class4");

		document.body.removeChild(div);
	});

test("prop(String, Object)", function() {
	expect(31);

	equal( jQuery("#text1").prop("value"), "Test", "Check for value attribute" );
	equal( jQuery("#text1").prop("value", "Test2").prop("defaultValue"), "Test", "Check for defaultValue attribute" );
	equal( jQuery("#select2").prop("selectedIndex"), 3, "Check for selectedIndex attribute" );
	equal( jQuery("#foo").prop("nodeName").toUpperCase(), "DIV", "Check for nodeName attribute" );
	equal( jQuery("#foo").prop("tagName").toUpperCase(), "DIV", "Check for tagName attribute" );
	equal( jQuery("<option/>").prop("selected"), false, "Check selected attribute on disconnected element." );

	equal( jQuery("#listWithTabIndex").prop("tabindex"), 5, "Check retrieving tabindex" );
	jQuery("#text1").prop("readonly", true);
	equal( document.getElementById("text1").readOnly, true, "Check setting readOnly property with 'readonly'" );
	equal( jQuery("#label-for").prop("for"), "action", "Check retrieving htmlFor" );
	jQuery("#text1").prop("class", "test");
	equal( document.getElementById("text1").className, "test", "Check setting className with 'class'" );
	equal( jQuery("#text1").prop("maxlength"), 30, "Check retrieving maxLength" );
	jQuery("#table").prop("cellspacing", 1);
	equal( jQuery("#table").prop("cellSpacing"), "1", "Check setting and retrieving cellSpacing" );
	jQuery("#table").prop("cellpadding", 1);
	equal( jQuery("#table").prop("cellPadding"), "1", "Check setting and retrieving cellPadding" );
	jQuery("#table").prop("rowspan", 1);
	equal( jQuery("#table").prop("rowSpan"), 1, "Check setting and retrieving rowSpan" );
	jQuery("#table").prop("colspan", 1);
	equal( jQuery("#table").prop("colSpan"), 1, "Check setting and retrieving colSpan" );
	jQuery("#table").prop("usemap", 1);
	equal( jQuery("#table").prop("useMap"), 1, "Check setting and retrieving useMap" );
	jQuery("#table").prop("frameborder", 1);
	equal( jQuery("#table").prop("frameBorder"), 1, "Check setting and retrieving frameBorder" );
	QUnit.reset();

	var body = document.body,
		$body = jQuery( body );

	ok( $body.prop("nextSibling") === null, "Make sure a null expando returns null" );
	body.foo = "bar";
	equal( $body.prop("foo"), "bar", "Make sure the expando is preferred over the dom attribute" );
	body.foo = undefined;
	ok( $body.prop("foo") === undefined, "Make sure the expando is preferred over the dom attribute, even if undefined" );

	var select = document.createElement("select"), optgroup = document.createElement("optgroup"), option = document.createElement("option");
	optgroup.appendChild( option );
	select.appendChild( optgroup );

	equal( jQuery(option).prop("selected"), true, "Make sure that a single option is selected, even when in an optgroup." );
	equal( jQuery(document).prop("nodeName"), "#document", "prop works correctly on document nodes (bug #7451)." );

	var attributeNode = document.createAttribute("irrelevant"),
		commentNode = document.createComment("some comment"),
		textNode = document.createTextNode("some text"),
		obj = {};
	jQuery.each( [document, attributeNode, commentNode, textNode, obj, "#firstp"], function( i, ele ) {
		strictEqual( jQuery(ele).prop("nonexisting"), undefined, "prop works correctly for non existing attributes (bug #7500)." );
	});

	obj = {};
	jQuery.each( [document, obj], function( i, ele ) {
		var $ele = jQuery( ele );
		$ele.prop( "nonexisting", "foo" );
		equal( $ele.prop("nonexisting"), "foo", "prop(name, value) works correctly for non existing attributes (bug #7500)." );
	});
	jQuery( document ).removeProp("nonexisting");

	var $form = jQuery("#form").prop("enctype", "multipart/form-data");
	equal( $form.prop("enctype"), "multipart/form-data", "Set the enctype of a form (encoding in IE6/7 #6743)" );
});

test("prop('tabindex')", function() {
	expect(8);

	// elements not natively tabbable
	equal(jQuery("#listWithTabIndex").prop("tabindex"), 5, "not natively tabbable, with tabindex set to 0");
	equal(jQuery("#divWithNoTabIndex").prop("tabindex"), undefined, "not natively tabbable, no tabindex set");

	// anchor with href
	equal(jQuery("#linkWithNoTabIndex").prop("tabindex"), 0, "anchor with href, no tabindex set");
	equal(jQuery("#linkWithTabIndex").prop("tabindex"), 2, "anchor with href, tabindex set to 2");
	equal(jQuery("#linkWithNegativeTabIndex").prop("tabindex"), -1, "anchor with href, tabindex set to -1");

	// anchor without href
	equal(jQuery("#linkWithNoHrefWithNoTabIndex").prop("tabindex"), undefined, "anchor without href, no tabindex set");
	equal(jQuery("#linkWithNoHrefWithTabIndex").prop("tabindex"), 1, "anchor without href, tabindex set to 2");
	equal(jQuery("#linkWithNoHrefWithNegativeTabIndex").prop("tabindex"), -1, "anchor without href, no tabindex set");
});

test("prop('tabindex', value)", function() {
	expect(9);

	var element = jQuery("#divWithNoTabIndex");
	equal(element.prop("tabindex"), undefined, "start with no tabindex");

	// set a positive string
	element.prop("tabindex", "1");
	equal(element.prop("tabindex"), 1, "set tabindex to 1 (string)");

	// set a zero string
	element.prop("tabindex", "0");
	equal(element.prop("tabindex"), 0, "set tabindex to 0 (string)");

	// set a negative string
	element.prop("tabindex", "-1");
	equal(element.prop("tabindex"), -1, "set tabindex to -1 (string)");

	// set a positive number
	element.prop("tabindex", 1);
	equal(element.prop("tabindex"), 1, "set tabindex to 1 (number)");

	// set a zero number
	element.prop("tabindex", 0);
	equal(element.prop("tabindex"), 0, "set tabindex to 0 (number)");

	// set a negative number
	element.prop("tabindex", -1);
	equal(element.prop("tabindex"), -1, "set tabindex to -1 (number)");

	element = jQuery("#linkWithTabIndex");
	equal(element.prop("tabindex"), 2, "start with tabindex 2");

	element.prop("tabindex", -1);
	equal(element.prop("tabindex"), -1, "set negative tabindex");
});

	start();
});
ua.importsrc("baidu.sizzle"); // 由于加载的资源中不存在 baidu.sizzle 这个对象，所以不能使用 importsrc 自带的 callback





