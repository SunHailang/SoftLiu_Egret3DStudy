import DictionaryUtils from "./DictionaryUtils";

/**
 *  __author__ = "sun hai lang"
 *  __date__ = 2019-06-21
 * 
 */

 export default class PrefabUtils
 {
    /**
     * 
     * 只读
     * 
     */
    public m_prefabDictionary:DictionaryUtils<string, string> = new DictionaryUtils<string, string>();

    private static instance:PrefabUtils;

    // 将 constructor 设为私有属性，防止 new 调用
    private constructor() 
    {
        this.m_prefabDictionary.Add("red", "Assets/red.prefab.json");
        this.m_prefabDictionary.Add("yellow", "Assets/yellow.prefab.json");
    }

    static getInstance(): PrefabUtils 
    {
        if(!PrefabUtils.instance)
        {
            PrefabUtils.instance = new PrefabUtils();
        }
        return PrefabUtils.instance
    }

 }