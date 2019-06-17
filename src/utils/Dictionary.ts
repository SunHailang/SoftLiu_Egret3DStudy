/**
 * 
 * __author__ = "sun hai lang"
 * __date__ = "2019-06-17"
 * 
 * 
 */

export default class Dictionary<KT, VT>
{

    private _keys: KT[] = [];	
    private _values: VT[] = [];

    public constructor() {}

    Add(key: any, value: any)
    {
        this._keys.push(key);
        this._values.push(value);
    }

    Remove(key: any)
    {
        let index = this._keys.indexOf(key, 0);
        this._keys.splice(index, 1);	
        //this._values.splice(index, 1);
        for (let index = this._values.length; index >= 0 ; index--) 
        {            
            this._values.pop();
        }
    }

    /**获取字典中对应key的值，不存在则返回null */
    TryGetValue(key: KT): VT|null
    {
        var index = this._keys.indexOf(key, 0);
        if (index != -1) {
            console.log(this._values);
            return this._values[index];
        }
        return null;
    }
    /**判断字典中是否存在对应key的值，返回boolean */
    ContainsKey(key: any): boolean 
    {
        var index = this._keys.indexOf(key, 0);
        if (index != -1) {
            return true;
        }
        return false;
    }
    //一般情况下 一个key 对应 一个value， 如果value是一个元组等，那么直接将_values[index] = value, 将可能失去原有的值，建议在外部处理，不使用这个函数
    SetDicValue(key: any, value: any): void 
    {
        var index = this._keys.indexOf(key, 0);
        if (index != -1) 
        {
            this._keys[index] = key;
            this._values[index] = value;
        }
        else
        {
           this.Add(key, value);
        }
    }

    GetKeys(): KT[] 
    {
        return this._keys;
    }
    GetValues(): VT[] 
    {
        return this._values;
    }   
  }