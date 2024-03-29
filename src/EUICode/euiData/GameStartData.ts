



export default class GameStartData extends eui.Component implements eui.UIComponent {

    public m_btnPlay:eui.Button;
    public m_btnBack:eui.Button;

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