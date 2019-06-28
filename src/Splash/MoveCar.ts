import EventsManager from "../Utils/EventManager/EventsManager";
import Vector3Utils from "../Utils/VectorUtils/Vector3Utils";

/**
 *  __author__ = "sun hai lang"
 *  __date__ = 2019-06-20
 * 
 */

 export default class MoveCar extends paper.Behaviour
 {
    // 正数 表示正方向， 负数 表示反方向    
    //@paper.editor.property(paper.editor.EditType.FLOAT)
    //@paper.serializedField
    private m_moveSpeed:number = 10;

   private m_gameStart:boolean = false;
   private m_gameEnd:boolean = false;

   private m_carRigidbody:egret3d.oimo.Rigidbody;


   onAwake(config:any)
   {
      EventsManager.getInstance().RegisterEvent(Events.OnGameEndType, this.OnGameEndTypeFunc.bind(this));
      EventsManager.getInstance().RegisterEvent(Events.OnGameStartType, this.OnGameStartTypeFunc.bind(this));
   }

   onStart()
   {
      

      //let rig:egret3d.oimo.Rigidbody = this.gameObject.getComponent(egret3d.oimo.Rigidbody);
      //rig.applyForce(egret3d.Vector3.create(0,0,-100), egret3d.Vector3.BACK);
      //rig.applyLinearImpulse(egret3d.Vector3.create(0,0,-3));
   }

   onFixedUpdate(delta:number)
   {
      if(this.m_gameEnd)
      {
         return;
         //this.m_carRigidbody.addLinearVelocity(Vector3Utils.multiplyScalar(this.m_carRigidbody.linearVelocity, -1));
      }else
      {
         if(this.m_moveSpeed > 0)
         {
            if(this.transform.localPosition.z >= 50)
            {
               //销毁
               this.gameObject.destroy();
            }
         }
         else
         {
            if(this.transform.localPosition.z <= -50)
            {
               //销毁
               this.gameObject.destroy();
            }
         }
     }
        //判断是否撞到

   }
   onCollisionEnter(collider:any)
    {
        let obj = collider as egret3d.oimo.BoxCollider;        
        if(obj)
        {
           //console.log(obj.gameObject.tag);
            //if(obj.tag == "EditorCar")
            {
                //EventsManager.getInstance().TriggerEvent(Events.OnGameEndType, []);
            }
        }
        else
        {
            console.log("onCollisionEnter obj is null.");
        }
    }

     public StartMove(move:boolean, velocity:number)
     {
         try 
         {
            this.m_moveSpeed = velocity;
            if(this.m_gameEnd)
               return;
            this.m_carRigidbody = this.gameObject.getComponent(egret3d.oimo.Rigidbody) as egret3d.oimo.Rigidbody;
            if(this.m_carRigidbody)
            {
               //TODO 添加速度
               this.m_carRigidbody.addLinearVelocity(egret3d.Vector3.create(0, 0, this.m_moveSpeed));
            }
         }
         catch (error) 
         {
            console.log(error);
         }
         
      }

     private OnGameEndTypeFunc(eventType:Events, items:any)
     {
        this.m_gameStart = false;
        this.m_gameEnd = true;
        if(this.m_carRigidbody && !this.m_carRigidbody.linearVelocity.equal(egret3d.Vector3.ZERO))
        {
            this.m_carRigidbody.type = egret3d.oimo.RigidbodyType.Kinematic;
            //this.m_carRigidbody.addLinearVelocity(Vector3Utils.multiplyScalar(this.m_carRigidbody.linearVelocity, -1));
        }
     }

     private OnGameStartTypeFunc(eventType:Events, items:any)
     {
         this.m_gameStart = true;
         this.m_gameEnd = false;
         if(this.gameObject)
         {
            this.gameObject.destroy();
         }
     }

     onDestroy()
     {
         if(this.m_carRigidbody)
         {
            this.m_carRigidbody = null;
         }
         EventsManager.getInstance().DeregisterEvent(Events.OnGameEndType, this.OnGameEndTypeFunc.bind(this));
         EventsManager.getInstance().DeregisterEvent(Events.OnGameStartType, this.OnGameStartTypeFunc.bind(this));
     }
    
 }