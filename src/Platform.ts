/**
 *  __author__ = "sun hai lang"
 *  __date__ = 2019-07-15
 * 
 */

declare interface OpenDataContext
{

    createDisplayObject(type:any, width:number, height:number):egret.Bitmap;
    postMessage(data:any):void;

}

declare interface Platform
{

    setUserCloudStrorage(kvList:any):Promise<any>;
    share(obj:any):Promise<any>;
    saveCanvasToFile(canvas:HTMLCanvasElement):Promise<any>;
    /**
     *  id: 'eventId',
     *  label: 'eventLabel',
     *  params: {
     *      key1: 'value1',
     *      key2: 'value2'
     *  }
     */
    logEvent(eventData:any):Promise<any>;

    openDataContext:OpenDataContext;

}


declare interface Window
{
    platform:Platform;
}

