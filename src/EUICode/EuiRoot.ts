/**
 *  __author__ = "sun hai lang"
 *  __date__ = 2019-06-14
 * 
 */

export default class EuiRoot extends paper.Behaviour
{
    onStart()
    {
        
        const renderer = this.gameObject.getComponent(egret3d.Egret2DRenderer)!;
        const adapter = new egret3d.MatchWidthOrHeightAdapter();
        adapter.setResolution(egret3d.stage.size.w, egret3d.stage.size.h);
        renderer.screenAdapter = adapter;

        const assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());

        const theme = new eui.Theme("resource/2d/default.thm.json", renderer.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE, onThemeLoadComplete, this);

        function onThemeLoadComplete() {
            const myGroup = new eui.Group();
            renderer.root.addChild(myGroup);
            myGroup.width = 200;
            myGroup.height = 400;
            myGroup.layout = new eui.BasicLayout();

            var btn1:eui.Button = new eui.Button();
            btn1.label = "Button A";
            //btn1.skinName = "ButtonSkin.exml";
            btn1.addEventListener(egret.TouchEvent.TOUCH_TAP, Btn1_OnClick, null)
            function Btn1_OnClick(e:egret.TouchEvent)
            {
                console.log("Button A Touch_up.");
            }
            myGroup.addChild(btn1);
            var btn2:eui.Button = new eui.Button();
            btn2.label = "Button B";
            btn2.addEventListener(egret.TouchEvent.TOUCH_TAP, Btn2_OnClick, null)
            function Btn2_OnClick(e:egret.TouchEvent)
            {
                console.log("Button B Touch_up.");
            }
            myGroup.addChild(btn2);
            var btn3:eui.Button = new eui.Button();
            btn3.label = "Button C";
            btn3.addEventListener(egret.TouchEvent.TOUCH_TAP, (e:egret.TouchEvent)=>
            {
                console.log("Button C Touch_up.");
            }, null)
            myGroup.addChild(btn3);        
            
            var myBtn:eui.Button = new eui.Button();
            myBtn.label = "Button I";
            myBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, (e:egret.TouchEvent)=>{
                console.log("Button I Touch_up");
            }, null)
            myGroup.addChild(myBtn);            

            var vLayout:eui.VerticalLayout = new eui.VerticalLayout();
            vLayout.gap = 10;
            vLayout.paddingTop = 30;
            vLayout.paddingLeft = 0;
            vLayout.horizontalAlign = egret.HorizontalAlign.CENTER;
            myGroup.layout = vLayout;

            const iGroup = new eui.Group();
            renderer.root.addChild(iGroup);
            iGroup.width = 100;
            iGroup.height = 100;
            iGroup.layout = new eui.BasicLayout();

            var myLogo:eui.Image = new eui.Image();
            myLogo.height = 100;
            myLogo.width = 100;
            RES.getResAsync("logo_png",(event:any)=>{
                console.log(event);
                myLogo.texture = event
            },myLogo);
            iGroup.addChild(myLogo);

            var iLayout:eui.HorizontalLayout = new eui.HorizontalLayout();
            iLayout.gap = 10;
            iLayout.paddingBottom = 100;
            iLayout.paddingLeft = 100;
            iLayout.horizontalAlign = egret.HorizontalAlign.CENTER;
            iGroup.layout = iLayout;

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
