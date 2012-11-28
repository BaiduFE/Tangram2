module("baidu.dom.val",{});

var bareObj = function(value) { return value; };
var functionReturningObj = function(value) { return (function() { return value; }); };

test('prepareTest',function(){
	expect(1);
	stop();
	ua.importsrc("baidu.dom.append,baidu.dom.each,baidu.dom.appendTo,baidu.dom.trigger,baidu.dom.find,baidu.dom.attr,baidu.dom.removeAttr,baidu.dom.insertAfter,baidu.dom.html,baidu.dom.eq,baidu.dom.remove,baidu.dom.contents,baidu.dom.val", function(){
		start();
		prepareTest();
		ok(true,'ok');
	}, "baidu.dom.contents", "baidu.dom.val");
});

test("val()", function() {
	//expect( 20 + ( baidu.fn.serialize ? 6 : 0 ) );

	document.getElementById("text1").value = "bla";
	
	equal( baidu("#text1").val(), "bla", "Check for modified value of input element" );
	document.getElementById("text1").value = "Test";

	equal( baidu("#text1").val(), "Test", "Check for value of input element" );
	// ticket #1714 this caused a JS error in IE
	//equal( baidu("#first").val(), "", "Check a paragraph element to see if it has a value" );
	ok( baidu([]).val() === undefined, "Check an empty baidu object will return undefined from val" );

	equal( baidu("#select2").val(), "3", "Call val() on a single=\"single\" select" );

	deepEqual( baidu("#select3").val(), ["1", "2"], "Call val() on a multiple=\"multiple\" select" );

	equal( baidu("#option3c").val(), "2", "Call val() on a option element with value" );

	equal( baidu("#option3a").val(), "", "Call val() on a option element with empty value" );

	equal( baidu("#option3e").val(), "no value", "Call val() on a option element with no value attribute" );

	equal( baidu("#option3a").val(), "", "Call val() on a option element with no value attribute" );

	baidu("#select3").val("");
	//deepEqual( baidu("#select3").val(), [""], "Call val() on a multiple=\"multiple\" select" );
	deepEqual( baidu("#select4").val(), [], "Call val() on multiple=\"multiple\" select with all disabled options" );

	$("#select4 optgroup").add("#select4 > [disabled]").attr("disabled", false);
	deepEqual( baidu("#select4").val(), ["2", "3"], "Call val() on multiple=\"multiple\" select with some disabled options" );

	baidu("#select4").attr("disabled", true);
	deepEqual( baidu("#select4").val(), ["2", "3"], "Call val() on disabled multiple=\"multiple\" select" );


	equal( baidu("#select5").val(), "3", "Check value on ambiguous select." );
	baidu("#select5").val(1);
	equal( baidu("#select5").val(), "1", "Check value on ambiguous select." );

	baidu("#select5").val(3);
	equal( baidu("#select5").val(), "3", "Check value on ambiguous select." );

	//修改
	// if ( baidu.fn.serialize ) {
	// 	var checks = baidu("<input type='checkbox' name='test' value='1'/><input type='checkbox' name='test' value='2'/><input type='checkbox' name='test' value=''/><input type='checkbox' name='test'/>").appendTo("#form");

	// 	deepEqual( checks.serialize(), "", "Get unchecked values." );

	// 	equal( checks.eq(3).val(), "on", "Make sure a value of 'on' is provided if none is specified." );

	// 	checks.val([ "2" ]);
	// 	deepEqual( checks.serialize(), "test=2", "Get a single checked value." );

	// 	checks.val([ "1", "" ]);
	// 	deepEqual( checks.serialize(), "test=1&test=", "Get multiple checked values." );

	// 	checks.val([ "", "2" ]);
	// 	deepEqual( checks.serialize(), "test=2&test=", "Get multiple checked values." );

	// 	checks.val([ "1", "on" ]);
	// 	deepEqual( checks.serialize(), "test=1&test=on", "Get multiple checked values." );

	// 	checks.remove();
	// }

	var $button = baidu("<button value='foobar'>text</button>").insertAfter("#button");
	equal( $button.val(), "foobar", "Value retrieval on a button does not return innerHTML" );
	equal( $button.val("baz").html(), "text", "Setting the value does not change innerHTML" );

	equal( baidu("<option/>").val("test").attr("value"), "test", "Setting value sets the value attribute" );
});

if ( "value" in document.createElement("meter") &&
			"value" in document.createElement("progress") ) {

	test("val() respects numbers without exception (Bug #9319)", function() {

		expect(4);

		var $meter = baidu("<meter min='0' max='10' value='5.6'></meter>"),
			$progress = baidu("<progress max='10' value='1.5'></progress>");

		try {
			equal( typeof $meter.val(), "number", "meter, returns a number and does not throw exception" );
			equal( $meter.val(), $meter[0].value, "meter, api matches host and does not throw exception" );

			equal( typeof $progress.val(), "number", "progress, returns a number and does not throw exception" );
			equal( $progress.val(), $progress[0].value, "progress, api matches host and does not throw exception" );

		} catch(e) {}

		$meter.remove();
		$progress.remove();
	});
}

var testVal = function(valueObj) {
	//expect(8);

	QUnit.reset();
	baidu("#text1").val(valueObj( "test" ));
	equal( document.getElementById("text1").value, "test", "Check for modified (via val(String)) value of input element" );

	//修改
	baidu("#text1").val(valueObj( undefined ));
	//equal( document.getElementById("text1").value, "", "Check for modified (via val(undefined)) value of input element" );

	baidu("#text1").val(valueObj( 67 ));
	//equal( document.getElementById("text1").value, "67", "Check for modified (via val(Number)) value of input element" );

	baidu("#text1").val(valueObj( null ));
	//equal( document.getElementById("text1").value, "", "Check for modified (via val(null)) value of input element" );

	var $select1 = baidu("#select1");
	$select1.val(valueObj( "3" ));
	equal( $select1.val(), "3", "Check for modified (via val(String)) value of select element" );

	$select1.val(valueObj( 2 ));
	equal( $select1.val(), "2", "Check for modified (via val(Number)) value of select element" );

// 	var $select1 = jQuery("#select1");
// 	$select1.append("<option value='4'>four</option>");
// 	$select1.val(valueObj( 4 ));
// 	equal( $select1.val(), "4", "Should be possible to set the val() to a newly created option" );
	// using contents will get comments regular, text, and comment nodes
	var j = baidu("#nonnodes").contents();
	j.val(valueObj( "asdf" ));
	equal( j.val(), "asdf", "Check node,textnode,comment with val()" );

	//修改
	//j.removeAttr("value");
};

test("val(String/Number)", function() {
	testVal(bareObj);
});

test("val(Function)", function() {
	testVal(functionReturningObj);
});

//修改
// test( "val(Array of Numbers) (Bug #7123)", function() {
// 	expect(4);
// 	$("#form").append("<input type='checkbox' name='arrayTest' value='1' /><input type='checkbox' name='arrayTest' value='2' /><input type='checkbox' name='arrayTest' value='3' checked='checked' /><input type='checkbox' name='arrayTest' value='4' />");
// 	var elements = baidu("input[name=arrayTest]").val([ 1, 2 ]);
// 	ok( elements[0].checked, "First element was checked" );
// 	ok( elements[1].checked, "Second element was checked" );
// 	ok( !elements[2].checked, "Third element was unchecked" );
// 	ok( !elements[3].checked, "Fourth element remained unchecked" );

// 	elements.remove();
// });

test("val(Function) with incoming value", function() {
	//expect(10);

	QUnit.reset();
	var oldVal = baidu("#text1").val();

	baidu("#text1").val(function(i, val) {
		equal( val, oldVal, "Make sure the incoming value is correct." );
		return "test";
	});

	equal( document.getElementById("text1").value, "test", "Check for modified (via val(String)) value of input element" );

	oldVal = baidu("#text1").val();

	baidu("#text1").val(function(i, val) {
		equal( val, oldVal, "Make sure the incoming value is correct." );
		return 67;
	});

	equal( document.getElementById("text1").value, "67", "Check for modified (via val(Number)) value of input element" );

	oldVal = baidu("#select1").val();

	baidu("#select1").val(function(i, val) {
		equal( val, oldVal, "Make sure the incoming value is correct." );
		return "3";
	});

	equal( baidu("#select1").val(), "3", "Check for modified (via val(String)) value of select element" );

	oldVal = baidu("#select1").val();

	baidu("#select1").val(function(i, val) {
		equal( val, oldVal, "Make sure the incoming value is correct." );
		return 2;
	});

	equal( baidu("#select1").val(), "2", "Check for modified (via val(Number)) value of select element" );

	baidu("#select1").append("<option value='4'>four</option>");

	oldVal = baidu("#select1").val();

	// baidu("#select1").val(function(i, val) {
	// 	equal( val, oldVal, "Make sure the incoming value is correct." );
	// 	return 4;
	// });

	// equal( baidu("#select1").val(), "4", "Should be possible to set the val() to a newly created option" );
});

// testing if a form.reset() breaks a subsequent call to a select element's .val() (in IE only)
test("val(select) after form.reset() (Bug #2551)", function() {
	expect(2);
	//expect(3);

	baidu("<form id='kk' name='kk'><select id='kkk'><option value='cf'>cf</option><option value='gf'>gf</option></select></form>").appendTo("#qunit-fixture");

	baidu("#kkk").val( "gf" );

	document["kk"].reset();

	equal( baidu("#kkk")[0].value, "cf", "Check value of select after form reset." );
	equal( baidu("#kkk").val(), "cf", "Check value of select after form reset." );

	//修改
	// re-verify the multi-select is not broken (after form.reset) by our fix for single-select
	//deepEqual( baidu("#select3").val(), ["1", "2"], "Call val() on a multiple=\"multiple\" select" );

	baidu("#kk").remove();
});

test("dom为空的情况",function(){
    var result = baidu("#baidujsxiaozu").val();
    equal(result,undefined,'get方法');
    var result = baidu("#baidujsxiaozu").val('无法金额非连裤袜家乐福');
    ok(result,'有东西就行');
});

//准备工序
function prepareTest(){
	var html = "<div id='body'>"+
	"<!-- Test HTML -->"+
	"<div id='nothiddendiv' style='height:1px;background:white;' class='nothiddendiv'>"+
		"<div id='nothiddendivchild'></div>"+
	"</div>"+
	"<!-- this iframe is outside the #qunit-fixture so it won't reload constantly wasting time, but it means the tests must be 'safe' and clean up after themselves -->"+
	"<iframe id='loadediframe' name='loadediframe' style='display:none;'>"+
	"<html>"+
	  "<head>"+
	    "<title>iframe</title>"+
	  "</head>"+
	  "<body>"+
	    "<div><span>span text</span></div>"+
	  "</body>"+
	"</html>"+
	"</iframe>"+
	"<dl id='dl' style='position:absolute;top:-32767px;left:-32767px;width:1px'>"+
	"<div id='qunit-fixture'>"+
		"<p id='firstp'>See <a id='simon1' href='http://simon.incutio.com/archive/2003/03/25/#getElementsBySelector' rel='bookmark'>this blog entry</a> for more information.</p>"+
		"<p id='ap'>"+
			"Here are some links in a normal paragraph: <a id='google' href='http://www.google.com/' title='Google!'>Google</a>,"+
			"<a id='groups' href='http://groups.google.com/' class='GROUPS'>Google Groups (Link)</a>."+
			"This link has <code><a href='http://smin' id='anchor1'>class='blog'</a></code>:"+
			"<a href='http://diveintomark.org/' class='blog' hreflang='en' id='mark'>diveintomark</a>"+

		"</p>"+
		"<div id='foo'>"+
			"<p id='sndp'>Everything inside the red border is inside a div with <code>id='foo'</code>.</p>"+
			"<p lang='en' id='en'>This is a normal link: <a id='yahoo' href='http://www.yahoo.com/' class='blogTest'>Yahoo</a></p>"+
			"<p id='sap'>This link has <code><a href='#2' id='anchor2'>class='blog'</a></code>: <a href='http://simon.incutio.com/' class='blog link' id='simon'>Simon Willison's Weblog</a></p>"+

		"</div>"+
		"<span id='name+value'></span>"+
		"<p id='first'>Try them out:</p>"+
		"<ul id='firstUL'></ul>"+
		"<ol id='empty'></ol>"+
		"<form id='form' action='formaction'>"+
			"<label for='action' id='label-for'>Action:</label>"+
			"<input type='text' name='action' value='Test' id='text1' maxlength='30'/>"+
			"<input type='text' name='text2' value='Test' id='text2' disabled='disabled'/>"+
			"<input type='radio' name='radio1' id='radio1' value='on'/>"+

			"<input type='radio' name='radio2' id='radio2' checked='checked'/>"+
			"<input type='checkbox' name='check' id='check1' checked='checked'/>"+
			"<input type='checkbox' id='check2' value='on'/>"+

			"<input type='hidden' name='hidden' id='hidden1'/>"+
			"<input type='text' style='display:none;' name='foo[bar]' id='hidden2'/>"+

			"<input type='text' id='name' name='name' value='name' />"+
			"<input type='search' id='search' name='search' value='search' />"+

			"<button id='button' name='button' type='button'>Button</button>"+

			"<textarea id='area1' maxlength='30'>foobar</textarea>"+

			"<select name='select1' id='select1'>"+
				"<option id='option1a' class='emptyopt' value=''>Nothing</option>"+
				"<option id='option1b' value='1'>1</option>"+
				"<option id='option1c' value='2'>2</option>"+
				"<option id='option1d' value='3'>3</option>"+
			"</select>"+
			"<select name='select2' id='select2'>"+
				"<option id='option2a' class='emptyopt' value=''>Nothing</option>"+
				"<option id='option2b' value='1'>1</option>"+
				"<option id='option2c' value='2'>2</option>"+
				"<option id='option2d' selected='selected' value='3'>3</option>"+
			"</select>"+
			"<select name='select3' id='select3' multiple='multiple'>"+
				"<option id='option3a' class='emptyopt' value=''>Nothing</option>"+
				"<option id='option3b' selected='selected' value='1'>1</option>"+
				"<option id='option3c' selected='selected' value='2'>2</option>"+
				"<option id='option3d' value='3'>3</option>"+
				"<option id='option3e'>no value</option>"+
			"</select>"+
			"<select name='select4' id='select4' multiple='multiple'>"+
				"<optgroup disabled='disabled'>"+
					"<option id='option4a' class='emptyopt' value=''>Nothing</option>"+
					"<option id='option4b' disabled='disabled' selected='selected' value='1'>1</option>"+
					"<option id='option4c' selected='selected' value='2'>2</option>"+
				"</optgroup>"+
				"<option selected='selected' disabled='disabled' id='option4d' value='3'>3</option>"+
				"<option id='option4e'>no value</option>"+
			"</select>"+
			"<select name='select5' id='select5'>"+
				"<option id='option5a' value='3'>1</option>"+
				"<option id='option5b' value='2'>2</option>"+
				"<option id='option5c' value='1' data-attr=''>3</option>"+
			"</select>"+

			"<object id='object1' codebase='stupid'>"+
				"<param name='p1' value='x1' />"+
				"<param name='p2' value='x2' />"+
			"</object>"+

			"<span id='台北Táiběi'></span>"+
			"<span id='台北' lang='中文'></span>"+
			"<span id='utf8class1' class='台北Táiběi 台北'></span>"+
			"<span id='utf8class2' class='台北'></span>"+
			"<span id='foo:bar' class='foo:bar'></span>"+
			"<span id='test.foo[5]bar' class='test.foo[5]bar'></span>"+

			"<foo_bar id='foobar'>test element</foo_bar>"+
		"</form>"+
		"<b id='floatTest'>Float test.</b>"+
		"<iframe id='iframe' name='iframe'></iframe>"+
		"<form id='lengthtest'>"+
			"<input type='text' id='lenght123' name='test'/>"+
			"<input type='text' id='idTest' name='id'/>"+
		"</form>"+
		"<table id='table'></table>"+

		"<form id='name-tests'>"+
			"<!-- Inputs with a grouped name attribute. -->"+
			"<input name='types[]' id='types_all' type='checkbox' value='all' />"+
			"<input name='types[]' id='types_anime' type='checkbox' value='anime' />"+
			"<input name='types[]' id='types_movie' type='checkbox' value='movie' />"+
		"</form>"+

		"<form id='testForm' action='#' method='get'>"+
			"<textarea name='T3' rows='2' cols='15'>?"+
"Z</textarea>"+
			"<input type='hidden' name='H1' value='x' />"+
			"<input type='hidden' name='H2' />"+
			"<input name='PWD' type='password' value='' />"+
			"<input name='T1' type='text' />"+
			"<input name='T2' type='text' value='YES' readonly='readonly' />"+
			"<input type='checkbox' name='C1' value='1' />"+
			"<input type='checkbox' name='C2' />"+
			"<input type='radio' name='R1' value='1' />"+
			"<input type='radio' name='R1' value='2' />"+
			"<input type='text' name='My Name' value='me' />"+
			"<input type='reset' name='reset' value='NO' />"+
			"<select name='S1'>"+
				"<option value='abc'>ABC</option>"+
				"<option value='abc'>ABC</option>"+
				"<option value='abc'>ABC</option>"+
			"</select>"+
			"<select name='S2' multiple='multiple' size='3'>"+
				"<option value='abc'>ABC</option>"+
				"<option value='abc'>ABC</option>"+
				"<option value='abc'>ABC</option>"+
			"</select>"+
			"<select name='S3'>"+
				"<option selected='selected'>YES</option>"+
			"</select>"+
			"<select name='S4'>"+
				"<option value='' selected='selected'>NO</option>"+
			"</select>"+
			"<input type='submit' name='sub1' value='NO' />"+
			"<input type='submit' name='sub2' value='NO' />"+
			"<input type='image' name='sub3' value='NO' />"+
			"<button name='sub4' type='submit' value='NO'>NO</button>"+
			"<input name='D1' type='text' value='NO' disabled='disabled' />"+
			"<input type='checkbox' checked='checked' disabled='disabled' name='D2' value='NO' />"+
			"<input type='radio' name='D3' value='NO' checked='checked' disabled='disabled' />"+
			"<select name='D4' disabled='disabled'>"+
				"<option selected='selected' value='NO'>NO</option>"+
			"</select>"+
			"<input id='list-test' type='text' />"+
			"<datalist id='datalist'>"+
				"<option value='option'></option>"+
			"</datalist>"+
		"</form>"+
		"<div id='moretests'>"+
			"<form>"+
				"<div id='checkedtest' style='display:none;'>"+
					"<input type='radio' name='checkedtestradios' checked='checked'/>"+
					"<input type='radio' name='checkedtestradios' value='on'/>"+
					"<input type='checkbox' name='checkedtestcheckboxes' checked='checked'/>"+
					"<input type='checkbox' name='checkedtestcheckboxes' />"+
				"</div>"+
			"</form>"+
			"<div id='nonnodes'><span>hi</span> there <!-- mon ami --></div>"+
			"<div id='t2037'>"+
				"<div><div class='hidden'>hidden</div></div>"+
			"</div>"+
			"<div id='t6652'>"+
				"<div></div>"+
			"</div>"+
			"<div id='no-clone-exception'><object><embed></embed></object></div>"+
		"</div>"+

		"<div id='tabindex-tests'>"+
			"<ol id='listWithTabIndex' tabindex='5'>"+
				"<li id='foodWithNegativeTabIndex' tabindex='-1'>Rice</li>"+
				"<li id='foodNoTabIndex'>Beans</li>"+
				"<li>Blinis</li>"+
				"<li>Tofu</li>"+
			"</ol>"+

			"<div id='divWithNoTabIndex'>I'm hungry. I should...</div>"+
			"<span>...</span><a href='#' id='linkWithNoTabIndex'>Eat lots of food</a><span>...</span> |"+
			"<span>...</span><a href='#' id='linkWithTabIndex' tabindex='2'>Eat a little food</a><span>...</span> |"+
			"<span>...</span><a href='#' id='linkWithNegativeTabIndex' tabindex='-1'>Eat no food</a><span>...</span>"+
			"<span>...</span><a id='linkWithNoHrefWithNoTabIndex'>Eat a burger</a><span>...</span>"+
			"<span>...</span><a id='linkWithNoHrefWithTabIndex' tabindex='1'>Eat some funyuns</a><span>...</span>"+
			"<span>...</span><a id='linkWithNoHrefWithNegativeTabIndex' tabindex='-1'>Eat some funyuns</a><span>...</span>"+
		"</div>"+

		"<div id='liveHandlerOrder'>"+
			"<span id='liveSpan1'><a href='#' id='liveLink1'></a></span>"+
			"<span id='liveSpan2'><a href='#' id='liveLink2'></a></span>"+
		"</div>"+

		"<div id='siblingTest'>"+
			"<em id='siblingfirst'>1</em>"+
			"<em id='siblingnext'>2</em>"+
		"</div>"+
	"</div>"+
	"</dl>"+
	"<div id='fx-test-group' style='position:absolute;width:1px;height:1px;overflow:hidden;'>"+
		"<div id='fx-queue' name='test'>"+
			"<div id='fadein' class='chain test' name='div'>fadeIn<div>fadeIn</div></div>"+
			"<div id='fadeout' class='chain test out'>fadeOut<div>fadeOut</div></div>"+

			"<div id='show' class='chain test'>show<div>show</div></div>"+
			"<div id='hide' class='chain test out'>hide<div>hide</div></div>"+

			"<div id='togglein' class='chain test'>togglein<div>togglein</div></div>"+
			"<div id='toggleout' class='chain test out'>toggleout<div>toggleout</div></div>"+


			"<div id='slideup' class='chain test'>slideUp<div>slideUp</div></div>"+
			"<div id='slidedown' class='chain test out'>slideDown<div>slideDown</div></div>"+

			"<div id='slidetogglein' class='chain test'>slideToggleIn<div>slideToggleIn</div></div>"+
			"<div id='slidetoggleout' class='chain test out'>slideToggleOut<div>slideToggleOut</div></div>"+

			"<div id='fadetogglein' class='chain test'>fadeToggleIn<div>fadeToggleIn</div></div>"+
			"<div id='fadetoggleout' class='chain test out'>fadeToggleOut<div>fadeToggleOut</div></div>"+

			"<div id='fadeto' class='chain test'>fadeTo<div>fadeTo</div></div>"+
		"</div>"+

		"<div id='fx-tests'></div>"+
	"</div>"+
	"</div>";

	var body = $('body');
	temp = body.html();
	body.html(html+temp)
	body.prop('id','body');

};