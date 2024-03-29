/**
 * 
 * __author__ = "sun hai lang"
 * __date__ = "2019-06-20"
 * 
 * 
 */

export default class GameEndData extends eui.Component implements eui.UIComponent 
{

    public Button_Result:eui.Button;
    public Label_Score:eui.Label;
    public Label_Result:eui.Label;

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

        this.stage.addEventListener(egret.Event.RESIZE, this.ResizeOnChange.bind(this), this);
        
        //this.stage.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.ResizeOnChange.bind(this), this);        
    }

    public RemoveResizeEvent():void
    {
        this.stage.removeEventListener(egret.Event.RESIZE, this.ResizeOnChange.bind(this), this);
    }

    private ResizeOnChange(evt:egret.Event)
    {
        if(this.stage)
        {
            this.width = this.stage.stageWidth;
            this.height = this.stage.stageHeight;
        }
    }
}