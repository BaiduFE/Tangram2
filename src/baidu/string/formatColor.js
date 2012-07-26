/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */


///import baidu.string;

/**
 * @description 将各种浏览器里的颜色值转换成#RRGGBB的格式
 * @function 
 * @name baidu.string().formatColor()
 * @grammar baidu.string(str).formatColor()
 * @return {String} #RRGGBB格式的字符串或空
 */

/**
 * @description 将各种浏览器里的颜色值转换成#RRGGBB的格式
 * @function 
 * @name baidu.string.formatColor
 * @grammar baidu.string.formatColor(color)
 * @param {String} color 浏览器中的颜色值字符串
 * @return {String} #RRGGBB格式的字符串或空
 */



baidu.string.extend({
    formatColor: function(){
        // 将正则表达式预创建，可提高效率
        var reg1 = /^\#[\da-f]{6}$/i,
            reg2 = /^rgb\((\d+), (\d+), (\d+)\)$/,
            keyword = {
                black: '#000000',
                silver: '#c0c0c0',
                gray: '#808080',
                white: '#ffffff',
                maroon: '#800000',
                red: '#ff0000',
                purple: '#800080',
                fuchsia: '#ff00ff',
                green: '#008000',
                lime: '#00ff00',
                olive: '#808000',
                yellow: '#ffff0',
                navy: '#000080',
                blue: '#0000ff',
                teal: '#008080',
                aqua: '#00ffff'
            };
            
        return function(){
            var color = this.valueOf();
            if(reg1.test(color)) {
                // #RRGGBB 直接返回
                return color;
            } else if(reg2.test(color)) {
                // 非IE中的 rgb(0, 0, 0)
                for (var s, i=1, color="#"; i<4; i++) {
                    s = parseInt(RegExp["\x24"+ i]).toString(16);
                    color += ("00"+ s).substr(s.length);
                }
                return color;
            } else if(/^\#[\da-f]{3}$/.test(color)) {
                // 简写的颜色值: #F00
                var s1 = color.charAt(1),
                    s2 = color.charAt(2),
                    s3 = color.charAt(3);
                return "#"+ s1 + s1 + s2 + s2 + s3 + s3;
            }else if(keyword[color])
                return keyword[color];
            
            return '';
        }
    }()
});