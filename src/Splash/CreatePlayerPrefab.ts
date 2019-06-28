import EventsManager from "../Utils/EventManager/EventsManager";
import GameStateMachine from "../Utils/GameStateMachine";
import CubeMove from "./CubeMove";

/**
 *  __author__ = "sun hai lang"
 *  __date__ = 2019-06-25
 * 
 */

 export default class CreatePlayerPrefab extends paper.Behaviour
 {

    private m_gameStart:boolean = false;
    private m_gameEnd:boolean = false;

    private m_activityScreen:paper.Scene;

    private m_palyerName:string[] = [];

    private m_playerMove:CubeMove[] = [];


     onAwake(config:any)
     {
        EventsManager.getInstance().RegisterEvent(Events.OnGameStartType, this.OnGameStartTypeFunc.bind(this));
        EventsManager.getInstance().RegisterEvent(Events.OnGameEndType, this.OnGameEndTypeFunc.bind(this));
     }

     onStart()
     {
        this.m_palyerName.push("head1");
        this.m_palyerName.push("head2");
        this.m_palyerName.push("head3");
        this.m_palyerName.push("head4");
        this.m_palyerName.push("head5");

        this.m_activityScreen = paper.Application.sceneManager.getActiveScene();
     }

     onUpdate(delta:number)
     {

     }

     async CreatePlayer(delay:number)
     {
        await new Promise((resolve) => setTimeout(resolve,delay));
        if(this.m_gameStart && !this.m_gameEnd)
        {
            for (let index = this.m_playerMove.length - 1; index >= 0 ; index--) {
                const element = this.m_playerMove[index];
                this.m_playerMove.pop();                
            }
            let index = 0;
            for (let index = 0; index < this.m_palyerName.length; index++) 
            {
                const element = this.m_palyerName[index];
                let res = GameStateMachine.getInstance().m_prefabDictionary.TryGetValue(element);
                if(res)
                {
                    RES.getResAsync(res).then(()=>
                    {                        
                        let obj = paper.Prefab.create(res, -(index * 1.5) - 0.5, 0, 0, this.m_activityScreen) as paper.GameObject;
                        if(obj)
                        {                 
                            obj.tag = "EditorPlayer";           
                            obj.transform.setParent(this.transform, false);
                            let palyer = obj.getComponent(CubeMove) as CubeMove;
                            if(palyer)
                            {
                                palyer.OnInitCube(index, true);
                            }else
                            {
                                palyer = obj.addComponent(CubeMove) as CubeMove;
                                palyer.OnInitCube(index, true);
                            }
                            this.m_playerMove.push(palyer);
                            index++;
                            //console.log("Create Player Complete");
                            if(index >= this.m_palyerName.length)
                            {
                                EventsManager.getInstance().TriggerEvent(Events.OnResPlayerCompleteType, ["initPlayer", this.m_playerMove]);
                            }
                        }
                    });
                }
            }
            // 生成需要救助的Player Cube
            let res = GameStateMachine.getInstance().m_prefabDictionary.TryGetValue("yellow");
            if(res)
            {
                RES.getResAsync(res).then(()=>
                {                        
                    let obj = paper.Prefab.create(res, 14, 0, 0, this.m_activityScreen) as paper.GameObject;
                    if(obj)
                    {                 
                        obj.tag = "EditorPlayer";           
                        obj.transform.setParent(this.transform, false);
                        let palyer = obj.getComponent(CubeMove) as CubeMove;
                        if(palyer)
                        {
                            palyer.OnInitCube(index, false);
                        }
                        else
                        {
                            palyer = obj.addComponent(CubeMove) as CubeMove;
                            palyer.OnInitCube(index, false);
                        }
                        EventsManager.getInstance().TriggerEvent(Events.OnResPlayerCompleteType, ["alivePlayer", obj]);
                    }
                });
            }
        }
     }

     private OnGameStartTypeFunc(eventType:Events, items:any)
     {
        this.CreatePlayer(100);
        this.m_gameStart = true;
        this.m_gameEnd = false;
     }

     private OnGameEndTypeFunc(eventType:Events, items:any)
     {
        this.m_gameEnd = true;
        this.m_gameStart = false;
     }

     onDestroy()
     {
        EventsManager.getInstance().DeregisterEvent(Events.OnGameStartType, this.OnGameStartTypeFunc.bind(this));
        EventsManager.getInstance().DeregisterEvent(Events.OnGameEndType, this.OnGameEndTypeFunc.bind(this));
     }
 }