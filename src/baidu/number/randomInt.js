/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */

///import baidu.number;

/**
 * @description 生成随机整数，范围是[min, max]
 * @function 
 * @name baidu.number.randomInt
 * @grammar baidu.number.randomInt(min, max)
 * @param {Number} min 随机整数的最小值
 * @param {Number} max 随机整数的最大值
 * @return {Number} 生成的随机整数
 */

baidu.number.randomInt = function(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
};
