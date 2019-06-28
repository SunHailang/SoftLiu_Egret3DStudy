/**
 *  __author__ = "sun hai lang"
 *  __date__ = 2019-06-14
 * 
 */

import EventsManager from "../Utils/EventManager/EventsManager";
import CubeMove from "./CubeMove";
import UserData from "../User/UserData";
import Vector3Utils from "../Utils/VectorUtils/Vector3Utils";
import CameraMove from "./CameraMove";

export default class Splash extends paper.Behaviour
{

    @paper.serializedField
    @paper.editor.property(paper.editor.EditType.FLOAT)
    speed: number = 1;
	
	@paper.editor.property(paper.editor.EditType.FLOAT, { minimum: -10.0, maximum: 10.0 })
    public rotateSpeed: number = 0.5;
    @paper.editor.property(paper.editor.EditType.VECTOR3)
    public readonly lookAtPoint: egret3d.Vector3 = egret3d.Vector3.create();

    @paper.editor.property(paper.editor.EditType.GAMEOBJECT)
    @paper.serializedField
    private m_camera:paper.GameObject | null;
    @paper.editor.property(paper.editor.EditType.GAMEOBJECT)
    @paper.serializedField
    private m_target:paper.GameObject | null;

    m_cubeList:CubeMove[] = [];

    private m_btnAPress:boolean = false;
    //用于控制在多次执行延时函数，造成的async函数同一时间多次执行
    private m_btnPressIndex:number = 0;

    private m_gameEnd:boolean = false;
    private m_gameStart:boolean = false;
    private m_gamePlay:boolean = false;
    // 默认索引要从1开始
    private m_moveIndex = 1;

    // 设置 每个 Cube 的长度 和 间距 计算出每一个Cube移动的距离
    private m_cubeWidth:number = 1;
    private m_cubeGap = 0.5;

    private m_cubeMoveDis = 0;

    private m_roadWidth = 5;

    private m_initEndPosition:egret3d.Vector3;
    private m_initStartPosition:egret3d.Vector3;
    private m_initDirection:egret3d.Vector3;

    private m_cameraMove:CameraMove;

    private m_levelIndex:number = 0;
    private m_levelInfo:boolean[] = [false, true, false];

    onAwake()
    {
        EventsManager.getInstance().RegisterEvent(Events.OnGameStartType, this.OnGameStartTypeFunc.bind(this));
        EventsManager.getInstance().RegisterEvent(Events.OnGameEndType, this.OnGameEndTypeFunc.bind(this));
        EventsManager.getInstance().RegisterEvent(Events.OnGamePlayType, this.OnGamPlayTypeFunc.bind(this));
        EventsManager.getInstance().RegisterEvent(Events.OnResPlayerCompleteType, this.OnResPlayerCompleteTypeFunc.bind(this));
    }
    onStart()
    {
        this.m_gameEnd = false;

        this.m_cameraMove = this.m_camera.getComponent(CameraMove)! as CameraMove;

        this.ReadJson();
    }

    async ReadJson()
    {
        await RES.getResAsync("Assets/json/UserData.json", (value:any, key:string)=>
        {
            console.log(value.UserData.length);
            for (let index = 0; index < value.UserData.length; index++) {
                const element = value.UserData[index];
                console.log(element.key);
            }
        }, this);
    }

    onEnable()
    {
        EventsManager.getInstance().RegisterEvent(Events.OnClickType, this.OnOnClickType.bind(this));
    }

    onDisable()
    {
        EventsManager.getInstance().DeregisterEvent(Events.OnClickType, this.OnOnClickType.bind(this));
    }

    OnOnClickType(eventType:Events, items:any)
    {

        if(this.m_gameEnd) return;
        if(items.length > 0)
        {
            if(items[0] == "image_click_scenc")
            {
                if(!this.m_gamePlay) return;
                
            }
            else if(items[0] == "image_touchBegin_scenc")
            {
                if(!this.m_gamePlay) 
                {
                    return;
                }
                this.m_btnAPress = true;
                this.test(500);
            }
            else if(items[0] == "image_touchEnd_scenc")
            {
                if(!this.m_gamePlay) 
                {
                    return;
                }
                this.m_btnAPress = false;
            }
        }
    }

    private MovePlayer()
    {
        if(!this.m_gamePlay) 
        {
            return;
        }
        if(this.m_moveIndex <= this.m_cubeList.length)
        {
            let endPos = egret3d.Vector3.create(this.m_initEndPosition.x - ((this.m_cubeWidth + this.m_cubeGap) * (this.m_moveIndex - 1)), this.m_initEndPosition.y, this.m_initEndPosition.z);
            let dir = egret3d.Vector3.create(this.m_initDirection.x, this.m_initDirection.y, this.m_initDirection.z);
            //console.log(this.m_cubeList[this.m_moveIndex-1]);
            this.m_cubeList[this.m_moveIndex-1].OnMoveStart(endPos, dir, (index:number)=>
            {
                // Complete Cube Move to end target
                if(index == this.m_cubeList[this.m_cubeList.length - 1].m_indexNum)
                {
                    // 说明所有Cube都已经移动完成了
                    console.log("move all cube finish.");
                    this.m_btnPressIndex = 0;
                    this.m_btnAPress = false;
                    this.m_levelIndex++;
                    this.m_gamePlay = false;
                    if(this.m_levelIndex >= this.m_levelInfo.length)
                    {
                        //结束了整个关卡，闯关成功
                        let user = new UserData();
                        user.score = 100 * this.m_levelIndex;
                        user.result = true;
                        user.gems = 100;
                        user.coins = 100;
                        //EventsManager.getInstance().TriggerEvent(Events.OnGameEndType, [user]);
                    }
                    else
                    {
                        this.InitPlayerMoveInfo();
                    }
                    
                    if(this.m_cameraMove)
                    {
                        this.m_cameraMove.CanMove(true, this.m_cubeMoveDis, ()=>{

                            console.log("camera move complete."); 
                            if(this.m_levelIndex >= this.m_levelInfo.length)
                            {
                                //结束了整个关卡，闯关成功
                                let user = new UserData();
                                user.score = 100 * this.m_levelIndex;
                                user.result = true;
                                user.gems = 100;
                                user.coins = 100;
                                EventsManager.getInstance().TriggerEvent(Events.OnGameEndType, [user]);
                            }
                            else
                            {
                                EventsManager.getInstance().TriggerEvent(Events.OnGamePlayType, ["Camera Play"]);
                            }
                        });
                    }
                    else
                    {
                        console.log("Move Camera is null.");
                    }
                    /*
                    let user:UserData = new UserData();
                    user.score = 100;
                    user.result = true;
                    user.gems = 100;
                    user.coins = 100;
                    EventsManager.getInstance().TriggerEvent(Events.OnGameEndType, [user]);
                    */
                }
            });
            this.m_moveIndex++;
            if(this.m_moveIndex <= this.m_cubeList.length)
            {
                let curIndex:number = 0;
                for (let index = this.m_moveIndex - 1; index < this.m_cubeList.length; index++)
                {
                    const element =  this.m_cubeList[index];
                    let endPos:egret3d.Vector3 = egret3d.Vector3.create(this.m_initStartPosition.x - (this.m_cubeWidth + this.m_cubeGap) * curIndex, this.m_initStartPosition.y, this.m_initStartPosition.z);
                    let dir = egret3d.Vector3.create(this.m_initDirection.x, this.m_initDirection.y, this.m_initDirection.z);
                    element.OnMoveLocation(endPos, dir);
                    curIndex++;
                }
            }
        }
    }

    private InitPlayerMoveInfo()
    {
        if(this.m_levelIndex < this.m_levelInfo.length && this.m_levelInfo[this.m_levelIndex])
        {
            let target = this.m_target.getComponent(CubeMove) as CubeMove;
            if(target)
            {
                console
                target.OnInitCube(this.m_cubeList[0].m_indexNum - 1, true);
                this.m_cubeList.push(target);
            }
        }
        this.m_cubeList.sort((a:CubeMove, b:CubeMove):number=>
        {
            //升序
            if(b.m_indexNum > a.m_indexNum)
            {
                return -1;
            }
            else
            {
                return 1;
            }
        });
        this.m_cubeMoveDis = this.m_cubeList.length * (this.m_cubeWidth + this.m_cubeGap) + this.m_cubeGap + this.m_roadWidth;
        this.m_initStartPosition = egret3d.Vector3.create(this.m_cubeList[0].transform.localPosition.x, 
                                        this.m_cubeList[0].transform.localPosition.y,
                                        this.m_cubeList[0].transform.localPosition.z);
        this.m_initEndPosition = egret3d.Vector3.create(this.m_cubeList[0].transform.localPosition.x + this.m_cubeMoveDis, 
                                        this.m_cubeList[0].transform.localPosition.y,
                                        this.m_cubeList[0].transform.localPosition.z);
        this.m_initDirection = Vector3Utils.subtract(this.m_initEndPosition, this.m_initStartPosition).normalize();
    }

    OnResPlayerCompleteTypeFunc(eventType:Events, items:any)
    {
        switch(items[0])
        {
            case "initPlayer":
                this.m_cubeList = items[1];
                this.m_levelIndex = 0;
                //console.log(this.m_cubeList);
                if(this.m_cubeList && this.m_cubeList.length > 0)
                {            
                    this.InitPlayerMoveInfo();
                }else
                {
                    console.log("add player list error.")
                }
            break;
            case "alivePlayer":
                this.m_target = items[1];
            break;
        }        
    }

    OnGameStartTypeFunc(eventType:Events, items:any)
    {
        this.m_gameStart = true;
        this.m_gameEnd = false;
        this.m_gamePlay = false;
        this.m_moveIndex = 1;

        this.m_btnPressIndex = 0;
        this.m_btnAPress = false;
    }
    OnGameEndTypeFunc(eventType:Events, items:any)
    {
        this.m_gameEnd = true;
        this.m_gamePlay = false;
        this.m_btnPressIndex = 0;
        this.m_btnAPress = false;
    }
    OnGamPlayTypeFunc(eventType:Events, items:any)
    {
        //this.m_levelIndex = 0;
        this.m_btnPressIndex = 0;
        this.m_btnAPress = false;
        if(items.length > 0)
        {
            switch(items[0])
            {
                case "Camera Play":
                    this.m_gamePlay = true;
                    this.m_gameStart = true;
                    this.m_gameEnd = false;
                    this.m_moveIndex = 1;
                break;
            }
        }
        else
        {
            this.m_gamePlay = true;
        }        
    }

    //delay 等待延迟的时间参数  单位 毫秒
    async test(delay:number) {
        this.m_btnPressIndex++;
        while(this.m_btnAPress)
        {
            console.log("PressMethod.");
            this.MovePlayer();
            await new Promise((resolve) => setTimeout(resolve,delay));
            if(!this.m_btnAPress || this.m_btnPressIndex > 1)
            {
                break;
            }
        }
        this.m_btnPressIndex--;
    }

    onFixedUpdate(delta:number)
    {
        
    }

    onLateUpdate(delta:number)
    {

    }

    onDestroy()
    {
        EventsManager.getInstance().DeregisterEvent(Events.OnGameStartType, this.OnGameStartTypeFunc.bind(this));
        EventsManager.getInstance().DeregisterEvent(Events.OnGameEndType, this.OnGameEndTypeFunc.bind(this));
        EventsManager.getInstance().DeregisterEvent(Events.OnGamePlayType, this.OnGamPlayTypeFunc.bind(this));
        EventsManager.getInstance().DeregisterEvent(Events.OnResPlayerCompleteType, this.OnResPlayerCompleteTypeFunc.bind(this));
    }

}