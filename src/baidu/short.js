
/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */


// 声明快捷


//链头
baidu.array = baidu.array ||{};

//遍历数组中所有元素
//baidu.each = baidu.array.each ||{};

//链头
baidu.dom = baidu.dom ||{};

//为目标元素添加className
baidu.addClass = baidu.dom.addClass ||{};

//从文档中获取指定的DOM元素
baidu.g = baidu.G = baidu.dom.g ||{};

//获取目标元素的属性值
baidu.getAttr = baidu.dom.getAttr ||{};

//获取目标元素的样式值
baidu.getStyle = baidu.dom.getStyle ||{};

//隐藏目标元素
baidu.hide = baidu.dom.hide ||{};

//在目标元素的指定位置插入HTML代码
baidu.insertHTML = baidu.dom.insertHTML ||{};

//通过className获取元素
baidu.q = baidu.Q = baidu.dom.q ||{};

//移除目标元素的className
baidu.removeClass = baidu.dom.removeClass ||{};

//设置目标元素的attribute值
baidu.setAttr = baidu.dom.setAttr ||{};

//批量设置目标元素的attribute值
baidu.setAttrs = baidu.dom.setAttrs ||{};

//按照border-box模型设置元素的height值
baidu.dom.setOuterHeight = baidu.dom.setBorderBoxHeight ||{};

//按照border-box模型设置元素的width值
baidu.dom.setOuterWidth = baidu.dom.setBorderBoxWidth ||{};

//设置目标元素的style样式值
baidu.setStyle = baidu.dom.setStyle ||{};

//批量设置目标元素的style样式值
baidu.setStyles = baidu.dom.setStyles ||{};

//显示目标元素，即将目标元素的display属性还原成默认值。默认值可能在stylesheet中定义，或者是继承了浏览器的默认样式值
baidu.show = baidu.dom.show ||{};

//链头
baidu.e = baidu.element = baidu.element ||{};

//链头
baidu.event = baidu.event ||{};

//为目标元素添加事件监听器
baidu.on = baidu.event.on ||{};

//为目标元素移除事件监听器
baidu.un = baidu.event.un ||{};

//链头
baidu.lang = baidu.lang ||{};

//为类型构造器建立继承关系
baidu.inherits = baidu.lang.inherits ||{};

//判断目标参数是否为Object对象
//baidu.isObject = baidu.lang.isObject ||{};

//判断目标参数是否string类型或String对象
//baidu.isString = baidu.lang.isString ||{};

//链头
baidu.object = baidu.object ||{};

//将源对象的所有属性拷贝到目标对象中
//baidu.extend = baidu.object.extend ||{};

//链头
baidu.string = baidu.string ||{};

//对目标字符串进行html解码
baidu.decodeHTML = baidu.string.decodeHTML ||{};

//对目标字符串进行html编码
baidu.encodeHTML = baidu.string.encodeHTML ||{};

//对目标字符串进行格式化
baidu.format = baidu.string.format ||{};

//删除目标字符串两端的空白字符
baidu.trim = baidu.string.trim ||{};