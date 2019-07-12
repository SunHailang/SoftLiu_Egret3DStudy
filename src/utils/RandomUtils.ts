/**
 * 
 * __author__ = "sun hai lang"
 * __date__ = "2019-07-01"
 * 
 * 
 */

export default class RandomUtils
{
    /**
     * 获取两个整数之间的随机值
     * 左闭右开
     * @param min 最小值
     * @param max 最大值
     */
    public static Range_Int(min:int, max:int) : int
    {
        let range = 0;
        // key 是一个0~1的值 大于等于 0.0 且小于 1.0 的伪随机 double 值
        let key = Math.random();

        let value = key * (max - min) + min;

        range = Math.floor(value);

        return range;
    }

    /**
     * 获取两个Float之间的随机值
     * 左闭右开
     * @param min 
     * @param max 
     */
    public static Range_Float(min:float, max:float) : float
    {
        let range = 0;
        // key 是一个0~1的值 大于等于 0.0 且小于 1.0 的伪随机 double 值
        let key = Math.random();
        range = key * (max - min) + min;
        return range;
    }
}