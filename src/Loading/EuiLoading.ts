/**
 * 
 * __author__ = "sun hai lang"
 * __date__ = "2019-07-01"
 * 
 * 
 */

import AssetAdapter from "../EUICode/AssetAdapter";
import ThemeAdapter from "../EUICode/ThemeAdapter";
import LoadingData from "../EUICode/euiData/LoadingData";
import HSWData from "../EUICode/euiData/HSWData";
import GameStartData from "../EUICode/euiData/GameStartData";
import EventsManager from "../Utils/EventManager/EventsManager";




export default class EuiLoading extends paper.Behaviour
{

    private m_renderer:egret3d.Egret2DRenderer;

    private m_euiComplete:boolean = false;

    private m_initComplete:boolean = false;

    onAwake(config:any)
    {
        this.m_initComplete = false;
    }

    onStart()
    {
        this.m_euiComplete = false;

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
            
            let loading:LoadingData = new LoadingData();
            loading.hostComponentKey = "LoadingData";
            this.m_renderer.root.addChild(loading);

            

            // 当所有控件加载完成结束
            this.m_euiComplete = true;

        }, this);
    }

    onUpdate(delta:number)
    {
        if(!this.m_initComplete && this.m_euiComplete)
        {
            this.m_initComplete = true;
            // TODO eui 加载完成
            EventsManager.getInstance().TriggerEvent(Events.OnEUILoadCompleteType, []);
        }
    }

}