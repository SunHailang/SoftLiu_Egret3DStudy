/**
 *  __author__ = "sun hai lang"
 *  __date__ = 2019-06-17
 * 
 */

 export default class CubeMove extends paper.Behaviour
 {
    m_canRotation:boolean = false;

    m_moveDir:number = 3.2;

    m_endPostion:egret3d.Vector3;
    m_isStatic = true;

    private m_moveStart:boolean = false;
    private m_moveEnd:boolean = false;

    private m_moveDis:number = 0;
    private m_moveSumDis:number = 0;

    private m_moveLocationDir:number = 2.8;
    private m_moveLocationCan:boolean = false;

    private m_indexNum:number = 1;

    private m_initPostion:egret3d.Vector3;

    private m_moveFinish:(index:number)=>void = null;
    onStart()
    {
        this.m_canRotation = false;
        this.m_initPostion = egret3d.Vector3.create(this.transform.localPosition.x, 
                                    this.transform.localPosition.y, 
                                    this.transform.localPosition.z);
        this.m_moveDis = 0;
        this.m_moveStart = false;
        this.m_endPostion = this.m_initPostion; 
        this.m_moveLocationCan = false;
    }

    onFixedUpdate(delta:number)
    {
        if(this.m_moveStart && !this.m_moveEnd)
        {
            this.m_moveDis += this.m_moveDir * delta;
            this.transform.setLocalPosition(egret3d.Vector3.create(this.transform.localPosition.x + this.m_moveDir * delta, 
                                                                this.transform.localPosition.y, 
                                                                this.transform.localPosition.z));
            
            if(this.transform.localPosition.x >= this.m_endPostion.x)
            {
                this.m_moveEnd = true;
                this.m_moveStart = false;

                this.transform.setLocalPosition(new egret3d.Vector3(this.m_endPostion.x, 
                                    this.transform.localPosition.y, 
                                    this.transform.localPosition.z));
                if(this.m_moveFinish)
                {
                    this.m_moveFinish(this.m_indexNum);
                }
            }
        }
        if(this.m_moveLocationCan)
        {
            this.m_moveDis += this.m_moveLocationDir * delta;
            this.transform.setLocalPosition(egret3d.Vector3.create(this.m_initPostion.x + this.m_moveDis, 
                                this.transform.localPosition.y, 
                                this.transform.localPosition.z));

            if( this.m_moveDis >= this.m_moveSumDis)
            {
                this.m_moveLocationCan = false;

                this.transform.setLocalPosition(new egret3d.Vector3(this.m_initPostion.x + this.m_moveSumDis, 
                                this.transform.localPosition.y, 
                                this.transform.localPosition.z));
            }
        }

        if(this.m_canRotation)
        {
            this.transform.setEulerAngles(new egret3d.Vector3(0,this.transform.localEulerAngles.y + 5*delta,0));
        }
    }

    public isStatic():boolean
    {
        return this.m_isStatic;
    }

    public OnMoveStart(index:number, endPos:egret3d.Vector3, finish:(index:number)=>void)
    {
        this.m_endPostion = endPos;
        this.m_indexNum = index;
        //this.m_moveSumDis = distence;
        this.m_moveFinish = finish;

        this.m_initPostion = egret3d.Vector3.create(this.transform.localPosition.x, 
                                        this.transform.localPosition.y, 
                                        this.transform.localPosition.z);
        this.m_moveDis = 0;
        this.m_moveLocationCan = false;
        this.m_moveStart = true;
        this.m_moveEnd = false;
    }

    public OnMoveLocation(dis:number)
    {
        this.m_moveSumDis = dis;
        this.m_initPostion = egret3d.Vector3.create(this.transform.localPosition.x,
                        this.transform.localPosition.y, 
                        this.transform.localPosition.z);
        this.m_moveDis = 0;
        this.m_moveLocationCan = true;
    }

    public OnRotation(rotation:boolean)
    {
        this.m_canRotation = rotation;
    }
 }