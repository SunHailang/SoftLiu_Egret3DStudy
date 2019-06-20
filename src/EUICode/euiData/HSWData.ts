
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

    protected partAdded(partName:string,instance:any):void
    {
        super.partAdded(partName,instance);
    }

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