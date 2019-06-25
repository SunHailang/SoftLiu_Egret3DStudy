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
        this.m_prefabDictionary.Add("red", "Assets/red.prefab.json");
        this.m_prefabDictionary.Add("yellow", "Assets/yellow.prefab.json");
        this.m_prefabDictionary.Add("head1", "Assets/head1.prefab.json");
        this.m_prefabDictionary.Add("head2", "Assets/head2.prefab.json");
        this.m_prefabDictionary.Add("head3", "Assets/head3.prefab.json");
        this.m_prefabDictionary.Add("head4", "Assets/head4.prefab.json");
        this.m_prefabDictionary.Add("head5", "Assets/head5.prefab.json");
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