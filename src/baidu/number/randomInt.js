/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */

///import baidu.number;

/**
 * 生成随机整数，范围是[min, max]
 * @name baidu.number.randomInt
 * @function
 * @grammar baidu.number.randomInt(min, max) 
 * 
 * @param 	{number} min 	随机整数的最小值
 * @param 	{number} max 	随机整数的最大值
 * @return 	{number} 		生成的随机整数
 */

baidu.number.randomInt = function(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
};
