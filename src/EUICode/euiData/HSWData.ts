
/**
 *  __author__ = "sun hai lang"
 *  __date__ = 2019-06-14
 * 
 */

export default class HSWData extends eui.Component implements eui.UIComponent {

    public image_click_scenc:eui.Button;

    public showNotic:eui.Image;
    public letterH:eui.Image;
    public letterU:eui.Image;
    public letterN:eui.Image;
    public letterG:eui.Image;
    public letterR:eui.Image;
    public letterY:eui.Image;

    public constructor() {
        super();
    }

    //一个UI Panel 有多少个控件 就会执行多少次 （每加载一个控件就会调用一次）
    protected partAdded(partName:string,instance:any):void
    {
        super.partAdded(partName,instance);
    }
    // 当所有的控件加载完成 调用一次
    protected childrenCreated():void
    {
        super.childrenCreated();
        this.width = this.stage.stageWidth;
        this.height = this.stage.stageHeight;
        
         this.stage.addEventListener(egret.Event.RESIZE, (evt: egret.Event) => {
        this.width = this.stage.stageWidth;
        this.height = this.stage.stageHeight;
        }, this);
    }
 }