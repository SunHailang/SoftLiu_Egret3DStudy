/**
 *  __author__ = "sun hai lang"
 *  __date__ = 2019-06-28
 * 
 */



 /**
  * 
  * 类有两部分：静态部分和实例部分。 泛型类指的是实例部分的类型，所以类的静态属性不能使用这个泛型类型。
  * 
  */
 export class SingleAuto<T>
 {
    private instance: T;

    // 将 constructor 设为私有属性，防止 new 调用
    protected constructor() 
    {

    }
    
 }