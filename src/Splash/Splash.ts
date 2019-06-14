/**
 *  __author__ = "sun hai lang"
 *  __date__ = 2019-06-14
 * 
 */

export default class Splash extends paper.Behaviour
{
    onAwake()
    {

    }

    onEnable()
    {
        console.log("Splash");
    }

    onDisable()
    {

    }

    onStart()
    {
       // RES.getResAsync("Assets/textures/logo.png",this.onComplete,this);
    }


    private onComplete(event:any):void {
        console.log(event)
        if(event as egret3d.Texture)
        {

        }
    }

    onUpdate(delta:number)
    {

    }

    onFixedUpdate(delta:number)
    {

    }

    onLateUpdate(delta:number)
    {

    }

    onDestroy()
    {

    }

}