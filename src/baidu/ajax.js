/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */

///import baidu;
///import baidu.createChain;

/**
 * Ajax链头，对XMLHttpRequest请求的封装
 *
 * @grammer baidu.ajax([url])
 * @param   {Url}
 * @return  {tangramAjax}          返回 new TangramAjax 对象
 */

baidu.createChain("ajax",

// 执行方法
function(url){
    switch (typeof url) {
        case "string" :
            return new baidu.$Ajax(url);
        break;
        default:
        break;
    };
},

// constructor
function(url){
	this.url = url;
});