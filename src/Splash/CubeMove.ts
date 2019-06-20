/**
 *  __author__ = "sun hai lang"
 *  __date__ = 2019-06-17
 * 
 */

 export default class CubeMove extends paper.Behaviour
 {
    m_canRotation:boolean = false;

    m_moveDir:number = 2;

    m_endPostion:egret3d.Vector3 = egret3d.Vector3.ZERO;
    m_isStatic = true;

    private m_moveStart:boolean = false;
    private m_moveStay:boolean = false;
    private m_moveEnd:boolean = false;
    onStart()
    {
        this.m_canRotation = false;
        this.m_moveDir = 2;
    }

    onFixedUpdate(delta:number)
    {
        if(this.m_moveStart)
        {
           this.transform.setLocalPosition(new egret3d.Vector3(this.transform.localPosition.x + this.m_moveDir * delta, 
                                                                this.transform.localPosition.y, 
                                                                this.transform.localPosition.z));
           /*
           let pos:egret3d.Vector3 = egret3d.Vector3.ZERO;
           this.transform.setLocalPosition(egret3d.Vector3.lerp(this.transform.localPosition, 
                new egret3d.Vector3(20, this.transform.localPosition.y, this.transform.localPosition.z), 
                0.02, 
                pos));
            console.log(pos)
            */
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

    public OnMove(move:boolean, endpos:egret3d.Vector3)
    {
        this.m_endPostion = endpos;
        this.m_moveStart = move;
    }

    public OnRotation(rotation:boolean)
    {
        this.m_canRotation = rotation;
    }
 }