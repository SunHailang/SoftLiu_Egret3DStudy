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

    onAwake()
    {
        
    }
    onStart()
    {
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

    OnOnClickType(eventType:Events, ...items:any[])
    {
        let type = eventType;
        if(items.length > 0)
        {
            if(items[0] == "Button I")
            {
                //this.m_canMove = false;
                
            }
            else if(items[0][0] == "Button A")
            {
                if(items[0][1])
                {
                    // 按下
                    this.m_btnAPress = true;
                    this.test(1000);
                }
                else
                {
                    // 抬起
                    this.m_btnAPress = false;
                }
                this.m_cubeList.forEach(element => {
                    element.OnRotation(true);
                });
            }
            else if(items[0] == "Button B")
            {
                //this.m_canMove = true;
                //this.m_moveDir = -2;
            }
        }
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
        while(this.m_btnAPress)
        {
            console.log("PressMethod.");
            await new Promise((resolve) => setTimeout(resolve,delay)); 
        }
    }

    onFixedUpdate(delta:number)
    {
        
    }

    onLateUpdate(delta:number)
    {

    }

    onDestroy()
    {

    }

}