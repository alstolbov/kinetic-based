var onLoadEnd = function () {
    var mainLayer = Game.layer('mainLayer', {animated: false});
    var clickLayer = Game.layer('clickLayer');
    var uiLayer = Game.layer('uiLayer');
    var clickArea = Game.createObject('clickArea',{layer: 'clickLayer'});
    clickLayer.hide();
    Store.currentLevel = Settings.startLevel;
    var levelData = Levels[Store.currentLevel];
    var levelItem;
    var gameObj;
    var gameObjType;
    for (var row = 0; row < levelData.height; row++) {
        for (var item = 0; item < levelData.width; item++) {
            if (levelData.map[row].length == 1) {
                levelItem = levelData.map[row][0];
            } else {
                levelItem = levelData.map[row][item];
            }
            switch (levelItem) {
                case 0:
                    gameObjType = false;
                    break;
                case 1:
                    gameObjType = "wall";
                    break;
                case 2:
                    gameObjType = "box";
                    break;
                case 3:
                    gameObjType = "box";
                    break;
            }
            if (gameObjType) {
                gameObj = Game.createObject(gameObjType, {layer: 'mainLayer'});
                gameObj.set({
                    x: Settings.itemWidth * item - Settings.itemWidth,
                    y: Settings.itemHeight * row - Settings.itemHeight,
                });
            }
        }
    }
    // var box = Game.createObject('box', {layer: 'mainLayer'});
    // box.set({
    //     x: 150,
    //     y: 150
    // });
    // var stone = Game.createObject('wall', {layer: 'mainLayer'});
    // stone.set({
    //     x: 250,
    //     y: 150
    // });
};
