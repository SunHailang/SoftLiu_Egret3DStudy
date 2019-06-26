import EventsManager from "../utils/EventManager/EventsManager";

/**
 *  __author__ = "sun hai lang"
 *  __date__ = 2019-06-21
 * 
 */

 export default class CameraMove extends paper.Behaviour
 {

    private m_canMove:boolean = false;
    private m_moveSumDis:number = 0;

    private m_moveSpeed:number = 2.3;

    private m_onFinish:()=>void;

    private m_moveDis:number = 0;
    private m_initMovePos:egret3d.Vector3;

    private m_initStartPos:egret3d.Vector3;

    private m_gameStart:boolean = false;
   private m_gameEnd:boolean = false;

    onAwake(config:any)
    {
        EventsManager.getInstance().RegisterEvent(Events.OnGameEndType, this.OnGameEndTypeFunc.bind(this));
        EventsManager.getInstance().RegisterEvent(Events.OnGameStartType, this.OnGameStartTypeFunc.bind(this));
    }

    onStart()
    {
        this.m_initStartPos = egret3d.Vector3.create(this.transform.position.x, this.transform.position.y, this.transform.position.z);
    }

    onUpdate(delta:number)
    {

        if(this.m_canMove)
        {
            this.m_moveDis += this.m_moveSpeed * delta;
            this.transform.setPosition(egret3d.Vector3.create(this.transform.position.x + this.m_moveSpeed * delta, this.transform.position.y, this.transform.position.z));
            if(this.m_moveDis >= this.m_moveSumDis)
            {
                this.m_canMove = false;
                this.transform.setPosition(egret3d.Vector3.create(this.m_initMovePos.x + this.m_moveSumDis, this.transform.position.y, this.transform.position.z));
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
        this.m_initMovePos = egret3d.Vector3.create(this.transform.position.x, this.transform.position.y, this.transform.position.z);

        this.m_canMove = state;
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
         this.transform.position = egret3d.Vector3.create(this.m_initStartPos.x, this.m_initStartPos.y, this.m_initStartPos.z);
    }

    onDestroy()
    {
         EventsManager.getInstance().DeregisterEvent(Events.OnGameEndType, this.OnGameEndTypeFunc.bind(this));
         EventsManager.getInstance().DeregisterEvent(Events.OnGameStartType, this.OnGameStartTypeFunc.bind(this));
    }
 }