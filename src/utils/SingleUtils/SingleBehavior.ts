/**
 *  __author__ = "sun hai lang"
 *  __date__ = 2019-06-28
 * 
 */


 export default class SingleBehavior<T> extends paper.Behaviour
 {
    private instance: T;

    onAwake(config: any)
    {
        if(this.instance)
        {
            //this.instance = this as T;
        }
    }
 }