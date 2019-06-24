/**
 *  __author__ = "sun hai lang"
 *  __date__ = 2019-06-21
 * 
 */

 export default class CameraMove extends paper.Behaviour
 {

    private m_canMove:boolean = false;
    private m_moveSumDis:number = 0;

    private m_onFinish:()=>void;

    private m_moveDis:number = 0;
    private m_initPos:egret3d.Vector3;

     onStart()
     {

     }

     onUpdate(delta:number)
     {

        if(this.m_canMove)
        {
            this.m_moveDis += delta;
            this.transform.setPosition(egret3d.Vector3.create(this.transform.position.x + delta, this.transform.position.y, this.transform.position.z));
            if(this.m_moveDis >= this.m_moveSumDis)
            {
                this.m_canMove = false;
                this.transform.setPosition(egret3d.Vector3.create(this.m_initPos.x + this.m_moveSumDis, this.transform.position.y, this.transform.position.z));
                if(this.m_onFinish)
                {
                    this.m_onFinish();
                }
            }
        }
     }

     public CanMove(state:boolean, dis:number, action:()=>void):void
     {
        this.m_moveDis = 0;
        this.m_moveSumDis = dis;
        this.m_onFinish = action;
        this.m_initPos = egret3d.Vector3.create(this.transform.position.x, this.transform.position.y, this.transform.position.z);

        this.m_canMove = state;
     }
 }