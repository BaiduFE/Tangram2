/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */

///import baidu;
///import baidu.createChain;

/**
 * deferred功能链头
 *
 * @grammer baidu.deferred()
 * @param   {}
 * @return  {tangramDeferred}          返回 new TangramSio 对象
 */

baidu.createChain("deferred",
	return baidu.$Deferred();
// 执行方法
function(url){
    switch (typeof url) {
        case "string" :
            return new baidu.$Sio(url);
        break;
        default:
        break;
    };
},

// constructor
function(url){
	this.url = url;
});