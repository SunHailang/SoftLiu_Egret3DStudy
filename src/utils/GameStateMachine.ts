import DictionaryUtils from "./DictionaryUtils";

/**
 *  __author__ = "sun hai lang"
 *  __date__ = 2019-06-21
 * 
 */

 export default class GameStateMachine
 {
    /**
     * 
     * 只读
     * 
     */
    public m_prefabDictionary:DictionaryUtils<string, string> = new DictionaryUtils<string, string>();

    private static instance:GameStateMachine;

    // 将 constructor 设为私有属性，防止 new 调用
    private constructor() 
    {
        this.m_prefabDictionary.Add("red", "Assets/prefab/red.prefab.json");
        this.m_prefabDictionary.Add("yellow", "Assets/prefab/yellow.prefab.json");
        this.m_prefabDictionary.Add("head1", "Assets/prefab/head1.prefab.json");
        this.m_prefabDictionary.Add("head2", "Assets/prefab/head2.prefab.json");
        this.m_prefabDictionary.Add("head3", "Assets/prefab/head3.prefab.json");
        this.m_prefabDictionary.Add("head4", "Assets/prefab/head4.prefab.json");
        this.m_prefabDictionary.Add("head5", "Assets/prefab/head5.prefab.json");
    }

    static getInstance(): GameStateMachine 
    {
        if(!GameStateMachine.instance)
        {
            GameStateMachine.instance = new GameStateMachine();
        }
        return GameStateMachine.instance
    }

 }