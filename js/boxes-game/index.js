/*
    -   ядро: анимация с установкой дискретности
    -   
*/

var scriptRoot = 'js/boxes-game/';

var Scripts = [
    'kinetic-v5.1.0.min',
    'js/game-kernel/index',
    scriptRoot + 'config',
    scriptRoot + 'store',
    scriptRoot + 'public-functions',
    scriptRoot + 'game-objects/click-area',
    scriptRoot + 'game-objects/box',
    scriptRoot + 'game-objects/stone'

];

require(Scripts, function() {

    Game.init({
        width: Settings.canvasWidth,
        height: Settings.canvasHeight
    });

    Game.loadImages(
        images,
        onLoading,
        onLoadEnd
    );
});
