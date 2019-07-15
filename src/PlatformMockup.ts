/**
 *  __author__ = "sun hai lang"
 *  __date__ = 2019-07-15
 * 
 */


 export class DebugPlatform implements Platform
 {
     setUserCloudStrorage(kvList: any): Promise<any> 
     {
         throw new Error("Method not implemented.");
     }     
     
     share(obj: any): Promise<any> 
     {
         throw new Error("Method not implemented.");
     }

     saveCanvasToFile(canvas: HTMLCanvasElement): Promise<any> 
     {
         throw new Error("Method not implemented.");
     }

     logEvent(eventData: any): Promise<any> 
     {
         throw new Error("Method not implemented.");
     }


     openDataContext: OpenDataContext;

     
 }

 export class DebugOpenDataContext implements OpenDataContext
 {
     createDisplayObject(type: any, width: number, height: number): egret.Bitmap 
     {
         throw new Error("Method not implemented.");
     }     
     
     postMessage(data: any): void 
     {
         throw new Error("Method not implemented.");
     }

     
 }

 if(!window.platform)
 {
     window.platform = new DebugPlatform();
 }

