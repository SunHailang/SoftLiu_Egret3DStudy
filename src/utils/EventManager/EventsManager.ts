/**
 * 
 * __author__ = "sun hai lang"
 * __date__ = "2019-06-17"
 * 
 * 
 */

import Dictionary from "../Dictionary";

 export default class EventsManager
 {
    private static instance:EventsManager ;

    // 将 constructor 设为私有属性，防止 new 调用
    private constructor () {

        
    }

    static getInstance (): EventsManager 
    {
        if(!EventsManager.instance)
        {
            EventsManager.instance = new EventsManager();
        }
        return EventsManager.instance
    }

    dict:Dictionary<Events, ((...item:any[])=>void)[]> = new Dictionary<Events,  ((...item:any[])=>void)[]>();

    public RegisterEvent(type:Events, action:(type:Events, ...item:any[])=>void):void
    {
        console.log("RegisterEvent: "+ type.toString());
        if(this.dict.ContainsKey(type))
        {
            let values = this.dict.TryGetValue(type);

            if(values)
            {
                values.push(action);
            }
        }
        else
        {
            let values = [];
            values.push(action);        
            this.dict.Add(type, values);
        }
    }

    public TriggerEvent(type:Events, ...items:any[]):void
    {
        let values = this.dict.TryGetValue(type);        
        if(values)
        {
           values.forEach(element => {
               element(type, items);
           });
        }
    }

    public DeregisterEvent(type:Events, action:(type:Events, ...item:any[])=>void):void
    {
        if(this.dict.ContainsKey(type))
        {
            let values = this.dict.TryGetValue(type);
            if(values){
            if(values.length > 0)
            {
                let index = values.indexOf(action, 0);            
                if(index != -1)
                {
                    values.splice(index, 1);
                }
                if(values.length <= 0)
                {
                    this.dict.Remove(type);
                }
            }
            else
            {
                this.dict.Remove(type);
            }
        }
        }
    }
 }