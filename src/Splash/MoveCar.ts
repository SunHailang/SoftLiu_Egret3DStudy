import EventsManager from "../utils/EventManager/EventsManager";

/**
 *  __author__ = "sun hai lang"
 *  __date__ = 2019-06-20
 * 
 */

 export default class MoveCar extends paper.Behaviour
 {
     private m_moveSpeed:number = 3;

     private m_moveEnd:number = 23;

     private m_moveStart:number = -23;

     private m_gameEnd:boolean = false;

     onAwake(config:any)
     {
        console.log(config);
        EventsManager.getInstance().RegisterEvent(Events.OnGameEndType, this.OnGameEndTypeFunc.bind(this));
     }
     onDestroy()
     {
        EventsManager.getInstance().DeregisterEvent(Events.OnGameEndType, this.OnGameEndTypeFunc.bind(this));
     }

     onStart()
     {
        if(this.gameObject.name == "car_2")
        {
            this.m_moveSpeed = 5;
        }
     }

     onFixedUpdate(delta:number)
     {
        if(this.m_gameEnd)
        {
             return;
        }
        this.transform.setLocalPosition(egret3d.Vector3.create(this.transform.localPosition.x, 
                                                            this.transform.localPosition.y, 
                                                            this.transform.localPosition.z + delta * this.m_moveSpeed));
        if(this.transform.localPosition.z > this.m_moveEnd)
        {
            this.transform.setLocalPosition(egret3d.Vector3.create(this.transform.localPosition.x, 
                this.transform.localPosition.y, 
                this.m_moveStart));
        }
        //判断是否撞到

     }

     onCollisionEnter(collider:any)
     {
        console.log("onCollisionEnter");
        console.log(collider);
     }

     onTriggerEnter(collider:any)
     {
        console.log("onTriggerEnter");
        console.log(collider);
     }

     onTriggerExit(collider:any)
     {
        console.log("onTriggerExit");
        console.log(collider);
     }

     private OnGameEndTypeFunc(eventType:Events, items:any)
     {
        this.m_gameEnd = true;
     }

    
 }