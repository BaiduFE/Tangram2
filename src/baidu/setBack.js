///import baidu;

/*
 * @description 为当前的新链头对象赋加.getBack()方法
 * @author meizz
 * @create 2012-11-19
 *
 * @function
 * @name baidu.setBack
 * @grammar baidu.setBack(current, oldChain)
 * @param   {Object}    current     新链头对象
 * @param   {Object}    oldChain    老链头对象
 * @return  {Object}                current
 */
baidu.setBack = function(current, oldChain) {
    current._back_ = oldChain;
    current.getBack = function() {
        return this._back_;
    }
    return current;
};
