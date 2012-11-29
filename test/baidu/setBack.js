module("baidu.setBack");

//baidu.setBack(current, oldChain)

test("返回新链头时，可以通过getBack()取得老链头", function(){
    stop();
    ua.importsrc("baidu.dom,baidu.string", function(){

        baidu.dom.extend({
            testSetBack: function(){
                var s = baidu.string("mm");
                baidu.setBack(s, this);
                return s;
            }
        });

        var dom = baidu.dom();
        var str = dom.testSetBack();

        ok(str.getBack() === dom, "取得老链头");

        start();
    })
});
