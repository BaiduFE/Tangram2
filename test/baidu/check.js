module("baidu.check");

test("参数为空或不合法时直接返回 id", function(){
    var mm;

    (function(){
        try{baidu.check("","test"); mm=true}
        catch(ex){mm=false}
        ok(mm, "undefined 未传参数")
    })();

    (function(){
        try{baidu.check("function(,.+)?","test"); mm=true}
        catch(ex){mm=false}
        ok(mm, "function 参数")
    })(function(){});

    (function(){
        try{baidu.check("function(,.+)?","test"); mm=true}
        catch(ex){mm=false}
        ok(mm, "function参数, Object")
    })(function(){}, []);
    
});

test('出错验证', function(){
    try{baidu.check('\\s');}
    catch(e){ok(true, e);}
    try{baidu.check(undefined, 'test')}
    catch(e){ok(true, e);}
    //第三参数类型不对的情况
    try{baidu.check('\\s', 'baidu.check', [])}
    catch(e){ok(true, e);}
    //检查函数参数类型
    try{
        (function(){
            baidu.check('\\s', 'baidu.check');
        })(1);
    }catch(e){
        ok(true, e);
    }
});