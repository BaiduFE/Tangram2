module('baidu.dom.css',{});

var ie = /msie/i.test( navigator.userAgent );

var div = document.createElement("div");
  // div.style.position = "";
  div.style.top = "-10000px";

var appendStyle = function(text){
  var style;

  if( arguments.length > 1 )
    text = [].join.call( arguments, "" );

  if( document.createStyleSheet )
    style = document.createStyleSheet(),
    style.cssText = text;
  else
    style = document.createElement( "style" ),
    style.type = "text/css",
    style.appendChild( document.createTextNode( text ) ),
    document.documentElement.appendChild( style );
};

var getStyle = ie ?
  function( dom, name ){ return dom.currentStyle[ name ]; } :
  function( dom, name ){ return document.defaultView.getComputedStyle( dom, null ).getPropertyValue( name ); };

var css = function( name, value ){ return baidu.dom( div ).css( name, value ); };
var get = function( name ){ return getStyle( div, name ); }

appendStyle(" .a{ color: red; opacity: .5; filter: alpha(opacity=50); display: inline; } ");

test('prepareTest',function(){
  expect(1);
  stop();
  ua.importsrc("baidu.browser", function(){
    start();
    ok(true,'ok');
    ie = baidu.browser.ie;
  }, "baidu.browser", "baidu.dom.css");
});

test('baidu.dom(div).css(name)', function(){
    stop();
    ua.importsrc('baidu.dom.styleFixer', function(){
        document.body.appendChild(div);
        div.className = "a";
        equal( css("position"), "static", "position" );
        ok( css("color") == "red" || css("color") == "rgb(255, 0, 0)" || css("color") == "#f00", "color" );
        equal( css("opacity"), .5, "opacity" );
        equal( css("display"), "inline", "display" );
        ok(~'0|auto'.indexOf(css('z-index')), 'z-index');//是否需要抹平？
        div.className = "";
        
        start();
    }, 'baidu.dom.styleFixer', 'baidu.dom.css');
});

test("baidu.dom(div).css(name,value)", function(){
      css("position", "relative");
      css("color", "green");
      css("opacity", .1);

      equal( get("position"), "relative", "position" );
      ok( get("color") == "green" || get("color") == "rgb(0, 128, 0)" || get("color") == "#008000", "color" );

      if( ie < 9 ){
          ok(false,'wangxiao');
          ok( ~ div.style.filter.indexOf("Alpha"), "opacity" );
      }

      try{
          css( "z-index", 0 );
          equal( css("z-index"), 0, "z-index" ); // 抹平？
      }catch(e){
          ok( false, "报错啦" );
      }

      try{
          css( "zIndex", 2 );
          equal( css("z-index"), 2, "zIndex" );
          equal( css("zIndex"), 2, "zIndex" );
      }catch(e){
          ok( false, "报错啦" );
      }
      css( "width", 100 );
      equal( css("width"), "100px" );
      equal( get("width"), "100px" );

      css( "width", "200px" );
      equal( css("width"), "200px" );
      equal( get("width"), "200px" );

      css( "height", 100 );
      equal( css("height"), "100px" );
      equal( get("height"), "100px" );

      css( "height", "200px" );
      equal( css("height"), "200px" );
      equal( get("height"), "200px" );
        
      css( "font-weight", "bold" );
        css("font-weight");
      equal( css("font-weight"), 700, "font-weight" );
      equal( css("fontWeight"), 700, "fontWeight" );
        
      css( "line-height", 20 );
      equal( css("line-height"), "20px", "line-height" );
      equal( css("lineHeight"), "20px", "line-height" );

      css( "line-height", "30px" );
      equal( css("line-height"), "30px", "line-height" );
      equal( css("lineHeight"), "30px", "line-height" );

      css( "line-height", "2em" );
      //统一输出为px
      equal( css("line-height"), "32px", "line-height" );
      equal( css("lineHeight"), "32px", "line-height" );

      css( "float", "left" );
      equal( css("float"), "left", "float" );
      equal( div.style.styleFloat || div.style.cssFloat, "left", "float" );

      div.style.display = "none";
});

test("dom为空的情况",function(){
    var result = baidu("#baidujsxiaozu").css("wangxiao");
    ok(result);
});