/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */


///import baidu.string;

/**
 * @description 将目标字符串中常见全角字符转换成半角字符
 * @function 
 * @name baidu.string().toHalfWidth()
 * @grammar baidu.string(str).toHalfWidth()
 * @return {String} 转换后的字符串
 */

/**
 * @description 将目标字符串中常见全角字符转换成半角字符
 * @function 
 * @name baidu.string.toHalfWidth
 * @grammar baidu.string.toHalfWidth(str)
 * @param {String} str 目标字符串
 * @return {String} 转换后的字符串
 */

/*
将全角的字符转成半角, 将“&amp;#xFF01;”至“&amp;#xFF5E;”范围的全角转成“&amp;#33;”至“&amp;#126;”, 还包括全角空格包括常见的全角数字/空格/字母, 用于需要同时支持全半角的转换, 具体转换列表如下("空格"未列出)：<br><br>

！ => !<br>
＂ => "<br>
＃ => #<br>
＄ => $<br>
％ => %<br>
＆ => &<br>
＇ => '<br>
（ => (<br>
） => )<br>
＊ => *<br>
＋ => +<br>
， => ,<br>
－ => -<br>
． => .<br>
／ => /<br>
０ => 0<br>
１ => 1<br>
２ => 2<br>
３ => 3<br>
４ => 4<br>
５ => 5<br>
６ => 6<br>
７ => 7<br>
８ => 8<br>
９ => 9<br>
： => :<br>
； => ;<br>
＜ => <<br>
＝ => =<br>
＞ => ><br>
？ => ?<br>
＠ => @<br>
Ａ => A<br>
Ｂ => B<br>
Ｃ => C<br>
Ｄ => D<br>
Ｅ => E<br>
Ｆ => F<br>
Ｇ => G<br>
Ｈ => H<br>
Ｉ => I<br>
Ｊ => J<br>
Ｋ => K<br>
Ｌ => L<br>
Ｍ => M<br>
Ｎ => N<br>
Ｏ => O<br>
Ｐ => P<br>
Ｑ => Q<br>
Ｒ => R<br>
Ｓ => S<br>
Ｔ => T<br>
Ｕ => U<br>
Ｖ => V<br>
Ｗ => W<br>
Ｘ => X<br>
Ｙ => Y<br>
Ｚ => Z<br>
［ => [<br>
＼ => \<br>
］ => ]<br>
＾ => ^<br>
＿ => _<br>
｀ => `<br>
ａ => a<br>
ｂ => b<br>
ｃ => c<br>
ｄ => d<br>
ｅ => e<br>
ｆ => f<br>
ｇ => g<br>
ｈ => h<br>
ｉ => i<br>
ｊ => j<br>
ｋ => k<br>
ｌ => l<br>
ｍ => m<br>
ｎ => n<br>
ｏ => o<br>
ｐ => p<br>
ｑ => q<br>
ｒ => r<br>
ｓ => s<br>
ｔ => t<br>
ｕ => u<br>
ｖ => v<br>
ｗ => w<br>
ｘ => x<br>
ｙ => y<br>
ｚ => z<br>
｛ => {<br>
｜ => |<br>
｝ => }<br>
～ => ~<br>

 */
baidu.string.extend({
    toHalfWidth : function () {
        return this.replace(/[\uFF01-\uFF5E]/g,
            function(c){
                return String.fromCharCode(c.charCodeAt(0) - 65248);
            }).replace(/\u3000/g," ");
    }
});
