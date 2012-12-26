module("baidu.dom.attr",{});

var bareObj = function(value) { return value; };
var functionReturningObj = function(value) { return (function() { return value; }); };
//
test('prepareTest',function(){
    expect(1);
    stop();
    ua.importsrc('baidu.dom.appendTo,baidu.dom.removeAttr,baidu.dom.remove,baidu.dom.insertAfter,baidu.dom.prop,baidu.dom.contents,baidu.dom.text,baidu.dom.css,baidu.dom.height,baidu.dom.width,baidu.dom.html', function(){
        start();
        prepareTest();
        ok(true,'ok');
    }, "baidu.dom.appendTo");
});

//start
test("attr(String)", function() {
    //expect(46);   
    equal( baidu("#text1").attr("type"), "text", "Check for type attribute" );
    equal( baidu("#radio1").attr("type"), "radio", "Check for type attribute" );
    equal( baidu("#check1").attr("type"), "checkbox", "Check for type attribute" );
    equal( baidu("#simon1").attr("rel"), "bookmark", "Check for rel attribute" );
    equal( baidu("#google").attr("title"), "Google!", "Check for title attribute" );
    equal( baidu("#mark").attr("hreflang"), "en", "Check for hreflang attribute" );
    equal( baidu("#en").attr("lang"), "en", "Check for lang attribute" );
    
    
    equal( baidu("#simon").attr("class"), "blog link", "Check for class attribute" );
    equal( baidu("#name").attr("name"), "name", "Check for name attribute" );
    equal( baidu("#text1").attr("name"), "action", "Check for name attribute" );
    ok( baidu("#form").attr("action").indexOf("formaction") >= 0, "Check for action attribute" );
    equal( baidu("#text1").attr("value", "t").attr("value"), "t", "Check setting the value attribute" );
    equal( baidu("<div value='t'></div>").attr("value"), "t", "Check setting custom attr named 'value' on a div" );
    equal( baidu("#form").attr("blah", "blah").attr("blah"), "blah", "Set non-existant attribute on a form" );
    equal( baidu("#foo").attr("height"), undefined, "Non existent height attribute should return undefined" );

    // [7472] & [3113] (form contains an input with name="action" or name="id")
    var extras = baidu("<input name='id' name='name' /><input id='target' name='target' />").appendTo("#testForm");
    equal( baidu("#form").attr("action","newformaction").attr("action"), "newformaction", "Check that action attribute was changed" );
    equal( baidu("#testForm").attr("target"), undefined, "Retrieving target does not equal the input with name=target" );
    equal( baidu("#testForm").attr("target", "newTarget").attr("target"), "newTarget", "Set target successfully on a form" );
    equal( baidu("#testForm").removeAttr("id").attr("id"), undefined, "Retrieving id does not equal the input with name=id after id is removed [#7472]" );

    // Bug #3685 (form contains input with name="name")
    //修改 ie6
    //equal( baidu("#testForm").attr("name"), undefined, "Retrieving name does not retrieve input with name=name" );
    extras.remove();

    equal( baidu("#text1").attr("maxlength"), "30", "Check for maxlength attribute" );
    equal( baidu("#text1").attr("maxLength"), "30", "Check for maxLength attribute" );
    equal( baidu("#area1").attr("maxLength"), "30", "Check for maxLength attribute" );
    // using innerHTML in IE causes href attribute to be serialized to the full path
    baidu("<a/>").attr({ "id": "tAnchor5", "href": "#5" }).appendTo("#qunit-fixture");
    equal( baidu("#tAnchor5").attr("href"), "#5", "Check for non-absolute href (an anchor)" );

    // list attribute is readonly by default in browsers that support it
    baidu("#list-test").attr("list", "datalist");
    equal( baidu("#list-test").attr("list"), "datalist", "Check setting list attribute" );

    // Related to [5574] and [5683]
    var body = document.body, $body = baidu(body);

    strictEqual( $body.attr("foo"), undefined, "Make sure that a non existent attribute returns undefined" );

    body.setAttribute("foo", "baz");
    equal( $body.attr("foo"), "baz", "Make sure the dom attribute is retrieved when no expando is found" );

    $body.attr("foo","cool");
    equal( $body.attr("foo"), "cool", "Make sure that setting works well when both expando and dom attribute are available" );

    body.removeAttribute("foo"); // Cleanup

    var select = document.createElement("select"), optgroup = document.createElement("optgroup"), option = document.createElement("option");
    optgroup.appendChild( option );
    select.appendChild( optgroup );

    //修改 ie6
    //equal( baidu( option ).attr("selected"), "selected", "Make sure that a single option is selected, even when in an optgroup." );
    var $img = $("<img style='display:none;' width='215' height='53' src='http://static.jquery.com/files/rocker/images/logo_jquery_215x53.gif'/>").appendTo("body");

    equal( $img.attr("width"), "215", "Retrieve width attribute an an element with display:none." );
    equal( $img.attr("height"), "53", "Retrieve height attribute an an element with display:none." );

    // Check for style support
    ok( !!~baidu("#dl").attr("style").indexOf("position"), "Check style attribute getter, also normalize css props to lowercase" );
    ok( !!~baidu("#foo").attr("style", "position:absolute;").attr("style").indexOf("position"), "Check style setter" );

    // Check value on button element (#1954)
    var $button = baidu("<button value='foobar'>text</button>").insertAfter("#button");
    equal( $button.attr("value"), "foobar", "Value retrieval on a button does not return innerHTML" );
    equal( $button.attr("value", "baz").html(), "text", "Setting the value does not change innerHTML" );

    // Attributes with a colon on a table element (#1591)
    equal( baidu("#table").attr("test:attrib"), undefined, "Retrieving a non-existent attribute on a table with a colon does not throw an error." );
    equal( baidu("#table").attr("test:attrib", "foobar").attr("test:attrib"), "foobar", "Setting an attribute on a table with a colon does not throw an error." );

    var $form = baidu("<form class='something'></form>").appendTo("#qunit-fixture");
    equal( $form.attr("class"), "something", "Retrieve the class attribute on a form." );

    var $a = baidu("<a href='#' onclick='something()'>Click</a>").appendTo("#qunit-fixture");
    equal( $a.attr("onclick"), "something()", "Retrieve ^on attribute without anonymous function wrapper." );

    ok( baidu("<div/>").attr("doesntexist") === undefined, "Make sure undefined is returned when no attribute is found." );
    ok( baidu("<div/>").attr("title") === undefined, "Make sure undefined is returned when no attribute is found." );
    equal( baidu("<div/>").attr("title", "something").attr("title"), "something", "Set the title attribute." );
//  ok( $().attr("doesntexist") === undefined, "Make sure undefined is returned when no element is there." );
    equal( baidu("<div/>").attr("value"), undefined, "An unset value on a div returns undefined." );
    equal( baidu("<input/>").attr("value"), "", "An unset value on an input returns current value." );
    $form = baidu("#form").attr("enctype", "multipart/form-data");


    equal( $form.prop("enctype"), "multipart/form-data", "Set the enctype of a form (encoding in IE6/7 #6743)" );
});

test("attr(String, Function)", function() {
    expect(2);
    equal( baidu("#text1").attr("value", function() { return this.id; })[0].value, "text1", "Set value from id" );
    equal( baidu("#text1").attr("title", function(i) { return i; }).attr("title"), "0", "Set value with an index");
});

test("attr(Hash)", function() {
    expect(3);

    var pass = true;
    baidu("div").attr({foo: "baz", zoo: "ping"}).each(function(){
        if ( this.getAttribute("foo") != "baz" && this.getAttribute("zoo") != "ping" ) pass = false;
    });
    ok( pass, "Set Multiple Attributes" );
    equal( baidu("#text1").attr({value: function() { return this.id; }})[0].value, "text1", "Set attribute to computed value #1" );
    equal( baidu("#text1").attr({title: function(i) { return i; }}).attr("title"), "0", "Set attribute to computed value #2");
});
test("attr(String, Object)", function() {
    //修改
    //expect(81);

    var div = baidu("div").attr("foo", "bar"),
        fail = false;

    for ( var i = 0; i < div.size(); i++ ) {
        if ( div.get(i).getAttribute("foo") != "bar" ){
            fail = i;
            break;
        }
    }

    equal( fail, false, "Set Attribute, the #" + fail + " element didn't get the attribute 'foo'" );

    ok( baidu("#foo").attr({ "width": null }), "Try to set an attribute to nothing" );

    baidu("#name").attr("name", "something");
    equal( baidu("#name").attr("name"), "something", "Set name attribute" );
    baidu("#name").attr("name", null);
    equal( baidu("#name").attr("name"), undefined, "Remove name attribute" );
    var $input = jQuery("<input>", { name: "something", id: "specified" })[0];
    $input = baidu($input);
    equal( $input.attr("name"), "something", "Check element creation gets/sets the name attribute." );
    equal( $input.attr("id"), "specified", "Check element creation gets/sets the id attribute." );

    baidu("#check2").prop("checked", true);
    equal( document.getElementById("check2").checked, true, "Set checked attribute" );

    baidu("#check2").prop("checked", false);
    equal( document.getElementById("check2").checked, false, "Set checked attribute" );

    baidu("#check2").attr("checked", true);
    equal( document.getElementById("check2").checked, true, "Set checked attribute" );
    equal( baidu("#check2").prop("checked"), true, "Set checked attribute" );
    equal( baidu("#check2").attr("checked"), "checked", "Set checked attribute" );

    baidu("#check2").attr("checked", false);
    equal( document.getElementById("check2").checked, false, "Set checked attribute" );

    equal( baidu("#check2").prop("checked"), false, "Set checked attribute" );
    equal( baidu("#check2").attr("checked"), undefined, "Set checked attribute" );
    baidu("#text1").attr("readonly", true);
    equal( document.getElementById("text1").readOnly, true, "Set readonly attribute" );
    equal( baidu("#text1").prop("readOnly"), true, "Set readonly attribute" );
    equal( baidu("#text1").attr("readonly"), "readonly", "Set readonly attribute" );
    baidu("#text1").attr("readonly", false);
    equal( document.getElementById("text1").readOnly, false, "Set readonly attribute" );
    equal( baidu("#text1").prop("readOnly"), false, "Set readonly attribute" );
    equal( baidu("#text1").attr("readonly"), undefined, "Set readonly attribute" );

    baidu("#check2").prop("checked", true);
    equal( document.getElementById("check2").checked, true, "Set checked attribute" );
    equal( baidu("#check2").prop("checked"), true, "Set checked attribute" );
    equal( baidu("#check2").attr("checked"), "checked", "Set checked attribute" );
    baidu("#check2").prop("checked", false);
    equal( document.getElementById("check2").checked, false, "Set checked attribute" );
    equal( baidu("#check2").prop("checked"), false, "Set checked attribute" );
    equal( baidu("#check2").attr("checked"), undefined, "Set checked attribute" );

    baidu("#check2").attr("checked", "checked");
    equal( document.getElementById("check2").checked, true, "Set checked attribute with 'checked'" );
    equal( baidu("#check2").prop("checked"), true, "Set checked attribute" );
    equal( baidu("#check2").attr("checked"), "checked", "Set checked attribute" );

    prepareTest();

    var $radios = jQuery("#checkedtest").find("input[type='radio']");
    $radios.eq(1).click();
    var $radios2 = baidu($radios.eq(1));    
    equal( $radios2.prop("checked"), true, "Second radio was checked when clicked");
    
    
    //去掉
    equal( $radios.attr("checked"), $radios[0].checked ? "checked" : undefined, "Known booleans do not fall back to attribute presence (#10278)");

    baidu("#text1").prop("readOnly", true);
    equal( document.getElementById("text1").readOnly, true, "Set readonly attribute" );
    equal( baidu("#text1").prop("readOnly"), true, "Set readonly attribute" );
    equal( baidu("#text1").attr("readonly"), "readonly", "Set readonly attribute" );
    baidu("#text1").prop("readOnly", false);
    equal( document.getElementById("text1").readOnly, false, "Set readonly attribute" );
    equal( baidu("#text1").prop("readOnly"), false, "Set readonly attribute" );
    equal( baidu("#text1").attr("readonly"), undefined, "Set readonly attribute" );

    baidu("#name").attr("maxlength", "5");
    equal( document.getElementById("name").maxLength, 5, "Set maxlength attribute" );
    baidu("#name").attr("maxLength", "10");
    equal( document.getElementById("name").maxLength, 10, "Set maxlength attribute" );

    // HTML5 boolean attributes
    var $text = baidu("#text1").attr({
        "autofocus": true,
        "required": true
    });
    equal( $text.attr("autofocus"), "autofocus", "Set boolean attributes to the same name" );
    equal( $text.attr("autofocus", false).attr("autofocus"), undefined, "Setting autofocus attribute to false removes it" );
    equal( $text.attr("required"), "required", "Set boolean attributes to the same name" );
    equal( $text.attr("required", false).attr("required"), undefined, "Setting required attribute to false removes it" );

    var $details = baidu("<details open></details>").appendTo("#qunit-fixture");
    equal( $details.attr("open"), "open", "open attribute presense indicates true" );
    equal( $details.attr("open", false).attr("open"), undefined, "Setting open attribute to false removes it" );

    $text.attr("data-something", true);
    equal( $text.attr("data-something"), "true", "Set data attributes");

    //修改，暂无data方法
    // equal( $text.data("something"), true, "Setting data attributes are not affected by boolean settings");
    // $text.attr("data-another", false);
    // equal( $text.attr("data-another"), "false", "Set data attributes");
    // equal( $text.data("another"), false, "Setting data attributes are not affected by boolean settings" );
    // equal( $text.attr("aria-disabled", false).attr("aria-disabled"), "false", "Setting aria attributes are not affected by boolean settings");
    // $text.removeData("something").removeData("another").removeAttr("aria-disabled");

    baidu("#foo").attr("contenteditable", true);
    equal( baidu("#foo").attr("contenteditable"), "true", "Enumerated attributes are set properly" );


    var attributeNode = document.createAttribute("irrelevant"),
        commentNode = document.createComment("some comment"),
        textNode = document.createTextNode("some text"),
        obj = {};


    $.each( [commentNode, textNode, attributeNode], function( i, elem) {
        var $elem = baidu( elem );
        $elem.attr( "nonexisting", "foo" );
        strictEqual( $elem.attr("nonexisting"), undefined, "attr(name, value) works correctly on comment and text nodes (bug #7500)." );
    });

    //修改
    // baidu.each( [window, document, obj, "#firstp"], function( elem,i ) {
    //  var $elem = baidu( elem );
    //  strictEqual( $elem.attr("nonexisting"), undefined, "attr works correctly for non existing attributes (bug #7500)." );
    //  equal( $elem.attr("something", "foo" ).attr("something"), "foo", "attr falls back to prop on unsupported arguments" );
    // });
    var table = jQuery("#table").append("<tr><td>cell</td></tr><tr><td>cell</td><td>cell</td></tr><tr><td>cell</td><td>cell</td></tr>"),
        td = jQuery("#table td").eq(0);
    var td2 = baidu(td);
    td2.attr("rowspan", "2");

    equal( td[0].rowSpan, 2, "Check rowspan is correctly set" );
    td.attr("colspan", "2");
    equal( td[0].colSpan, 2, "Check colspan is correctly set" );
    table.attr("cellspacing", "2");
    equal( table[0].cellSpacing, "2", "Check cellspacing is correctly set" );


    equal( baidu("#area1").attr("value"), "foobar", "Value attribute retrieves the property for backwards compatibility." );

    // for #1070
    baidu("#name").attr("someAttr", "0");
    equal( baidu("#name").attr("someAttr"), "0", "Set attribute to a string of \"0\"" );
    baidu("#name").attr("someAttr", 0);
    equal( baidu("#name").attr("someAttr"), "0", "Set attribute to the number 0" );
    baidu("#name").attr("someAttr", 1);

    equal( baidu("#name").attr("someAttr"), "1", "Set attribute to the number 1" );


    // using contents will get comments regular, text, and comment nodes
        var j = baidu("#nonnodes").contents();

        j.attr("name", "attrvalue");

        equal( j.attr("name"), "attrvalue", "Check node,textnode,comment for attr" );

        j.removeAttr("name");

    // Type 
    var type = baidu("#check2").attr("type");
    var thrown = false;
    try {
        baidu("#check2").attr("type","hidden");
    } catch(e) {
        thrown = true;
    }
//  对不可操作的type只读属性，不会再报错
//  ok( thrown, "Exception thrown when trying to change type property" );
    equal( type, baidu("#check2").attr("type"), "Verify that you can't change the type of an input element" );

    var check = document.createElement("input");
    thrown = true;
    try {
        baidu(check).attr("type", "checkbox");
    } catch(e) {
        thrown = false;
    }

    ok( thrown, "Exception thrown when trying to change type property" );
    equal( "checkbox", baidu(check).attr("type"), "Verify that you can change the type of an input element that isn't in the DOM" );

    check = baidu("<input />");
    thrown = true;
    try {
        check.attr("type","checkbox");
    } catch(e) {
        thrown = false;
    }
    //修改
    // ok( thrown, "Exception thrown when trying to change type property" );
    // equal( "checkbox", check.attr("type"), "Verify that you can change the type of an input element that isn't in the DOM" );
    
    var button = baidu("#button");
    thrown = false;
    try {
        button.attr("type","submit");
    } catch(e) {
        thrown = true;
    }
//  ok( thrown, "Exception thrown when trying to change type property" );

    equal( "button", button.attr("type"), "Verify that you can't change the type of a button element" );

    //修改
    // var $radio = baidu("<input>", { "value": "sup", "type": "radio" }).appendTo("#testForm");
    // equal( $radio.val(), "sup", "Value is not reset when type is set after value on a radio" );

    // Setting attributes on svg elements (bug #3116)
    var $svg = baidu("<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' baseProfile='full' width='200' height='200'>"
        + "<circle cx='200' cy='200' r='150' />"
    + "</svg>").appendTo("body");

    equal( $svg.attr("cx", 100).attr("cx"), "100", "Set attribute on svg element" );
    $svg.remove();

    //修改
    // undefined values are chainable
    // baidu("#name").attr("maxlength", "5").removeAttr("nonexisting");
    // equal( typeof baidu("#name").attr("maxlength", undefined), "object", ".attr('attribute', undefined) is chainable (#5571)" );
    // equal( baidu("#name").attr("maxlength", undefined).attr("maxlength"), "5", ".attr('attribute', undefined) does not change value (#5571)" );
    // equal( baidu("#name").attr("nonexisting", undefined).attr("nonexisting"), undefined, ".attr('attribute', undefined) does not create attribute (#5571)" );
});

test("attr(jquery_method)", function(){
    //修改
    //expect(7);

    var $elem = baidu("<div />"),
        elem = $elem[0];

    // one at a time
    $elem.attr({html: "foo"}, true);
    equal( elem.innerHTML, "foo", "attr(html)");
    $elem.attr({text: "bar"}, true);
    equal( elem.innerHTML, "bar", "attr(text)");

    $elem.attr({css: {color: "red"}}, true);
    ok( /^(#ff0000|red)$/i.test(elem.style.color), "attr(css)");

    $elem.attr({height: 10}, true);
    equal( elem.style.height, "10px", "attr(height)");

    // Multiple attributes

    $elem.attr({
        width:10
        //修改
        //css:{ paddingLeft:1, paddingRight:1 }
    }, true);

    equal( elem.style.width, "10px", "attr({...})");
    //修改
    // equal( elem.style.paddingLeft, "1px", "attr({...})");
    // equal( elem.style.paddingRight, "1px", "attr({...})");
});

//修改
// test("attr(String, Object) - Loaded via XML document", function() {
//  expect(2);
//  var xml = createDashboardXML();
//  var titles = [];
//  baidu( "tab", xml ).each(function() {
//      titles.push( baidu(this).attr("title") );
//  });
//  equal( titles[0], "Location", "attr() in XML context: Check first title" );
//  equal( titles[1], "Users", "attr() in XML context: Check second title" );
// });


//1.8.2以后已经没有对tabindex的判断
//test("attr('tabindex')", function() {
//  expect(8);
//
//  // elements not natively tabbable
//  equal(baidu("#listWithTabIndex").attr("tabindex"), 5, "not natively tabbable, with tabindex set to 0");
//  equal(baidu("#divWithNoTabIndex").attr("tabindex"), undefined, "not natively tabbable, no tabindex set");
//
//  // anchor with href
//  equal(baidu("#linkWithNoTabIndex").attr("tabindex"), 0, "anchor with href, no tabindex set");
//  equal(baidu("#linkWithTabIndex").attr("tabindex"), 2, "anchor with href, tabindex set to 2");
//  equal(baidu("#linkWithNegativeTabIndex").attr("tabindex"), -1, "anchor with href, tabindex set to -1");
//
//  // anchor without href
//  equal(baidu("#linkWithNoHrefWithNoTabIndex").attr("tabindex"), undefined, "anchor without href, no tabindex set");
//  equal(baidu("#linkWithNoHrefWithTabIndex").attr("tabindex"), 1, "anchor without href, tabindex set to 2");
//  equal(baidu("#linkWithNoHrefWithNegativeTabIndex").attr("tabindex"), -1, "anchor without href, no tabindex set");
//});

//test("attr('tabindex', value)", function() {
//  expect(9);
//
//  var element = baidu("#divWithNoTabIndex");
//  equal(element.attr("tabindex"), undefined, "start with no tabindex");
//
//  // set a positive string
//  element.attr("tabindex", "1");
//  equal(element.attr("tabindex"), 1, "set tabindex to 1 (string)");
//
//  // set a zero string
//  element.attr("tabindex", "0");
//  equal(element.attr("tabindex"), 0, "set tabindex to 0 (string)");
//
//  // set a negative string
//  element.attr("tabindex", "-1");
//  equal(element.attr("tabindex"), -1, "set tabindex to -1 (string)");
//
//  // set a positive number
//  element.attr("tabindex", 1);
//  equal(element.attr("tabindex"), 1, "set tabindex to 1 (number)");
//
//  // set a zero number
//  element.attr("tabindex", 0);
//  equal(element.attr("tabindex"), 0, "set tabindex to 0 (number)");
//
//  // set a negative number
//  element.attr("tabindex", -1);
//  equal(element.attr("tabindex"), -1, "set tabindex to -1 (number)");
//
//  element = baidu("#linkWithTabIndex");
//  equal(element.attr("tabindex"), 2, "start with tabindex 2");
//
//  element.attr("tabindex", -1);
//  equal(element.attr("tabindex"), -1, "set negative tabindex");
//});

test("dom为空的情况",function(){
    var result = baidu("#baidujsxiaozu").attr('type');
    equal(typeof result.attr, 'function','get方法');
    var result = baidu("#baidujsxiaozu").attr('type','wlkafjl');
    ok(result,'有东西就行');
});

test("传入空的设置",function(){
    var dom = baidu("<div>").attr('width','');
    equal(dom.attr('width'),'','传入空值');
});

test("设置input",function(){
    var dom = baidu("<input>").appendTo('body');
    dom.attr('type','radio');
    ok(dom.attr('type') !== 'radio', '不能设置为radio');
    dom.remove();
    dom = baidu('<input/>');
    dom.attr('type', 'radio').appendTo('body');
    equal(dom.attr('type'), 'radio', '设置为radio');
    dom.remove();
});

test("设置width和height",function(){
    var dom = baidu("<div>").appendTo('body'),
        val = dom.get(0).getAttribute ? '' : 'auto';
    dom.attr('width', '');
    equal(dom.attr('width'), val, '设置为auto');
    dom.remove();
});
//end

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
            "<input type='text' id='length123' name='test'/>"+
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