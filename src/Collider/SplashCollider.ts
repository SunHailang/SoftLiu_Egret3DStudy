/**
 *  __author__ = "sun hai lang"
 *  __date__ = 2019-06-21
 * 
 */

 export default class SplashCollider extends paper.Behaviour
 {
     onStart()
     {
         let collider:egret3d.oimo.BoxCollider = this.gameObject.getComponent(egret3d.oimo.BoxCollider);
         if(collider)
         {
             console.log("egret3d.oimo.BoxCollider : " + collider.isActiveAndEnabled);
         }
     }

     onTriggerEnter(collider:any)
     {
        console.log("onTriggerEnter");
        console.log(collider);
     }

     public onCollisionEnter(collider:any)
     {
         console.log("onCollisionEnter");
         console.log(collider);
     }
 }