import EventsManager from "../utils/EventManager/EventsManager";
import HSWData from "./euiData/HSWData";

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
            
            const hswData = new HSWData();
            this.m_renderer.root.addChild(hswData);
            hswData.showNotic.addEventListener(egret.TouchEvent.TOUCH_TAP, (e:egret.TextEvent)=>{

                console.log("showNotic");
                EventsManager.getInstance().TriggerEvent(Events.OnClickType, ["showNotic", true, 15]);

            },null);

            hswData.image_click_scenc.addEventListener(egret.TouchEvent.TOUCH_TAP, (e:egret.TouchEvent)=>{
                EventsManager.getInstance().TriggerEvent(Events.OnClickType, ["image_click_scenc"]);
            }, null);

            // 当所有控件加载完成结束
            EventsManager.getInstance().TriggerEvent(Events.OnGameStartType, null);

        }, this);

        
    }

    OnGameStartTypeFunc(eventType:Events, items:any)
    {
        this.m_gameStart = true;
        this.m_gameEnd = false;
    }
    OnGameEndTypeFunc(eventType:Events, items:any)
    {
        
    }

    onDestroy()
    {
        EventsManager.getInstance().DeregisterEvent(Events.OnGameStartType, this.OnGameStartTypeFunc.bind(this));
        EventsManager.getInstance().DeregisterEvent(Events.OnGameEndType, this.OnGameEndTypeFunc.bind(this));
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
