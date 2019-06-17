/**
 *  __author__ = "sun hai lang"
 *  __date__ = 2019-06-14
 * 
 */

import Splash from "./Splash/Splash";
import EuiRoot from "./EUICode/EuiRoot";

async function main() {
    await RES.loadConfig("resource/default.res.json", "resource/");
    await RES.getResAsync('Asset/scenes/newScene.scene.json');
    paper.Application.sceneManager.loadScene('Asset/scenes/newScene.scene.json');

    // 强制引用，该问题将在 Egret Pro 1.0.0 修复。
    Splash;
    EuiRoot;

}