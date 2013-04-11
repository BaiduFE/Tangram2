var frame;
module("baidu.dom.end", {

    setup: function(){
        if( baidu.dom.appendTo ) {
            frame = baidu('<div id="qunit-fixture">' +
                '<div id="foo">' +
                '<p id="sndp">Everything inside the red border is inside a div with <code>id="foo"</code>.</p>' +
                '<p lang="en" id="en">This is a normal link: <a id="yahoo" href="http://www.yahoo.com/" class="blogTest">Yahoo</a></p>' +
                '<p id="sap">This link has <code><a href="#2" id="anchor2">class="blog"</a></code>: <a href="http://simon.incutio.com/" class="blog link" id="simon">Simon Willison\'s Weblog</a></p>' +
                '<span id="span"></span>' +
                '</div>' +
                '</div>').appendTo(document.body);
        }
    },

    teardown: function(){
        baidu('#qunit-fixture').remove();
    }
});

test("加载所需js", function(){
    stop();
    expect(1);
    ua.importsrc('baidu.dom.appendTo,' +
        'baidu.each,' +
        'baidu.dom.match,' +
        'baidu.dom.remove,' +
        'baidu.dom.slice,' +
        'baidu.dom.eq,' +
        'baidu.dom.first,' +
        'baidu.dom.last,' +
        'baidu.dom.map,' +
        'baidu.dom.filter,' +
        'baidu.dom.find,' +
        'baidu.dom.not,' +
        'baidu.dom.closest,' +
        'baidu.dom.add,' +
        'baidu.dom.parent,' +
        'baidu.dom.parents,' +
        'baidu.dom.parentsUntil,' +
        'baidu.dom.next,' +
        'baidu.dom.nextAll,' +
        'baidu.dom.nextUntil,' +
        'baidu.dom.prev,' +
        'baidu.dom.prevAll,' +
        'baidu.dom.prevUntil,' +
        'baidu.dom.siblings,' +
        'baidu.dom.children,' +
        'baidu.dom.contents,' +
        'baidu.dom.appendTo,' +
        'baidu.dom.prependTo,' +
        'baidu.dom.insertBefore,' +
        'baidu.dom.insertAfter', function(){
        ok(true,'ok');
        start();
    }, "baidu.dom.pushStack");
});

test("slice", function(){
    stop();
    expect(2);

    var dom = baidu.dom('#qunit-fixture p');
    equal(dom, dom.slice(0, 1).end(), 'ok');

    dom = baidu.dom();
    equal(dom, dom.slice(0, 1).end(), 'ok');

    start();
});

test("eq", function(){
    stop();
    expect(2);

    var dom = baidu.dom('#qunit-fixture p');

    equal(dom, dom.eq(0).end(), "ok");

    dom = baidu.dom();
    equal(dom, dom.eq(0).end(), "ok");

    start();
});

test("first & last", function(){
    stop();
    expect(4);

    var dom;

    baidu.each(["first", "last"], function(i, name){
        dom = baidu.dom('#qunit-fixture p');

        equal(dom, dom[name]().end(), "ok");

        dom = baidu.dom();
        equal(dom, dom[name]().end(), "ok");
    });

    start();
});

test("map", function(){
    stop();
    expect(1);

    var dom = baidu.dom('#qunit-fixture p');

    equal(dom, dom.map(function(){return 1;}).end(), "ok");

    start();
});

test("filter & find & not & closest & add", function(){

    stop();
    expect(10);

    var dom;

    baidu.each(["filter", "find", "not", "closest", "add"], function(i, name){
        dom = baidu.dom('#qunit-fixture p');

        equal(dom, dom[name]('#snap').end(), "ok");

        dom = baidu.dom();
        equal(dom, dom[name]('#snap').end(), "ok");
    });

    start();

});

test("parent & parents & parentsUntil & next & nextAll & nextUntil & prev prevAll, prevUntil, siblings, children, contents", function(){

    var dom;

    baidu.each(["parent", "parents", "parentsUntil", "next", "nextAll",
        "nextUntil", "prev", "prevUntil", "siblings", "children", "contents"],

        function(i, name){
            dom = baidu.dom('#en');

            equal(dom, dom[name]('#foo').end(), "ok");

            dom = baidu.dom();
            equal(dom, dom[name]('#foo').end(), "ok");
        }
    );

    start();
});

test("appendTo, prependTo, insertBefore, insertAfter", function(){
    var target = baidu.dom('#qunit-fixture p'),
        dom = baidu.dom('#span'),
        length = target.length,
        newdom;

    ok(length, "at least we got contents");

    baidu.each(["appendTo", "prependTo", "insertBefore", "insertAfter"], function(i, name){
        newdom = dom[name](target);
        equal(newdom.length, length, "ok "+name);
        //equal(dom[0], newdom[0], "ok");
        equal(newdom.end(), dom, "ok "+name);
    })
});


