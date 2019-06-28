import EventsManager from "../Utils/EventManager/EventsManager";
import GameStateMachine from "../Utils/GameStateMachine";
import MoveCar from "../Splash/MoveCar";

/**
 *  __author__ = "sun hai lang"
 *  __date__ = 2019-06-21
 * 
 */

 export default class SplashCollider extends paper.Behaviour
 {
    @paper.editor.property(paper.editor.EditType.CHECKBOX)
    @paper.serializedField
    private isMove:boolean = false;

    private m_carInitVelocity:number = 10;


    private rigidbody:egret3d.oimo.Rigidbody;

    private m_init:boolean = false;
    

    onAwake()
    {

    }

     onStart()
     {
        EventsManager.getInstance().RegisterEvent(Events.OnColliderTestType, this.OnColliderTestTypeFunc.bind(this));

        this.rigidbody = this.gameObject.getComponent(egret3d.oimo.Rigidbody)! as egret3d.oimo.Rigidbody;
        this.CreateCarInstance();
     }

     private CreateCarInstance()
     {
        let sc = paper.Application.sceneManager.getActiveScene();
        let red = GameStateMachine.getInstance().m_prefabDictionary.TryGetValue("red");
        if(red)
        {
            console.log(red);
            let pro = RES.getResAsync(red).then(()=>
            {
                let obj = paper.Prefab.create(red, 0, 0, 0, sc);                
                obj.tag = "EditorCar";
                //console.log(obj);
                //console.log("Tag : " + obj.tag);
                let car = obj.getComponent(MoveCar) as MoveCar;
                if(car)
                {
                    //car.StartMove(true, this.m_carInitVelocity);
                }
                else
                {
                    //console.log("create move is null.");
                    car = obj.addComponent(MoveCar) as MoveCar;
                    //car.StartMove(true, this.m_carInitVelocity);
                }
                this.isMove = true;
            });
            console.log(pro);

            let pri = RES.getResAsync(red, (value:any, key:any)=>{
                console.log(value);
                console.log(key);
            }, this);
            console.log(pri);
        }else
        {
            console.log("red is null.");
        }
        
        //paper.Application.sceneManager.getActiveScene().destroy();
        //RES.getResAsync("Assets/Scenes/Splash.scene.json").then(()=>
        //{
                //paper.Application.sceneManager.createScene('Assets/Scenes/Splash.scene.json');
        //});
     }

     onDestroy()
     {
        EventsManager.getInstance().DeregisterEvent(Events.OnColliderTestType, this.OnColliderTestTypeFunc.bind(this));
     }

     private OnColliderTestTypeFunc(eventType:Events, items:any)
     {
        if(this.gameObject.name == "cube3")
        {
            if(this.rigidbody)
            {
                //this.rigidbody.addLinearVelocity(egret3d.Vector3.create(0, 0, 2));
                
            }else
            {
                console.log("OnCollider Test is null.");
            }
        }
     }

     onFixedUpdate(delta:number)
     {
        if(this.isMove)
        {
            //this.transform.setLocalPosition(egret3d.Vector3.create(0, 0, this.transform.localPosition.z + 2 * delta));
            this.transform.localPosition.add(egret3d.Vector3.create(0, 0, 2 * delta)).update();
            if(this.transform.localPosition.z < -5 || this.transform.localPosition.z > 5)
            {
                this.transform.setLocalPosition(egret3d.Vector3.create(0, 0, -4));
            }
        }
     }
     
     public onCollisionEnter(collider:any)
     {
        // egret3d.oimo.SphericalJoint
        let obj = collider as egret3d.oimo.BoxCollider;
        console.log(obj);
        if(obj)
        {
            console.log("onCollisionEnter Name: " + obj.gameObject.name);
            //let box = obj as ;
            //if(box)
            {
                obj.collisionMask = paper.Layer.BuiltinLayer1;
            }
        }        
    }

    onCollisionStay(collider:any)
    {

    }

    onCollisionExit(collider:any)
    {
        console.log("onCollisionExit");
        let obj = collider as egret3d.oimo.BoxCollider;
        console.log(obj);
        if(obj)
        {
            console.log("onCollisionEnter Name: " + obj.gameObject.name);
            //let box = obj as ;
            //if(box)
            {
                //obj.collisionMask = paper.Layer.BuiltinLayer0;
            }
        } 
    }
 }