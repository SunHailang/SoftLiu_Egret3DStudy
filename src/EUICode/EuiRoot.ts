import EventsManager from "../Utils/EventManager/EventsManager";
import HSWData from "./euiData/HSWData";
import UserData from "../User/UserData";
import GameEndData from "./euiData/GameEndData";
import GameStartData from "./euiData/GameStartData";
import ThemeAdapter from "./ThemeAdapter";
import AssetAdapter from "./AssetAdapter";

/**
 *  __author__ = "sun hai lang"
 *  __date__ = 2019-06-14
 * 
 */

export default class EuiRoot extends paper.Behaviour
{
    private m_gameStart:boolean = false;
    private m_gameEnd:boolean = false;

    private m_renderer:egret3d.Egret2DRenderer = null;

    private m_init:boolean = false;
    private m_euiComplete:boolean = false;

    onAwake(config:any)
    {
        EventsManager.getInstance().RegisterEvent(Events.OnGameStartType, this.OnGameStartTypeFunc.bind(this));
        EventsManager.getInstance().RegisterEvent(Events.OnGameEndType, this.OnGameEndTypeFunc.bind(this));
    }

    onStart()
    {
        
        this.m_renderer = this.gameObject.getComponent(egret3d.Egret2DRenderer)!;
        const adapter = new egret3d.MatchWidthOrHeightAdapter();
        adapter.setResolution(egret3d.stage.size.w, egret3d.stage.size.h);
        this.m_renderer.screenAdapter = adapter;

        const assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());

        const theme = new eui.Theme("resource/2d/default.thm.json", this.m_renderer.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE, ()=>{

            // 当 theme 加载完成调用 开始加载控件， 
            
            let hswData = new HSWData();
            hswData.hostComponentKey = "HSWData";
            this.m_renderer.root.addChild(hswData);
            hswData.showNotic.addEventListener(egret.TouchEvent.TOUCH_TAP, (e:egret.TextEvent)=>{

                console.log("showNotic");
                EventsManager.getInstance().TriggerEvent(Events.OnClickType, ["showNotic", true, 15]);

            },null);
            hswData.showNotic.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (e:egret.TouchEvent)=>
            {
                // 设置当前按钮的scale大小 为 0.85
                egret.Tween.get(hswData.showNotic).to( {scaleX: 0.85, scaleY: 0.85}, 7 / 60 * 1000);
            }, null);
            hswData.showNotic.addEventListener(egret.TouchEvent.TOUCH_END, (e:egret.TouchEvent)=>
            {
                // 设置当前按钮的scale大小 为 1
                egret.Tween.get(hswData.showNotic).to( {scaleX: 1, scaleY: 1}, 7 / 60 * 1000);
            }, null);

            hswData.image_click_scenc.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (e:egret.TouchEvent)=>
            {
                // 设置当前按钮的scale大小 为 0.85
                egret.Tween.get(hswData.image_click_scenc).to( {scaleX: 0.85, scaleY: 0.85}, 7 / 60 * 1000);

                EventsManager.getInstance().TriggerEvent(Events.OnClickType, ["image_touchBegin_scenc"]);
            }, this);
            hswData.image_click_scenc.addEventListener(egret.TouchEvent.TOUCH_END, (e:egret.TouchEvent)=>
            {
                // 设置当前按钮的scale大小 为 1
                egret.Tween.get(hswData.image_click_scenc).to( {scaleX: 1, scaleY: 1}, 10 / 60 * 1000);

                EventsManager.getInstance().TriggerEvent(Events.OnClickType, ["image_touchEnd_scenc"]);
            }, this); 
            hswData.image_click_scenc.addEventListener(egret.TouchEvent.TOUCH_TAP, (e:egret.TouchEvent)=>
            {
                EventsManager.getInstance().TriggerEvent(Events.OnClickType, ["image_click_scenc"]);
            }, null);

            

            // 当所有控件加载完成结束
            this.m_euiComplete = true;

        }, this);
        
    }

    onLateUpdate(delta:number)
    {
        if(!this.m_init && this.m_euiComplete)
        {
            this.m_init = true;
            EventsManager.getInstance().TriggerEvent(Events.OnGameStartType, null);
        }
    }

    OnGameStartTypeFunc(eventType:Events, items:any)
    {
        let start:GameStartData = new GameStartData();
        this.m_renderer.root.addChild(start);        
        start.m_btnPlay.addEventListener(egret.TouchEvent.TOUCH_TAP, (e:egret.TouchEvent)=>
        {
            start.RemoveResizeEvent();
            this.m_renderer.root.removeChild(start);
            EventsManager.getInstance().TriggerEvent(Events.OnGamePlayType, []);
        }, null);
        
        this.m_gameStart = true;
        this.m_gameEnd = false;
    }
    OnGameEndTypeFunc(eventType:Events, items:any)
    {
        let user:UserData = items[0] as UserData;
        if(user)
        {
            console.log(user);
            let end:GameEndData = new GameEndData();
            this.m_renderer.root.addChild(end);
            end.Label_Score.text = user.score + "分";
            if(user.result)
            {
                end.Label_Result.text = "胜利";
            }
            else
            {
                end.Label_Result.text = "失败";
            }
            
            end.Button_Result.addEventListener(egret.TouchEvent.TOUCH_TAP, (e:egret.TouchEvent)=>
            {
                end.RemoveResizeEvent();
                this.m_renderer.root.removeChild(end);
                EventsManager.getInstance().TriggerEvent(Events.OnGameStartType, []);
            }, null);
        }
    }

    onDestroy()
    {
        EventsManager.getInstance().DeregisterEvent(Events.OnGameStartType, this.OnGameStartTypeFunc.bind(this));
        EventsManager.getInstance().DeregisterEvent(Events.OnGameEndType, this.OnGameEndTypeFunc.bind(this));
    }
}



