/**
 *  __author__ = "sun hai lang"
 *  __date__ = 2019-06-20
 * 
 */

import EventsManager from "../utils/EventManager/EventsManager";
import GameStateMachine from "../utils/GameStateMachine";
import MoveCar from "./MoveCar";


export default class CreateCarPrefab extends paper.Behaviour
{
    @paper.editor.property(paper.editor.EditType.FLOAT)
    @paper.serializedField
    private m_moveVelocity:float = 10;

    private m_gameStart:boolean = false;
    private m_gameEnd:boolean = false;

    private m_carName:string[] = [];
    private m_activityScreen:paper.Scene;

    onAwake(config:any)
    {
        EventsManager.getInstance().RegisterEvent(Events.OnGameEndType, this.OnGameEndTypeFunc.bind(this));
        EventsManager.getInstance().RegisterEvent(Events.OnGameStartType, this.OnGameStartTypeFunc.bind(this));
    }
    onStart()
    {
        this.m_carName.push("red");
        this.m_activityScreen = paper.Application.sceneManager.getActiveScene();
        //Math.random()
        this.CreateCar(1000);
    }

    //delay 等待延迟的时间参数  单位 毫秒
    async CreateCar(delay:number) 
    {
        
        while(true)
        {
            if(this.m_gameStart && !this.m_gameEnd)
            {
                let res = GameStateMachine.getInstance().m_prefabDictionary.TryGetValue(this.m_carName[0])!;
                RES.getResAsync(res).then(()=>
                {
                    let obj = paper.Prefab.create(res, 0, 0.5, 0, this.m_activityScreen) as paper.GameObject;
                    if(obj)
                    {
                        
                        obj.transform.setParent(this.transform, false);
                        obj.tag = "EditorCar";
                        //console.log(obj);                        
                        let car = obj.getComponent(MoveCar) as MoveCar;
                        if(car)
                        {
                            car.StartMove(true, this.m_moveVelocity);
                        }
                        else
                        {
                            //console.log("create move is null.");
                            car = obj.addComponent(MoveCar) as MoveCar;
                            car.StartMove(true, this.m_moveVelocity);
                        }
                        //console.log("Create Car Complete");
                    }
                });
            }
           
            await new Promise((resolve) => setTimeout(resolve,delay));            
        }
    }

    private OnGameEndTypeFunc(eventType:Events, items:any)
     {
        this.m_gameStart = false;
        this.m_gameEnd = true;
     }

     private OnGameStartTypeFunc(eventType:Events, items:any)
     {
        this.m_gameStart = true;
        this.m_gameEnd = false;
     }

     onDestroy()
     {
        EventsManager.getInstance().DeregisterEvent(Events.OnGameEndType, this.OnGameEndTypeFunc.bind(this));
        EventsManager.getInstance().DeregisterEvent(Events.OnGameStartType, this.OnGameStartTypeFunc.bind(this));
     }
}