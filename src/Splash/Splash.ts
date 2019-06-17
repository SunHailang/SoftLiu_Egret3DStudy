/**
 *  __author__ = "sun hai lang"
 *  __date__ = 2019-06-14
 * 
 */

import EventsManager from "../utils/EventManager/EventsManager";

export default class Splash extends paper.Behaviour
{
    onAwake()
    {
        
    }

    onEnable()
    {
        console.log("Splash");
        EventsManager.getInstance().RegisterEvent(Events.OnClickType, this.OnOnClickType);
    }

    onDisable()
    {
        EventsManager.getInstance().DeregisterEvent(Events.OnClickType, this.OnOnClickType);
    }

    private OnOnClickType(eventType:Events, ...items:any[])
    {
        let type = eventType;
        if(items.length > 0)
        {
            
        }
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