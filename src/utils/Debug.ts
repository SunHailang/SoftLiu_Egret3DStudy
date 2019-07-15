/**
 *  __author__ = "sun hai lang"
 *  __date__ = 2019-07-15
 * 
 */


 export class Debug
 {
     public static Log(message?: any, ...optionalParams: any[]): void
     {
        console.log(message, ...optionalParams);        
     }

     public static LogInfo(message?: any, ...optionalParams: any[]): void
     {
        console.info(message, ...optionalParams);  
     }

     public static LogError(message?: any, ...optionalParams: any[]): void
     {
        console.error(message, ...optionalParams);
     }

     
 }