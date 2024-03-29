/**
 *  __author__ = "sun hai lang"
 *  __date__ = 2019-06-14
 * 
 */

import EventsManager from "../Utils/EventManager/EventsManager";
import UserData from "../User/UserData";
import HSWData from "../EUICode/euiData/HSWData";
import GameStartData from "../EUICode/euiData/GameStartData";
import ThemeAdapter from "../EUICode/ThemeAdapter";
import AssetAdapter from "../EUICode/AssetAdapter";


export default class ColliderEuiRoot extends paper.Behaviour
{

    private m_renderer:egret3d.Egret2DRenderer = null;

    private m_init:boolean = false;
    private m_euiComplete:boolean = false;

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
            
            let start:GameStartData = new GameStartData();
            this.m_renderer.root.addChild(start);        
            start.m_btnPlay.addEventListener(egret.TouchEvent.TOUCH_TAP, (e:egret.TouchEvent)=>
            {
                EventsManager.getInstance().TriggerEvent(Events.OnColliderTestType, []);
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
            //TODO
        }
    }
}
