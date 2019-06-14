async function main() {
    await RES.loadConfig("resource/default.res.json", "resource/");
    await RES.getResAsync('Asset/scenes/newScene.scene.json');
    paper.Application.sceneManager.loadScene('Asset/scenes/newScene.scene.json');
}