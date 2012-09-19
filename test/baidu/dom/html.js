module("baidu.dom.html",{});

var bareObj = function(value) { return value; };
var functionReturningObj = function(value) { return (function() { return value; }); };
var manipulationBareObj = function(value) { return value; };
var manipulationFunctionReturningObj = function(value) { return (function() { return value; }); };

test('prepareTest',function(){
	expect(1);
	stop();
	ua.importsrc("baidu.dom.append,baidu.dom.each,baidu.dom.appendTo,baidu.dom.trigger,baidu.dom.find,baidu.dom.removeData,baidu.dom.removeAttr,baidu.dom.insertAfter,baidu.dom.html,baidu.dom.eq,baidu.dom.remove,baidu.dom.contents", function(){
		start();
		prepareTest();
		ok(true,'ok');
	}, "baidu.dom.contents", "baidu.dom.html");
});

test("html(undefined)", function() {
	expect(1);
	equal( baidu("#foo").html("<i>test</i>").html(undefined).toLowerCase(), "<i>test</i>", ".html(undefined) is chainable (#5571)" );
});


test("html(String) with HTML5 (Bug #6485)", function() {
	if(baidu.browser.ie !== 6){
		expect(2);
		baidu("#qunit-fixture").html("<article><section><aside>HTML5 elements</aside></section></article>");
		equal( jQuery("#qunit-fixture").children().children().length, 1, "Make sure HTML5 article elements can hold children. innerHTML shortcut path" );
		equal( jQuery("#qunit-fixture").children().children().children().length, 1, "Make sure nested HTML5 elements can hold children." );
	}
});


// test("html() object element #10324", function() {
// 	expect( 1 );

// 	var object = $("<object id='object2'><param name='object2test' value='test'></param></object>?").appendTo("#qunit-fixture"),
// 			clone = object.clone();

// 	object = baidu("<object id='object2'><param name='object2test' value='test'></param></object>?");
// 	equal( clone.html(), object.html(), "html() returns correct innerhtml of cloned object elements" );
// });


test("html() on empty set", function() {
	expect(1);
	strictEqual( baidu().html(), undefined, ".html() returns undefined for empty sets (#11962)" );
});

var testHtml = function(valueObj) {
	//expect(35);

	baidu["scriptorder"] = 0;

	var div2 = jQuery("#qunit-fixture > div");
	var div = baidu(div2);
	div.html(valueObj("<b>test</b>"));
	var pass = true;
	for ( var i = 0; i < div.size(); i++ ) {
		if ( div.get(i).childNodes.length != 1 ) {
			pass = false;
		}
	}
	ok( pass, "Set HTML" );

	div = baidu("<div/>").html( valueObj("<div id='parent_1'><div id='child_1'/></div><div id='parent_2'/>") );

	equal( $(div).children().length, 2, "Make sure two child nodes exist." );
	equal( $(div).children().children().length, 1, "Make sure that a grandchild exists." );

	var space = baidu("<div/>").html(valueObj("&#160;"))[0].innerHTML;
	ok( /^\xA0$|^&nbsp;$/.test( space ), "Make sure entities are passed through correctly." );
	equal( baidu("<div/>").html(valueObj("&amp;"))[0].innerHTML, "&amp;", "Make sure entities are passed through correctly." );

	baidu("#qunit-fixture").html(valueObj("<style>.foobar{color:green;}</style>"));

	equal( $("#qunit-fixture").children().length, 1, "Make sure there is a child element." );
	equal( $("#qunit-fixture").children()[0].nodeName.toUpperCase(), "STYLE", "And that a style element was inserted." );

	//QUnit.reset();
	prepareTest();

	//修改
	// using contents will get comments regular, text, and comment nodes
	var j = baidu("#nonnodes").contents();
	j.html(valueObj("<b>bold</b>"));
	// this is needed, or the expando added by baidu unique will yield a different html
	//j.find("b").removeData();
	equal( j.html().replace(/ xmlns="[^"]+"/g, "").toLowerCase(), "<b>bold</b>", "Check node,textnode,comment with html()" );

	baidu("#qunit-fixture").html(valueObj("<select/>"));
	baidu("#qunit-fixture select").html(valueObj("<option>O1</option><option selected='selected'>O2</option><option>O3</option>"));
	equal( baidu("#qunit-fixture select").val(), "O2", "Selected option correct" );

	var $div = baidu("<div />");
	equal( $div.html(valueObj( 5 )).html(), "5", "Setting a number as html" );
	equal( $div.html(valueObj( 0 )).html(), "0", "Setting a zero as html" );

	var $div2 = baidu("<div/>"), insert = "&lt;div&gt;hello1&lt;/div&gt;";
	equal( $div2.html(insert).html().replace(/>/g, "&gt;"), insert, "Verify escaped insertion." );
	equal( $div2.html("x" + insert).html().replace(/>/g, "&gt;"), "x" + insert, "Verify escaped insertion." );
	//equal( $div2.html(" " + insert).html().replace(/>/g, "&gt;"), " " + insert, "Verify escaped insertion." );

	var map = baidu("<map/>").html(valueObj("<area id='map01' shape='rect' coords='50,50,150,150' href='http://www.baidu.com/' alt='baidu'>"));

	equal( map[0].childNodes.length, 1, "The area was inserted." );
	equal( map[0].firstChild.nodeName.toLowerCase(), "area", "The area was inserted." );

	//QUnit.reset();
	prepareTest();
	baidu("#qunit-fixture").html(valueObj("<script type='something/else'>ok( false, 'Non-script evaluated.' );</script><script type='text/javascript'>ok( true, 'text/javascript is evaluated.' );</script><script>ok( true, 'No type is evaluated.' );</script><div><script type='text/javascript'>ok( true, 'Inner text/javascript is evaluated.' );</script><script>ok( true, 'Inner No type is evaluated.' );</script><script type='something/else'>ok( false, 'Non-script evaluated.' );</script><script type='type/ecmascript'>ok( true, 'type/ecmascript evaluated.' );</script></div>"));

	var child = baidu("#qunit-fixture").find("script");
	//equal( child.length, 2, "Make sure that two non-JavaScript script tags are left." );
	// equal( child[0].type, "something/else", "Verify type of script tag." );
	// equal( child[1].type, "something/else", "Verify type of script tag." );

	baidu("#qunit-fixture").html(valueObj("<script>ok( true, 'Test repeated injection of script.' );</script>"));
	baidu("#qunit-fixture").html(valueObj("<script>ok( true, 'Test repeated injection of script.' );</script>"));
	baidu("#qunit-fixture").html(valueObj("<script>ok( true, 'Test repeated injection of script.' );</script>"));

	baidu("#qunit-fixture").html(valueObj("<script type='text/javascript'>ok( true, 'baidu().html().evalScripts() Evals Scripts Twice in Firefox, see #975 (1)' );</script>"));

	baidu("#qunit-fixture").html(valueObj("foo <form><script type='text/javascript'>ok( true, 'baidu().html().evalScripts() Evals Scripts Twice in Firefox, see #975 (2)' );</script></form>"));

	//修改
	//baidu("#qunit-fixture").html(valueObj("<script>equal(baidu.scriptorder++, 0, 'Script is executed in order');equal(baidu('#scriptorder').length, 1,'Execute after html (even though appears before)')<\/script><span id='scriptorder'><script>equal(baidu.scriptorder++, 1, 'Script (nested) is executed in order');equal(baidu('#scriptorder').length, 1,'Execute after html')<\/script></span><script>equal(baidu.scriptorder++, 2, 'Script (unnested) is executed in order');equal(baidu('#scriptorder').length, 1,'Execute after html')<\/script>"));
};

test("html(String)", function() {
	testHtml(manipulationBareObj);
});

test("html(Function)", function() {
	testHtml(manipulationFunctionReturningObj);

	//expect(37);

	//QUnit.reset();
	prepareTest();

	baidu("#qunit-fixture").html(function(){
		return baidu(this).text();
	});

	ok( !/</.test( baidu("#qunit-fixture").html() ), "Replace html with text." );
	ok( baidu("#qunit-fixture").html().length > 0, "Make sure text exists." );
});

test("html(Function) with incoming value", function() {
	//expect(20);

	var div = baidu("#qunit-fixture > div"), old = div.map(function(){ return baidu(this).html(); });

	div.html(function(i, val) {
		equal( val, old[i], "Make sure the incoming value is correct." );
		return "<b>test</b>";
	});

	var pass = true;
	div.each(function(){
		if ( this.childNodes.length !== 1 ) {
			pass = false;
		}
	});
	ok( pass, "Set HTML" );

	// using contents will get comments regular, text, and comment nodes
	prepareTest();
	var j = baidu("#nonnodes").contents();
	old = j.map(function(){ return baidu(this).html(); });

	j.html(function(i, val) {
		equal( val, old[i], "Make sure the incoming value is correct." );
		return "<b>bold</b>";
	});

	// Handle the case where no comment is in the document
	// if ( j.length === 2 ) {
	// 	equal( null, null, "Make sure the incoming value is correct." );
	// }


	$(j).find("b").removeData();
	equal( j.html().replace(/ xmlns="[^"]+"/g, "").toLowerCase(), "<b>bold</b>", "Check node,textnode,comment with html()" );

	var $div = baidu("<div />");

	equal( $div.html(function(i, val) {
		equal( val, "", "Make sure the incoming value is correct." );
		return 5;
	}).html(), "5", "Setting a number as html" );

	equal( $div.html(function(i, val) {
		equal( val, "5", "Make sure the incoming value is correct." );
		return 0;
	}).html(), "0", "Setting a zero as html" );

	var $div2 = baidu("<div/>"), insert = "&lt;div&gt;hello1&lt;/div&gt;";
	equal( $div2.html(function(i, val) {
		equal( val, "", "Make sure the incoming value is correct." );
		return insert;
	}).html().replace(/>/g, "&gt;"), insert, "Verify escaped insertion." );

	equal( $div2.html(function(i, val) {
		equal( val.replace(/>/g, "&gt;"), insert, "Make sure the incoming value is correct." );
		return "x" + insert;
	}).html().replace(/>/g, "&gt;"), "x" + insert, "Verify escaped insertion." );

	// equal( $div2.html(function(i, val) {
	// 	equal( val.replace(/>/g, "&gt;"), "x" + insert, "Make sure the incoming value is correct." );
	// 	return " " + insert;
	// }).html().replace(/>/g, "&gt;"), " " + insert, "Verify escaped insertion." );
});

test("dom为空的情况",function(){
    var result = baidu("#baidujsxiaozu").html();
    equal(result,undefined,'get方法');
    var result = baidu("#baidujsxiaozu").html('无法金额非连裤袜家乐福');
    ok(result,'有东西就行');
});

// test("html() - script exceptions bubble (#11743)", function() {
// 	expect(2);

// 	raises(function() {
// 		baidu("#qunit-fixture").html("<script>undefined(); ok( false, 'error not thrown' );</script>");
// 		ok( false, "error ignored" );
// 	}, "exception bubbled from inline script" );

// 	raises(function() {
// 		baidu("#qunit-fixture").html("<script src='data/badcall.js'></script>");
// 		ok( false, "error ignored" );
// 	}, "exception bubbled from remote script" );
// });

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
