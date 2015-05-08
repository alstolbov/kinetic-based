var onLoadEnd = function () {
    var mainLayer = Game.layer('mainLayer', {animated: false});
    var clickLayer = Game.layer('clickLayer');
    var uiLayer = Game.layer('uiLayer');
    var clickArea = Game.createObject('clickArea',{layer: 'clickLayer'});
    clickLayer.hide();
    Store.currentLevel = Settings.startLevel;
    var levelData = Layers[Store.currentLevel];
    for (var row = 0; row < levelData.height; row++) {
        for (var item = 0; item < levelData.width; item++) {

        }
    }
    // var box = Game.createObject('box', {layer: 'mainLayer'});
    // box.set({
    //     x: 150,
    //     y: 150
    // });
    // var stone = Game.createObject('stone', {layer: 'mainLayer'});
    // stone.set({
    //     x: 250,
    //     y: 150
    // });
};
