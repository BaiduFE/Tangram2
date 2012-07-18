module("baidu.dom.val",{});

test('prepareTest',function(){
	expect(1);
	stop();
	ua.importsrc("baidu.dom.append,baidu.dom.each,baidu.dom.appendTo,baidu.dom.removeAttr,baidu.dom.insertAfter,baidu.dom.html,baidu.dom.eq,baidu.dom.remove,baidu.dom.contents", function(){
		start();
		prepareTest();
		ok(true,'ok');
	}, "baidu.dom.contents", "baidu.dom.val");
});

// Ensure that an extended Array prototype doesn't break jQuery
Array.prototype.arrayProtoFn = function(arg) { throw("arrayProtoFn should not be called"); };

var manipulationBareObj = function(value) { return value; };
var manipulationFunctionReturningObj = function(value) { return (function() { return value; }); };


/*
	======== local reference =======
	manipulationBareObj and manipulationFunctionReturningObj can be used to test passing functions to setters
	See testVal below for an example

	bareObj( value );
		This function returns whatever value is passed in

	functionReturningObj( value );
		Returns a function that returns the value
*/

test("text()", function() {
	expect(5);
	var expected = "This link has class=\"blog\": Simon Willison's Weblog";
	equal( jQuery("#sap").text(), expected, "Check for merged text of more then one element." );

	// Check serialization of text values
	equal( jQuery(document.createTextNode("foo")).text(), "foo", "Text node was retreived from .text()." );
	notEqual( jQuery(document).text(), "", "Retrieving text for the document retrieves all text (#10724).");

	// Retrieve from document fragments #10864
	var frag = document.createDocumentFragment();
		frag.appendChild( document.createTextNode("foo") );

	equal( jQuery( frag ).text(), "foo", "Document Fragment Text node was retreived from .text().");

	var $newLineTest = jQuery("<div>test<br/>testy</div>").appendTo("#moretests");
	$newLineTest.find("br").replaceWith("\n");
	equal( $newLineTest.text(), "test\ntesty", "text() does not remove new lines (#11153)" );

	$newLineTest.remove();
});

test("text(undefined)", function() {
	expect(1);
	equal( jQuery("#foo").text("<div").text(undefined)[0].innerHTML, "&lt;div", ".text(undefined) is chainable (#5571)" );
});

var testText = function(valueObj) {
	expect(4);
	var val = valueObj("<div><b>Hello</b> cruel world!</div>");
	equal( jQuery("#foo").text(val)[0].innerHTML.replace(/>/g, "&gt;"), "&lt;div&gt;&lt;b&gt;Hello&lt;/b&gt; cruel world!&lt;/div&gt;", "Check escaped text" );

	// using contents will get comments regular, text, and comment nodes
	var j = jQuery("#nonnodes").contents();
	j.text(valueObj("hi!"));
	equal( jQuery(j[0]).text(), "hi!", "Check node,textnode,comment with text()" );
	equal( j[1].nodeValue, " there ", "Check node,textnode,comment with text()" );

	// Blackberry 4.6 doesn't maintain comments in the DOM
	equal( jQuery("#nonnodes")[0].childNodes.length < 3 ? 8 : j[2].nodeType, 8, "Check node,textnode,comment with text()" );
};

test("text(String)", function() {
	testText(manipulationBareObj);
});

test("text(Function)", function() {
	testText(manipulationFunctionReturningObj);
});

test("text(Function) with incoming value", function() {
	expect(2);

	var old = "This link has class=\"blog\": Simon Willison's Weblog";

	jQuery("#sap").text(function(i, val) {
		equal( val, old, "Make sure the incoming value is correct." );
		return "foobar";
	});

	equal( jQuery("#sap").text(), "foobar", "Check for merged text of more then one element." );

	QUnit.reset();
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
			"<input type='text' id='length' name='test'/>"+
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