/**
 *  __author__ = "sun hai lang"
 *  __date__ = 2019-06-14
 * 
 */

export default class LoadingData extends eui.Component implements eui.UIComponent 
{

    loading_progressBar:eui.ProgressBar;
    cross:eui.Image;
    group_bar:eui.Group;

    private progressValue:number = 0;

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

        
        console.log("add Loading data Complete");

        console.log(`bottom: ${this.group_bar.bottom}`);
        this.addEventListener(egret.Event.ENTER_FRAME, (evt: egret.Event) => 
        {
            let target = this.progressValue / 100;
            this.loading_progressBar.value = this.progressValue;
            //水平方向
            let width = this.loading_progressBar.width * this.loading_progressBar.scaleX;
            // 获取 向左 坐标
            let leftOffset = this.group_bar.left;

            // 获取 向下 中心点坐标
            let bottomOffset = this.group_bar.bottom + this.group_bar.height / 2;

            this.cross.x = width * target + leftOffset - this.cross.width / 2;
            this.cross.y = this.height - bottomOffset - this.cross.height / 2;


            return false;
        }, this);

        this.setProgress(200);
    }


    async setProgress(delay:number)
    {
        let prosess:boolean = true;
        while(prosess)
        {
            await new Promise((resolve) => setTimeout(resolve, delay));
            this.progressValue ++;
            if(this.progressValue>= 100)
            {
                prosess = false;
            }
        }
    }

 }