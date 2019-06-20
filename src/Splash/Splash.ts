/**
 *  __author__ = "sun hai lang"
 *  __date__ = 2019-06-14
 * 
 */

import EventsManager from "../utils/EventManager/EventsManager";
import CubeMove from "./CubeMove";

export default class Splash extends paper.Behaviour
{

    @paper.serializedField
    @paper.editor.property(paper.editor.EditType.FLOAT)
    speed: number = 1;
	
	@paper.editor.property(paper.editor.EditType.FLOAT, { minimum: -10.0, maximum: 10.0 })
    public rotateSpeed: number = 0.5;
    @paper.editor.property(paper.editor.EditType.VECTOR3)
    public readonly lookAtPoint: egret3d.Vector3 = egret3d.Vector3.create();
	
	@paper.editor.property(paper.editor.EditType.GAMEOBJECT)
    @paper.serializedField
    public target: paper.GameObject | null;

    m_cubeList:CubeMove[] = [];

    private m_btnAPress:boolean = false;
    //用于控制在多次执行延时函数，造成的async函数同一时间多次执行
    private m_btnPressIndex:number = 0;

    private m_gameEnd:boolean = false;

    onAwake()
    {
        EventsManager.getInstance().RegisterEvent(Events.OnGameStartType, this.OnGameStartTypeFunc.bind(this));
        EventsManager.getInstance().RegisterEvent(Events.OnGameEndType, this.OnGameEndTypeFunc.bind(this));
    }
    onStart()
    {
        this.m_gameEnd = false;
        if(this.target)
        {
            let cube = this.target.getComponent(CubeMove);
            if(cube)
            {
                this.m_cubeList.push(cube);
            }
            console.log(this.m_cubeList.length);
        }
        //this.test();
    }

    onEnable()
    {
        console.log("RegisterEvent Splash");
        EventsManager.getInstance().RegisterEvent(Events.OnClickType, this.OnOnClickType.bind(this));
    }

    onDisable()
    {
        console.log("DeregisterEvent Splash");
        EventsManager.getInstance().DeregisterEvent(Events.OnClickType, this.OnOnClickType.bind(this));
    }

    OnOnClickType(eventType:Events, items:any)
    {
        if(this.m_gameEnd) return;
        let type = eventType;
        if(items.length > 0)
        {
            if(items[0] == "image_click_scenc")
            {
                console.log(items);
                
            }
        }
    }
    OnGameStartTypeFunc(eventType:Events, items:any)
    {
        this.m_gameEnd = false;
    }
    OnGameEndTypeFunc(eventType:Events, items:any)
    {
        this.m_gameEnd = true;
    }

    onUpdate(delta:number)
    {
        if(this.m_btnAPress)
        {
           
        }
        else
        {

        }
    }
    //delay 等待延迟的时间参数  单位 毫秒
    async test(delay:number) {
        this.m_btnPressIndex++;
        while(this.m_btnAPress)
        {
            console.log("PressMethod.");
            await new Promise((resolve) => setTimeout(resolve,delay));
            if(!this.m_btnAPress || this.m_btnPressIndex > 1)
            {
                break;
            }
        }
        this.m_btnPressIndex--;
    }

    onFixedUpdate(delta:number)
    {
        
    }

    onLateUpdate(delta:number)
    {

    }

    onDestroy()
    {
        EventsManager.getInstance().DeregisterEvent(Events.OnGameStartType, this.OnGameStartTypeFunc.bind(this));
        EventsManager.getInstance().DeregisterEvent(Events.OnGameEndType, this.OnGameEndTypeFunc.bind(this));
    }

}