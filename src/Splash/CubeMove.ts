import Vector3Utils from "../utils/VectorUtils/Vector3Utils";

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

    private m_moveStart:boolean = false;
    private m_moveEnd:boolean = false;

    private m_moveLocationVelocity:number = 8;
    private m_moveLocationCan:boolean = false;

    private m_indexNum:number = 1;

    private m_initPostion:egret3d.Vector3;

    private m_moveFinish:(index:number)=>void = null;

    private m_rgidbody:egret3d.oimo.Rigidbody;
    onStart()
    {
        this.m_canRotation = false;
        this.m_initPostion = egret3d.Vector3.create(this.transform.localPosition.x, 
                                    this.transform.localPosition.y, 
                                    this.transform.localPosition.z);
        this.m_moveStart = false;
        this.m_endPostion = this.m_initPostion; 
        this.m_moveLocationCan = false;

        this.m_rgidbody = this.gameObject.getComponent(egret3d.oimo.Rigidbody) as egret3d.oimo.Rigidbody;
    }

    onFixedUpdate(delta:number)
    {
        if(this.m_moveStart && !this.m_moveEnd)
        {            
            if(this.transform.localPosition.x >= this.m_endPostion.x)
            {
                this.m_moveEnd = true;
                this.m_moveStart = false;
                this.m_rgidbody.addLinearVelocity(Vector3Utils.multiplyScalar(this.m_rgidbody.linearVelocity, -1));
                this.transform.setLocalPosition(egret3d.Vector3.create(this.m_endPostion.x, this.m_endPostion.y, this.m_endPostion.z));
                this.transform.localPosition.update();
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
                this.transform.setLocalPosition(egret3d.Vector3.create(this.m_endPostion.x, this.m_endPostion.y, this.m_endPostion.z));
                this.transform.localPosition.update();
            }
        }

        if(this.m_canRotation)
        {
            this.transform.setEulerAngles(new egret3d.Vector3(0,this.transform.localEulerAngles.y + 5 * delta,0));
        }
    }

    public OnMoveStart(index:number, endPos:egret3d.Vector3, dir:egret3d.Vector3, finish:(index:number)=>void)
    {
        this.m_endPostion = endPos;
        this.m_moveDirection = dir;
        this.m_indexNum = index;
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
            console.log(this.m_rgidbody.linearVelocity);
            this.m_rgidbody.addLinearVelocity(Vector3Utils.multiplyScalar(this.m_moveDirection, this.m_moveVelocity));
        }

    }

    public OnMoveLocation(endPos:egret3d.Vector3, dir:egret3d.Vector3)
    {
        this.m_endPostion = endPos;
        this.m_moveDirection = dir;

        this.m_moveLocationCan = true;
        this.m_moveStart = false;
        this.m_moveEnd = false;

        if(this.m_rgidbody)
        {            
            if(this.m_rgidbody.linearVelocity != egret3d.Vector3.ZERO)
            {
                this.m_rgidbody.addLinearVelocity(Vector3Utils.multiplyScalar(this.m_rgidbody.linearVelocity, -1));
            }
            //console.log(this.m_rgidbody.linearVelocity);
            this.m_rgidbody.addLinearVelocity(Vector3Utils.multiplyScalar(this.m_moveDirection, this.m_moveLocationVelocity));
        }
    }

    public OnRotation(rotation:boolean)
    {
        this.m_canRotation = rotation;
    }
 }