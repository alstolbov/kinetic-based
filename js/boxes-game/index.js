var scriptRoot = 'js/boxes-game/';

var Scripts = [
    'kinetic-v5.1.0.min',
    'js/game-kernel/index',
    scriptRoot + 'config',
    scriptRoot + 'store',
    scriptRoot + 'game-objects/box',
    scriptRoot + 'game-objects/click-area'

];

require(Scripts, function() {

    Game.init({
        width: Settings.canvasWidth,
        height: Settings.canvasHeight
    });

    var onLoading = function (total, complete) {
        // console.log(complete + ' frome ' + total);
    }

    var onLoadEnd = function () {
        var mainLayer = Game.layer('mainLayer', {animated: false});
        var clickArea = Game.createObject('clickArea',{layer: 'mainLayer'});
        var block = Game.createObject('box', {layer: 'mainLayer'});
    };

    Game.loadImages(
        images,
        onLoading,
        onLoadEnd
    );
});
