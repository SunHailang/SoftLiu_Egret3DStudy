/**
 *  __author__ = "sun hai lang"
 *  __date__ = 2019-06-17
 * 
 */


export default class Vector3Utils
{
    /**
    * 将 vector 向量乘以一个标量 scalar，返回一个新的向量。
    * - vector *= scalar
    * @param vector
    * @param scalar 标量。
    */
    public static multiplyScalar(vector:Readonly<egret3d.Vector3>, scalar:float):egret3d.Vector3
    {
        let v = egret3d.Vector3.create(vector.x, vector.y, vector.z);
        return v.multiplyScalar(scalar);
    }

    /**
    * 将 vector 向量加上一个标量 scalar，返回一个新的向量。
    * - vector += scalar
    * @param vector Vector3。
    * @param scalar 标量。
    */
    public static addScalar(vector:Readonly<egret3d.Vector3>, scalar: float):egret3d.Vector3
    {
        let v = egret3d.Vector3.create(vector.x, vector.y, vector.z);
        return v.addScalar(scalar);
    }

    /**
     * 将 vector1 向量加上 vector2 向量, 返回一个新的向量。
     * - vector1 += vector2
     * @param vector1 一个向量。
     * @param vector2 一个向量。
     */
    public static add(vector1: Readonly<egret3d.Vector3>, vector2: Readonly<egret3d.Vector3>):egret3d.Vector3
    {
        let v1 = egret3d.Vector3.create(vector1.x, vector1.y, vector1.z);
        let v2 = egret3d.Vector3.create(vector2.x, vector2.y, vector2.z);
        return v1.add(v2);
    }

    /**
     * 将 vector1 向量减去一个向量 vector2，返回一个新的向量。
     * - vector1 -= vector2
     * @param vector1 一个向量。
     * @param vector2 一个向量。
     */
    public static subtract(vector1: Readonly<egret3d.Vector3>, vector2: Readonly<egret3d.Vector3>):egret3d.Vector3
    {
        let v1 = egret3d.Vector3.create(vector1.x, vector1.y, vector1.z);
        let v2 = egret3d.Vector3.create(vector2.x, vector2.y, vector2.z);
        return v1.subtract(v2);
    }

    /**
     * 将 vector1 向量叉乘以一个向量 vector2，得到一个新的向量。
     * - vector1 ×= vector
     * @param vector1 一个向量。
     * @param vector2 一个向量。
     */
    public static cross(vector1: Readonly<egret3d.Vector3>, vector2: Readonly<egret3d.Vector3>): egret3d.Vector3
    {
        let v1 = egret3d.Vector3.create(vector1.x, vector1.y, vector1.z);
        let v2 = egret3d.Vector3.create(vector2.x, vector2.y, vector2.z);

        return v1.cross(v2);
    }
}
 