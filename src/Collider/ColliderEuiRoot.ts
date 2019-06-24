/**
 *  __author__ = "sun hai lang"
 *  __date__ = 2019-06-14
 * 
 */

import EventsManager from "../utils/EventManager/EventsManager";
import UserData from "../User/UserData";
import HSWData from "../EUICode/euiData/HSWData";
import GameStartData from "../EUICode/euiData/GameStartData";


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

class ThemeAdapter implements eui.IThemeAdapter {
    public getTheme(url: string, onSuccess: Function, onError: Function, thisObject: any): void {
        function onResGet(e: string): void {
            onSuccess.call(thisObject, e);
        }

        function onResError(e: RES.ResourceEvent): void {
            if (e.resItem.url === url) {
                RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onResError as any, null);
                onError.call(thisObject);
            }
        }

        if (typeof generateEUI !== 'undefined') {
            egret.callLater(() => {
                onSuccess.call(thisObject, generateEUI);
            }, this);
        }
        else if (typeof generateEUI2 !== 'undefined') {
            RES.getResByUrl("resource/gameEui.json", (data: any, url: any) => {
                (window as any)["JSONParseClass"]["setData"](data);
                onResGet(data);
                egret.callLater(() => {
                    onSuccess.call(thisObject, generateEUI2);
                }, this);
            }, this, RES.ResourceItem.TYPE_JSON);
        }
        else {
            RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onResError as any, null);
            RES.getResByUrl(url, onResGet, this, RES.ResourceItem.TYPE_TEXT);
        }
    }
}

declare var generateEUI: { paths: string[], skins: any };
declare var generateEUI2: { paths: string[], skins: any };

class AssetAdapter implements eui.IAssetAdapter {
    public getAsset(source: string, compFunc: Function, thisObject: any): void {
        function onGetRes(data: any): void {
            compFunc.call(thisObject, data, source);
        }
        let data = RES.getRes(source);
        if (data) {
            onGetRes(data);
        }
        else {
            RES.getResAsync(source, onGetRes, this);
        }
    }
}
