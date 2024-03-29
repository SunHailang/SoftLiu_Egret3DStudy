import Vector3Utils from "../Utils/VectorUtils/Vector3Utils";
import EventsManager from "../Utils/EventManager/EventsManager";
import UserData from "../User/UserData";

/**
 *  __author__ = "sun hai lang"
 *  __date__ = 2019-06-17
 * 
 */

 export default class CubeMove extends paper.Behaviour
 {
    private m_canRotation:boolean = false;

    private m_moveVelocity:number = 10;

    private m_endPostion:egret3d.Vector3;
    private m_moveDirection:egret3d.Vector3;

    private m_moveAllow:boolean = false;
    private m_moveStart:boolean = false;
    private m_moveEnd:boolean = false;

    private m_moveLocationVelocity:number = 8;
    private m_moveLocationCan:boolean = false;
    @paper.editor.property(paper.editor.EditType.FLOAT)
    @paper.serializedField
    public m_indexNum:number = 1;

    private m_initPostion:egret3d.Vector3;

    private m_moveFinish:(index:number)=>void = null;

    private m_rgidbody:egret3d.oimo.Rigidbody;
    private m_boxCollider:egret3d.oimo.BoxCollider;

    private m_gameStart:boolean = false;
    private m_gameEnd:boolean = true;

    private m_moveEndLevel:boolean = false;
    private m_moveEndStartAni:boolean = false;

    onAwake(config:any)
    {
      EventsManager.getInstance().RegisterEvent(Events.OnGameEndType, this.OnGameEndTypeFunc.bind(this));
      EventsManager.getInstance().RegisterEvent(Events.OnGameStartType, this.OnGameStartTypeFunc.bind(this));
    }

    onStart()
    {
        //this.m_moveAllow = false;
        this.m_canRotation = false;
        this.m_initPostion = egret3d.Vector3.create(this.transform.localPosition.x, 
                                    this.transform.localPosition.y, 
                                    this.transform.localPosition.z);
        this.m_moveStart = false;
        this.m_endPostion = this.m_initPostion; 
        this.m_moveLocationCan = false;

        this.m_rgidbody = this.gameObject.getComponent(egret3d.oimo.Rigidbody) as egret3d.oimo.Rigidbody;
        this.m_boxCollider = this.gameObject.getComponent(egret3d.oimo.BoxCollider) as egret3d.oimo.BoxCollider;
    }

    public OnInitCube(index:number, allow:boolean)
    {
        this.m_moveAllow = allow;
        this.m_indexNum = index;

        this.m_moveEndLevel = false;
        this.m_moveEndStartAni = false;
    }

    onUpdate(delta:number)
    {
        if(this.m_moveEndLevel)
        {
            // 移动结束 到达农场里面
            if(this.transform.localPosition.x >= 37 && !this.m_moveEndStartAni)
            {
                this.m_moveEndStartAni = true;
                this.m_rgidbody.addLinearVelocity(Vector3Utils.multiplyScalar(this.m_rgidbody.linearVelocity, -1));
                let zDir =  (this.m_indexNum  % 2) == 0? 2 : -2;
                this.m_rgidbody.addLinearVelocity(egret3d.Vector3.create(2, 0, zDir));
            }
            else
            {
                if(this.transform.localPosition.x >= 40 || this.transform.localPosition.z >= 5 || this.transform.localPosition.z <= -5)
                {
                    this.m_rgidbody.addLinearVelocity(Vector3Utils.multiplyScalar(this.m_rgidbody.linearVelocity, -1));
                    this.m_moveEndLevel = false;
                }
            }
        }
    }

    onFixedUpdate(delta:number)
    {
        if(this.m_moveStart && !this.m_moveEnd)
        {
            if(this.transform.localPosition.x >= 35)
            {
                // 结束当前关卡
                this.m_moveEnd = true;
                this.m_moveStart = false;                
                //this.m_rgidbody.addLinearVelocity(Vector3Utils.multiplyScalar(this.m_rgidbody.linearVelocity, -1));
                //this.transform.setLocalPosition(egret3d.Vector3.create(40,this.transform.localPosition.x, this.transform.localPosition.z - 50 * Math.random()));
                if(this.m_moveFinish)
                {
                    this.m_moveFinish(this.m_indexNum);
                }
                this.m_moveEndLevel = true;
            }
            else if(this.transform.localPosition.x >= this.m_endPostion.x)
            {
                this.m_moveEnd = true;
                this.m_moveStart = false;
                this.m_rgidbody.addLinearVelocity(Vector3Utils.multiplyScalar(this.m_rgidbody.linearVelocity, -1));
                if(this.m_moveFinish)
                {
                    this.m_moveFinish(this.m_indexNum);
                }
            }
        }
        if(this.m_moveLocationCan)
        {
            if(this.transform.localPosition.x >= this.m_endPostion.x)
            {
                this.m_moveLocationCan = false;
                this.m_rgidbody.addLinearVelocity(Vector3Utils.multiplyScalar(this.m_rgidbody.linearVelocity, -1));
            }
        }

        if(this.m_canRotation)
        {
            this.transform.setEulerAngles(new egret3d.Vector3(0,this.transform.localEulerAngles.y + 5 * delta,0));
        }
    }

    public OnMoveStart(endPos:egret3d.Vector3, dir:egret3d.Vector3, finish:(index:number)=>void)
    {
        if(!this.m_moveAllow) return;
        
        this.m_endPostion = endPos;
        this.m_moveDirection = dir;
        this.m_moveFinish = finish;

        this.m_moveLocationCan = false;
        this.m_moveStart = true;
        this.m_moveEnd = false;

        if(this.m_rgidbody)
        {            
            if(!this.m_rgidbody.linearVelocity.equal(egret3d.Vector3.ZERO))
            {
                this.m_rgidbody.addLinearVelocity(Vector3Utils.multiplyScalar(this.m_rgidbody.linearVelocity, -1));
            }
            //console.log(this.m_rgidbody.linearVelocity);
            this.m_rgidbody.addLinearVelocity(Vector3Utils.multiplyScalar(this.m_moveDirection, this.m_moveVelocity));
        }

    }

    public OnMoveLocation(endPos:egret3d.Vector3, dir:egret3d.Vector3)
    {
        if(!this.m_moveAllow) return;

        this.m_endPostion = endPos;
        this.m_moveDirection = dir;

        this.m_moveLocationCan = true;
        this.m_moveStart = false;
        this.m_moveEnd = false;

        if(this.m_rgidbody)
        {            
            if(!this.m_rgidbody.linearVelocity.equal(egret3d.Vector3.ZERO))
            {
                this.m_rgidbody.addLinearVelocity(Vector3Utils.multiplyScalar(this.m_rgidbody.linearVelocity, -1));
            }            
            let locationV = Vector3Utils.multiplyScalar(this.m_moveDirection, this.m_moveLocationVelocity);
            //console.log(locationV);
            this.m_rgidbody.addLinearVelocity(locationV);
        }
    }

    public OnRotation(rotation:boolean)
    {
        this.m_canRotation = rotation;
    }

    onCollisionEnter(collider:any)
    {
        let box = collider as egret3d.oimo.BoxCollider;        
        if(box)
        {
            console.log("onCollisionEnter Name: " + box.gameObject.name);
            this.m_boxCollider.collisionMask = paper.Layer.BuiltinLayer1;
            if(box.gameObject.tag == "EditorCar")
            {
                //生成用户数据
                let user = new UserData();
                user.coins =100;
                user.gems = 100;
                user.result = false;
                user.score = 100;
                EventsManager.getInstance().TriggerEvent(Events.OnGameEndType, [user]);
            }
            else
            {                
                console.log("onCollisionEnter obj tag : " + box.gameObject.tag);
            }
        }
        else
        {
            console.log("onCollisionEnter obj is null.");
        }
    }

    private OnGameEndTypeFunc(eventType:Events, items:any)
    {
        this.m_gameStart = false;
        this.m_gameEnd = true;
        if(this.m_rgidbody && !this.m_rgidbody.linearVelocity.equal(egret3d.Vector3.ZERO))
        {
            this.m_rgidbody.type = egret3d.oimo.RigidbodyType.Kinematic;
            //this.m_rgidbody.addLinearVelocity(Vector3Utils.multiplyScalar(this.m_rgidbody.linearVelocity, -1));
        }
    }

     private OnGameStartTypeFunc(eventType:Events, items:any)
     {
        this.m_gameStart = true;
        this.m_gameEnd = false;
        //console.log(this.m_moveAllow);
        if(this.gameObject && this.m_moveAllow)
        {
            this.gameObject.destroy();
        }
     }

     onDestroy()
     {
        if(this.m_rgidbody)
        {
            this.m_rgidbody = null;
        }
        EventsManager.getInstance().DeregisterEvent(Events.OnGameEndType, this.OnGameEndTypeFunc.bind(this));
        EventsManager.getInstance().DeregisterEvent(Events.OnGameStartType, this.OnGameStartTypeFunc.bind(this));
     }
    
 }