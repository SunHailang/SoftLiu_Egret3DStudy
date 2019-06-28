/**
 *  __author__ = "sun hai lang"
 *  __date__ = 2019-06-14
 * 
 */

import Splash from "./Splash/Splash";
import EuiRoot from "./EUICode/EuiRoot";
import CubeMove from "./Splash/CubeMove";
import MoveCar from "./Splash/MoveCar";
import CameraMove from "./Splash/CameraMove";
import CreateCarPrefab from "./Splash/CreateCarPrefab";
import CreatePlayerPrefab from "./Splash/CreatePlayerPrefab";

// 单例 Behavior
import SingleBehavior from "./Utils/SingleUtils/SingleBehavior";

// Test code
import SplashCollider from "./Collider/SplashCollider";
import ColliderEuiRoot from "./Collider/ColliderEuiRoot";

async function main() {
    await RES.loadConfig("resource/default.res.json", "resource/");
    await RES.getResAsync('Asset/scenes/Splash.scene.json');
    paper.Application.sceneManager.loadScene('Asset/scenes/Splash.scene.json');

    // 强制引用，该问题将在 Egret Pro 1.0.0 修复。
    Splash;
    EuiRoot;
    CubeMove;
    MoveCar;
    CameraMove;
    CreateCarPrefab;
    CreatePlayerPrefab;

    //Test code
    SplashCollider;
    ColliderEuiRoot;
}