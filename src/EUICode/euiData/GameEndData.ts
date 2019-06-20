

export default class GameEndData extends eui.Component implements eui.UIComponent 
{
    public constructor() 
    {
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